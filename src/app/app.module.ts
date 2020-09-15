import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { CreateShortUrlComponent } from './component/create-short-url/create-short-url.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { UrlService } from './service/url.service';
import { UrlsComponent } from './component/urls/urls.component';
import { AgGridModule } from 'ag-grid-angular';
import { ImageFormatterComponent } from './component/image-formatter/image-formatter.component';
import { UrlActionComponent } from './component/url-action/url-action.component';
import { ShortUrlFormComponent } from './component/short-url-form/short-url-form.component';
import { ShortUrlDisplayComponent } from './component/short-url-display/short-url-display.component';
import { TokenInterceptor } from './service/token.interceptor';
import { JwtTokenService } from './service/jwt-token.service';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './component/login/login.component';
import { RedirectComponent } from './component/redirect/redirect.component';
import { LocalStorageService } from './service/local-storage.service';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CreateShortUrlComponent,
    UrlsComponent,
    ImageFormatterComponent,
    UrlActionComponent,
    ShortUrlFormComponent,
    ShortUrlDisplayComponent,
    LoginComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([ImageFormatterComponent, UrlActionComponent]),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    ClipboardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    UrlService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    JwtTokenService,
    AuthService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
