import { Component, OnInit, NgZone, ViewChild, Inject, Injector } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { UrlService } from '../../service/url.service';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-short-url-form',
  templateUrl: './short-url-form.component.html',
  styleUrls: ['./short-url-form.component.scss']
})
export class ShortUrlFormComponent implements OnInit {

  longUrl = new FormControl('');
  expirationDateTime = new FormControl('');
  shortTitle = new FormControl('');
  description = new FormControl('');
  errorMessage: string;
  favicon: File;
  faviconUrl: any;
  shortUrl = new FormControl('');

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private ngZone: NgZone, private urlService: UrlService,
              private sanitizer: DomSanitizer,
              private injector: Injector,
              private dialogRef: MatDialogRef<ShortUrlFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    if (!!this.data){
      if (!!this.data.fieldData.longUrl){
        this.longUrl.setValue(this.data.fieldData.longUrl);
      }
      if (!!this.data.fieldData.expirationDateTime){
        this.expirationDateTime.setValue(this.data.fieldData.expirationDateTime);
      }
      if (!!this.data.fieldData.shortTitle){
        this.shortTitle.setValue(this.data.fieldData.shortTitle);
      }
      if (!!this.data.fieldData.description){
        this.description.setValue(this.data.fieldData.description);
      }
      if (!!this.data.fieldData.faviconData){
        this.faviconUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.data.fieldData.fileType};base64, ${this.data.fieldData.faviconData}`);
      }
      if (!!this.data.fieldData.shortUrl){
        this.shortUrl.setValue(this.data.fieldData.shortUrl);
      }

    }
    this.urlService.error$.subscribe(error => {
      if (!!error) {
        this.errorMessage = error.errorMessage;
        this.longUrl.setErrors({ incorrect: true });
      }
    });
  }

  getShortUrl(): void {
    this.urlService.getShortUrl({
      url: this.longUrl.value,
      expirationDateTime: this.expirationDateTime.value,
      shortTitle: this.shortTitle.value,
      description: this.description.value,
      favicon: this.favicon
    });
  }


  onSelectFile(event): void { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      this.favicon = event.target.files[0];
      reader.readAsDataURL(this.favicon); // read file as data url

      reader.onload = (innerEvent) => { // called once readAsDataURL is completed
        this.faviconUrl = innerEvent.target.result;
      };
    }
  }

  update(): void {
    this.urlService.update({
      url: null,
      expirationDateTime: this.expirationDateTime.value,
      shortTitle: this.shortTitle.value,
      description: this.description.value,
      favicon: this.favicon,
      shortUrl: this.shortUrl.value
    });
  }

  cancel(): void{
    this.dialogRef.close();
  }

  reset(): void{
    this.longUrl.setValue('');
    this.expirationDateTime.setValue('');
    this.shortTitle.setValue('');
    this.description.setValue('');
    this.shortUrl.setValue('');
    this.urlService.setShortUrl();
  }
}

