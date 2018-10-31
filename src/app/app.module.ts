import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatProgressBarModule,
    MatDialogModule,
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {BaseTemplateComponent} from './templates/base-template/base-template.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MenuItemComponent} from './templates/menu-item/menu-item.component';
import {ApiErrDialogComponent} from './templates/api-err-dialog/api-err-dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        BaseTemplateComponent,
        MenuItemComponent,
        ApiErrDialogComponent
    ],
    entryComponents: [
        ApiErrDialogComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatListModule,
        MatProgressBarModule,
        MatDialogModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
