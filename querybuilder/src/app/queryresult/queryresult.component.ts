import { Component, OnInit } from '@angular/core';
import { QuerybuilderService } from '../service/querybuilder/querybuilder.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { QueryErrorDialogComponent } from '../query-error-dialog/query-error-dialog.component';
import { first } from 'rxjs/internal/operators/first';
import { last } from 'rxjs/internal/operators/last';

@Component({
  selector: 'app-queryresult',
  templateUrl: './queryresult.component.html',
  styleUrls: ['./queryresult.component.scss']
})
export class QueryresultComponent implements OnInit {

  public dataSource;
  public columns;
  public length;
  public queryId: string;
  public showPagination: boolean;
  public error: string;

  constructor(private querybuilderService: QuerybuilderService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.querybuilderService.queryId.subscribe (data => {
      if (data) {
        this.queryId = data;
        this.requestData(data, '1');
      }
    });
  }

  public loadData = (event): void => {
    this.requestData(this.queryId, event.pageIndex + 1);
  }

  private requestData = (queryId: string, pageNumber: string): void => {
    this.querybuilderService.getData(queryId, pageNumber);
    this.querybuilderService.tableResultSet.subscribe (data => {
      if (data.length !== 0) {
        const rows = data;
        this.columns = (Object.keys(rows[0]));
        this.dataSource = new MatTableDataSource<object>(rows);
      }
    });


    this.querybuilderService.queryError
    .pipe(first())
    .subscribe (data => {
      console.log('in error');
      console.log(data);
      if (data.length !== 0) {
        console.log(data.failureInfo.message);
        const dialogRef = this.dialog.open(QueryErrorDialogComponent, {
          width: '450px',
          data: {error: data.failureInfo.message}
        });
      }
    });

    this.querybuilderService.tableRecords.subscribe ( dataValue => {
      if (dataValue > 10) {
        this.showPagination = true;
        this.length = this.querybuilderService.tableRecords.value;
      }
    });
  }
}
