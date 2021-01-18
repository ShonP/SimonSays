import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Pad from './Pad';

const Root = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  height: ${Dimensions.get('window').height * 0.5}px;
  border-radius: ${Math.round(
    Dimensions.get('window').width + Dimensions.get('window').height,
  ) / 2}px;
  overflow: hidden;
`;

const pads = [0, 1, 2, 3];
const Text = styled.Text``;

const Game = () => (
  <Root>
    <Wrapper>
      {pads.map((padIdx) => (
        <Pad key={padIdx} padIdx={padIdx} />
      ))}
    </Wrapper>
  </Root>
);

export default Game;
