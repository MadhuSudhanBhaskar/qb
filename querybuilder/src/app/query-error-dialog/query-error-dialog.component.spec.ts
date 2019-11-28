import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryErrorDialogComponent } from './query-error-dialog.component';

describe('QueryErrorDialogComponent', () => {
  let component: QueryErrorDialogComponent;
  let fixture: ComponentFixture<QueryErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
