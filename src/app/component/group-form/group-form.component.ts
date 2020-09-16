import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupService } from '../../service/group.service';
import { Group } from '../../model/group';
import { Observable } from 'rxjs';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  type = new FormControl('');
  name = new FormControl('');
  tribe = new FormControl('');
  tribes$ = this.groupService.tribe$;
  inValid = false;
  inValidMessage = '';
  constructor(private groupService: GroupService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.groupService.getTribes();
  }

  validate(): boolean{
    if (this.utilService.isEmpty(this.type.value) || this.utilService.isEmpty(this.name.value)){
      this.setInvalidMessage(true, 'Type and Name are mandatory fields');
      return false;
    }
    if (this.type.value === 'feature' && this.utilService.isEmpty(this.tribe.value)){
      this.setInvalidMessage(true, 'Tribe is mandatory fields');
      return false;
    }
    this.setInvalidMessage(false, null);
    return true;
  }

  setInvalidMessage(flag: boolean, message: string): void {
    this.inValid = flag;
    this.inValidMessage = message;
  }

  create(): void{
    const group: Group = {
        groupType: this.type.value,
        groupName: this.name.value
    };
    if (this.tribe.value){
      group.tribe = { id: this.tribe.value };
    }
    if (this.validate()) {
      this.groupService.create(group);
      this.groupService.getTribes();
      this.groupService.getGroups();
    }
  }

}
