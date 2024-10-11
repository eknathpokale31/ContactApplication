import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnChanges {
    @Input() contact!: Contact | null;
    @Output() submitForm = new EventEmitter<Contact>();
    @Output() cancelForm = new EventEmitter<boolean>();
    contactForm: FormGroup;

    constructor(private fb: FormBuilder, private router:Router) {
        this.contactForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnChanges() {
        if (this.contact) {
            this.contactForm.patchValue(this.contact);
        } else {
            this.contactForm.reset();
        }
    }

    onSubmit() {
        if (this.contactForm.valid) {
            this.submitForm.emit(this.contactForm.value);
        }
    }

    cancel(){
        this.router.navigate(['']).then(()=>{
            window.location.reload();
        })
    }
}
