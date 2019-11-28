import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerytreeComponent } from './querytree.component';

describe('QuerytreeComponent', () => {
  let component: QuerytreeComponent;
  let fixture: ComponentFixture<QuerytreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerytreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerytreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
