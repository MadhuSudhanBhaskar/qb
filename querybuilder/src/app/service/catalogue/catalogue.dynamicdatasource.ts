import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { DynamicFlatNode, DynamicDatabase } from './catalogue.data';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  public controllerName: string;
  
  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    console.log(change);
    console.log(change.source.selected);
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }


  /**
   * Toggles node
   * @param node 
   * @param expand 
   * @returns  
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {

    let level0 = '', level1 = '';
    const currentLevel = this._treeControl.getLevel(node);
    
    const startIndex = this._treeControl.dataNodes.indexOf(node);

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this._treeControl.dataNodes[i];
      if (currentNode.level === 0 && level0 === '') {
        level0 = currentNode.item.Catalog;
      }
      if (currentNode.level === 1 && level1 === '') {
        level1 = currentNode.item.Schema;
      }
      console.log(currentNode.item);
    }
    console.log(level0 , ' --- ', level1);

    node.isLoading = true;
    let children;
    this._database.getChildren(node, this.controllerName).subscribe ( data => {
      console.log(this.controllerName);
      if (this.controllerName === 'tableListComponent' || this.controllerName === 'WherelistComponent') {
        if (this.controllerName === 'tableListComponent') {
          children = data.table;
        } else {
          children = data.where;
        }
        const indexs = this.data.indexOf(node);
        setTimeout(() => {
          if (expand) {
            const nodes = children.map(name => {
              console.log(name);
             return new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(node, this.controllerName));
            });
            this.data.splice(0+1, this.data.length);
            this.dataChange.next(this.data);
            this.data.splice(indexs + 1, 0, ...nodes);
          } else {
            let count = 0;
            for (let i = indexs + 1; i < this.data.length
              && this.data[i].level > node.level; i++, count++) {}
            this.data.splice(indexs + 1, count);
          }
    
          // notify the change
          this.dataChange.next(this.data);
          node.isLoading = false;
        }, 1000);
      } else {
        if (node.level === 0) {
          console.log(data.result);
          this.test(expand,data.result,node,this.data.indexOf(node),);
          children = data.result;
        } else if (node.level === 1) {
          console.log(data.result);
          children = data.result;
          this.test(expand,children,node,this.data.indexOf(node),level0, level1);
        } else {
          console.log(data.result);
          children = data.result;
          this.test(expand,children,node,this.data.indexOf(node));
        }
      }
    });

    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;
  }

  private test = (expand: boolean, children,node,index, level0?, level1?) => {
    setTimeout(() => {
      console.log('insettimeout');
      console.log(children);
      if (expand) {
        if(level0 && level1) {
          for (let i = 0; i < children.length; i++) {
            children[i].Table = level0 +'.'+ level1 +'.'+ children[i].Table;
          }
      }
      console.log(children);
        const nodes = children.map(name => 
          new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(node, this.controllerName)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}
