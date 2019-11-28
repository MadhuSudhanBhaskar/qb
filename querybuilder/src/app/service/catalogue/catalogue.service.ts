import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as api from '../../api/api.constant.json';
import { Catalogue, Schema, Table } from '../../interface/dashboard.interface';
import { Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * Injectable
 * @description This service is kind of statemanagement service for query builder.
 * This service hosts subjects which serves data to different component, if subscribed.
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogueService implements Resolve<any> {

  public catalogue$: Observable<Catalogue>;
  public schema$: Observable<Schema>;
  public tables$: Observable<Table>;
  public catalogueUrl: string = api.path + api.catalogue;
  public schemaUrl: string = api.path + api.schemas;
  public tableUrl: string = api.path + api.tables;

  public tableName = new BehaviorSubject<string>('');
  public catalogName: string;
  public schemaName: string;
  constructor(private http: HttpClient ) { }

  /**
   * Resolve  of catalogue service
   * @description This method is used to resolve data before we redirect page to dashboard
   * and return type is observable
   */
  resolve = (): Observable<Catalogue> => {
    this.catalogue$ = this.http
                .get<Catalogue>(this.catalogueUrl);
    return this.catalogue$;
  }

  /**
   * Get schema data of catalogue service
   * @description This method returns the schema data, for the catalogue that we click for
   * and return type is observable
   * @param catalogueName datatype of string
   */
  public getSchemaData = (catalogueName: string): Observable<Schema> => {
    this.catalogName = catalogueName;
    const data = {catalog: catalogueName};
    this.schema$ = this.http
                .get<Schema>(this.schemaUrl, {params: data});
    return this.schema$;
  }

  /**
   * Get table data of catalogue service
   * @description This method return the list of tables that, the schema has
   * and return type is observable
   * @param schemaName datatype of String
   */
  public getTableData = (schemaName: string): Observable<Table> => {
    this.schemaName = schemaName;
    const data = {catalog: this.catalogName, schema: this.schemaName};
    this.tables$ = this.http
                .get<Table>(this.tableUrl, {params: data});
    return this.tables$;
  }
}
