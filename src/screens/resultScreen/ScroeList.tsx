import React, {FC} from 'react';
import {ScoreType} from 'shared/types';
import styled from 'styled-components/native';
import Score from './Score';

const Wrapper = styled.View`
  flex-direction: column;
  flex: 1;
`;

interface IProps {
  scores: Array<ScoreType>;
}

const ScoreList: FC<IProps> = ({scores}) => (
  <Wrapper>
    {scores.map((score) => (
      <Score key={score.userName} {...score} />
    ))}
  </Wrapper>
);

export default ScoreList;
