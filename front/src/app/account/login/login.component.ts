import { Component, ViewChild } from '@angular/core';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('registrationPopup') registrationPopup:
    | RegistrationModalComponent
    | undefined;

  toggleRegistrationModal() {
    this.registrationPopup?.showPopup();
  }
}
