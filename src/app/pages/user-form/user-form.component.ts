import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserDto, UpdateUserDto } from 'src/app/dto';
import { UserStatus } from 'src/app/enums';
import { UsersService } from 'src/app/services/users/users.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      motherName: ['', Validators.required],
      status: [UserStatus.Active, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initUserToUpdate(this.activatedRoute?.snapshot?.paramMap?.get('id'));
  
  }

  initUserToUpdate(userId: string | null) {
    if (userId) {
      this.usersService.getUserById(userId).subscribe(
        {
          next: (userDto) => {
            if (userDto) {
              const { id, name, login, email, phoneNumber, cpf, birthDate, motherName, status } = userDto;
              this.userFormGroup.patchValue({
                id,
                name,
                login,
                email,
                phoneNumber,
                cpf,
                birthDate,
                motherName,
                status,
              });

              this.userFormGroup.get('password')?.clearValidators();
              this.userFormGroup.get('password')?.updateValueAndValidity();
            }
          },
          error: (err) => {
            this.router.navigateByUrl('users/form');
            console.log(err);
          }
        }
      );
    }
  }

  getFormControl(name: string) {
    return this.userFormGroup.controls[name];
  }

  createUser() {
    this.formSubmitted = true;

    if (this.userFormGroup.invalid) {
      this.errorMessage = 'Preencha os campos obrigatórios';
      return;
    }

    this.handleUserFormGroup();

    this.submittingForm = true;

    this.userFormGroup.disable();

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

  updateUser() {
    this.formSubmitted = true;

    if (this.userFormGroup.invalid) {
      this.errorMessage = 'Preencha os campos obrigatórios';
      return;
    }

    this.handleUserFormGroup();

    this.submittingForm = true;

    this.userFormGroup.disable();

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
  }

  handleUserFormGroup(): void {
    const stringPhoneNumber = this.userFormGroup.value?.phoneNumber as string;
    const formattedPhoneNumber = stringPhoneNumber.startsWith('+55') ? stringPhoneNumber : `+55${stringPhoneNumber}`;

    this.userFormGroup.patchValue({
      phoneNumber: formattedPhoneNumber,
    })
  }
}
