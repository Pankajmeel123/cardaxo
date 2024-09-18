import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyIdPage } from './verify-id.page';

describe('VerifyIdPage', () => {
  let component: VerifyIdPage;
  let fixture: ComponentFixture<VerifyIdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
