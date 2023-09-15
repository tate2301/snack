export enum AppEntity {
	Task,
	Project,
	Team,
}

export type Starred = {
	entity: AppEntity;
	createdAt: Date;
	id: string;
	idx: number;
	meta?: any;
};
