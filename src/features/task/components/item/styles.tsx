import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import styled from 'styled-components/native';

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }
})

export const Container = styled(ButtonAnimated).attrs({
  activeOpacity: 0.4,
})`
  height: ${ms(58)}px;

  flex-direction: row;

  background-color: ${({ theme }) => theme.color.white};

  border-radius: ${({ theme }) => theme.border.radius.md};

  align-items: center;
  justify-content: space-between;

  padding-left: ${({ theme }) => theme.padding.lg};
  padding-right: ${({ theme }) => theme.padding.lg};
  padding-top: ${({ theme }) => theme.padding.md};
  padding-bottom: ${({ theme }) => theme.padding.md};
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.color.primary.contrastText};
  font-size: ${({ theme }) => theme.font.lg};
`;

export const Decription = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: ${({ theme }) => theme.color.primary.contrastText};
  font-size: ${({ theme }) => theme.font.sm};

  margin-top: ${ms(4)}px;
`;

export const WrapperContent = styled.View`
  flex: 1;
`;

type StatusType = {
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
};

const statusColor = {
  PENDING: '#ff4d25',
  IN_PROGRESS: '#08519c',
  COMPLETED: '#00913d',
  CANCELED: '#c90000',
};

export const Status = styled.View<StatusType>`
  width: ${ms(90)}px;
  height: ${ms(35)}px;

  border-radius: ${({ theme }) => theme.border.radius.lg};

  background-color: ${({ status }) => statusColor[status]};

  align-items: center;
  justify-content: center;

  margin-left: ${ms(8)}px;
`;

export const StatusText = styled.Text`
  font-size: ${({ theme }) => theme.font.sm};
  font-weight: 500;

  color: ${({ theme }) => theme.color.white};
`;
