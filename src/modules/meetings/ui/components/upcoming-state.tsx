import EmptyState from '@/components/empty-state';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoIcon } from 'lucide-react';

interface Props {
	meetingId: string;
}

const UpcomingState = ({ meetingId }: Props) => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
			<EmptyState
				image="/upcoming.svg"
				title="Not started yet"
				description="Once you start a meeting, it will appear here."
			/>

			<div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
				<Button asChild className="w-full lg:w-auto">
					<Link href={`/call/${meetingId}`}>
						<VideoIcon />
						Start Meeting
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default UpcomingState;
