import { createReducer, on } from '@ngrx/store';
import { Contact } from '../models/contact.model';
import * as ContactActions from '../store/contact.actions';

export interface State {
    contacts: Contact[];
    error: string | null;
}

export const initialState: State = {
    contacts: [],
    error: null,
};

export const contactReducer = createReducer(
    initialState,
    on(ContactActions.loadContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
    on(ContactActions.loadContactsFailure, (state, { error }) => ({ ...state, error })),
    on(ContactActions.addContact, (state, { contact }) => ({ ...state, contacts: [...state.contacts, contact] })),
    on(ContactActions.updateContact, (state, { contact }) => {
        const updatedContacts = state.contacts.map(c => (c.id === contact.id ? contact : c));
        return { ...state, contacts: updatedContacts };
    }),
    on(ContactActions.deleteContact, (state, { id }) => {
        const filteredContacts = state.contacts.filter(c => c.id !== id);
        return { ...state, contacts: filteredContacts };
    })
);