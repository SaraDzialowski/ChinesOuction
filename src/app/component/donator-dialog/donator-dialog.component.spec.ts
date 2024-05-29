import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorDialogComponent } from './donator-dialog.component';

describe('DonatorDialogComponent', () => {
  let component: DonatorDialogComponent;
  let fixture: ComponentFixture<DonatorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonatorDialogComponent]
    });
    fixture = TestBed.createComponent(DonatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
