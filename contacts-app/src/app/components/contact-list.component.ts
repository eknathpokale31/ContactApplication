import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Contact } from '../models/contact.model';
import * as ContactActions from '../store/contact.actions';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
    contacts: Contact[] = [];
    selectedContact: Contact | null = null;
    operationStatus: string | null = null;
    isNewContactBtnClicked=false;
    constructor(private store: Store<{ contacts: { contacts: Contact[] } }>) {}

    ngOnInit() {
        this.store.dispatch(ContactActions.loadContacts());
        this.store.select('contacts').subscribe(state => {
            this.contacts = state.contacts;
        });
    }

    onSubmit(contact: Contact) {
        if (this.selectedContact) {
            this.store.dispatch(ContactActions.updateContact({ contact: { ...this.selectedContact, ...contact } }));
            this.operationStatus = 'Contact updated successfully!';
        } else {
            this.store.dispatch(ContactActions.addContact({ contact }));
            this.operationStatus = 'Contact created successfully!';
        }
        this.isNewContactBtnClicked=false;
        this.selectedContact = null;
    }

    selectContact(contact: Contact) {
        this.isNewContactBtnClicked=true;
        this.selectedContact = contact;
    }

    deleteContact(id: number) {
        this.store.dispatch(ContactActions.deleteContact({ id }));
        this.operationStatus = 'Contact deleted successfully!';
    }

    newContact(){
        this.isNewContactBtnClicked=true;
    }
}