import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchesDialogComponent } from './purches-dialog.component';

describe('PurchesDialogComponent', () => {
  let component: PurchesDialogComponent;
  let fixture: ComponentFixture<PurchesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchesDialogComponent]
    });
    fixture = TestBed.createComponent(PurchesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
