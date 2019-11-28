import { Observable } from 'rxjs';
import { CatalogueService } from './catalogue.service';
import { Injectable } from '@angular/core';
import { QuerybuilderService } from '../querybuilder/querybuilder.service';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(public item: any, public level = 1, public expandable = false,
                public isLoading = false) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable()
    export class DynamicDatabase {
    constructor(private catalogueService: CatalogueService,
                private queryBuilder: QuerybuilderService) {
    }
    public rootLevelNodes: any;
    
    /** Initial data from database */
    initialData(): DynamicFlatNode[] {
      console.log(this.rootLevelNodes);
      return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
    }

    getChildren = (node: DynamicFlatNode, controllerName: string): Observable<any> => {
      console.log(node);
      if (controllerName === 'tableListComponent') {
        return this.queryTreeTableListComponent();
      } else if (controllerName === 'WherelistComponent') {
        console.log('inwherelist');
        return this.queryWhereListComponent();
      } else {
        if (node.level === 0) {
          return this.catalogueService.getSchemaData(node.item.Catalog);
        } else if (node.level === 1) {
          return this.catalogueService.getTableData(node.item.Schema);
        } else {
          return this.catalogueService.getSchemaData(node.item);
        }
      }
    }

    isExpandable(node: DynamicFlatNode, controllerName: string): boolean {
      if (controllerName === 'tableListComponent' || controllerName === 'WherelistComponent') {
        return false;
      } else {
        console.log(node.level);
        if (node.level === 1) {
          return false;
        }
        return true;
      }
    }

    private queryWhereListComponent = (): Observable<any> => {
      console.log('where88888');
      console.log(this.queryBuilder.whereClause);
      return this.queryBuilder.whereClause;
    }

    private queryTreeTableListComponent = (): Observable<any> => {
      console.log(this.queryBuilder.tableObject);
      return this.queryBuilder.tableObject;
    }
}
