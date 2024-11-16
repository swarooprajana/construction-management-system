import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

    {
      label:"Profile",
      icon:"Person",
      routeLink:"/Profile"
    },

    {
      label: 'DashBoard', 
      icon: 'dashboard', 
      routeLink:"/dashboard"
    },
    { 
      label: 'All Jobs',
       icon: 'work', 
       routeLink: 'alljobs' 
    },
    { 
      label: 'Calender', 
      icon: 'calendar_today', 
      routeLink: "calender" 
    },
    { 
      label: 'Add', 
      icon: 'add_circle_outline',
       routeLink: 'addjobs' 
    },
    { 
      label: 'Settings', 
      icon: 'history', 
      routeLink: '/settings' 
    },
    { 
      label: 'Settings', 
      icon: 'people', 
      routeLink: '/settings' 
    }

];
