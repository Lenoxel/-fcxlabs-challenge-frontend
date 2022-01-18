import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  RecoverPasswordDto } from 'src/app/dto';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  recoverPasswordFormGroup: FormGroup;
  formSubmitted = false;
  submittingForm = false;
  recoverPasswordErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
  ) {
    // Formulário de recuperação/alteração de senha do usuário
    this.recoverPasswordFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  recoverPassword() {
    this.formSubmitted = true;

    if (this.recoverPasswordFormGroup.invalid) {
      this.recoverPasswordErrorMessage = 'Preencha os campos obrigatórios';
      return;
    }

    this.submittingForm = true;

    this.recoverPasswordFormGroup.disable();

    const recoverPasswordDto: RecoverPasswordDto = this.recoverPasswordFormGroup.getRawValue();

    this.usersService.recoverPassword(recoverPasswordDto).subscribe(
      {
        next: () => {
          this.recoverPasswordFormGroup.reset();
          this.router.navigateByUrl('/login');
          this.formSubmitted = false;
          this.submittingForm = false;
        },
        error: (err) => {
          this.recoverPasswordFormGroup.enable();
          this.recoverPasswordErrorMessage = err?.error?.message || 'Erro ao fazer login';
          this.submittingForm = false;
        }
      }
    );
  }
}
