import ResponsiveDialog from '@/components/responsive-dialog';
import React from 'react';
import MeetingForm from './meeting-form';
import { MeetingGetOne } from '../../types';

interface NewMeetingDialogProp {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialValues: MeetingGetOne;
}

const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: NewMeetingDialogProp) => {
	return (
		<div>
			<ResponsiveDialog
				title="Edit Meeting"
				description="Edit the meeting details"
				open={open}
				onOpenChange={onOpenChange}
			>
				<MeetingForm
					onSuccess={() => onOpenChange(false)}
					onCancel={() => onOpenChange(false)}
					initialValues={initialValues}
				/>
			</ResponsiveDialog>
		</div>
	);
};

export default UpdateMeetingDialog;
