import { useEffect, useState } from "react";
import { CreateTaskType, Status, Task, UpdateTaskType, createTaskSchema, updateTaskSchema } from "../types";
import { UseToggle } from "../../../shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskService } from "../request";
import { Alert } from "react-native";

function useTask() {


  const [data, setData] = useState<Task[]>([]);
  const [filtered, setFiltered] = useState<Task[]>([]);
  const [statusSelected, setStatusSelected] = useState<Status | ''>('');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showCreateModal, toggleCreateModal] = UseToggle(false);
  const [showUpdateModal, toggleUpdateModal] = UseToggle(false);

  useEffect(() => {
    handleFetchList();
  }, []);

  async function handleFetchList() {
    try {
      setIsLoading(true);
      const response = await TaskService.list();
      setData(response.data.data);
    } catch (error) {
      console.log(JSON.stringify(error));
      Alert.alert('Criar task', 'Erro ao listar tasks')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const newArray = data.filter(
      item =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase()) &&
        item?.status?.includes(statusSelected)
    );
    setFiltered(newArray);
  }, [data, searchText, statusSelected]);

  function handlePressItem(task: UpdateTaskType) {
    console.log(task);
    update.setValue('name', task.name);
    update.setValue('description', task.description);
    update.setValue('status', task.status);
    update.setValue('id', task.id);

    toggleUpdateModal();
  }

  function handlePressCreate() {
    toggleCreateModal();
  }

  const create = useForm<CreateTaskType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const update = useForm<UpdateTaskType>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onBlur',
  });

  async function handleCreate(formData: CreateTaskType) {
    const response = await TaskService.create({ task: formData as Task });
    if (response) {
      await handleFetchList();
      toggleCreateModal();
    }
  }

  async function handleUpdate(formData: UpdateTaskType) {
    const response = await TaskService.update({
      id: formData.id!,
      task: formData as Task,
    });
    if (response) {
      await handleFetchList();
      toggleUpdateModal();
    }
  }

  async function handleDelete(id: string) {
    const response = await TaskService.delete({
      id,
    });
    if (response) {
      await handleFetchList();
      toggleUpdateModal();
    }
  }

  function handleSelectStatus(status: Status) {
    if (status === statusSelected) {
      return setStatusSelected('');
    }
    setStatusSelected(status);
  }

  const options: Status[] = [Status.COMPLETED, Status.CANCELED, Status.IN_PROGRESS, Status.PENDING];

  return {
    showCreateModal,
    showUpdateModal,
    toggleUpdateModal,
    toggleCreateModal,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleFetchList,
    handlePressItem,
    handlePressCreate,
    handleSelectStatus,
    filtered,
    data,
    setSearchText,
    update,
    create,
    statusSelected,
    options,
    isLoading
  }
}

export default useTask;