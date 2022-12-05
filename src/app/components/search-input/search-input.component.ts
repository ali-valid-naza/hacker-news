import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output() newSearchQueryEvent = new EventEmitter<string>();

  addNewSearchQuery(value: string) {
    this.newSearchQueryEvent.emit(value);
  }
}
