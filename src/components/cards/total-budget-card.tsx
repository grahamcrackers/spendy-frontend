import { ScaleSolid } from '@graywolfai/react-heroicons';
import React, { FC } from 'react';
import { formatter } from '../../utils/formatter';

interface TotalBudgetCardProps {
    amount: number;
}

export const TotalBudgetCard: FC<TotalBudgetCardProps> = ({ amount }: TotalBudgetCardProps) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <ScaleSolid className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Budget</dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">${formatter(amount)}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            {/* <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                    <a href="/" className="font-medium text-cyan-700 hover:text-cyan-900">
                        View all
                    </a>
                </div>
            </div> */}
        </div>
    );
};
