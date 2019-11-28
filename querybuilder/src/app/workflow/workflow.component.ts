import { Component, OnInit, ViewChild, ElementRef, Renderer2,
  ViewContainerRef, TemplateRef, ComponentFactory,
  ComponentFactoryResolver, ApplicationRef, ComponentRef} from '@angular/core';
import { QuerybuilderService } from '../service/querybuilder/querybuilder.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Table } from '../interface/dashboard.interface';
import { TablemetadataService } from '../service/metadata/tablemetadata.service';
import { DynamictableComponent } from '../dynamictable/dynamictable.component';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  public name: string;
  title = 'app';
  someProp = '';
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  @ViewChild('newTab') newTab: TemplateRef<any>;
  @ViewChild('div') div: ElementRef;
  public tableNames = new BehaviorSubject<string>('');
  public tableData: Promise<any>;

  constructor(private queryBuilder: QuerybuilderService,
              private tablemetadataService: TablemetadataService,
              private resolver: ComponentFactoryResolver,
              private ap: ApplicationRef) { }

  ngOnInit() {
    this.tableNames = this.queryBuilder.tableData;
    console.log(this.tableNames.getValue());
    this.queryBuilder.tableData.subscribe ( data => {
      // tslint:disable-next-line: no-string-literal
      console.log(data['Table']);
      if (data['Table'] !== undefined) {
        // Here calling service to fetch table meta data
        // tslint:disable-next-line: no-string-literal
        this.tablemetadataService.getTableMetaData(data['Table']).then( tableMetaData => {
          console.log(tableMetaData);
          //this.tableData = tableMetaData.result;
          if (tableMetaData.totalRecords !== 0) {
            this.constructDomElement(tableMetaData.result, data['Table']);
          } else {
            this.queryBuilder.removeTable(data['Table'].toString());
          }
        })
        .catch( error => {
          console.log(error);
        });
      }
    });
  }

  public constructDomElement = (tableMeta, tableName): void => {
    console.log('tableName ', tableName);
    let factory: ComponentFactory<DynamictableComponent> = this.resolver.resolveComponentFactory(DynamictableComponent);
    //this.name = tableMeta[0].Column;
    let tab: ComponentRef<DynamictableComponent> = this.vc.createComponent(factory);
    tab.instance.title = 'New tab';
    tab.instance.template = this.newTab;
    tab.instance.someProp = tableMeta;
    tab.instance.tableName = tableName;
    this.vc.createEmbeddedView(this.newTab, 0);
    console.log('addTab() triggered');
  }
}
