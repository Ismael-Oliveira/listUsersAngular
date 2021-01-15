import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

import { User } from '../user';
import { from } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    // + converte a string para inteiro
    // const id = +this.route.snapshot.paramMap.get('id');
    const id = this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id)
        .subscribe(user => this.user = user);
  }

}
