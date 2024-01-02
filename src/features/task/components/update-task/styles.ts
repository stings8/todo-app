import { BlurView } from 'expo-blur';
import { FlatList, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import styled from 'styled-components/native';

const BlurAnimated = Animated.createAnimatedComponent(BlurView);

export const Container = styled(BlurAnimated)`
  flex: 1;

  align-items: center;
  justify-content: center;
`
export const TextSelector = styled.Text`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary.contrastText};

  text-align: left;
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.padding.xl};

  width: 80%;
  max-width: ${ms(320)}px;

  border-radius: ${ms(20)}px;

  background-color: ${({ theme }) => theme.color.background};
`;

export const WrapperInput = styled.View`
  margin-bottom: ${ms(8)}px;
`;

export const Scroll = styled(Animated.ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: ms(8)
  }
})`
  height: ${ms(70)}px;

  padding-top: ${ms(10)}px;
  padding-bottom: ${ms(10)}px;
`;


export const WrapperButton = styled.View`
  margin-bottom: ${ms(8)}px;
`;
