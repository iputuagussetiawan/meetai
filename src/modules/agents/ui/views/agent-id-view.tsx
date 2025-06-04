'use client';
import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import AgentIdViewHeader from './agent-id-view-header';
import GenerateAvatar from '@/components/generate-avatar';
import { Badge } from '@/components/ui/badge';
import { Video, VideoIcon } from 'lucide-react';

interface Props {
    agentId: string;
}

const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
    return (
        <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => {}}
                onRemove={() => {}}
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
                    <Badge className="flex items-center gap-x-2 [&>svg]:size-4" variant={'outline'}>
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
    );
};

export default AgentIdView;

export const AgentIdViewLoading = () => {
    return <LoadingState title="Loading Agent" description="Please wait..." />;
};

export const AgentIdViewError = () => {
    return <ErrorState title="Error Loading Agent" description="Please try again later." />;
};
