interface Task {
  id: string;
  isShowing: boolean;
  isExpanded: boolean;
  title: string;
  priority: 1 | 2 | 3;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website: string;
  comments: Comment[];
  assignedPeople: Person[];
  tags: string[];
  timer: Timer | null;
  project: Project;
}

interface Comment {
  id: string;
  author: Person;
  content: string;
  timestamp: Date;
}

interface Person {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  url: string;
  profilePicture: string;
  notes: string;
  location: string;
}

interface Project {
  id: string;
  name: string;
  me: Person;
  url: string;
  description: string;
  billingType: "periodic" | "once-off";
  periodicBilling: "hourly" | "weekly" | "monthly";
  deadline: Date;
  client: Client;
}

interface Client {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  url: string;
  profilePicture: string;
  notes: string;
  location: string;
}

interface Timer {
  startTime: Date;
  endTime: Date | null;
  duration: number;
}
