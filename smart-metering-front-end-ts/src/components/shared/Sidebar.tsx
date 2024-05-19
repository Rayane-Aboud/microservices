import classNames from 'classnames'
import { DASHBOARD_SIDEBAR_TOP_LINKS,DASHBOARD_SIDEBAR_BOTTOM_LINKS } from "../lib/consts/sidebarNavigationLink";
import { Link,useLocation } from "react-router-dom";
import { SideBarItem } from '../lib/consts/sidebarNavigationLink';
const linkClasses = 'flex items-center gap-2 front-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col">
            <div className="px-3 py-3">
                <img src="/assets/Namla-Logo-Light.svg" alt="namla logo" className="w-10/12 h-auto" />
            </div>

            <div className="flex-1 py-7 flex flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_TOP_LINKS.map((item:any)=>
                    <SidebarLink key={item.key} item={item}/>
                )}
            </div>
            
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-200">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item)=>
                    <SidebarLink key={item.key} item={item}/>
                )}
                
            </div>
        </div>

    );
}

function SidebarLink({ item }: { item: SideBarItem }):any{
    const {pathname} = useLocation()
    return (
        <Link to={item.path} className={classNames(pathname===item.path ? 'bg-neutral-700 text-white':'text-neutral-400',linkClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}