/** Задача */
export interface Task{
    /** Идентификатор задачи */
    id: number;

    /** Задача */
    task: string;

    /** Флаг выполнена/не выполнена задача */
    isCompleted: boolean;
}
