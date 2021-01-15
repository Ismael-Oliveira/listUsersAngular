import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';
import { NONE_TYPE } from '@angular/compiler';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  permission: string = '';
  
  constructor(private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onChangePermission(): void {
    let filtered = this.users.filter( user => user.permissionLevel === this.permission);
    this.users = filtered;
  }

}
