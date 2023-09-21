import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpUExchangeRateComponent } from './pop-up-uexchange-rate.component';

describe('PopUpUExchangeRateComponent', () => {
  let component: PopUpUExchangeRateComponent;
  let fixture: ComponentFixture<PopUpUExchangeRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpUExchangeRateComponent]
    });
    fixture = TestBed.createComponent(PopUpUExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
