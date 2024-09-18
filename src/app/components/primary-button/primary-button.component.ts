import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
  @Input() label: string = '';
  @Output() click = new EventEmitter<void>();
  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit() { }

  onClick(event: Event) {
    event.stopPropagation()
    this.click.emit();
  }

}
