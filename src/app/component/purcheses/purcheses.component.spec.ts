import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchesesComponent } from './purcheses.component';

describe('PurchesesComponent', () => {
  let component: PurchesesComponent;
  let fixture: ComponentFixture<PurchesesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchesesComponent]
    });
    fixture = TestBed.createComponent(PurchesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
