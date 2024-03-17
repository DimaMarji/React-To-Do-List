export type TaskFormProps = {
    open: boolean;
    onClose: () => void;
    onAddTask: (task: Task) => void;
  };
  
  export type Task = {
    id?: number|string;
    title: string;
    description: string;
    status?:TaskStatusType
  };
  export type TaskStatusType="pending"|"completed"