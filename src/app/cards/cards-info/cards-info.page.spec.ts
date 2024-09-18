import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsInfoPage } from './cards-info.page';

describe('CardsInfoPage', () => {
  let component: CardsInfoPage;
  let fixture: ComponentFixture<CardsInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
