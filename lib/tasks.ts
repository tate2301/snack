type Priority = 1 | 2 | 3;

type EventDetails =
  | OnlineMeetingDetails
  | LocationEventDetails
  | BirthdayEventDetails;

type TaskType = "general" | "reminder" | "note" | "event";

interface Task {
  id: string;
  isShowing: boolean;
  isExpanded: boolean;
  title: string;
  priority: number;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website?: string;
  comments: Comment[];
  assignedPeople: Person[];
  tags: string[];
  timer: number | null;
  project: string;
  parentTask?: Task | null;

  markComplete(): void;
  markIncomplete(): void;
  addSubtask(subtask: Task): void;
  removeSubtask(subtaskId: string): void;
  updateSubtask(subtaskId: string, updatedSubtask: Task): void;
  addComment(comment: Comment): void;
  removeComment(commentId: string): void;
  updateComment(commentId: string, updatedComment: Comment): void;
  assignPerson(person: Person): void;
  unassignPerson(personId: string): void;
  addTag(tag: string): void;
  removeTag(tag: string): void;
  startTimer(): void;
  stopTimer(): void;
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

interface Timer {
  startTime: Date;
  endTime: Date | null;
  duration: number;
}

interface OnlineMeetingDetails {
  meetingLink: string;
  invitees: string[];
}

interface LocationEventDetails {
  address: string;
  attendees: string[];
}

interface BirthdayEventDetails {
  date: Date;
  celebrant: string;
}

class Project {
  id: string;
  name: string;
  me: Person;
  url?: string;
  description: string;
  billingType: "periodic" | "once-off";
  periodicBilling?: "hourly" | "weekly" | "monthly";
  deadline: Date;
  client: Client;

  constructor(
    id: string,
    name: string,
    me: Person,
    description: string,
    billingType: "periodic" | "once-off",
    deadline: Date,
    client: Client
  ) {
    this.id = id;
    this.name = name;
    this.me = me;
    this.description = description;
    this.billingType = billingType;
    this.deadline = deadline;
    this.client = client;
  }
}

class Client {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  url: string;
  profilePicture: string;
  notes: string;
  location: string;

  constructor(
    name: string,
    contactPerson: string,
    email: string,
    phone: string,
    url: string,
    profilePicture: string,
    notes: string,
    location: string
  ) {
    this.name = name;
    this.contactPerson = contactPerson;
    this.email = email;
    this.phone = phone;
    this.url = url;
    this.profilePicture = profilePicture;
    this.notes = notes;
    this.location = location;
  }
}

abstract class AbstractTask implements Task {
  id: string;
  isShowing: boolean;
  isExpanded: boolean;
  title: string;
  priority: Priority;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website?: string;
  comments: Comment[];
  assignedPeople: Person[];
  tags: string[];
  timer: Timer;
  project: Project;
  parentTask?: Task | null;

  constructor(
    id: string,
    isShowing: boolean,
    isExpanded: boolean,
    title: string,
    priority: number,
    description: string,
    dueDate: Date,
    tasks: Task[],
    website?: string,
    comments: Comment[],
    assignedPeople: Person[],
    tags: string[],
    timer: number | null,
    project: string
  ) {
    this.id = id;
    this.isShowing = isShowing;
    this.isExpanded = isExpanded;
    this.title = title;
    this.priority = priority;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
    this.website = website;
    this.comments = comments;
    this.assignedPeople = assignedPeople;
    this.tags = tags;
    this.timer = timer;
    this.project = project;
  }

  abstract markComplete(): void;
  abstract markIncomplete(): void;
  abstract addSubtask(subtask: Task): void;
  abstract removeSubtask(subtaskId: string): void;
  abstract updateSubtask(subtaskId: string, updatedSubtask: Task): void;
  abstract addComment(comment: Comment): void;
  abstract removeComment(commentId: string): void;
  abstract updateComment(commentId: string, updatedComment: Comment): void;
  abstract assignPerson(person: Person): void;
  abstract unassignPerson(personId: string): void;
  abstract addTag(tag: string): void;
  abstract removeTag(tag: string): void;
  abstract startTimer(): void;
  abstract stopTimer(): void;

