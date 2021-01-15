import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm} from '@angular/forms';

import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  
  user = {} as User;
  controlMessage: boolean = false;
  
  constructor(private useService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(form: NgForm) {
    this.controlMessage = true;

    this.useService.saveUser(this.user).subscribe(() => {
      setTimeout(()=> {
        this.controlMessage = false;
        this.cleanForm(form);
      }, 5000);
      
    });


  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    form.resetForm();
    this.user = {} as User;
  }
}
