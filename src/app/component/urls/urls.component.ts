import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlService } from 'src/app/service/url.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ImageFormatterComponent } from '../image-formatter/image-formatter.component';
import { UrlActionComponent } from '../url-action/url-action.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: 'Favicon',
    maxWidth: 100,
    sortable: false,
    autoHeight: true,
    cellRendererFramework: ImageFormatterComponent
  },
    { headerName: 'Short Title', field: 'shortTitle', maxWidth: 150,
            cellStyle: { 'white-space': 'normal'}, autoHeight: true },
    { headerName: 'Description', field: 'description', maxWidth: 300,
            cellStyle: { 'white-space': 'normal'}, autoHeight: true  },
    { headerName: 'Short Url', field: 'shortUrl', maxWidth: 200,
            cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word'}, autoHeight: true },
    { headerName: 'Long Url', field: 'longUrl', maxWidth: 300, cellStyle: { 'white-space': 'normal' }, autoHeight: true},
    { headerName: 'Expiration Date & Time', field: 'expirationDateTime',
            cellStyle: { 'white-space': 'normal'}, autoHeight: true },
    { headerName: 'Action',
    maxWidth: 100,
    sortable: false,
    autoHeight: true,
    cellRendererFramework: UrlActionComponent
  },
  ];

  rowData = [];

  constructor(private urlService: UrlService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser();
    this.urlService.urls$.subscribe(res => {
      this.rowData = res;
      if (this.agGrid){
        this.agGrid.api.sizeColumnsToFit();
      }
    });
    this.urlService.getUrls();
  }

}
