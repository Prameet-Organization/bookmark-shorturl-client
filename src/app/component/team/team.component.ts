import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { GroupService } from 'src/app/service/group.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  username = new FormControl('');
  groupname = new FormControl('');

  users$ = this.userService.users$;
  groups$ = this.groupService.groups$;
  inValid = false;
  inValidMessage = '';

  constructor(private userService: UserService,
              private groupService: GroupService,
              private utilService: UtilService) { }

  ngOnInit(): void {
  }

  getUsers(): void{
    this.userService.getUsers(this.username.value);
  }

  searchGroups(): void{
    this.groupService.searchGroups(this.groupname.value);
  }

  validate(): boolean{
    if (this.utilService.isEmpty(this.username.value)
        || this.utilService.isEmpty(this.groupname.value)){
          this.setInvalidMessage(true, 'Both User name and Group Name are mandatory');
          return false;
    }
    this.setInvalidMessage(false, '');
    return true;
  }

  add(): void{
    if (this.validate()){
      this.groupService.addUserToGroup(this.groupname.value, this.username.value);
    }
  }

  setInvalidMessage(flag: boolean, message: string): void {
    this.inValid = flag;
    this.inValidMessage = message;
  }

}
