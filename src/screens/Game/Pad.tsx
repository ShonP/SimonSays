import React, {FC, useCallback, useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {get} from 'lodash';
import playSound from '../../shared/util/playSound';
import {Animated, Easing} from 'react-native';

const padColors = {0: 'blue', 1: 'red', 2: 'yellow', 3: 'turquoise'};

interface IProps {
  padIdx: number;
  isHighlight: boolean;
  disabled: boolean;
  onPadPress: (padIdx: number) => void;
}

interface IPad {
  color: string;
  isHighlight: boolean;
}

const TouchableOpacity = styled.TouchableOpacity`
  width: 50%;
  height: 50%;
  flex-wrap: wrap;
`;

const Pad: FC<IProps> = ({padIdx, onPadPress, disabled, isHighlight}) => {
  const theme = useTheme();
  const color = get(theme.palette, get(padColors, padIdx));
  const Animation = new Animated.Value(1);
  const onPress = useCallback(() => {
    onPadPress(padIdx);
  }, [onPadPress, padIdx]);

  useEffect(() => {
    if (isHighlight) {
      Animation.setValue(1);
      playSound(padIdx);
      Animated.timing(Animation, {
        toValue: 0.5,
        duration: 750,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(Animation, {
          toValue: 1,
          duration: 750,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [Animation, isHighlight, padIdx]);

  const opacity = Animation.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0.5, 1],
  });
  return (
    <TouchableOpacity disabled={disabled} touchSoundDisabled onPress={onPress}>
      <Animated.View
        style={{
          backgroundColor: color,
          opacity,
          height: '100%',
          width: '100%',
        }}
      />
    </TouchableOpacity>
  );
};

export default Pad;
