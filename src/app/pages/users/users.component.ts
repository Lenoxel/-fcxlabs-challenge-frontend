import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserDto, UserSearchDto } from 'src/app/dto';
import { UserStatus } from 'src/app/enums';
import { Page } from 'src/app/models/page';
import { UsersService } from 'src/app/services/users/users.service';
import { WordService } from 'src/app/services/word/word.service';
import { Packer } from 'docx';
import * as fileSaver from 'file-saver';

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
    private wordService: WordService,
  ) {
    this.userFiltersFormGroup = this.formBuilder.group({
      name: [''],
      cpf: [''],
      login: [''],
      status: [UserStatus.Active],
      ageScale: [''],
      createdAt: [null],
      createdAtStart: [null],
      createdAtEnd: [null],
      updatedAt: [null],
      updatedAtStart: [null],
      updatedAtEnd: [null],
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

    this.handleUserFiltersForm();

    const userSearchDto: UserSearchDto = this.userFiltersFormGroup.getRawValue();

    this.usersService.getUsersByFilters(this.usersPage, userSearchDto).subscribe(
      {
        next: ({ data, count }) => {
          this.usersPage.rows = [...(data || [])];
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

  handleUserFiltersForm(): void {
    let createdAtStartDate = this.userFiltersFormGroup.value?.createdAtStart;
    if (createdAtStartDate) {
      const nowDate = new Date();
      nowDate.setFullYear(Number(createdAtStartDate.split('-')[0]), Number(createdAtStartDate.split('-')[1])-1, Number(createdAtStartDate.split('-')[2]));
      createdAtStartDate = nowDate.getTime();
    }

    let createdAtEndDate = this.userFiltersFormGroup.value?.createdAtEnd;
    if (createdAtEndDate) {
      const nowDate = new Date();
      nowDate.setFullYear(Number(createdAtEndDate.split('-')[0]), Number(createdAtEndDate.split('-')[1])-1, Number(createdAtEndDate.split('-')[2]));
      createdAtEndDate = nowDate.getTime();
    }

    let updatedAtStartDate = this.userFiltersFormGroup.value?.updatedAtStart;
    if (updatedAtStartDate) {
      const nowDate = new Date();
      nowDate.setFullYear(Number(updatedAtStartDate.split('-')[0]), Number(updatedAtStartDate.split('-')[1])-1, Number(updatedAtStartDate.split('-')[2]));
      updatedAtStartDate = nowDate.getTime();
    }

    let updatedAtEndDate = this.userFiltersFormGroup.value?.updatedAtEnd;
    if (updatedAtEndDate) {
      const nowDate = new Date();
      nowDate.setFullYear(Number(updatedAtEndDate.split('-')[0]), Number(updatedAtEndDate.split('-')[1])-1, Number(updatedAtEndDate.split('-')[2]));
      updatedAtEndDate = nowDate.getTime();
    }

    this.userFiltersFormGroup.patchValue({
      createdAt: {
        start: createdAtStartDate,
        end: createdAtEndDate,
      },
      updatedAt: {
        start: updatedAtStartDate,
        end: updatedAtEndDate,
      }
    }, {
      emitEvent: false,
      onlySelf: true,
    })
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
  
  exportAsDocx() {
    const page = new Page();
    page.size = 0;

    const userSearchDto: UserSearchDto = this.userFiltersFormGroup.getRawValue();

    this.usersService.getUsersByFilters(page, userSearchDto).subscribe({
      next: ({ data }) => {
        const document = this.wordService.createDocx(data);

        Packer.toBlob(document).then(buffer => {
          fileSaver.saveAs(buffer, 'usuarios.docx');
        });
      },
    })
  }
}
