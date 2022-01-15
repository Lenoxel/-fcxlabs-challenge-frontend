import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/app/dto';
import { UsersService } from 'src/app/services/users/users.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userFormGroup: FormGroup;
  formSubmitted = false;
  submittingForm = false;
  errorMessage = '';
  actionType: 'insert' | 'update' = 'insert';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private usersService: UsersService,
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      motherName: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  insertOrUpdateUser() {
    this.formSubmitted = true;

    if (this.userFormGroup.invalid) {
      this.errorMessage = 'Preencha os campos obrigatórios';
      return;
    }

    this.submittingForm = true;

    this.userFormGroup.disable();

    if (this.userFormGroup?.value?.id) {
      const updateUserDto: UpdateUserDto = this.userFormGroup.getRawValue();

      this.usersService.updateUser(updateUserDto?.id, updateUserDto).subscribe(
        {
          next: () => {
            this.userFormGroup.reset();
            this.router.navigateByUrl('');
            this.formSubmitted = false;
            this.submittingForm = false;
          },
          error: (err) => {
            this.userFormGroup.enable();
            this.errorMessage = err?.error?.message || 'Erro ao atualizar o usuário';
            this.submittingForm = false;
          }
        }
      );
    } else {
      const createUserDto: CreateUserDto = this.userFormGroup.getRawValue();

      this.usersService.createUser(createUserDto).subscribe(
        {
          next: () => {
            this.userFormGroup.reset();
            this.router.navigateByUrl('');
            this.formSubmitted = false;
            this.submittingForm = false;
          },
          error: (err) => {
            this.userFormGroup.enable();
            this.errorMessage = err?.error?.message || 'Erro ao criar o usuário';
            this.submittingForm = false;
          }
        }
      );
    }
  }
}
