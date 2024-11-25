import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() showImage: boolean = true;
  @Input() imageUrl: string = '';
  @Input() showSearch: boolean = true;
  @Input() showNotifications: boolean = true;
  @Input() notificationCount: number = 0;

  @Output() search = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();

  searchQuery: string = '';
  isProfileRoute: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.isProfileRoute = currentUrl === '/dashboard/profile';
    });
  }

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }
}
