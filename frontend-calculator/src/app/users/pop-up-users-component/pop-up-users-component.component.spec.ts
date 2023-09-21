import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpUSersComponentComponent } from './pop-up-users-component.component';

describe('PopUpUSersComponentComponent', () => {
  let component: PopUpUSersComponentComponent;
  let fixture: ComponentFixture<PopUpUSersComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpUSersComponentComponent]
    });
    fixture = TestBed.createComponent(PopUpUSersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
