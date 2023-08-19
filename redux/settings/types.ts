export enum SnackBuild {
	DEV = 'DEV',
	BETA = 'BETA',
	RELEASE = 'RELEASE',
	ALPHA = 'ALPHA',
}

export type SnackApplicationSettings = {
	onboarded: boolean;
	lastOpened: Date;
	version: string;
	build: SnackBuild;
};
