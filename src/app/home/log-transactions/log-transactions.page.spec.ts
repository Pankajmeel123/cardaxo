import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogTransactionsPage } from './log-transactions.page';

describe('LogTransactionsPage', () => {
  let component: LogTransactionsPage;
  let fixture: ComponentFixture<LogTransactionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
