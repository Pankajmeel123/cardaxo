import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiveTokenPage } from './receive-token.page';

describe('ReceiveTokenPage', () => {
  let component: ReceiveTokenPage;
  let fixture: ComponentFixture<ReceiveTokenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceiveTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
