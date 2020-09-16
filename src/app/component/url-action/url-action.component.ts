import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShortUrlFormComponent } from '../short-url-form/short-url-form.component';
import { UrlService } from 'src/app/service/url.service';
import { AddUrlFormComponent } from '../add-url-form/add-url-form.component';

@Component({
  selector: 'app-url-action',
  templateUrl: './url-action.component.html',
  styleUrls: ['./url-action.component.scss']
})
export class UrlActionComponent implements OnInit {
  params: any;
  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog, private urlService: UrlService) { }

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit(): void {
    this.urlService.updated$.subscribe(res => {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    });
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ShortUrlFormComponent, {
      width: '700px',
      height: '500px',
      data: { title: 'Edit', fieldData: this.params.data }
    });
  }

  delete(): void {
    const res = confirm('Are you sure, do you want to delete it?');
    if (res === true) {
      this.urlService.delete(this.params.data.shortUrl);
    }
  }

  openAddUrlForm(): void {
    this.dialogRef = this.dialog.open(AddUrlFormComponent, {
      width: '300px',
      height: '300px',
      data: { fieldData: this.params.data }
    });
  }

}
