import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isMobile = true;
  chartData = [40, 30, 20, 10];
  chartLabels = ['Apples', 'Oranges', 'Bananas', 'Grapes'];
  chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#00A300'];
  constructor() {}

  ngOnInit() {
    this.checkIfMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
  }
  isOpen = false;

toggleSidebar() {
  this.isOpen = !this.isOpen;
}

openSidebar() {
  this.isOpen = true;
}

closeSidebar() {
  this.isOpen = false;
}
}
