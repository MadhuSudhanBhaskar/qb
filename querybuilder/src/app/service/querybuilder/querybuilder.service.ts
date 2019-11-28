import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, forkJoin, observable, Subject } from 'rxjs';
import { Table } from '../../interface/dashboard.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as api from '../../api/api.constant.json';
import { flatMap, map, switchMap, last } from 'rxjs/operators';
import { TemplateParseResult } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class QuerybuilderService {

  public tableData = new BehaviorSubject<string>('');

  public tableObject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public queryId = new BehaviorSubject<string>('');
  public queryError: Subject<any> = new Subject<any>();

  public updatedValuess;
  public returnResult;
  public tableResultSet: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public tableRecords: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  public whereClause: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public whereValues;

  constructor(private http: HttpClient) { }

  public selectedTables = (tableName: string): void =>  {
    let repetedStatus: boolean = this.searchObject(this.tableObject , tableName);
    console.log('stauts ', repetedStatus);
    if (!repetedStatus) {
      if (this.tableObject.getValue().length === 0) {
        this.updatedValuess = {'table': [tableName]};
      } else {
        this.updatedValuess.table.push(tableName);
      }
      console.log('daada___**');
      console.log(this.updatedValuess);
      const updatedValue = tableName;
      this.tableData.next(updatedValue);
      this.tableObject.next(this.updatedValuess);
      console.log(this.tableData.getValue());
      console.log(this.tableObject.getValue());
    }
  }

  private searchObject = (tableData, tableName): boolean => {
    let found = false;
    if (tableData.getValue().length === 0) {
      found = false;
      return found;
    }
    const tableObject = tableData.getValue().table;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < tableObject.length; i++) {
      if (tableObject[i].Table.toString() === tableName.Table) {
        found = true;
        break;
      }
    }
    return found;
  }

  public delete = () => {
    console.log('delete');
    let update$: BehaviorSubject<any> = this.tableObject;
    console.log(update$.getValue().table.pop());
    console.log(update$.getValue());
    console.log(this.tableObject.getValue());
    this.tableObject.next(this.tableObject.getValue());
  }

  //tableObject
  public removeTable = (tableName: string): void => {
    setTimeout((tableNames) => {
      const index = this.tableObject.getValue().table.findIndex(x => x.Table === tableNames);
      this.tableObject.getValue().table.splice(index, 1);
      this.tableObject.next(this.tableObject.getValue());
    }, 300, tableName);

  }

  public executeQuery = (queryName: string): Observable<object> => {
    const schemaUrl: string = api.path + api.executeQuery;
    return this.http
    .post(schemaUrl, { query: queryName });
  }

  public setQueryId = (queryId: string): void => {
    console.log('setting query id ', queryId);
    this.queryId.next(queryId);
  }

  public getData = (queryId: string, pageNumber: string): void => {
    console.log('queryId ', queryId);
    const queryResultUrl: string = api.path + api.queryResult;
    const queryResultStatus: string = api.path + api.querystatus;
    const data = {queryid: queryId, pagenumber: pageNumber};
    const queryData = {queryid: queryId};

    const result = interval(3000)
    .pipe(
      flatMap(() => this.http.get(queryResultStatus, { params: queryData }))
      )
      .subscribe( datas => {
         // tslint:disable-next-line: no-string-literal
         if (datas['state'] === 'FINISHED') {
          result.unsubscribe();
          this.returnResult = true;
          const queryData$ = this.http
          .get(queryResultUrl, {params: data}).toPromise();
          queryData$.then (tableResult => {
            console.log(tableResult['totalRecords']);
            this.tableResultSet.next(tableResult['result']);
            this.tableRecords.next(tableResult['totalRecords']);
          });
         }
         if (datas['state'] === 'FAILED') {
            this.queryError.next(datas);
            result.unsubscribe();
         }
      });
  }

  public setWhereClause = (whereClauseData: any): void => {
    if (this.whereClause.getValue().length === 0) {
      this.whereValues = {'where': [whereClauseData]};
    } else {
      this.whereValues.where.push(whereClauseData);
    }
    console.log(this.whereValues);
    this.whereClause.next(this.whereValues);
    console.log(this.whereClause.getValue());
  }
}
