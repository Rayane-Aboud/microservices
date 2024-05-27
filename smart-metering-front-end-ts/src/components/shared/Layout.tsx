import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
//outlet will act as a children component of routes
export default function Layout(){
    const scrollableContainerStyle: React.CSSProperties = {
        overflowY: 'auto',
    };
    return (
        <div className='flex flex-row bg-neutral-180 h-screen w-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1'>
                <Navbar />
                <div style={scrollableContainerStyle}>{<Outlet />}</div>
            </div>
            
        </div>
    );
}