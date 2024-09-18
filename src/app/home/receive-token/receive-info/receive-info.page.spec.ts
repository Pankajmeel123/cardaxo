import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiveInfoPage } from './receive-info.page';

describe('ReceiveInfoPage', () => {
  let component: ReceiveInfoPage;
  let fixture: ComponentFixture<ReceiveInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReceiveInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
