import React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';

const teamMembers = [
	{
		name: 'John Doe',
		profilePicture:
			'https://api.dicebear.com/7.x/lorelei/svg?flip=false&seed=john',
		email: 'john.doe@example.com',
	},
	{
		name: 'Jane Smith',
		profilePicture:
			'https://api.dicebear.com/7.x/lorelei/svg?flip=false&seed=jane',
		email: 'jane.smith@example.com',
	},
	{
		name: 'Mike Johnson',
		profilePicture:
			'https://api.dicebear.com/7.x/lorelei/svg?flip=false&seed=mike',
		email: 'mike.johnson@example.com',
	},
];

const AssigneeList = (props: {
	assignee?: string;
	onChange: (val: string) => void;
}) => {
	return (
		<Select
			defaultValue={props.assignee}
			onValueChange={props.onChange}>
			<SelectTrigger className="min-w-[120px] !w-full text-surface-12 p-2">
				<div className="flex gap-4">
					<SelectValue placeholder={'No assignee selected'} />
				</div>
			</SelectTrigger>
			<SelectContent>
				{teamMembers.map((member) => (
					<SelectItem
						key={member.email}
						value={member.email}
						className="inline-flex items-center gap-4">
						<p className="flex items-center gap-4">
							<img
								src={member.profilePicture}
								alt={member.name}
								className="w-6 h-6 rounded-full"
							/>
							{member.name}
						</p>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default AssigneeList;
