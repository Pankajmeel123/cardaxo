import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletListPage } from './wallet-list.page';

describe('WalletListPage', () => {
  let component: WalletListPage;
  let fixture: ComponentFixture<WalletListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalletListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