  getTaskHierarchy(): string {
    let hierarchy = this.title;
    let currentTask = this.parentTask;

    while (currentTask) {
      hierarchy = `${currentTask.title} > ${hierarchy}`;
      currentTask = currentTask.parentTask;
    }

    return hierarchy;
  }
}

class TaskFactory {
  static generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  static createTask(type: TaskType): Task {
    const id = TaskFactory.generateUniqueId();
    const title = "";
    const priority = 1;
    const description = "";
    const dueDate = new Date();
    const tasks = [];
    const website = "";
    const comments = [];
    const assignedPeople = [];
    const tags = [];
    const timer = null;
    const project = new Project(
      "",
      "",
      {
        id: "",
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        url: "",
        profilePicture: "",
        notes: "",
        location: "",
      },
      "",
      "once-off",
      new Date(),
      new Client("", "", "", "", "", "", "", "")
    );

    switch (type) {
      case "general":
        return new GeneralTask(
          id,
          title,
          priority,
          description,
          dueDate,
          tasks,
          website,
          comments,
          assignedPeople,
          tags,
          timer,
          project
        );
      case "reminder":
        return new ReminderTask(
          id,
          title,
          priority,
          description,
          dueDate,
          tasks,
          website,
          comments,
          assignedPeople,
          tags,
          timer,
          project
        );
      case "note":
        return new NoteTask(
          id,
          title,
          priority,
          description,
          dueDate,
          tasks,
          website,
          comments,
          assignedPeople,
          tags,
          timer,
          project
        );
      case "event":
        return new EventTask(
          id,
          title,
          priority,
          description,
          dueDate,
          tasks,
          website,
          comments,
          assignedPeople,
          tags,
          timer,
          project
        );
      default:
        throw new Error("Invalid task type");
    }
  }
}

class GeneralTask extends AbstractTask {
  id: string;
  isShowing: boolean;
  isExpanded: boolean;
  title: string;
  priority: Priority;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website?: string;
  comments: Comment[];
  assignedPeople: Person[];
  tags: string[];
  timer: Timer | null;
  project: Project;
  type: TaskType;

  constructor(
    id: string,
    isShowing: boolean,
    isExpanded: boolean,
    title: string,
    priority: number,
    description: string,
    dueDate: Date,
    tasks: Task[],
    website?: string,
    comments: Comment[],
    assignedPeople: Person[],
    tags: string[],
    timer: number | null,
    project: string
  ) {
    super(
      id,
      isShowing,
      isExpanded,
      title,
      priority,
      description,
      dueDate,
      tasks,
      website,
      comments,
      assignedPeople,
      tags,
      timer,
      project
    );
    this.type = "general";
  }

  markComplete(): void {
    this.isShowing = false;
  }

  markIncomplete(): void {
    this.isShowing = true;
  }

  addSubtask(subtask: Task): void {
    this.tasks.push(subtask);
  }

  removeSubtask(subtaskId: string): void {
    // Implementation for removing a subtask from the general task
  }

  updateSubtask(subtaskId: string, updatedSubtask: Task): void {
    // Implementation for updating a subtask in the general task
  }

  addComment(comment: Comment): void {
    // Implementation for adding a comment to the general task
  }

  removeComment(commentId: string): void {
    // Implementation for removing a comment from the general task
  }

  updateComment(commentId: string, updatedComment: Comment): void {
    // Implementation for updating a comment in the general task
  }

  assignPerson(person: Person): void {
    // Implementation for assigning a person to the general task
  }

  unassignPerson(personId: string): void {
    // Implementation for unassigning a person from the general task
  }

  addTag(tag: string): void {
    // Implementation for adding a tag to the general task
  }

  removeTag(tag: string): void {
    // Implementation for removing a tag from the general task
  }

  startTimer(): void {
    // Implementation for starting the timer for the general task
  }

  stopTimer(): void {
    // Implementation for stopping the timer for the general task
  }
}

class ReminderTask extends GeneralTask {
  id: string;
  isShowing: boolean;
  isExpanded: boolean;
  title: string;
  priority: Priority;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website?: string;
  comments: Comment[];
  assignedPeople: Person[];
  tags: string[];
  timer: Timer | null;
  project: Project;
  type: TaskType;

