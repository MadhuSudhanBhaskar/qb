import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import {MatNativeDateModule} from '@angular/material';
import { ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogueService } from '../app/service/catalogue/catalogue.service';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { QuerytreeComponent } from './querytree/querytree.component';
import { TablelistComponent } from './querytree/tablelist/tablelist.component';
import { DynamictableComponent } from './dynamictable/dynamictable.component';
import { QueryareaComponent } from './queryarea/queryarea.component';
import { QueryresultComponent } from './queryresult/queryresult.component';
import { QueryBuilderDialogComponent } from './query-builder-dialog/query-builder-dialog.component';
import { QueryErrorDialogComponent } from './query-error-dialog/query-error-dialog.component';
import { WherelistComponent } from './querytree/wherelist/wherelist.component';

//https://www.callibrity.com/blog/angular-2-route-resolves
const routes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      catalogue: CatalogueService
    }
  },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    MatNativeDateModule],
  providers: [],
  exports: [RouterModule],
  entryComponents: [DynamictableComponent, QueryBuilderDialogComponent,
                    QueryErrorDialogComponent],
  declarations: [LoginComponent, DashboardComponent, CatalogueComponent,
                WorkflowComponent, QuerytreeComponent, TablelistComponent,
                DynamictableComponent, QueryareaComponent, QueryresultComponent,
                QueryBuilderDialogComponent, QueryErrorDialogComponent, WherelistComponent]
})
export class AppRoutingModule { }
