import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catalogue } from '../interface/dashboard.interface';
import { QueryLogin, AuthData, LoginData } from '../interface/login.interface';
import { LoginService } from '../service/login/login.service';
import { CatalogueService } from '../service/catalogue/catalogue.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public catalogue: Catalogue;
  public userData: LoginData;
  public tableName: string;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private catalogueService: CatalogueService) { }

  ngOnInit() {
    this.catalogue = this.route.snapshot.data.catalogue;
    console.log(this.catalogue.result[0].Catalog);
    this.userData = this.loginService.getUserDetail();
    console.log(this.userData);
    this.tableName = 'mysql';
    this.catalogueService.tableName.subscribe (name => {
      this.tableName = name;
    });
  }

}
