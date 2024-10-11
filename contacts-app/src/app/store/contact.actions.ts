
import { createAction, props } from '@ngrx/store';
import { Contact } from '../models/contact.model';

export const loadContacts = createAction('[Contact API] Load Contacts');
export const loadContactsSuccess = createAction('[Contact API] Load Contacts Success', props<{ contacts: Contact[] }>());
export const loadContactsFailure = createAction('[Contact API] Load Contacts Failure', props<{ error: string }>());
export const addContact = createAction('[Contact API] Add Contact', props<{ contact: Contact }>());
export const updateContact = createAction('[Contact API] Update Contact', props<{ contact: Contact }>());
export const deleteContact = createAction('[Contact API] Delete Contact', props<{ id: number }>());
