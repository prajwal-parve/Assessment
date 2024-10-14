export interface Todo {
    id?: number;               // Unique identifier for the todo item (optional for new todos)
    userId: number;           // ID of the user who created the todo
    task: string;             // Description of the task
    isCompleted: boolean;      // Indicates if the task is completed
    dueDate?: Date;           // Optional due date for the task
    priority?: 'low' | 'medium' | 'high'; // Optional priority level
}
