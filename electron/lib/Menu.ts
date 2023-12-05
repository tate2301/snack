import { MenuItemConstructorOptions } from 'electron';

const CustomMenu: MenuItemConstructorOptions[] = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Clock in',
				accelerator: 'CmdOrCtrl+I',
				click: () => {
					// Code to execute when the 'Clock in' menu item is clicked
				},
			},
			{
				label: 'Quick Session',
				accelerator: 'CmdOrCtrl+Q',
				click: () => {
					// Code to execute when the 'Quick Session' menu item is clicked
				},
			},
			{
				label: 'New Task',
				accelerator: 'CmdOrCtrl+N',
				click: () => {
					// Code to execute when the 'New Task' menu item is clicked
				},
			},
			{
				label: 'New Project',
				accelerator: 'Shift+CmdOrCtrl+N',
				click: () => {
					// Code to execute when the 'New Project' menu item is clicked
				},
			},
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				click: () => {
					// Code to execute when the 'Close' menu item is clicked
				},
			},
		],
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo',
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo',
			},
			{ type: 'separator' },
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut',
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy',
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste',
			},
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectAll',
			},
		],
	},
	{
		label: 'Session',
		submenu: [
			{
				label: 'Start',
				accelerator: 'CmdOrCtrl+S',
				click: () => {
					// Code to execute when the 'Start Timer' menu item is clicked
				},
			},
			{
				label: 'Continue',
				accelerator: 'CmdOrCtrl+R',
				click: () => {
					// Code to execute when the 'Continue Timer' menu item is clicked
				},
			},
			{
				label: 'Stop',
				accelerator: 'CmdOrCtrl+T',
				click: () => {
					// Code to execute when the 'Stop Timer' menu item is clicked
				},
			},
			{
				label: 'Start Focus Session',
				accelerator: 'CmdOrCtrl+F',
				click: () => {
					// Code to execute when the 'Start Focus Session' menu item is clicked
				},
			},

			{
				label: 'View Time Logs',
				accelerator: 'CmdOrCtrl+L',
				click: () => {
					// Code to execute when the 'View Time Logs' menu item is clicked
				},
			},
		],
	},
	{
		label: 'Project',
		submenu: [
			{
				label: 'View Projects',
				accelerator: 'CmdOrCtrl+P',
				click: () => {
					// Code to execute when the 'View Projects' menu item is clicked
				},
			},
			{
				label: 'View Tasks',
				accelerator: 'CmdOrCtrl+T',
				click: () => {
					// Code to execute when the 'View Tasks' menu item is clicked
				},
			},
			{
				label: 'Manage Team',
				accelerator: 'CmdOrCtrl+M',
				click: () => {
					// Code to execute when the 'Manage Team' menu item is clicked
				},
			},
		],
	},
];

export default CustomMenu;
