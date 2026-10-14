// Defining the Enums, interfaces and types

enum PriorityLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

enum TaskType {
  Assignment = "Assignment",
  Exam = "Exam",
}

enum TaskStatus {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Done = "Done",
}

const DueSoon = 2;
const pLvlScr: Record<PriorityLevel, number> = {
  [PriorityLevel.Critical]: 4,
  [PriorityLevel.High]: 3,
  [PriorityLevel.Medium]: 2,
  [PriorityLevel.Low]: 1,
};
interface Course {
  id: number;
  name: string;
  instructor: string;
  creditHrs: number;
}

interface Task {
  id: number;
  title: string;
  courseId: number;
  dueDate: Date;
  priorityLevel: PriorityLevel;
  status: TaskStatus;
  type: TaskType;
}

interface Assignment extends Task {
  type: TaskType.Assignment;
  estimatedHrs: number;
}

interface Exam extends Task {
  type: TaskType.Exam;
  topics: string;
  importance: number;
}

type studyHrsAvailability = Map<string, number>;

// Defining Classes
class Courses implements Course {
  constructor(
    public id: number,
    public name: string,
    public instructor: string,
    public creditHrs: number,
  ) {}
}

class Tasks implements Task {
  constructor(
    public id: number,
    public title: string,
    public courseId: number,
    public dueDate: Date,
    public priorityLevel: PriorityLevel,
    public status: TaskStatus,
    public type: TaskType,
  ) {}
}

class Assignments extends Tasks {
  estimatedHrs: number;
  constructor(
    id: number,
    title: string,
    courseId: number,
    dueDate: Date,
    priorityLevel: PriorityLevel,
    status: TaskStatus,
    type: TaskType,
    estimatedHrs: number,
  ) {
    super(id, title, courseId, dueDate, priorityLevel, status, type);
    this.estimatedHrs = estimatedHrs;
  }
}

class Exams extends Tasks {
  topics: string;
  importance: number;
  constructor(
    id: number,
    title: string,
    courseId: number,
    dueDate: Date,
    priorityLevel: PriorityLevel,
    status: TaskStatus,
    type: TaskType,
    topics: string,
    importance: number,
  ) {
    super(id, title, courseId, dueDate, priorityLevel, status, type);
    this.topics = topics;
    this.importance = importance;
  }
}

class StudyPlanner {
  courses: Courses[] = [];
  studyHrsAv: studyHrsAvailability = new Map();
  tasks: (Assignments | Exams)[] = [];
}

function daysUntilDue(dueDate: Date) {
  const now = new Date();
  return (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
}

function isOverDue(dueDate: Date): boolean {
  return daysUntilDue(dueDate) < 0;
}

function isDueSoon(dueDate: Date): boolean {
  return daysUntilDue(dueDate) <= DueSoon;
}

function sortByDueDate(tasks: (Assignments | Exams)[]) {
  return tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

function urgencyFromDaysDue(dueDate:Date) : number{
 const days = daysUntilDue(dueDate)
 if(isOverDue(dueDate)){
    return 4;
 } else if(isDueSoon(dueDate)){
    return 3; 
 } else if(days < 7){
    return 2;
 }else{
    return 1
 }
}

function prioritization(task:(Assignments|Exams)): number {
    const num = pLvlScr[task.priorityLevel];
    const urg = urgencyFromDaysDue(task.dueDate)

    if(task instanceof Exams){
        return num + urg + task.importance
    }else{
        return num + urg
    }
}

function taskSort (task:(Assignments|Exams)[]){
    return task.sort((a,b) => prioritization(b) - prioritization(a))
}

function taskOverDue(tasks: (Assignments | Exams)[]): (Assignments | Exams)[] {
  return tasks.filter((task) => isOverDue(task.dueDate));
}

function isUpcoming(tasks:(Assignments | Exams)[]):(Assignments | Exams)[]{
    return tasks.filter((task) => !isOverDue(task.dueDate));
}

function filterByCourse(tasks: (Assignments | Exams)[], courseId: number){
    return tasks.filter((task)=> task.courseId === courseId);
}

function filterByStatus(tasks: (Assignments | Exams)[], status:TaskStatus){
    return tasks.filter((task)=> task.status === status); 
}

function filterByPriority(tasks: (Assignments | Exams)[], priority: PriorityLevel){
    return tasks.filter((task) => task.priorityLevel === priority);
}