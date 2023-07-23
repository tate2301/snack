import { BillingType, PeriodicBilling, Project, ProjectStatus, ProjectType } from './Project';
import { Client } from '../tasks/Client';
import { Person } from '../tasks/types';

export class ProjectManager {
	projects: Project[];
		constructor(projects: Project[]) {
				this.projects = projects;
		}
		addProject(project: Project): void {
				this.projects.push(project);
		}
		removeProject(project: Project): void {
				this.projects = this.projects.filter(p => p.id !== project.id);
		}
		getProject(id: string): Project {
				return this.projects.find(p => p.id === id);
		}
		getProjects(): Project[] {
				return this.projects;
		}
		getProjectsByClient(client: Client): Project[] {
				return this.projects.filter(p => p.client.id === client.id);
		}
		getProjectsByStatus(status: ProjectStatus): Project[] {
				return this.projects.filter(p => p.status === status);
		}
		getProjectsByDeadline(deadline: Date): Project[] {
				return this.projects.filter(p => p.deadline === deadline);
		}
		getProjectsByBillingType(billingType: BillingType): Project[] {
				return this.projects.filter(p => p.billingType === billingType);
		}
		getProjectsByPeriodicBilling(periodicBilling: PeriodicBilling): Project[] {
				return this.projects.filter(p => p.periodicBilling === periodicBilling);
		}
		getProjectsByMe(me: Person): Project[] {
				return this.projects.filter(p => p.contractor.id === me.id);
		}
		getProjectsByClientName(name: string): Project[] {
				return this.projects.filter(p => p.client.name === name);
		}
		getProjectsByClientContactPerson(contactPerson: string): Project[] {
				return this.projects.filter(p => p.client.contactPerson === contactPerson);
		}
		getProjectsByClientEmail(email: string): Project[] {
				return this.projects.filter(p => p.client.email === email);
		}


}