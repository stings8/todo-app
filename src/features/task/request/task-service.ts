import { AxiosError, AxiosResponse } from "axios";
import api from "../../../services/api";
import { Status, Task } from "../types";

type RequestIdProps = {
  id: string;
}

type RequestUpdateProps = {
  id: string;
  task: Partial<Task>;
}

type RequestCreateProps = {
  task: Task;
}

type TaskResponse = {
  data: Task[];
}

const TaskService = {
  find: async ({ id }: RequestIdProps): Promise<AxiosResponse<Task>> => {
    const result = await api.get(`tasks/${id}`);
    return result;
  },
  list: async (): Promise<AxiosResponse<TaskResponse>> => {
    const result = await api.get('tasks');
    return result;
  },
  create: async ({ task }: RequestCreateProps): Promise<AxiosResponse<Task>> => {
    const result = await api.post('tasks', task);
    return result;
  },
  update: async ({ id, task }: RequestUpdateProps): Promise<AxiosResponse<Task>> => {
    const result = await api.put(`tasks/${id}`, {
      name: task.name,
      description: task.description,
      status: task.status,
    });
    return result;
  },
  delete: async ({ id }: RequestIdProps): Promise<AxiosResponse<any>> => {
    const result = await api.delete(`tasks/${id}`);
    return result;

  }
};

export default TaskService;