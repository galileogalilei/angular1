import {Component, OnInit} from '@angular/core';

interface Btns {
    val: string;
    colspan: number;
    icn: string;
}

@Component({
    selector: 'app-base-template',
    templateUrl: './base-template.component.html',
    styleUrls: ['./base-template.component.css']
})
export class BaseTemplateComponent implements OnInit {

    public buttons: Btns[] = [
        {val: 'CLEAR', colspan: 2, icn: 'clear'},
        {val: 'SPACE', colspan: 1, icn: 'input'},
        {val: 'DEL', colspan: 1, icn: 'backspace'},
        {val: 'SUM', colspan: 1, icn: null},
        {val: 'AVG', colspan: 1, icn: null},
        {val: '.', colspan: 1, icn: null},
        {val: '%', colspan: 1, icn: null},
        {val: 'MIN', colspan: 1, icn: null},
        {val: 'x^y', colspan: 1, icn: null},
        {val: '0', colspan: 1, icn: null},
        {val: '*', colspan: 1, icn: null},
        {val: '1', colspan: 1, icn: null},
        {val: '2', colspan: 1, icn: null},
        {val: '3', colspan: 1, icn: null},
        {val: '-', colspan: 1, icn: null},
        {val: '4', colspan: 1, icn: null},
        {val: '5', colspan: 1, icn: null},
        {val: '6', colspan: 1, icn: null},
        {val: '+', colspan: 1, icn: null},
        {val: '7', colspan: 1, icn: null},
        {val: '8', colspan: 1, icn: null},
        {val: '9', colspan: 1, icn: null},
        {val: '=', colspan: 1, icn: null},
    ];

    rpnExpr = '';

    constructor() {
    }

    ngOnInit() {
    }

    onKeySelected(clickedVal: String) {
        switch (clickedVal) {
            case 'CLEAR':
                this.rpnExpr = '';
                break;
            case 'DEL':
                console.log(this.rpnExpr.lastIndexOf(' '));
                if (this.rpnExpr.lastIndexOf(' ') > -1) {
                    console.log(this.rpnExpr.slice(0, this.rpnExpr.lastIndexOf(' ')));
                    this.rpnExpr = this.rpnExpr.slice(0, this.rpnExpr.lastIndexOf(' '));
                } else {
                    this.rpnExpr = '';
                }
                break;
            case 'SPACE':
                this.rpnExpr = this.rpnExpr + ' ';
                break;
            default:
                this.rpnExpr = this.rpnExpr + clickedVal;
                break;
        }
    }

}
