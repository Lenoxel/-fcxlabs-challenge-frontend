import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserDto, UserSearchDto } from 'src/app/dto';
import { UserStatus } from 'src/app/enums';
import { Page } from 'src/app/models/page';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersPage = new Page();
  userFiltersFormGroup: FormGroup;
  
  constructor(  
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) {
    this.userFiltersFormGroup = this.formBuilder.group({
      name: [''],
      cpf: [''],
      login: [''],
      status: [UserStatus.Active],
      ageRange: [null],
      createdAt: [null],
      updatedAt: [null],
      ageScale: [null],
    });

    this.initializeUsersPage();
  }  
  
  ngOnInit() {  
    this.getUsers({ offset: 0 });  

    this.userFiltersFormGroupChangeObserver();
  }  

  initializeUsersPage() {
    this.usersPage = new Page();
    this.usersPage.pageNumber = 0;
    this.usersPage.size = 10;
  }

  userFiltersFormGroupChangeObserver(): void {
    this.userFiltersFormGroup.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    )
    .subscribe({
      next: () => {
        this.initializeUsersPage();
        this.getUsers({ offset: 0 });
      }
    });
  }


  getUsers(pageInfo: any) {
    this.usersPage.loading = true;
    this.usersPage.pageNumber = pageInfo.offset;

    const userSearchDto: UserSearchDto = this.userFiltersFormGroup.getRawValue();

    this.usersService.getUsersByFilters(this.usersPage, userSearchDto).subscribe(
      {
        next: ({ data, count }) => {
          this.usersPage.rows = [...this.usersPage.rows, ...(data || [])];
          this.usersPage.totalElements = count;
          this.usersPage.totalPages = count / this.usersPage.size;
          this.usersPage.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.usersPage.loading = false;
        }
      }
    );
  }

  changeUserStatus(user: UserDto | UserSearchDto, status: 'Active' | 'Inactive' | 'Blocked') {
    const userStatus = UserStatus[status];
    this.usersService.changeUserStatus(user.id, userStatus).subscribe(
      {
        next: (userChangeResultDto) => {
          if (userChangeResultDto) {
            user.status = userStatus;
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  inactiveAllUsers() {
    this.usersService.inactiveUserBulk().subscribe(
      {
        next: () => {
          this.initializeUsersPage();
          this.getUsers({ offset: 0 });
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }
}
