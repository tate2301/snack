import {
	ArchiveBoxIcon,
	ArrowPathIcon,
	ArrowsUpDownIcon,
	CalendarDaysIcon,
	ExclamationCircleIcon,
	LinkIcon,
	PlusIcon,
	UsersIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/outline';
import Modal, { ModalProps } from '../../../../components/ui/modal';
import TargetIcon from '../../../../icons/TargetIcon';
import Textarea from '../../../../components/ui/input/textarea';
import TaskListSection from '../../../../components/Home/TaskListSection';
import { BookOpenIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import CalendarIcon from '../../../../icons/CalendarIcon';

const ActionCenter = () => {
	return (
		<div className="flex justify-between gap-2">
			<div className="flex gap-2">
				<button className="flex items-center gap-2 px-2 py-1 uppercase bg-white rounded-lg shadow">
					<CalendarIcon className="w-4 h-4" />
					When
				</button>
				<button className="flex items-center gap-2 px-2 py-1 uppercase bg-white rounded-lg shadow">
					<ArrowPathIcon className="w-4 h-4" />
					Repeat
				</button>
				<button className="flex items-center gap-2 px-2 py-1 uppercase bg-white rounded-lg shadow">
					<CalendarDaysIcon className="w-4 h-4" />
					Due date
				</button>
				<button className="flex items-center gap-2 px-2 py-1 text-white uppercase bg-red-600 rounded-lg">
					<ExclamationCircleIcon className="w-5 h-5" />
					Priority
				</button>
			</div>
			<div></div>
		</div>
	);
};

export default function InboxItemModal(props: ModalProps) {
	return (
		<>
			<Modal
				actionCenter={<ActionCenter />}
				isOpen={props.isOpen}
				onClose={props.onClose}>
				<div className="w-[36rem]">
					<div className="flex items-center justify-between mb-4">
						<div className="flex gap-2">
							<button className="flex items-center justify-center gap-2 px-2 py-1 uppercase transition-all bg-white border rounded-lg border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:shadow hover:text-zinc-900">
								<CheckCircleIcon className="w-5 h-5 text-green-600" />
								Complete
							</button>
						</div>
						<div className="flex gap-2">
							<button className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200">
								<ArchiveBoxIcon className="w-5 h-5" />
							</button>
							<button className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200">
								<LinkIcon className="w-5 h-5" />
							</button>
						</div>
					</div>
					<div className="py-4">
						<div>
							<Textarea
								className="w-full p-0 overflow-hidden text-lg font-medium"
								rows={1}
								placeholder="Task name"></Textarea>
							<Textarea
								className="w-full h-auto p-0 resize-none placeholder:text-zinc-400 text-zinc-600"
								rows={2}
								placeholder="Description"></Textarea>
						</div>
					</div>
					<div className="py-4 border-t">
						<p className="uppercase text-zinc-400">Checklists</p>
						<div className="mt-4">
							<TaskListSection title="Project tasks" />
						</div>
						<div className="flex mt-4">
							<button className="flex items-center justify-center gap-2 px-2 py-1 uppercase transition-all bg-white border rounded-lg hover:shadow-sm border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:text-zinc-900">
								<PlusIcon className="w-5 h-5" />
								Add checklist
							</button>
						</div>
					</div>
					<div className="py-4 border-t">
						<p className="uppercase text-zinc-400">People</p>
						<div className="flex mt-4">
							<button className="flex items-center justify-center gap-2 px-2 py-1 uppercase transition-all bg-white border rounded-lg hover:shadow-sm border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:text-zinc-900">
								<UsersIcon className="w-5 h-5" />
								Invite
							</button>
						</div>
					</div>
					<div className="py-4 border-t">
						<p className="uppercase text-zinc-400">Video Conferencing</p>
						<div className="flex mt-4">
							<button className="flex items-center justify-center gap-2 px-2 py-1 uppercase transition-all bg-white border rounded-lg hover:shadow-sm border-zinc-100 text-zinc-500 hover:border-zinc-200 hover:text-zinc-900">
								<VideoCameraIcon className="w-5 h-5" />
								Create meeting
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
