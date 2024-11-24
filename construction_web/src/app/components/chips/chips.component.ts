import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() chips: string[] = []; // List of selected chips
  @Input() placeholder: string = 'Select'; // Placeholder for the button/input
  @Input() options: string[] = []; // Dropdown options to choose from
  @Output() chipsChange = new EventEmitter<string[]>(); // Emit updated chips list

  addChip(option: string): void {
    if (!this.chips.includes(option)) {
      this.chips.push(option);
      this.chipsChange.emit(this.chips);
    }
  }

  removeChip(index: number): void {
    this.chips.splice(index, 1);
    this.chipsChange.emit(this.chips);
  }
}
