import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import UIkit from 'uikit';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [],
      password: [],
      firstName: [],
      lastName: [],
    });
  }

  showPopup(): void {
    const modal = UIkit.modal('#registration-modal');
    modal.show();
  }

  hidePopup(): void {
    const modal = UIkit.modal('#registration-modal');
    modal.hide();
  }

  onSubmit() {
    if (this.registrationForm?.valid) {
      const formData = this.registrationForm.value;
      console.log(formData);
    }
  }
}
