'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';

import React from 'react';

const UpgradeView = () => {
	return <div>upgrade-view</div>;
};

export default UpgradeView;

export const UpgradeViewLoading = () => {
	return <LoadingState title="Loading upgrade" description="Please wait..." />;
};

export const UpgradeViewError = () => {
	return <ErrorState title="Error loading upgrade" description="Please try again later." />;
};
