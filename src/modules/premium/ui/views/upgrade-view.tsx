'use client';

import { useTRPC } from '@/trpc/client';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import PricingCard from '../components/pricing-card';

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
						{currentSubscription?.name ?? 'free'}
					</span>{' '}
					plan
				</h5>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{products?.map((product) => {
						const isCurrentProduct = product.id === currentSubscription?.id;
						const isPremium = !!currentSubscription;
						let buttonText = 'Upgrade';

						let onClick = () => authClient.checkout({ products: [product.id] });

						if (isCurrentProduct) {
							buttonText = 'Manage';
							onClick = () => authClient.customer.portal();
						} else if (isPremium) {
							buttonText = 'Change Plan';
							onClick = () => authClient.customer.portal();
						}

						return (
							<PricingCard
								key={product.id}
								buttonText={buttonText}
								onClick={onClick}
								variant={
									product.metadata.variant === 'highlight'
										? 'highlight'
										: 'default'
								}
								title={product.name}
								price={
									product.prices[0].amountType === 'fixed'
										? product.prices[0].priceAmount / 100
										: 0
								}
								description={product.description}
								priceSuffix={`/${product.prices[0].recurringInterval}`}
								features={product.benefits.map((benefit) => benefit.description)}
								badge={product.metadata.badge as string | null}
							/>
						);
					})}
				</div>
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
