import { ReactElement } from 'react';
import {
    HiOutlineCog,
    HiOutlineQuestionMarkCircle,
    HiOutlineViewGrid,

} from 'react-icons/hi';

import { MdAssessment, MdDevices } from "react-icons/md";

export interface SideBarItem {
    key: string;  // Unique identifier
    label: string;  // Display text
    path: string;  // Route path
    icon: ReactElement;  // React element for the icon
  }

export const DASHBOARD_SIDEBAR_TOP_LINKS:SideBarItem[] = [
    {
        key: 'homepage',
        label: 'Home',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'devices',
        label: 'Devices',
        path: '/devices',
        icon: <MdDevices />
    },
    {
        key: 'assets',
        label: 'Assets',
        path: '/assets',
        icon: <MdAssessment />
    },
    
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS:SideBarItem[] = [
    {
        key:'settings',
        label:'Settings',
        path:'/settings',
        icon:<HiOutlineCog />
    },

    {
        key:'support',
        label:'Help & Support',
        path:'/support',
        icon:<HiOutlineQuestionMarkCircle />
    }
]