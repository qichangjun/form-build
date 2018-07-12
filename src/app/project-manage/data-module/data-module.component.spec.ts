import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModuleComponent } from './data-module.component';

describe('DataModuleComponent', () => {
  let component: DataModuleComponent;
  let fixture: ComponentFixture<DataModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
