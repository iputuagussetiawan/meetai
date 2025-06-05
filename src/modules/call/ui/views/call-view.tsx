'use client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';

interface Props {
	meetingId: string;
}
const CallView = ({ meetingId }: Props) => {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));
	return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default CallView;
