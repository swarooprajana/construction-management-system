import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progression',
  templateUrl: './circular-progression.component.html',
  styleUrl: './circular-progression.component.scss'
})
export class CircularProgressionComponent {
  @Input() percent: number = 0;
  @Input() size: number = 100; // SVG size
  @Input() strokeWidth: number = 20;
  @Input() progressColor: string = '#16946A'; // Color for the progress
  @Input() remainingColor: string = '#E0E0E0'; // Color for the remaining part
  hovered: boolean = false; 
  radius: any;
  circumference: any;

  ngOnInit() {
    this.radius = (this.size - this.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;
  }
}
