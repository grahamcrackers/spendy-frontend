import { useAuth0 } from '@auth0/auth0-react';
import { ChevronDownSolid } from '@graywolfai/react-heroicons';
import { Transition } from '@headlessui/react';
import React from 'react';
import { useClickAway } from '../../hooks/use-click-away';

export const ProfileDropdown = () => {
    const { ref, active, toggle } = useClickAway();
    const { user, logout } = useAuth0();

    return (
        <div className="ml-3 relative" ref={ref}>
            <div>
                <button
                    className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                    id="user-menu"
                    aria-haspopup="true"
                    onClick={toggle}
                >
                    <img className="h-8 w-8 rounded-full" src={user.picture} alt="" />
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {user.name}
                    </span>
                    <ChevronDownSolid className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block" />
                </button>
            </div>
            <Transition
                show={active}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                >
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Your Profile
                    </a>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Settings
                    </a>
                    <button
                        className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                        Logout
                    </button>
                </div>
            </Transition>
        </div>
    );
};
