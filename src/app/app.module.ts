import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {BaseTemplateComponent} from './templates/base-template/base-template.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MenuItemComponent} from './templates/menu-item/menu-item.component';


@NgModule({
    declarations: [
        AppComponent,
        BaseTemplateComponent,
        MenuItemComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
