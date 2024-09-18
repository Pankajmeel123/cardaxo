import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceivingMessagePage } from './receiving-message.page';

describe('ReceivingMessagePage', () => {
  let component: ReceivingMessagePage;
  let fixture: ComponentFixture<ReceivingMessagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceivingMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
