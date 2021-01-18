import React, {FC, useCallback, useState} from 'react';
import {Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Input from '../../shared/components/Input';
import ScoreList from './ScroeList';
import {scoresSelector} from '../../shared/store/selectors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../shared/types';
import {sequenceActions} from '../../shared/store/slices/sequence';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  background-color: ${({theme}) => theme.palette.white};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Result'
>;

type IProps = {
  navigation: ProfileScreenNavigationProp;
};

const ResultScreen: FC<IProps> = ({navigation: {navigate}}) => {
  const scores = useSelector(scoresSelector);
  const dispatch = useDispatch();
  const [userName, setName] = useState('');

  const onNameChange = useCallback((e) => {
    setName(e.nativeEvent.text);
  }, []);

  const onGameStart = useCallback(() => {
    dispatch(sequenceActions.resetSequence());
    navigate('Game', {userName});
  }, [dispatch, navigate, userName]);

  return (
    <SafeAreaView>
      <Wrapper>
        <Input
          onChange={onNameChange}
          value={userName}
          placeholder="Enter your name"
        />
        <Button
          disabled={userName.length === 0}
          title={`Start game as ${userName}`}
          onPress={onGameStart}
        />
      </Wrapper>
      <Wrapper>
        <ScoreList scores={scores} />
      </Wrapper>
    </SafeAreaView>
  );
};

export default ResultScreen;
