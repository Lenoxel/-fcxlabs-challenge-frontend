import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersPage = new Page();
  
  constructor(  
    private usersService: UsersService,
  ) {
    this.usersPage.pageNumber = 0;
    this.usersPage.size = 20;
  }  
  
  ngOnInit() {  
    this.getUsers({ offset: 0 });  
  }  
  
  getUsers(pageInfo: any) {
    this.usersPage.loading = true;
    this.usersPage.pageNumber = pageInfo.offset;

    this.usersService.getUsers().subscribe(
      {
        next: (userDtoList) => {
          this.usersPage.rows = [...this.usersPage.rows, ...userDtoList || []];
          this.usersPage.totalElements = userDtoList.length;
          this.usersPage.totalPages = userDtoList.length / this.usersPage.size;
          this.usersPage.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.usersPage.loading = false;
        }
      }
    );
  }

}
