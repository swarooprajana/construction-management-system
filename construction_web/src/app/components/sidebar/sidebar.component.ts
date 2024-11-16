import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { Subject, takeUntil } from 'rxjs';
// import { IvinService } from 'src/app/ivin.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  // { path: '/reports', title: 'Reports',  icon:'reports', class: '' },
  // { path: '/partners', title: 'Partners',  icon:'Partners', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  @ViewChild('usersdialogbox', { static: true }) usersdialogbox!: TemplateRef<any>;

  // Component properties
  collapsed = false;
  sidenavVisible = false;
  screenWidth = 0;
  navData = navbarData;
  multiple = false;
  usertype: string = '';
  firstname: string = '';
  mobile = false;
  destroyed = new Subject<void>();
  currentScreenSizes: string = '';
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  description: string = '';
  typenumber: number = 0;
  typnumber: number = 0;
  loginid: string = '';
  portfolioids: any[] = [];
  shortnames: string[] = [];
  clickedid: string = '';
  visibleCount = 2;
  showPopup = false;
  remainingChildren: any[] = [];
  dialogRef: any;

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initializeBreakpointObserver();
  }

  private initializeBreakpointObserver(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSizes = this.displayNameMap.get(query) ?? 'Unknown';
            this.checkMobileView();
          }
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    this.checkMobileView();
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.checkMobileView();
  }

  checkMobileView(): void {
    this.mobile = this.screenWidth <= 768;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  toggleCollapse(expanded: boolean): void {
    this.collapsed = expanded;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  toggleSidenav(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }
}