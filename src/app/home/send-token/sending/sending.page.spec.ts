import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendingPage } from './sending.page';

describe('SendingPage', () => {
  let component: SendingPage;
  let fixture: ComponentFixture<SendingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
