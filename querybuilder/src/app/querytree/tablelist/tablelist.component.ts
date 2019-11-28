import { Component, OnInit } from '@angular/core';
import { QuerybuilderService } from 'src/app/service/querybuilder/querybuilder.service';
import { DynamicDatabase, DynamicFlatNode } from 'src/app/service/catalogue/catalogue.data';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DynamicDataSource } from 'src/app/service/catalogue/catalogue.dynamicdatasource';


@Component({
  selector: 'app-tablelist',
  templateUrl: './tablelist.component.html',
  providers: [DynamicDatabase],
  styleUrls: ['./tablelist.component.scss']
})
export class TablelistComponent implements OnInit {

  public tableListQuery: boolean;
  ngOnInit() {
    this.queryBuilder.tableObject.subscribe (data => {
      this.tableListQuery = data.length === 0 || data.table.length === 0 ? false : true;
    });
  }

  constructor(database: DynamicDatabase,
              private route: ActivatedRoute,
              private queryBuilder: QuerybuilderService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    console.log(this.route.snapshot.data.catalogue);
    database.rootLevelNodes = ['Tables'];
    this.dataSource.controllerName = 'tableListComponent';
    this.dataSource.data = database.initialData();
    console.log(database.initialData());
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  public delete(item: string) {
    this.queryBuilder.delete();
  }

}
