import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WherelistComponent } from './wherelist.component';

describe('WherelistComponent', () => {
  let component: WherelistComponent;
  let fixture: ComponentFixture<WherelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WherelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WherelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
