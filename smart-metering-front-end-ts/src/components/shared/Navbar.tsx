import  { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

//import { HiOutlineBellAlert } from 'react-icons/hi2';
import { Link, } from 'react-router-dom'

export default function Navbar(){
    
    return (
        <div className='flex justify-between bg-white h-16 px-4 items-center border-b border-gray-200'>
            
            <div className='flex items-center gap-2 mr-2'>
            <div style={{
                cursor: 'pointer',
                display: 'inline-block',
                padding: '5px', 
                borderRadius: '5px',
                backgroundColor: 'lightgray',
            }}>
                <Link to={'/alerts'}>Alerts</Link>
            </div>
            <Menu as="div" className="relative">
                <div>
                    <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                        <span className="sr-only">Open user menu</span>
                        <div
                            className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                        >
                            <span className="sr-only">Marc Backes</span>
                        </div>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right z-30 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                                <Link to={'/profile'}>
                                    <div
                                        className={classNames(
                                            active && 'bg-gray-100',
                                            'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                                        )}
                                    >
                                        Your Profile
                                    </div>
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={classNames(
                                        active && 'bg-gray-100',
                                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                                    )}
                                >
                                    Sign out
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
            </div>
        </div>
    );
}