import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryareaComponent } from './queryarea.component';

describe('QueryareaComponent', () => {
  let component: QueryareaComponent;
  let fixture: ComponentFixture<QueryareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
