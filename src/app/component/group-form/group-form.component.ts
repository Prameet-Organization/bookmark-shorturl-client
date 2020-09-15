import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupService } from '../../service/group.service';
import { Group } from '../../model/group';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  type = new FormControl('');
  name = new FormControl('');
  tribe = new FormControl('');
  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
  }

  create(): void{
    const group: Group = {
        groupType: this.type.value,
        groupName: this.name.value
    };

    this.groupService.create(group);
  }

}
