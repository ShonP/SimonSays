import React, {FC} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {get} from 'lodash';
import playSound from '../../shared/util/playSound';

const padColors = {0: 'blue', 1: 'red', 2: 'yellow', 3: 'turquoise'};

interface IProps {
  padIdx: number;
}

interface IPad {
  color: string;
}

const TouchableOpacity = styled.TouchableOpacity`
  width: 50%;
  height: 50%;
  flex-wrap: wrap;
  background: ${({color}: IPad) => color};
`;

const Pad: FC<IProps> = ({padIdx}) => {
  const theme = useTheme();
  const color = get(theme.palette, get(padColors, padIdx));
  return <TouchableOpacity color={color} onPress={() => playSound(padIdx)} />;
};

export default Pad;
