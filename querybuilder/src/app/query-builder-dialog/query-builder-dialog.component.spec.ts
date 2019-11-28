import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderDialogComponent } from './query-builder-dialog.component';

describe('QueryBuilderDialogComponent', () => {
  let component: QueryBuilderDialogComponent;
  let fixture: ComponentFixture<QueryBuilderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryBuilderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
