import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
  }

  showPopup(): void {
    //TODO -  Add a modal function to show the modal
    // const modal = UIkit.modal('#registration-modal');
    // modal.show();
  }

  hidePopup(): void {
    //TODO -  Add a modal function to hide the modal
    // const modal = UIkit.modal('#registration-modal');
    // modal.hide();
  }

  onSubmit() {
    if (this.registrationForm?.valid) {
      const userRegistration = this.registrationForm.value;
      this.authService.signUp(userRegistration).subscribe((res) => {
        this.hidePopup();
        this.router.navigate(['/home']);
      });
    }
  }
}
