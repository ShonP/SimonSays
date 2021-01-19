import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback, useEffect, useState} from 'react';
import playSound from '../../shared/util/playSound';
import {Dimensions, Button, Modal, Text} from 'react-native';
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
  const [currentSequenceIdx, setCurrentSequenceIdx] = useState<number | null>(
    null,
  );
  const [isModal, setIsModal] = useState(false);
  const [savedSequence, setSavedSequence] = useState<Array<Number>>([]);
  const [isSequenceing, setIsSequencing] = useState(false);
  const sequence = useSelector(sequenceSelector);
  const dispatch = useDispatch();

  const addSequence = useCallback(() => {
    dispatch(sequenceActions.addSequence());
  }, [dispatch]);

  const onGameFinished = useCallback(
    (isWinner: boolean = false) => {
      setIsModal(true);
      dispatch(
        scoresActions.addScore({
          userName,
          score: isWinner ? sequence.length : sequence.length - 1,
        }),
      );
    },
    [dispatch, sequence.length, userName],
  );

  useEffect(() => {
    setSavedSequence([]);
  }, [sequence]);

  useEffect(() => {
    if (sequence.length) {
      setCurrentSequenceIdx(0);
      setIsSequencing(true);
    }
  }, [sequence]);

  const onAnimationEnd = useCallback(() => {
    if (currentSequenceIdx !== null) {
      if (currentSequenceIdx < sequence.length - 1) {
        setCurrentSequenceIdx(null);
        setCurrentSequenceIdx(currentSequenceIdx + 1);
      } else if (currentSequenceIdx === sequence.length - 1) {
        setCurrentSequenceIdx(null);
        setIsSequencing(false);
      }
    }
  }, [currentSequenceIdx, sequence.length]);

  const onPadPress = useCallback((padIdx) => {
    playSound(padIdx);
    setSavedSequence((prevState) => [...prevState, padIdx]);
  }, []);

  useEffect(() => {
    if (sequence.length) {
      if (savedSequence.length < 10) {
        const sequenceThatAreNotSame = savedSequence.filter(
          (seq, idx) => seq !== sequence[idx],
        );
        if (sequenceThatAreNotSame.length > 0) {
          onGameFinished();
        } else if (sequence.length === savedSequence.length) {
          setTimeout(() => {
            addSequence();
          }, 750);
        }
      } else if (savedSequence.length === sequence.length) {
        if (isEqual(savedSequence, sequence)) {
          onGameFinished(true);
        } else {
          onGameFinished();
        }
      }
    }
  }, [
    addSequence,
    dispatch,
    navigate,
    onGameFinished,
    savedSequence,
    sequence,
    userName,
  ]);

  const onCloseModal = useCallback(() => {
    navigate('Result');
  }, [navigate]);

  return (
    <Root>
      <Button
        disabled={!!sequence.length}
        title={`Start game as ${userName}`}
        onPress={addSequence}
      />
      <Modal
        animationType="slide"
        visible={isModal}
        onRequestClose={onCloseModal}>
        <Root>
          <Text>{`Congratulation ${userName} you scored ${
            sequence.length - 1
          }!`}</Text>

          <Button title="Close modal" onPress={onCloseModal} />
        </Root>
      </Modal>
      <Wrapper>
        {pads.map((padIdx) => (
          <Pad
            key={padIdx}
            disabled={sequence.length === 0 || isSequenceing}
            padIdx={padIdx}
            onPadPress={onPadPress}
            isHighlight={
              currentSequenceIdx === null
                ? false
                : sequence[currentSequenceIdx] === padIdx
            }
            onAnimationEnd={onAnimationEnd}
          />
        ))}
      </Wrapper>
    </Root>
  );
};

export default Game;
