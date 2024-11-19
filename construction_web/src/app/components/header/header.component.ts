import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
    @Input() showImage: boolean = true;
    @Input() imageUrl: string = 'assets/logo.png';
    @Input() showSearch: boolean = true;
    @Input() showNotifications: boolean = true;
    @Input() notificationCount: number = 0;
  
    @Output() search = new EventEmitter<string>();
    @Output() notificationClick = new EventEmitter<void>();
  
    searchQuery: string = '';
  
    onSearch(): void {
      this.search.emit(this.searchQuery);
    }
  
    onNotificationClick(): void {
      this.notificationClick.emit();
    }
}
