import React from 'react';
import playSound from '../../shared/util/playSound';
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Input from '../../shared/components/Input';

const ScrollView = styled.ScrollView``;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.palette.white};
`;

const Score = () => {
  const store = useSelector((state) => state);
  console.log(store);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Wrapper>
          <Input />
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Score;
