import { useState } from 'react';
import { format } from 'date-fns';
import { SearchIcon } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { generateAvatarUrl } from '@/lib/avatar';
import Highlighter from 'react-highlight-words';

interface Props {
	meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
	const trpc = useTRPC();
	const { data } = useQuery(trpc.meetings.getTranscript.queryOptions({ id: meetingId }));

	const [searchQuery, setSerchQuery] = useState('');
	const filteredData = (data ?? []).filter((item) =>
		item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex w-full flex-col gap-y-4 rounded-lg border bg-white px-4 py-5">
			<p className="text-sm font-medium">Transcript</p>
			<div className="relative">
				<Input
					placeholder="Search Transcript..."
					value={searchQuery}
					onChange={(e) => setSerchQuery(e.target.value)}
					className="h-9 w-[240px] pl-8"
				/>
				<SearchIcon className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
			</div>
			<ScrollArea>
				<div className="flex flex-col gap-y-4">
					{filteredData.map((item) => {
						return (
							<div
								key={item.start_ts}
								className="flex flex-col gap-y-2 rounded-md border p-4 hover:bg-muted"
							>
								<div className="flex items-center gap-x-2">
									<Avatar className="size-6">
										<AvatarImage
											src={
												item.user.image ??
												generateAvatarUrl({
													seed: item.user.name,
													variant: 'initials',
												})
											}
											alt="user avatar"
										/>
									</Avatar>
									<p className="text-sm font-medium">{item.user.name}</p>
									<p className="text-sm font-medium text-blue-500">
										{format(new Date(item.start_ts * 1000), 'hh:mm:ss a')}
									</p>
								</div>
								<Highlighter
									className="text-sm text-neutral-700"
									hightlightClassName="bg-yellow-200"
									searchWords={[searchQuery]}
									autoEscape={true}
									textToHighlight={item.text}
								/>
							</div>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};
