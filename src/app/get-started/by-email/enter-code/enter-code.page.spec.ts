import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterCodePage } from './enter-code.page';

describe('EnterCodePage', () => {
  let component: EnterCodePage;
  let fixture: ComponentFixture<EnterCodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnterCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
