import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandyPage } from './candy.page';

describe('CandyPage', () => {
  let component: CandyPage;
  let fixture: ComponentFixture<CandyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CandyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
