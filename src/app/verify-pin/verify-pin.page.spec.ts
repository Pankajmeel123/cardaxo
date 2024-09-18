import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyPinPage } from './verify-pin.page';

describe('VerifyPinPage', () => {
  let component: VerifyPinPage;
  let fixture: ComponentFixture<VerifyPinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
