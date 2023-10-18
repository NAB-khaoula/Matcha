import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import UIkit from 'uikit';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
      const userRegistration = this.registrationForm.value;
      this.authService.signUp(userRegistration).subscribe((res) => {
        this.router.navigate(['']);
        console.log('wsel lhna b3da');
      });
    }
  }
}
