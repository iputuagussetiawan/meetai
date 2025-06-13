import { MeetingGetOne } from '../../types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	BookOpenIcon,
	SparklesIcon,
	FileTextIcon,
	FileVideoIcon,
	ClockFadingIcon,
} from 'lucide-react';

import Markdown from 'react-markdown';
import Link from 'next/link';
import GenerateAvatar from '@/components/generate-avatar';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { formatDuration } from '@/lib/utils';

interface Props {
	data: MeetingGetOne;
}
export const CompletedState = ({ data }: Props) => {
	return (
		<div className="flex flex-col gap-y-4">
			<Tabs defaultValue="summary">
				<div className="rounded-lg border bg-white px-3">
					<ScrollArea>
						<TabsList className="h-13 justify-start rounded-none bg-background p-0">
							<TabsTrigger
								value="summary"
								className="h-full rounded-none border-b-2 border-transparent bg-background text-muted-foreground hover:text-accent-foreground data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
							>
								<BookOpenIcon className="mr-2 size-4" />
								Summary
							</TabsTrigger>
							<TabsTrigger
								value="transcript"
								className="h-full rounded-none border-b-2 border-transparent bg-background text-muted-foreground hover:text-accent-foreground data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
							>
								<FileTextIcon className="mr-2 size-4" />
								Transcript
							</TabsTrigger>
							<TabsTrigger
								value="recording"
								className="h-full rounded-none border-b-2 border-transparent bg-background text-muted-foreground hover:text-accent-foreground data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
							>
								<FileVideoIcon className="mr-2 size-4" />
								Recording
							</TabsTrigger>
							<TabsTrigger
								value="chat"
								className="h-full rounded-none border-b-2 border-transparent bg-background text-muted-foreground hover:text-accent-foreground data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground data-[state=active]:shadow-none"
							>
								<SparklesIcon className="mr-2 size-4" />
								Ask AI
							</TabsTrigger>
						</TabsList>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
				<TabsContent value="recording" className="flex flex-col gap-y-4">
					<div className="rounded-lg border bg-white px-4 py-5">
						<video src={data.recordingUrl!} className="w-full rounded-lg" controls />
					</div>
				</TabsContent>
				<TabsContent value="summary" className="flex flex-col gap-y-4">
					<div className="rounded-lg border bg-white">
						<div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
							<h2 className="text-2xl font-medium capitalize">{data.name}</h2>
							<div className="flex items-center gap-x-2">
								<Link
									href={`/agent/${data.agent.id}`}
									className="flex items-center gap-x-2 capitalize underline underline-offset-4"
								>
									<GenerateAvatar
										seed={data.agent.name}
										variant="botttsNeutral"
										className="size-5"
									/>
									{data.agent.name}
								</Link>{' '}
								<p>
									{data.startedAt ? format(new Date(data.startedAt), 'PPP') : ''}
								</p>
							</div>
							<div className="flex items-center gap-x-2">
								<SparklesIcon className="size-4 text-muted-foreground" />
								<p>General Summary</p>
							</div>
							<Badge
								className="flex items-center gap-x-2 [&>svg]:size-4"
								variant={'outline'}
							>
								<ClockFadingIcon className="text-blue-700" />
								{data.duration ? formatDuration(data.duration) : 'No Duration'}
							</Badge>
							<div>
								<Markdown
									components={{
										h1: (props) => (
											<h1 className="mb-6 text-2xl font-medium" {...props} />
										),
										h2: (props) => (
											<h2 className="mb-6 text-xl font-medium" {...props} />
										),
										h3: (props) => (
											<h3 className="mb-6 text-lg font-medium" {...props} />
										),
										h4: (props) => (
											<h4 className="mb-6 text-base font-medium" {...props} />
										),

										p: (props) => (
											<p className="mb-6 leading-relaxed" {...props} />
										),
										ul: (props) => (
											<ul className="mb-6 list-inside list-disc" {...props} />
										),

										ol: (props) => (
											<ol
												className="mb-6 list-inside list-decimal"
												{...props}
											/>
										),

										strong: (props) => (
											<strong className="font-semibold" {...props} />
										),

										blockquote: (props) => (
											<blockquote
												className="my-4 border-l-4 pl-4 italic"
												{...props}
											/>
										),
									}}
								>
									{data.summary}
								</Markdown>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
