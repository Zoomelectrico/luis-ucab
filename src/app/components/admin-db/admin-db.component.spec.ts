import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDBComponent } from './admin-db.component';

describe('AdminDBComponent', () => {
  let component: AdminDBComponent;
  let fixture: ComponentFixture<AdminDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
