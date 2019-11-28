import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryresultComponent } from './queryresult.component';

describe('QueryresultComponent', () => {
  let component: QueryresultComponent;
  let fixture: ComponentFixture<QueryresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
