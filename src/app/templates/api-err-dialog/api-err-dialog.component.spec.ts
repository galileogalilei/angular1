import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrDialogComponent } from './api-err-dialog.component';

describe('ApiErrDialogComponent', () => {
  let component: ApiErrDialogComponent;
  let fixture: ComponentFixture<ApiErrDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiErrDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiErrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
