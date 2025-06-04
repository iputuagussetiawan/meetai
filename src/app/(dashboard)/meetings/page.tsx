import MeetingView, {
	MeetingViewError,
	MeetingViewLoading,
} from '@/modules/meetings/ui/views/meeting-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Page = () => {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Suspense fallback={<MeetingViewLoading />}>
				<ErrorBoundary fallback={<MeetingViewError />}>
					<MeetingView />
				</ErrorBoundary>
			</Suspense>
		</HydrationBoundary>
	);
};

export default Page;
