import styled from 'styled-components/native';
import { ms } from 'react-native-size-matters';
import { rgba } from 'polished';

type Props = {
  active: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
};

const statusColor = {
  PENDING: '#ff4d25',
  IN_PROGRESS: '#08519c',
  COMPLETED: '#00913d',
  CANCELED: '#c90000',
};

export const Container = styled.TouchableOpacity<Props>`
  width: ${ms(95)}px;
  height: ${ms(40)}px;

  border-radius: ${({ theme }) => theme.border.radius.md};
  border-color: ${({ status }) => statusColor[status]};
  border-width: ${({ active }) => (active ? ms(1) : ms(0.6))}px;
  background-color: ${({ active, status }) =>
    active ? rgba(statusColor[status], 0.2) : 'transparent'};

  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.padding.sm};
`;

export const Title = styled.Text<Props>`
  font-size: ${({ theme }) => theme.font.sm};
  font-weight: ${({ active }) => (active ? 500 : 400)};
  color: ${({ status }) => statusColor[status]};
`;
