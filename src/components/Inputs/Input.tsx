import DefaultTheme from '@assets/theme';
import i18n from '@locales/index';
import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, View, KeyboardTypeOptions} from 'react-native';
import styled from 'styled-components/native';

const InputCustom = styled.TextInput.attrs(() => ({
  autoCapitalize: 'none',
}))`
  height: 52px;
  width: 100%;
  font-size: 16px;
  font-family: ${props => props.theme.fonts.kumbhsans.regular};
  color: ${props => props.color ?? props.theme.colors.textPrimary};
`;
const ContainerInput = styled.View<{marginTop?: number; color: string}>`
  width: 100%;
  /* border-color: ${props => props.color};
  border-width: 0.7px; */
  flex-direction: row;
  margin-top: ${props => props.marginTop || 0}px;
  background-color: ${props =>
    props.theme.colors.onSurface + props.theme.alpha.alpha_02};
  align-items: center;
  padding-left: 19px;
`;
const TextError = styled.Text`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

interface Props {
  control: any;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  rules?: any;
  autoFocus?: any;
  errorInput?: object;
  margin?: any;
  marginTop?: number;
  contentStyle?: Object;
  textInputStyle?: Object;
  placeholderTextColor?: string;
  title?: string;
  keyboardType?: KeyboardTypeOptions;
  defaultValue?: string;
}

const Input: React.FC<Props> = ({
  errorInput,
  autoFocus = false,
  control,
  name,
  contentStyle,
  textInputStyle,
  marginTop,
  placeholder = '',
  secureTextEntry,
  title,
  placeholderTextColor,
  rules = {},
  keyboardType,
  defaultValue = '',
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <ContainerInput
              style={contentStyle}
              marginTop={marginTop}
              color={
                errorInput && error && error?.message !== 'init errors'
                  ? 'red'
                  : 'white'
              }>
              <InputCustom
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : DefaultTheme.colors.textSecondary
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                Error={error}
                autoFocus={autoFocus}
                keyboardType={keyboardType}
                autoCapitalize={'none'}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={textInputStyle}
                defaultValue={defaultValue}
              />
            </ContainerInput>
            {error?.message !== 'init errors' && error && errorInput && (
              <TextError>{error.message}</TextError>
            )}
          </>
        )}
      />
    </View>
  );
};

export default Input;
