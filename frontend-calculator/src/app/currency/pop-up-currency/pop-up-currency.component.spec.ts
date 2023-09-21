import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCurrencyComponent } from './pop-up-currency.component';

describe('PopUpCurrencyComponent', () => {
  let component: PopUpCurrencyComponent;
  let fixture: ComponentFixture<PopUpCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpCurrencyComponent]
    });
    fixture = TestBed.createComponent(PopUpCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
