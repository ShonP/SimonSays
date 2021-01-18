import React, {FC} from 'react';
import styled from 'styled-components/native';
import {ScoreType} from '../../shared/types';

const Wrapper = styled.View`
  flex-direction: row;
`;

const Text = styled.Text``;

const Score: FC<ScoreType> = ({userName, score}) => (
  <Wrapper>
    <Text>
      {userName}: {score} points
    </Text>
  </Wrapper>
);

export default Score;
