import React from 'react';
import { ActivityIndicator } from "react-native";
import {
  Status,
} from '../../features/task/types';
import {
  Container,
  CreateButton,
  CreateButtonText,
  List,
  ListSelector,
  TextSelector,
  Title,
  Wrapper,
  WrapperHeader,
  WrapperSearchInput,
  WrapperSelectFilter,
} from './styles';
import { Input } from '../../components';
import {
  CreateTask,
  Item,
  Selector,
  UpdateTask
} from '../../features/task';
import { useTask } from '../../features/task/hooks';
import { Portal } from 'react-native-portalize';



export function ListTasks() {

  const {
    handleCreate,
    handleDelete,
    handleUpdate,
    handlePressCreate,
    handlePressItem,
    filtered,
    showCreateModal,
    showUpdateModal,
    setSearchText,
    handleSelectStatus,
    update,
    create,
    statusSelected,
    toggleUpdateModal,
    toggleCreateModal,
    options,
    isLoading
  } = useTask();

  return (
    <Container>
      <Wrapper>
        <Title>Todo List</Title>
        <WrapperHeader>
          <WrapperSearchInput>
            <Input placeholder="Pesquisar task" onChangeText={setSearchText} />
          </WrapperSearchInput>
          <CreateButton onPress={handlePressCreate}>
            <CreateButtonText>Criar</CreateButtonText>
          </CreateButton>
        </WrapperHeader>
        <WrapperSelectFilter>
          <TextSelector>Buscar por status</TextSelector>

          <ListSelector
            data={options}
            renderItem={({ item }) => (
              <Selector
                active={statusSelected === item}
                status={item as Status}
                title={item}
                onPress={() =>
                  handleSelectStatus(item)
                }
              />
            )}
          />
        </WrapperSelectFilter>
      </Wrapper>
      {
        isLoading ?
          <ActivityIndicator size="large" /> :
          <List
            data={filtered}
            renderItem={({ item }) => (
              <Item onPress={() => handlePressItem(item)} item={item} />
            )}
          />
      }

      <Portal>
        {
          showUpdateModal &&
          <UpdateTask
            control={update.control}
            toogleVisisble={toggleUpdateModal}
            options={options}
            form={update}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        }
        {showCreateModal &&
          <CreateTask
            control={create.control}
            toogleVisisble={toggleCreateModal}
            options={options}
            form={create}
            handleCreate={handleCreate}
          />
        }
      </Portal>


    </Container>
  );
}
