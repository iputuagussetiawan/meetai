import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { Channel as StreamChanel } from 'stream-chat';
import {
	useCreateChatClient,
	Chat,
	Channel,
	MessageInput,
	MessageList,
	Thread,
	Window,
} from 'stream-chat-react';

import { useTRPC } from '@/trpc/client';

import 'stream-chat-react/dist/css/v2/index.css';

interface ChatUIProps {
	meetingId: string;
	meetingName: string;
	userId: string;
	userName: string;
	userImage: string | undefined;
}

import React from 'react';
import LoadingState from '@/components/loading-state';

const ChatUI = ({ meetingId, meetingName, userId, userName, userImage }: ChatUIProps) => {
	const trpc = useTRPC();
	const { mutateAsync: generateChatToken } = useMutation(
		trpc.meetings.generateToken.mutationOptions()
	);

	const [chanel, setChanel] = useState<StreamChanel>();
	const client = useCreateChatClient({
		apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
		tokenOrProvider: generateChatToken,
		userData: {
			id: userId,
			name: userName,
			image: userImage,
		},
	});

	useEffect(() => {
		if (!client) return;

		const channel = client.channel('messaging', meetingId, {
			members: [userId],
		});
		setChanel(channel);
	}, [client, meetingId, meetingName, userId]);

	if (!client) {
		return (
			<LoadingState
				title="Loading chat..."
				description="Please wait while we load the chat..."
			/>
		);
	}
	return (
		<div className="overflow-hidden rounded-lg border bg-white">
			<Chat client={client}>
				<Channel channel={chanel}>
					<Window>
						<div className="max-h-[calc(100vh-23rem)] flex-1 overflow-y-auto border-b">
							<MessageList />
						</div>
						<MessageInput />
					</Window>
					<Thread />
				</Channel>
			</Chat>
		</div>
	);
};

export default ChatUI;
