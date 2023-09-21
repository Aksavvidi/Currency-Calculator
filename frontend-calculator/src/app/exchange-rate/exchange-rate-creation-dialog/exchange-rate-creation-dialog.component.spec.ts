import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateCreationDialogComponent } from './exchange-rate-creation-dialog.component';

describe('ExchangeRateCreationDialogComponent', () => {
  let component: ExchangeRateCreationDialogComponent;
  let fixture: ComponentFixture<ExchangeRateCreationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateCreationDialogComponent]
    });
    fixture = TestBed.createComponent(ExchangeRateCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
