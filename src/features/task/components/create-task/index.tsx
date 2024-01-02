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
  handleCreate: (data: CreateTaskType) => void;
}

function CreateTask({
  control,
  toogleVisisble,
  options,
  form,
  handleCreate
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


  return (
    <Container entering={FadeIn.duration(400)} intensity={45} tint="dark">
      <Content>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur },
            fieldState: { error }
          }) => (
            <WrapperInput>
              <Input
                placeholder="Digite o nome da tarefa"
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            </WrapperInput>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({
            field: { onChange, onBlur },
            fieldState: { error }
          }) => (
            <WrapperInput>
              <Input
                placeholder="Digite uma descrição da tarefa"
                onChangeText={onChange}
                onBlur={onBlur}
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
          <Button onPress={form.handleSubmit(handleCreate)}>
            Criar Task
          </Button>
        </WrapperButton>
        <WrapperButton>
          <Button onPress={toogleVisisble}>Fechar</Button>
        </WrapperButton>
      </Content>
    </Container>
  );
}

export default CreateTask;