import { Component, OnInit, Inject } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { UtilService } from '../../service/util.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrlService } from '../../service/url.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-url-form',
  templateUrl: './add-url-form.component.html',
  styleUrls: ['./add-url-form.component.scss']
})
export class AddUrlFormComponent implements OnInit {

  groupname = new FormControl('');

  groups$: Observable<any>;
  inValid = false;
  inValidMessage = '';
  shortUrl = new FormControl('');

  constructor(private groupService: GroupService,
              private utilService: UtilService,
              private urlService: UrlService,
              private dialogRef: MatDialogRef<AddUrlFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.groups$ = this.groupService.groups$;
    this.groupService.urlAdded$.subscribe(flag => {
      if (flag && this.dialogRef){
        this.cancel();
      }
    });
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
      this.urlService.getUrls();
    }
  }

  setInvalidMessage(flag: boolean, message: string): void {
    this.inValid = flag;
    this.inValidMessage = message;
  }

  cancel(): void{
    if (this.dialogRef){
      this.dialogRef.close();
    }
  }

}
