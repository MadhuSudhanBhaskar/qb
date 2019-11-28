import { Injectable } from '@angular/core';
import {CatalogueService} from '../catalogue/catalogue.service';
import * as api from '../../api/api.constant.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablemetadataService {

  public metaDataUrl: string = api.path + api.tableList;
  constructor(private http: HttpClient,
              private catalogueService: CatalogueService) { }

  public getTableMetaData = (tableName: string): Promise<any> => {
    console.log('this.tablemetadataService.getTableMetaData();');
    console.log(tableName);
    const tableNames = tableName.split('.')[2].toString();
    const data = {catalog: this.catalogueService.catalogName,
                  schema: this.catalogueService.schemaName,
                  table: tableNames};
    console.log(data);
    return this.http
      .get<any>(this.metaDataUrl, {params: data}).toPromise();
  }
}
