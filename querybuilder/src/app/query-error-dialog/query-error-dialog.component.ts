import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-query-error-dialog',
  templateUrl: './query-error-dialog.component.html',
  styleUrls: ['./query-error-dialog.component.scss']
})
export class QueryErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
