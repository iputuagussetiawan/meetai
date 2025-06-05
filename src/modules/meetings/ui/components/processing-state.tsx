import EmptyState from '@/components/empty-state';
import React from 'react';

const ProcessingState = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
			<EmptyState
				image="/processing.svg"
				title="Meeting completed"
				description="This meeting was completed, a summary will be appear soon"
			/>
		</div>
	);
};

export default ProcessingState;
