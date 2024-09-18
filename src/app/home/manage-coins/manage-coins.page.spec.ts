import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCoinsPage } from './manage-coins.page';

describe('ManageCoinsPage', () => {
  let component: ManageCoinsPage;
  let fixture: ComponentFixture<ManageCoinsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageCoinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
