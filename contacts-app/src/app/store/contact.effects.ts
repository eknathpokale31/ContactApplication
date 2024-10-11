
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContactService } from '../service/contact.service'; 
import {
  loadContacts,
  loadContactsSuccess,
  loadContactsFailure,
  addContact,
  updateContact,
  deleteContact
} from '../store/contact.actions';

@Injectable()
export class ContactEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private store: Store
  ) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContacts),
      mergeMap(() =>
        this.contactService.getContacts().pipe( 
          map(contacts => loadContactsSuccess({ contacts })),
          catchError(error => of(loadContactsFailure({ error: error.message })))
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addContact),
      mergeMap(action =>
        this.contactService.createContact(action.contact).pipe( 
          map(contact => loadContacts()), 
          catchError(error => of(loadContactsFailure({ error: error.message })))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateContact),
      mergeMap(action =>
        this.contactService.updateContact(action.contact).pipe( 
          map(contact => loadContacts()), 
          catchError(error => of(loadContactsFailure({ error: error.message })))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact),
      mergeMap(action =>
        this.contactService.deleteContact(action.id).pipe( 
          map(() => loadContacts()), 
          catchError(error => of(loadContactsFailure({ error: error.message })))
        )
      )
    )
  );
}