import { useAuth0 } from '@auth0/auth0-react';
import { CashSolid, CheckCircleSolid, ChevronRightSolid } from '@graywolfai/react-heroicons';
import { Transition } from '@headlessui/react';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { useSpendyApi } from '../../hooks/use-spendy-api';
import { Budget, Expense } from '../../models';
import { formatter } from '../../utils/formatter';
import { TotalBudgetCard } from '../cards/total-budget-card';
import { TotalRemainingCard } from '../cards/total-remaining-card';
import { TotalSpentCard } from '../cards/total-spent-card';
import { ProfileDropdown } from '../profile-dropdown/profile-dropdown';

/* Yes is a big file. Lets get everything working before splitting up into other smaller files. */

export const HomePage = () => {
    const { user } = useAuth0();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const budgets = useSpendyApi<Budget[]>('http://localhost:7000/budgets');
    const expenses = useSpendyApi<Expense[]>('http://localhost:7000/expenses');

    const totalBudget = budgets.data ? Object.values(budgets.data).reduce((total, { amount }) => total + amount, 0) : 0;
    const totalExpenses = expenses.data
        ? Object.values(expenses.data).reduce((total, { price }) => total + price, 0)
        : 0;

    console.log(budgets.data);
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
            <div className="lg:hidden">
                <div className="fixed inset-0 flex z-40 pointer-events-none">
                    <Transition
                        show={isMenuOpen}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0">
                            <div className="absolute inset-0 bg-gray-600 opacity-75" aria-hidden="true"></div>
                        </div>
                    </Transition>
                    <Transition
                        show={isMenuOpen}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                        as="div"
                        className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700 pointer-events-auto"
                    >
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                {/* Heroicon name: x */}
                                <svg
                                    className="h-6 w-6 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center px-4">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                                alt="Easywire logo"
                            />
                        </div>
                        <nav
                            className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                            aria-label="Sidebar"
                        >
                            <div className="px-2 space-y-1">
                                {/* Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" */}
                                <a
                                    href="/"
                                    className="bg-cyan-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                    aria-current="page"
                                >
                                    {/* Heroicon name: home */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    Home
                                </a>

                                <a
                                    href="/"
                                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                >
                                    {/* Heroicon name: clock */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    History
                                </a>

                                <a
                                    href="/"
                                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                >
                                    {/* Heroicon name: scale */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                        />
                                    </svg>
                                    Balances
                                </a>

                                <a
                                    href="/"
                                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                >
                                    {/* Heroicon name: credit-card */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                    Cards
                                </a>

                                <a
                                    href="/"
                                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                >
                                    {/* Heroicon name: user-group */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Recipients
                                </a>

                                <a
                                    href="/"
                                    className="text-cyan-100 hover:text-white hover:bg-cyan-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                >
                                    {/* Heroicon name: document-report */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    Reports
                                </a>
                            </div>
                            <div className="mt-6 pt-6">
                                <div className="px-2 space-y-1">
                                    <a
                                        href="/"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        {/* Heroicon name: cog */}
                                        <svg
                                            className="mr-4 h-6 w-6 text-cyan-200 group-hover:text-cyan-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        Settings
                                    </a>

                                    <a
                                        href="/"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        {/* Heroicon name: question-mark-circle */}
                                        <svg
                                            className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-cyan-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Help
                                    </a>

                                    <a
                                        href="/"
                                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        {/* Heroicon name: shield-check */}
                                        <svg
                                            className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-cyan-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Privacy
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </Transition>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                                alt="Easywire logo"
                            />
                        </div>
                        <nav
                            className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
                            aria-label="Sidebar"
                        >
                            <div className="px-2 space-y-1">
                                {/* Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" */}
                                <a
                                    href="/"
                                    className="bg-cyan-800 text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                                    aria-current="page"
                                >
                                    {/* Heroicon name: home */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    Home
                                </a>

                                <a
                                    href="/"
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                >
                                    {/* Heroicon name: clock */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    History
                                </a>

                                <a
                                    href="/"
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                >
                                    {/* Heroicon name: scale */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                        />
                                    </svg>
                                    Balances
                                </a>

                                <a
                                    href="/"
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                >
                                    {/* Heroicon name: credit-card */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                    Cards
                                </a>

                                <a
                                    href="/"
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                >
                                    {/* Heroicon name: user-group */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Recipients
                                </a>

                                <a
                                    href="/"
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                >
                                    {/* Heroicon name: document-report */}
                                    <svg
                                        className="mr-4 h-6 w-6 text-cyan-200"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    Reports
                                </a>
                            </div>
                            <div className="mt-6 pt-6">
                                <div className="px-2 space-y-1">
                                    <a
                                        href="/"
                                        className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        {/* Heroicon name: cog */}
                                        <svg
                                            className="mr-4 h-6 w-6 text-cyan-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        Settings
                                    </a>

                                    <a
                                        href="/"
                                        className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        {/* Heroicon name: question-mark-circle */}
                                        <svg
                                            className="mr-4 h-6 w-6 text-cyan-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Help
                                    </a>

                                    <a
                                        href="/"
                                        className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                                    >
                                        {/* Heroicon name: shield-check */}
                                        <svg
                                            className="mr-4 h-6 w-6 text-cyan-200"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Privacy
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
                    <button
                        className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        {/* Heroicon name: menu-alt-1 */}
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>
                    {/* Search bar */}
                    <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                        <div className="flex-1 flex">
                            <form className="w-full flex md:ml-0" action="#" method="GET">
                                <label htmlFor="search_field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                                        aria-hidden="true"
                                    >
                                        {/* Heroicon name: search */}
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="search_field"
                                        name="search_field"
                                        className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                                        placeholder="Search transactions"
                                        type="search"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                <span className="sr-only">View notifications</span>
                                {/* Heroicon name: bell */}
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
                <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                    {/* Page header */}
                    <div className="bg-white shadow">
                        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                                <div className="flex-1 min-w-0">
                                    {/* Profile */}
                                    <div className="flex items-center">
                                        <img
                                            className="hidden h-16 w-16 rounded-full sm:block"
                                            src={user.picture}
                                            alt=""
                                        />
                                        <div>
                                            <div className="flex items-center">
                                                <img
                                                    className="h-16 w-16 rounded-full sm:hidden"
                                                    src={user.picture}
                                                    alt=""
                                                />
                                                <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                                    Good morning, {user.name}
                                                </h1>
                                            </div>
                                            <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                                <dt className="sr-only">Company</dt>
                                                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                                    {/* Heroicon name: office-building */}
                                                    <svg
                                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Duke street studio
                                                </dd>
                                                <dt className="sr-only">Account status</dt>
                                                {user.email_verified && (
                                                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                                        <CheckCircleSolid className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                                                        Verified account
                                                    </dd>
                                                )}
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                    >
                                        Add money
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                    >
                                        Send money
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <TotalBudgetCard amount={totalBudget} />
                                <TotalSpentCard amount={totalExpenses} />
                                <TotalRemainingCard amount={totalBudget - totalExpenses} />
                            </div>
                        </div>

                        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                            {format(Date.now(), 'MMMM')} Budgets
                        </h2>

                        {/* Budget list (smallest breakopoint only) */}
                        <div className="shadow sm:hidden">
                            <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                                {budgets.data?.map((budget) => (
                                    <li key={budget._id}>
                                        <a href="/" className="block px-4 py-4 bg-white hover:bg-gray-50">
                                            <span className="flex items-center space-x-4">
                                                <span className="flex-1 flex space-x-2 truncate">
                                                    {/* Heroicon name: cash */}
                                                    <CashSolid className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                    <span className="flex flex-col text-gray-500 text-sm truncate">
                                                        <span className="truncate">Payment to Molly Sanders</span>
                                                        <span>
                                                            <span className="text-gray-900 font-medium">$20,000</span>{' '}
                                                            USD
                                                        </span>
                                                        <span>July 11, 2020</span>
                                                    </span>
                                                </span>
                                                {/* Heroicon name: chevron-right */}
                                                <ChevronRightSolid className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* <nav
                                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                                aria-label="Pagination"
                            >
                                <div className="flex-1 flex justify-between">
                                    <a
                                        href="/"
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                    >
                                        Previous
                                    </a>
                                    <a
                                        href="/"
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                                    >
                                        Next
                                    </a>
                                </div>
                            </nav> */}
                        </div>

                        {/* Activity table (small breakopoint and up) */}
                        <div className="hidden sm:block">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col mt-2">
                                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Transaction
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Amount
                                                    </th>
                                                    <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {budgets.data?.map((budget) => (
                                                    <tr className="bg-white" key={budget._id}>
                                                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            <div className="flex">
                                                                <a
                                                                    href="/"
                                                                    className="group inline-flex space-x-2 truncate text-sm"
                                                                >
                                                                    <CashSolid className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                                                    <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                                        {budget.name}
                                                                    </p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                            <span className="text-gray-900 font-medium">
                                                                ${formatter(budget.amount)}
                                                            </span>
                                                            USD
                                                        </td>
                                                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                                                Success
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                            {format(parseISO(budget.startDate), 'PPP')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        {/* <nav
                                            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                                            aria-label="Pagination"
                                        >
                                            <div className="hidden sm:block">
                                                <p className="text-sm text-gray-700">
                                                    Showing
                                                    <span className="font-medium">1</span>
                                                    to
                                                    <span className="font-medium">10</span>
                                                    of
                                                    <span className="font-medium">20</span>
                                                    results
                                                </p>
                                            </div>
                                            <div className="flex-1 flex justify-between sm:justify-end">
                                                <a
                                                    href="/"
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Previous
                                                </a>
                                                <a
                                                    href="/"
                                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Next
                                                </a>
                                            </div>
                                        </nav> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
