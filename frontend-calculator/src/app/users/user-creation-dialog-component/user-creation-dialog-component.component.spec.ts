import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationDialogComponentComponent } from './user-creation-dialog-component.component';

describe('UserCreationDialogComponentComponent', () => {
  let component: UserCreationDialogComponentComponent;
  let fixture: ComponentFixture<UserCreationDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreationDialogComponentComponent]
    });
    fixture = TestBed.createComponent(UserCreationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
