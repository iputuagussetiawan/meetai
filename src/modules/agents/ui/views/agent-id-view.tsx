'use client';
import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AgentIdViewHeader from '../components/agent-id-view-header';
import GenerateAvatar from '@/components/generate-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UseConfirm } from '@/hooks/use-confirm';
import UpdateAgentDialog from '../components/update-agent-dialog';

interface Props {
	agentId: string;
}

const AgentIdView = ({ agentId }: Props) => {
	const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
	const router = useRouter();
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

	const removeAgent = useMutation(
		trpc.agents.remove.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
				await queryClient.invalidateQueries(trpc.premium.getFreeUsage.queryOptions());
				router.push('/agents');
			},
			onError: (error) => {
				toast.error(error.message);
			},
		})
	);

	const [RemoveConfirmation, confirmRemove] = UseConfirm(
		'Are you sure?',
		`The following action will remove ${data.meetingCount} associated meetings.`
	);

	const handleRemoveAgent = async () => {
		const ok = await confirmRemove();
		if (!ok) return;
		await removeAgent.mutateAsync({ id: agentId });
	};
	return (
		<>
			<RemoveConfirmation />
			<UpdateAgentDialog
				open={updateAgentDialogOpen}
				onOpenChange={setUpdateAgentDialogOpen}
				initialValues={data}
			/>
			<div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
				<AgentIdViewHeader
					agentId={agentId}
					agentName={data.name}
					onEdit={() => setUpdateAgentDialogOpen(true)}
					onRemove={handleRemoveAgent}
				/>
				<div className="rounded-lg border bg-white">
					<div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
						<div className="flex items-center gap-x-3">
							<GenerateAvatar
								variant="botttsNeutral"
								seed={data.name}
								className="size-10"
							/>
							<h2 className="text-2xl font-medium">{data.name}</h2>
						</div>
						<Badge
							className="flex items-center gap-x-2 [&>svg]:size-4"
							variant={'outline'}
						>
							<VideoIcon className="text-blue-700" />
							{data.meetingCount} {data.meetingCount === 1 ? 'Meeting' : 'Meetings'}
						</Badge>
						<div className="flex flex-col gap-y-4">
							<p className="text-lg font-medium">Instructions</p>
							<p className="text-neutral-800">{data.instructions}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AgentIdView;

export const AgentIdViewLoading = () => {
	return <LoadingState title="Loading Agent" description="Please wait..." />;
};

export const AgentIdViewError = () => {
	return <ErrorState title="Error Loading Agent" description="Please try again later." />;
};
