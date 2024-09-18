import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendTokenPage } from './send-token.page';

describe('SendTokenPage', () => {
  let component: SendTokenPage;
  let fixture: ComponentFixture<SendTokenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SendTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
