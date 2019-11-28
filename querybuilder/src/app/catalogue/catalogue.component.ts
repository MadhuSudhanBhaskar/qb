import {FlatTreeControl} from '@angular/cdk/tree';
import {Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicFlatNode, DynamicDatabase } from '../service/catalogue/catalogue.data';
import { DynamicDataSource } from '../service/catalogue/catalogue.dynamicdatasource';
import { QuerybuilderService } from '../service/querybuilder/querybuilder.service';
import { CatalogueService } from '../service/catalogue/catalogue.service';

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'app-catalogue',
  templateUrl: 'catalogue.component.html',
  providers: [DynamicDatabase],
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  public databases: DynamicDatabase;
  constructor(database: DynamicDatabase,
              private route: ActivatedRoute,
              private queryBuilder: QuerybuilderService,
              private catalogueService: CatalogueService) {
    this.databases = database;
    this.dataReader(this.route.snapshot.data.catalogue.result);
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  public qbGetTableMetaData = (tableName: string) => {
    console.log(tableName);
    /*const tableNames = tableName['Table'].split('.')[2].toString();
    console.log(tableNames);
    const tableDatas: any = {'Table': tableNames};*/
    this.queryBuilder.selectedTables(tableName);
    this.queryBuilder.tableData.subscribe( data => {
      console.log(data);
    });
  }

  public refreshCatalog() {
    this.catalogueService.resolve().subscribe ( data => {
      console.log(data);
      this.dataReader(data.result);
    });
  }

  private dataReader(data) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.databases);
    console.log(data.result);
    this.databases.rootLevelNodes = data;
    this.dataSource.controllerName = 'CatalogueComponent';
    this.dataSource.data =  this.databases.initialData();
    console.log( this.databases.initialData());
  }
}
