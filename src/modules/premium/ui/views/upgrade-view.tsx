'use client';

import { useTRPC } from '@/trpc/client';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';

import React from 'react';
import { getQueryClient } from '@/trpc/server';
import { useSuspenseQuery } from '@tanstack/react-query';

const UpgradeView = () => {
	const trpc = useTRPC();
	const { data: products } = useSuspenseQuery(trpc.premium.getProducts.queryOptions());
	const { data: currentSubscription } = useSuspenseQuery(
		trpc.premium.getCurrentSubscription.queryOptions()
	);

	return (
		<div className="flex flex-1 flex-col gap-y-10 px-4 py-4 md:px-8 md:py-4">
			<div className="mt-4 flex flex-1 flex-col items-center gap-y-10">
				<h5 className="text-2xl font-medium md:text-3xl">
					{' '}
					You are on{' '}
					<span className="font-semibold text-primary">
						{/* {currentSubscription?.name??"free"} */}
					</span>{' '}
					plan
				</h5>
			</div>
		</div>
	);
};

export default UpgradeView;

export const UpgradeViewLoading = () => {
	return <LoadingState title="Loading upgrade" description="Please wait..." />;
};

export const UpgradeViewError = () => {
	return <ErrorState title="Error loading upgrade" description="Please try again later." />;
};
