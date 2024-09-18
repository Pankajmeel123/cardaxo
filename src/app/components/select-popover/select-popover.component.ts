import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-popover',
  templateUrl: './select-popover.component.html',
  styleUrls: ['./select-popover.component.scss'],
})
export class SelectPopoverComponent implements OnInit {

  @Input() title: string = ""
  @Input() items: any;

  public searchTerm = '';

  constructor(
    private popoverController: PopoverController) { }

  ngOnInit() {
  }

  selectItem(codeCountry: String, countryName: String) {
    this.popoverController.dismiss({
      'codeCountry': codeCountry,
      'countryName': countryName
    });
  }

  filterItems() {
    if (!this.searchTerm) {
      return this.items;
    }
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    return this.items.filter((item: any) =>
      item.name.toLowerCase().includes(searchTermLowerCase) ||
      item.code.toLowerCase().includes(searchTermLowerCase)
    );
  }

}
