import React, { useEffect } from "react";
import { Control, Controller, UseFormReturn } from "react-hook-form";
import { Button, Input } from "../../../../components";
import Selector from "../selector";
import { CreateTaskType, Status } from "../../types";
import {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";

import {
  Container,
  TextSelector,
  WrapperButton,
  Content,
  WrapperInput,
  Scroll
} from "./styles";


type Props = {
  control: Control
  toogleVisisble: () => void;
  options: Status[];
  form: UseFormReturn;
  handleUpdate: (data: CreateTaskType) => void;
  handleDelete: (id: string) => void;
}

function UpdateTask({
  control,
  toogleVisisble,
  options,
  form,
  handleUpdate,
  handleDelete
}: Props) {

  const scroll = useSharedValue(0);

  const slideAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: scroll.value }]
  }));


  useEffect(() => {
    scroll.value = withSequence(
      withTiming(-10, {
        duration: 500,
        easing: Easing.elastic()
      }),
      withTiming(0, {
        duration: 300,
        easing: Easing.elastic()
      })
    )
  }, []);

  console.log(form.getValues())

  return (
    <Container entering={FadeIn.duration(400)} intensity={45} tint="dark">
      <Content>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <WrapperInput>
              <Input
                placeholder="Digite o nome da tarefa"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
              />
            </WrapperInput>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <WrapperInput>
              <Input
                placeholder="Digite uma descrição da tarefa"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={error?.message}
              />
            </WrapperInput>
          )}
        />

        <TextSelector>Alterar status</TextSelector>
        <Scroll style={[slideAnimatedStyle]}>
          {
            options.map(
              (item) =>
                <Selector
                  key={item}
                  title={item}
                  status={item}
                  active={form.watch('status') === item}
                  onPress={() =>
                    form.setValue('status', item)
                  }
                />)
          }
        </Scroll>
        <WrapperButton>
          <Button onPress={() => handleUpdate(form.getValues())}>
            Atualizar Task
          </Button>
        </WrapperButton>
        <WrapperButton>
          <Button
            onPress={() => handleDelete(form.watch("id"))}>
            Deletar Task
          </Button>
        </WrapperButton>
        <WrapperButton>
          <Button onPress={toogleVisisble}>Fechar</Button>
        </WrapperButton>
      </Content>
    </Container>
  );
}

export default UpdateTask;