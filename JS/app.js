// Defining the Enums, interfaces and types
var PriorityLevel;
(function (PriorityLevel) {
    PriorityLevel["Low"] = "Low";
    PriorityLevel["Medium"] = "Medium";
    PriorityLevel["High"] = "High";
    PriorityLevel["Critical"] = "Critical";
})(PriorityLevel || (PriorityLevel = {}));
var TaskType;
(function (TaskType) {
    TaskType["Assignment"] = "Assignment";
    TaskType["Exam"] = "Exam";
})(TaskType || (TaskType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["NotStarted"] = "Not Started";
    TaskStatus["InProgress"] = "In Progress";
    TaskStatus["Done"] = "Done";
})(TaskStatus || (TaskStatus = {}));
const DueSoon = 2;
const pLvlScr = {
    [PriorityLevel.Critical]: 4,
    [PriorityLevel.High]: 3,
    [PriorityLevel.Medium]: 2,
    [PriorityLevel.Low]: 1,
};
// Defining Classes
class Courses {
    id;
    name;
    instructor;
    creditHrs;
    constructor(id, name, instructor, creditHrs) {
        this.id = id;
        this.name = name;
        this.instructor = instructor;
        this.creditHrs = creditHrs;
    }
}
class Tasks {
    id;
    title;
    courseId;
    dueDate;
    priorityLevel;
    status;
    type;
    constructor(id, title, courseId, dueDate, priorityLevel, status, type) {
        this.id = id;
        this.title = title;
        this.courseId = courseId;
        this.dueDate = dueDate;
        this.priorityLevel = priorityLevel;
        this.status = status;
        this.type = type;
    }
}
class Assignments extends Tasks {
    estimatedHrs;
    constructor(id, title, courseId, dueDate, priorityLevel, status, type, estimatedHrs) {
        super(id, title, courseId, dueDate, priorityLevel, status, type);
        this.estimatedHrs = estimatedHrs;
    }
}
class Exams extends Tasks {
    topics;
    importance;
    constructor(id, title, courseId, dueDate, priorityLevel, status, type, topics, importance) {
        super(id, title, courseId, dueDate, priorityLevel, status, type);
        this.topics = topics;
        this.importance = importance;
    }
}
class StudyPlanner {
    courses = [];
    studyHrsAv = new Map();
    tasks = [];
}
function daysUntilDue(dueDate) {
    const now = new Date();
    return (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
}
function isOverDue(dueDate) {
    return daysUntilDue(dueDate) < 0;
}
function isDueSoon(dueDate) {
    return daysUntilDue(dueDate) <= DueSoon;
}
function sortByDueDate(tasks) {
    return tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}
function urgencyFromDaysDue(dueDate) {
    const days = daysUntilDue(dueDate);
    if (isOverDue(dueDate)) {
        return 4;
    }
    else if (isDueSoon(dueDate)) {
        return 3;
    }
    else if (days < 7) {
        return 2;
    }
    else {
        return 1;
    }
}
function prioritization(task) {
    const num = pLvlScr[task.priorityLevel];
    const urg = urgencyFromDaysDue(task.dueDate);
    if (task instanceof Exams) {
        return num + urg + task.importance;
    }
    else {
        return num + urg;
    }
}
function taskSort(task) {
    return task.sort((a, b) => prioritization(b) - prioritization(a));
}
function taskOverDue(tasks) {
    return tasks.filter((task) => isOverDue(task.dueDate));
}
function isUpcoming(tasks) {
    return tasks.filter((task) => !isOverDue(task.dueDate));
}
function filterByCourse(tasks, courseId) {
    return tasks.filter((task) => task.courseId === courseId);
}
function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
function filterByPriority(tasks, priority) {
    return tasks.filter((task) => task.priorityLevel === priority);
}
export {};
//# sourceMappingURL=app.js.map