import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback, useEffect, useState} from 'react';
import playSound from '../../shared/util/playSound';
import {Dimensions, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {sequenceActions} from '../../shared/store/slices/sequence';
import {scoresActions} from '../../shared/store/slices/scores';
import {sequenceSelector} from '../../shared/store/selectors';
import {RootStackParamList} from '../../shared/types';
import Pad from './Pad';
import {isEqual} from 'lodash';

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

type IProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

const Game: FC<IProps> = ({
  route: {
    params: {userName},
  },
  navigation: {navigate},
}) => {
  const [currentHighlight, setCurrentHighlight] = useState<number | null>(null);
  const [savedSequence, setSavedSequence] = useState<Array<Number>>([]);
  const sequence = useSelector(sequenceSelector);
  const dispatch = useDispatch();
  const onGameStart = () => {
    dispatch(sequenceActions.addSequence());
  };
  console.log({sequence, savedSequence});

  useEffect(() => {
    setSavedSequence([]);
  }, [sequence]);

  useEffect(() => {
    if (sequence.length) {
      setCurrentHighlight(sequence[0]);
    }
  }, [sequence]);

  const onPadPress = useCallback((padIdx) => {
    playSound(padIdx);
    setSavedSequence((prevState) => [...prevState, padIdx]);
  }, []);

  useEffect(() => {
    if (sequence.length && savedSequence.length === sequence.length) {
      if (isEqual(savedSequence, sequence)) {
        setTimeout(() => {
          dispatch(sequenceActions.addSequence());
        }, 750);
      } else {
        dispatch(
          scoresActions.addScore({userName, score: savedSequence.length}),
        );
        navigate('Result');
      }
    }
  }, [dispatch, navigate, savedSequence, sequence, userName]);

  return (
    <Root>
      <Button
        disabled={!!sequence.length}
        title={`Start game as ${userName}`}
        onPress={onGameStart}
      />
      <Wrapper>
        {pads.map((padIdx) => (
          <Pad
            key={padIdx}
            disabled={sequence.length === 0}
            padIdx={padIdx}
            onPadPress={onPadPress}
            isHighlight={currentHighlight === padIdx}
            setCurrentHighlight={setCurrentHighlight}
          />
        ))}
      </Wrapper>
    </Root>
  );
};

export default Game;
