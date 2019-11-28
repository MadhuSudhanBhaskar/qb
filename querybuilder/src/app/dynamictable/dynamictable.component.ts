import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { QueryBuilderDialogComponent } from '../query-builder-dialog/query-builder-dialog.component';
import { QuerybuilderService } from '../service/querybuilder/querybuilder.service';

@Component({
  selector: 'app-dynamictable',
  templateUrl: './dynamictable.component.html',
  styleUrls: ['./dynamictable.component.scss']
})
export class DynamictableComponent implements OnInit {

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  
  @Input()
  title: string;

  @Input()
  template;

  @Input()
  someProp;
  @Input()
  tableName;

  public name: string;
  contextMenuPosition = { x: '0px', y: '0px' };
  public operator: string;
  public condition: string;
  public whereCount: number;
  public conditionData: string = '';

  constructor(private resolver: ComponentFactoryResolver,
              private dialog: MatDialog,
              private queryBuilderService: QuerybuilderService) {
  }

  ngOnInit() {
    this.queryBuilderService.whereClause.subscribe ( data => {
      this.whereCount = data.where ? data.where.length : 0;
      console.log(this.whereCount, 'this.whereCount');
    });
  }

  onContextMenu(event: MouseEvent, item: any, tableName: string) {
    console.log(item);
    this.name = tableName + '.' + item;
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.openMenu();
  }

  public onContextMenuAction(): void {
    const dialogRef = this.dialog.open(QueryBuilderDialogComponent, {
      width: '450px',
      data: {name: this.name, operator: this.operator,
              condition: this.condition, whereCount: this.whereCount,
              conditionData: this.conditionData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        this.queryBuilderService.setWhereClause(result);
      }
    });
  }
}
