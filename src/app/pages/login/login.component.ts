import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  formSubmitted = false;
  submittingForm = false;
  loginErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService,
  ) {
    this.loginFormGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.utilService.setJWT('');
  }

  ngOnInit(): void {
  }

  doLogin() {
    this.formSubmitted = true;

    if (this.loginFormGroup.invalid) {
      this.loginErrorMessage = 'Preencha os campos obrigatórios';
      return;
    }

    this.submittingForm = true;

    this.loginFormGroup.disable();

    const loginUserDto: LoginUserDto = this.loginFormGroup.getRawValue();

    this.authService.login(loginUserDto).subscribe(
      {
        next: ({ accessToken }) => {
          this.utilService.setJWT(accessToken);
          this.loginFormGroup.reset();
          this.router.navigateByUrl('');
          this.formSubmitted = false;
          this.submittingForm = false;
        },
        error: (err) => {
          this.loginFormGroup.enable();
          this.loginErrorMessage = err?.error?.message || 'Erro ao fazer login';
          this.submittingForm = false;
        }
      }
    );
  }

}
