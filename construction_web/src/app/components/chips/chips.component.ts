import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() chips: { id: number; name: string }[] = []; // List of selected chips
  @Input() placeholder: string = 'Select'; // Placeholder for the button/input
  @Input() options: { id: number; name: string }[] = []; // Dropdown options to choose from
  @Output() chipsChange = new EventEmitter<{ id: number; name: string }[]>(); // Emit updated chips list

  addChip(option: { id: number; name: string }): void {
    // Add the selected chip only if it doesn't already exist
    if (!this.chips.some((chip) => chip.id === option.id)) {
      this.chips.push(option);
      this.chipsChange.emit(this.chips);
    }
  }

  removeChip(index: number): void {
    // Remove the chip by index
    this.chips.splice(index, 1);
    this.chipsChange.emit(this.chips);
  }
}
