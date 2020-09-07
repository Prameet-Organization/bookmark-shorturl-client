import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { UrlService } from 'src/app/service/url.service';
import { Observable } from 'rxjs';
import { AppError } from 'src/app/model/error';
import { FormControl } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-create-short-url',
  templateUrl: './create-short-url.component.html',
  styleUrls: ['./create-short-url.component.scss']
})
export class CreateShortUrlComponent implements OnInit {

  longUrl = new FormControl('');
  shortUrl$: Observable<string>;
  errorMessage: string;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private ngZone: NgZone,
              private urlService: UrlService) {}

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    this.shortUrl$ = this.urlService.shortUrl$;
    this.urlService.error$.subscribe(error => {
      if (!!error){
        this.errorMessage = error.errorMessage;
        this.longUrl.setErrors( { incorrect: true});
      }
    });
  }

  getShortUrl(): void{
    this.urlService.getShortUrl(this.longUrl.value);
  }
}
