import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesCreationDialogComponent } from './currencies-creation-dialog.component';

describe('CurrenciesCreationDialogComponent', () => {
  let component: CurrenciesCreationDialogComponent;
  let fixture: ComponentFixture<CurrenciesCreationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrenciesCreationDialogComponent]
    });
    fixture = TestBed.createComponent(CurrenciesCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
