import {Component, HostListener, OnInit, ViewChildren} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {ApiErrDialogComponent} from '../api-err-dialog/api-err-dialog.component';

interface Btns {
    keyCode: number;
    val: string;
    colspan: number;
    icn: string;
    type: number;
}

@Component({
    selector: 'app-base-template',
    templateUrl: './base-template.component.html',
    styleUrls: ['./base-template.component.css']
})
export class BaseTemplateComponent implements OnInit {
    serviceUrl = 'http://142.93.96.224:8080/rpn';

    public buttons: Btns[] = [
        {keyCode: 666666, val: 'CLEAR', colspan: 2, icn: 'clear', type: 3},
        {keyCode: 32, val: ' SPACE', colspan: 1, icn: 'input', type: 3},
        {keyCode: 8, val: ' DEL', colspan: 1, icn: 'backspace', type: 3},
        {keyCode: 838577, val: 'SUM', colspan: 1, icn: null, type: 2},
        {keyCode: 658671, val: 'AVG', colspan: 1, icn: null, type: 2},
        {keyCode: 190, val: '.', colspan: 1, icn: null, type: 2},
        {keyCode: 5316, val: '%', colspan: 1, icn: null, type: 2},
        {keyCode: 777378, val: 'MIN', colspan: 1, icn: null, type: 2},
        {keyCode: 5416, val: 'x^y', colspan: 1, icn: null, type: 2},
        {keyCode: 189, val: '-', colspan: 1, icn: null, type: 2},
        {keyCode: 5616, val: '*', colspan: 1, icn: null, type: 2},
        {keyCode: 49, val: '1', colspan: 1, icn: null, type: 1},
        {keyCode: 50, val: '2', colspan: 1, icn: null, type: 1},
        {keyCode: 51, val: '3', colspan: 1, icn: null, type: 1},
        {keyCode: 187, val: '+', colspan: 1, icn: null, type: 2},
        {keyCode: 52, val: '4', colspan: 1, icn: null, type: 1},
        {keyCode: 53, val: '5', colspan: 1, icn: null, type: 1},
        {keyCode: 54, val: '6', colspan: 1, icn: null, type: 1},
        {keyCode: 13, val: '=', colspan: 1, icn: null, type: 2},
        {keyCode: 55, val: '7', colspan: 1, icn: null, type: 1},
        {keyCode: 56, val: '8', colspan: 1, icn: null, type: 1},
        {keyCode: 57, val: '9', colspan: 1, icn: null, type: 1},
        {keyCode: 48, val: '0', colspan: 1, icn: null, type: 1},
    ];

    tockenStack: Btns[] = [];

    bufferInputList: number[] = [];

    inputExpressionsList: string[] = [];

    resultsList: string[] = [];

    inputExpression = '';

    keyPressed = false;

    isLoading = false;

