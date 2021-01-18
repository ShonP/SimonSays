import * as React from 'react';
import {useState, FC, useCallback} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

const StyledTextInput = styled.TextInput`
  height: 40px;
  padding-left: 6px;
`;

const TextInput: FC<TextInputProps> = ({onBlur, onFocus, ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    palette: {blue, lightGray},
  } = useTheme();

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  return (
    <StyledTextInput
      selectionColor={blue}
      underlineColorAndroid={isFocused ? blue : lightGray}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={styles.textInput}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
});

export default TextInput;
