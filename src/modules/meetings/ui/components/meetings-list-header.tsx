'use client';
import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import NewMeetingDialog from './new-meeting-dialog';
import { useState } from 'react';
import { MeetingsSearchFilter } from './meetings-search-filter';
import StatusFilter from './status-filter';
import AgentIdFilter from './meeting-agent-id-filter';
import { useMeetingsFilters } from '../../hooks/use-meetings-filter';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DEFAULT_PAGE } from '@/constants';

const MeetingsListHeader = () => {
	const [filters, setFilters] = useMeetingsFilters();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	//if filters.search is exist or filters.status is exist or filters.agentId is exist
	const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId;

	const onClearFilters = () => {
		setFilters({
			status: null,
			agentId: '',
			search: '',
			page: DEFAULT_PAGE,
		});
	};
	return (
		<>
			<NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
			<div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
				<div className="flex items-center justify-between">
					<h5 className="text-xl font-medium">My Meetings</h5>
					<Button onClick={() => setIsDialogOpen(true)}>
						<PlusIcon />
						New Meeting
					</Button>
				</div>
				<ScrollArea>
					<div className="flex items-center gap-x-2 p-1">
						<MeetingsSearchFilter />
						<StatusFilter />
						<AgentIdFilter />
						{isAnyFilterModified && (
							<Button variant={'outline'} onClick={onClearFilters}>
								<XCircleIcon className="size-4" />
								Clear
							</Button>
						)}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	);
};

export default MeetingsListHeader;