    @ViewChildren('keyboardInput') vc;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this._handleKeySelected(event.keyCode);
    }

    constructor(private http: HttpClient, private errDialog: MatDialog) {
    }

    ngOnInit() {
    }

    onKeySelected(token: Btns) {
        if (token.keyCode === 666666) {
            this.bufferInputList = [];
            this.resetStack();
            return true;
        }
        this._handleKeySelected(token.keyCode);
        return true;
    }

    onBtnClicked(event) {
        this.keyPressed = true;
    }

    onBtnReleased(event) {
        this.keyPressed = false;
    }

    addToStack(tocken: Btns): Btns[] {
        this.tockenStack.push(tocken);
        this._recalculateExprForDisplay(this.tockenStack);
        return this.tockenStack;
    }

    removeFromStack(): Btns[] {
        if (this.tockenStack.length > 0) {
            this.tockenStack.pop();
            this._recalculateExprForDisplay(this.tockenStack);
        }
        return this.tockenStack;
    }

    resetStack(): Btns[] {
        this.tockenStack = [];
        this._recalculateExprForDisplay(this.tockenStack);
        return this.tockenStack;
    }

    evaluateExpr(expr) {
        this.isLoading = true;
        this._getResult(expr).subscribe((result: string) => {
                const res = parseFloat(result).toPrecision(3);
                this.resultsList.push(res);
                this.isLoading = false;
            },
            error => {
                this.isLoading = false;
                this.resultsList.push(NaN.toString());
                this._openDialog(expr, error);
            });
    }

    onShowKeyboard($event) {
        // console.log(this.vc.first.nativeElement);
        this.vc.first.nativeElement.focus();
    }

    private _handleKeySelected(enteredCode) {
        switch (enteredCode) {
            case 16: // if shift key was pressed!
                const lastToken = this.tockenStack.pop();
                if ([53, 54, 56].indexOf(lastToken.keyCode) > -1) {
                    const composeKey = lastToken.keyCode + '' + 16;
                    const bufferOperator: Btns = this.buttons.find(tocken => {
                        return (tocken.type === 2 && tocken.keyCode === parseInt(composeKey, 10));
                    });
                    this.addToStack(bufferOperator);
                } else {
                    this.tockenStack.push(lastToken);
                }
                break;
            case 32: // SPACE key
                this._evaluatebufferInputList();
                // add space key
                this.addToStack(this.buttons.find(tocken => {
                    return tocken.keyCode === 32;
                }));
                // empty buffer stack after each space
                this.bufferInputList = [];
                break;
            case 8: // DEL key
                if (this.bufferInputList.length > 0) {
                    this.bufferInputList.pop();
                } else {
                    this.removeFromStack();
                }
                break;
            case 13: // Result key
                this._evaluatebufferInputList();
                this.bufferInputList = [];
                if (this.tockenStack.length < 1) {
                    return false;
                }
                this._recalculateExprForDisplay(this.tockenStack);
                const inputExpr = this._recalculateExprForProcess(this.tockenStack).trim();
                this.resetStack();
                if (!inputExpr || inputExpr.length < 1) {
                    return false;
                }
                this.evaluateExpr(inputExpr);
                this.inputExpressionsList.push(inputExpr);
                break;
            default:
                const pressedBtn: Btns = this.buttons.find(row => {
                    return row.keyCode === enteredCode;
                });
                if (pressedBtn) {
                    this.addToStack(pressedBtn);
                } else {
                    this.bufferInputList.push(enteredCode);
                }
                break;
        }
        return true;
    }

    private _evaluatebufferInputList() {
        const bufferCodes = this.bufferInputList.join('');
        const bufferOperator: Btns = this.buttons.find(tocken => {
            return (tocken.type === 2 && tocken.keyCode === parseInt(bufferCodes, 10));
        });
        // add bufferOperator key
        if (bufferOperator) {
            this.addToStack(bufferOperator);
        }

        return this.tockenStack;
    }

    // returns the expressionString based on the tokenStack
    private _recalculateExprForDisplay(stack: Btns[]): string {
        let res = '';
        if (stack && stack.length > 0) {
            res = stack.reduce((expr: string, token: Btns) => {
                const clickedVal = token.val.trim();
                if (token.keyCode === 32) {
                    return expr + ' _ ';
                }
                if (token.keyCode === 5416) {
                    return expr + '^';
                }
                return expr + clickedVal;
            }, '');
        }
        this.inputExpression = res;
        return this.inputExpression;
    }

    private _recalculateExprForProcess(stack: Btns[]): string {
        let res = '';
        if (stack && stack.length > 0) {
            res = stack.reduce((expr: string, token: Btns) => {
                const clickedVal = token.val.trim();
                if (token.keyCode === 32) {
                    return expr + ' ';
                }
                if (token.keyCode === 5416) {
                    return expr + '^';
                }
                if (token.keyCode === 5316) {
                    return expr + '/';
                }
                return expr + clickedVal;
            }, '');
        }
        this.inputExpression = res;
        return this.inputExpression;
    }

    private _getResult(expr: string) {
        return this.http.get(this.serviceUrl + '/' + encodeURI(expr));
    }

    private _openDialog(expr: string, errMsg: string): void {
        const dialogRef = this.errDialog.open(ApiErrDialogComponent, {
            width: '350px',
            data: {expr: expr, error: errMsg}
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
        });
    }

}
