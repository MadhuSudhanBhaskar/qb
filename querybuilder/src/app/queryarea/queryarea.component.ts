import { Component, OnInit } from '@angular/core';
import { QuerybuilderService } from '../service/querybuilder/querybuilder.service';
import { Table } from '../interface/dashboard.interface';
import { zip, combineLatest, merge } from 'rxjs';

@Component({
  selector: 'app-queryarea',
  templateUrl: './queryarea.component.html',
  styleUrls: ['./queryarea.component.scss']
})
export class QueryareaComponent implements OnInit {

  public tableLength: number;
  public query: string[] = [];
  public whereClause: string[] = [];
  
  constructor(private querybuilderService: QuerybuilderService) { }

  async ngOnInit() {
    this.querybuilderService.tableObject.subscribe( data => {
      console.log('from QueryareaComponent');
      console.log(data);
      this.tableLength = data.table ? data.table.length : 0;
      //this.constructQuery(data);
    });
    zip(this.querybuilderService.tableObject, this.querybuilderService.whereClause)
    .subscribe(data => console.log('merge', data));

    combineLatest(this.querybuilderService.tableObject, this.querybuilderService.whereClause)
    .subscribe(x => {
      console.log(x);
      this.constructQuery(x[0], x[1]);
    }
    );
  }

  private constructQuery(tableData, whereClause?, values?) {
    console.log('private function');
    console.log(this.tableLength);
    console.log(tableData.table);
    if (this.query.length !== 0) {
        this.query = [];
    }

    if (this.whereClause.length !== 0) {
      this.whereClause = [];
    }

    if (this.tableLength > 0 ) {
      if (values === undefined) {
        this.query.push('select * from ');
        // tslint:disable-next-line: forin
        for (let property1 in tableData.table) {
          this.query.push( tableData.table[property1].Table);
        }
      }

      if (whereClause !== undefined && whereClause.length !== 0) {
        this.whereClause.push(' where');
        // tslint:disable-next-line: forin
        for (let property1 in whereClause.where) {
          const whereData = whereClause.where[property1].conditionData + ' ' +
                            whereClause.where[property1].name + ' ' +
                            whereClause.where[property1].operator + ' ' +
                            whereClause.where[property1].condition;
          this.whereClause.push(' ' + whereData);
        }
      }
    }
    console.log(this.whereClause);
  }

  public callQuery() {
    console.log(this.query.length);
    if (this.query.length === 0) {
      return;
    }
    const query = this.query.toString().replace (/,/, '');
    const where = this.whereClause.toString() ? this.whereClause.toString().replace (/,/g, '') : '';
    // this.query.toString() + ' ' + this.whereClause.toString()
    this.querybuilderService.executeQuery(query + '' + where).subscribe(
      data => {
        console.log(data);
        setTimeout( () => {
          this.querybuilderService.setQueryId(data['queryID']);
        }, 1000);
      },
      err => {
        console.log('inerror');
      },
    );
  }
}
