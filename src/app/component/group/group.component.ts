import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    { headerName: 'Group name', field: 'groupName', maxWidth: 150,
            cellClass: 'custom-wrap', autoHeight: true },
    { headerName: 'Group type', field: 'groupType', maxWidth: 300,
            cellClass: 'custom-wrap', autoHeight: true  },
    { headerName: 'Tribe name', field: 'tribe.groupName', maxWidth: 200,
            cellClass: 'custom-wrap', autoHeight: true },
    { headerName: 'Admin name', field: 'admin.name', maxWidth: 200,
            cellClass: 'custom-wrap', autoHeight: true }
  ];

  rowData = [];

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.groups$.subscribe(res => this.rowData = res);
    this.groupService.getGroups();
  }

  quickSearch(event): void{
    this.agGrid.api.setQuickFilter(event.target.value);
  }

}
