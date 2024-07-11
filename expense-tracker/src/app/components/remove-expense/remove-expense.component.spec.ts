import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveExpenseComponent } from './remove-expense.component';

describe('RemoveExpenseComponent', () => {
  let component: RemoveExpenseComponent;
  let fixture: ComponentFixture<RemoveExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveExpenseComponent]
    });
    fixture = TestBed.createComponent(RemoveExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
