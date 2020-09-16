import { Component, OnInit, Injector } from '@angular/core';
import { GroupService } from 'src/app/service/group.service';
import { UtilService } from 'src/app/service/util.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-url-form',
  templateUrl: './add-url-form.component.html',
  styleUrls: ['./add-url-form.component.scss']
})
export class AddUrlFormComponent implements OnInit {

  groupname = new FormControl('');

  groups$ = this.groupService.groups$;
  inValid = false;
  inValidMessage = '';
  data: any;
  shortUrl = new FormControl('');
  public dialogRef: MatDialogRef<any>;

  constructor(private groupService: GroupService,
              private utilService: UtilService,
              private injector: Injector) {
    this.data = this.injector.get(MAT_DIALOG_DATA, null);
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    if (!!this.data){
      if (!!this.data.fieldData.shortUrl){
        this.shortUrl.setValue(this.data.fieldData.shortUrl);
      }
    }
  }

  searchGroups(): void{
    this.groupService.searchGroups(this.groupname.value);
  }

  validate(): boolean{
    if (this.utilService.isEmpty(this.groupname.value)){
          this.setInvalidMessage(true, 'Group Name is mandatory');
          return false;
    }
    this.setInvalidMessage(false, '');
    return true;
  }

  add(): void{
    if (this.validate()){
      this.groupService.addUrlToGroup(this.groupname.value, this.shortUrl.value);
      this.close();
    }
  }

  setInvalidMessage(flag: boolean, message: string): void {
    this.inValid = flag;
    this.inValidMessage = message;
  }

  close(): void{
    this.dialogRef.close();
  }

}
