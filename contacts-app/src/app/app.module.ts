import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list.component';
import { ContactFormComponent } from './components/contact-form.component';
import { contactReducer } from './store/contact.reducer';
import { ContactEffects } from './store/contact.effects';
import { ErrorInterceptor } from './service/error.handler.service';


// Define routes
const routes: Routes = [
    { path: '', component: ContactListComponent },
    { path: 'edit/:id', component: ContactFormComponent },
    { path: 'create', component: ContactFormComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        ContactListComponent,
        ContactFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes), 
        StoreModule.forRoot({ contacts: contactReducer }),
        EffectsModule.forRoot([ContactEffects])
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
