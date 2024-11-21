import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

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
      label: 'My Crew', 
      icon: 'people', 
      routeLink: 'crew' 
    },
    { 
      label: 'Dailies History', 
      icon: 'history', 
      routeLink: 'dialies log' 
    },
    { 
      label: 'Calender', 
      icon: 'calendar_today', 
      routeLink: "calender" 
    },
    { 
      label: 'New Role', 
      icon: 'add_circle_outline',
       routeLink: 'New Role' 
    },
    
    

];