  constructor(
    id: string,
    isShowing: boolean,
    isExpanded: boolean,
    title: string,
    priority: number,
    description: string,
    dueDate: Date,
    tasks: Task[],
    website?: string,
    comments: Comment[],
    assignedPeople: Person[],
    tags: string[],
    timer: number | null,
    project: string
  ) {
    super(
      id,
      isShowing,
      isExpanded,
      title,
      priority,
      description,
      dueDate,
      tasks,
      website,
      comments,
      assignedPeople,
      tags,
      timer,
      project
    );
    this.type = "reminder";
  }
}

class NoteTask extends GeneralTask {
  id: string;
  isShowing: boolean;
  isExpanded: boolean;
  title: string;
  priority: Priority;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website?: string;
  comments: Comment[];
  assignedPeople: Person[];
  tags: string[];
  timer: Timer | null;
  project: Project;
  type: TaskType;

  constructor(
    id: string,
    isShowing: boolean,
    isExpanded: boolean,
    title: string,
    priority: number,
    description: string,
    dueDate: Date,
    tasks: Task[],
    website?: string,
    comments: Comment[],
    assignedPeople: Person[],
    tags: string[],
    timer: number | null,
    project: string
  ) {
    super(
      id,
      isShowing,
      isExpanded,
      title,
      priority,
      description,
      dueDate,
      tasks,
      website,
      comments,
      assignedPeople,
      tags,
      timer,
      project
    );
    this.type = "note";
  }
}

class EventTask extends GeneralTask {
  id: string;
  isShowing: boolean;
  title: string;
  priority: number;
  description: string;
  dueDate: Date;
  tasks: Task[];
  website: string;
  comments: string[];
  assignedPeople: string[];
  tags: string[];
  timer: number;
  project: string;
  details: EventDetails; // Updated field for event details

  constructor(
    id: string,
    isShowing: boolean,
    isExpanded: boolean,
    title: string,
    priority: number,
    description: string,
    dueDate: Date,
    tasks: Task[],
    website?: string,
    comments: Comment[],
    assignedPeople: Person[],
    tags: string[],
    timer: number | null,
    project: string
  ) {
    super(
      id,
      isShowing,
      isExpanded,
      title,
      priority,
      description,
      dueDate,
      tasks,
      website,
      comments,
      assignedPeople,
      tags,
      timer,
      project
    );
    this.type = "event";
  }
}

class TaskManager {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  addTask(task: Task): void {
    if (!task) {
      throw new Error("Invalid task");
    }

    this.tasks.push(task);
  }

  removeTask(taskId: string): void {
    if (!taskId) {
      throw new Error("Invalid task ID");
    }

    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("Task not found");
    }

    this.tasks.splice(index, 1);
  }

  updateTask(taskId: string, updatedTask: Task): void {
    if (!taskId) {
      throw new Error("Invalid task ID");
    }

    if (!updatedTask) {
      throw new Error("Invalid updated task");
    }

    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("Task not found");
    }

    this.tasks[index] = updatedTask;
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTasksByTag(tag: string): Task[] {
    if (!tag) {
      throw new Error("Invalid tag");
    }

    return this.tasks.filter((task) => task.tags.includes(tag));
  }

  getOverdueTasks(): Task[] {
    const today = new Date();
    return this.tasks.filter((task) => task.dueDate < today && !task.isShowing);
  }

  getTasksByPriority(priority: number): Task[] {
    if (priority < 1 || priority > 5) {
      throw new Error("Invalid priority");
    }

    return this.tasks.filter((task) => task.priority === priority);
  }

  getTasksByAssignedPerson(personId: string): Task[] {
    if (!personId) {
      throw new Error("Invalid person ID");
    }

    return this.tasks.filter((task) =>
      task.assignedPeople.find((person) => person.id === personId)
    );
  }

  getTasksByProject(project: string): Task[] {
    if (!project) {
      throw new Error("Invalid project");
    }

    return this.tasks.filter((task) => task.project.id === project);
  }

  getTasksByKeyword(keyword: string): Task[] {
    if (!keyword) {
      throw new Error("Invalid keyword");
    }

    const lowerKeyword = keyword.toLowerCase();
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerKeyword) ||
        task.description.toLowerCase().includes(lowerKeyword)
    );
  }
}
