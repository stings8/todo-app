import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
  Container,
  Decription,
  Status,
  StatusText,
  Title,
  WrapperContent,
  styles
} from './styles';
import { Task } from '../../types';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';

type Props = {
  item: Task;
  index?: number;
} & TouchableOpacityProps;

const Item = ({ item, index, ...rest }: Props) => {
  return (
    <Container
      {...rest}
      style={[styles.shadow]}
      entering={FadeInUp.delay(index * 200)}
      exiting={FadeOutDown.delay(400)}
    >
      <>
        <WrapperContent>
          <Title>{item.name}</Title>
          <Decription>{item.description}</Decription>
        </WrapperContent>
        <Status status={item.status}>
          <StatusText>{item.status}</StatusText>
        </Status>
      </>
    </Container>
  );
};

export default Item;
