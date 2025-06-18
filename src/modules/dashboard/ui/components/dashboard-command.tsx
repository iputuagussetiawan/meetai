import { CommandResponsiveDialog, CommandInput } from '@/components/ui/command';
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from 'cmdk';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';
import GenerateAvatar from '@/components/generate-avatar';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({ open, setOpen }: Props) => {
	const router = useRouter();
	const [search, setSearch] = useState('');

	const trpc = useTRPC();

	const meetings = useQuery(
		trpc.meetings.getMany.queryOptions({
			pageSize: 100,
			search,
		})
	);

	const agents = useQuery(
		trpc.agents.getMany.queryOptions({
			pageSize: 100,
			search,
		})
	);

	return (
		<CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
			<CommandInput
				placeholder="Find a meeting or agent..."
				value={search}
				onValueChange={(value) => setSearch(value)}
			/>
			<CommandList>
				<CommandGroup heading="Meetings">
					<CommandEmpty>
						<span className="text-sm text-muted-foreground">No meetings found.</span>
					</CommandEmpty>
					{meetings.data?.items.map((meeting) => (
						<CommandItem
							className="cursor-pointer"
							key={meeting.id}
							onSelect={() => {
								router.push(`/meetings/${meeting.id}`);
								setOpen(false);
							}}
						>
							<span>{meeting.name}</span>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandGroup heading="Agents">
					<CommandEmpty>
						<span className="text-sm text-muted-foreground">No Agent found.</span>
					</CommandEmpty>
					{agents.data?.items.map((agent) => (
						<CommandItem
							className="cursor-pointer"
							key={agent.id}
							onSelect={() => {
								router.push(`/agents/${agent.id}`);
								setOpen(false);
							}}
						>
							<div className="flex items-center gap-x-2">
								<GenerateAvatar
									seed={agent.name}
									variant="botttsNeutral"
									className="size-4"
								/>
								<span>{agent.name}</span>
							</div>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandResponsiveDialog>
	);
};

export default DashboardCommand;
