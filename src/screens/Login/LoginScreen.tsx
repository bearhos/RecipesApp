import {useAppDispatch} from '@api/hook';
import ButtonPrimary from '@components/Button';
import {navigateTo, replace} from '@navigations/index';
import {loginSessionAction} from '@redux/Session/reducer';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAvoidingView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

interface FormData {
  email: string;
  password: string;
}
const GoogleIcon = require('./googleIcon.png');
const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function onSubmit(data: FormData) {
    dispatch(
      loginSessionAction({
        email: data.email,
        password: data.password,
      }),
    );
  }
  return (
    <Container>
      <TitleLogin>Welcome Back!</TitleLogin>
      <TitleSubText>
        Fill your details or continue with social media
      </TitleSubText>

      <ContainerInputEmail
        marginTop={30}
        errors={errors.password}
        borderColor={
          errors.password?.type === 'required' ||
          errors.password?.type === 'minLength'
            ? theme.colors.error
            : theme.colors.onSurface + theme.alpha.alpha_02
        }>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputEmail
              placeholder={'Email Address'}
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="email"
        />
        <IconView>
          <InputIcon iconName="envelope-o" />
        </IconView>
      </ContainerInputEmail>
      <ContainerInputEmail
        marginTop={10}
        errors={errors.password}
        borderColor={
          errors.password?.type === 'required' ||
          errors.password?.type === 'minLength'
            ? theme.colors.error
            : theme.colors.onSurface + theme.alpha.alpha_02
        }>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputEmail
              placeholder={'Password'}
              keyboardType="email-address"
              onChangeText={onChange}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="password"
        />
        <IconView>
          <InputIcon iconName="lock" />
        </IconView>
        <TouchableIcon onPress={() => setShowPassword(!showPassword)}>
          <InputEye showPassword={showPassword} iconName="eye" />
        </TouchableIcon>
      </ContainerInputEmail>
      <ForgotPasswordText>Forget Password?</ForgotPasswordText>
      <LoginButton onPress={handleSubmit(onSubmit)} />
      <ExtertalTextContainer>
        <ExternalTextLine />
        <ExternalText>Or Coutinue With</ExternalText>
      </ExtertalTextContainer>
      <LoginSSOContainer>
        <LoginSSOIcon backgroundColor={'#E9F4FF'}>
          <ImageIcon source={GoogleIcon} />
        </LoginSSOIcon>
        <LoginSSOIcon backgroundColor={'#4460A0'}>
          <FacebookIcon />
        </LoginSSOIcon>
      </LoginSSOContainer>
      <RegisterContainer>
        <RegisterTextSimple>New User?</RegisterTextSimple>
        <Touchable>
          <RegisterTextBold onPress={() => navigateTo('RegisterScreen')}>
            Create Account
          </RegisterTextBold>
        </Touchable>
      </RegisterContainer>
    </Container>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fbfbfb;
`;
const TitleLogin = styled.Text`
  font-size: 34px;
  font-weight: 700;
  line-height: 44px;
  margin: 0 30px;
  padding-top: 60px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;
const TitleSubText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  font-family: 'Poppins-Black';
  padding: 0 30px;
  width: 80%;
  margin-top: 5px;
  color: #6a6a6a;
`;
const TextInputEmail = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.textSecondary,
  autoCapitalize: false,
}))`
  font-size: 16px;
  padding-left: 19px;

  padding-right: 19px;
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-weight: 400;
  margin-left: 30px;
  font-family: ${props => props.theme.fonts.poppins.black};
  color: ${props => props.color ?? props.theme.colors.textPrimary};
  line-height: 18px;
`;
const ContainerInputEmail = styled.View<{borderColor: string; errors: boolean}>`
  flex-direction: row;
  width: 90%;
  margin-top: ${props => props.marginTop}px;
  height: 52px;

  border-radius: 12px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
  align-self: center;
  margin-bottom: 12px;
  border-width: ${props => (props.errors ? 1 : 0)}px;
  border-color: ${props =>
    props.borderColor ||
    props.theme.colors.onSurface + props.theme.alpha.alpha_02};
`;

const IconView = styled.View`
  position: absolute;
  left: 15px;
  top: 12px;
`;
const InputIcon = styled(Icon).attrs(props => ({
  name: props.iconName,
  size: 22,
  color: 'black',
}))<{iconName: string}>``;
const InputEye = styled(Icon).attrs(props => ({
  name: props.showPassword ? 'eye' : 'eye-slash',
  size: 22,
  color: props.showPassword ? 'black' : '#6A6A6A',
}))<{iconName: string}>``;
const TouchableIcon = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 12px;
`;
const ForgotPasswordText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  line-height: 26px;
  font-family: 'Poppins-Black';
  padding: 0 30px;
  text-align: right;
  /* margin-top: 5px; */
  color: #6a6a6a;
`;
const LoginButton = styled(ButtonPrimary).attrs(props => ({
  contentStyle: {
    marginHorizontal: 20,
    marginTop: 40,
  },

  text: 'LOG IN',
}))``;
const ExtertalTextContainer = styled.View`
  margin-top: 40px;
`;
const ExternalTextLine = styled.View`
  align-self: center;
  position: absolute;
  border-bottom-color: #9e9e9e;
  border-bottom-width: 1px;
  height: 50%;
  width: 50%;
`;
const ExternalText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  background-color: #fbfbfb;
  font-family: 'Poppins-Black';
  padding: 0 10px;
  align-self: center;
  /* margin-top: 5px; */
  color: #9e9e9e;
`;
const LoginSSOContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: row;
`;
const LoginSSOIcon = styled.TouchableOpacity`
  align-self: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 20px;
  margin-horizontal: 10px;
  background-color: ${props => props.backgroundColor};
`;
const ImageIcon = styled.Image`
  height: 34px;
  width: 34px;
  align-self: center;
`;
const FacebookIcon = styled(Icon).attrs(props => ({
  name: 'facebook',
  size: 34,
  color: 'white',
}))`
  align-self: center;
  justify-content: center;
`;
const RegisterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const RegisterTextSimple = styled.Text`
  font-size: 16px;
  font-weight: 400;

  font-family: 'Poppins-Black';

  align-self: center;
  /* margin-top: 5px; */
  color: #9e9e9e;
`;
const RegisterTextBold = styled.Text`
  font-size: 16px;
  font-weight: 600;

  font-family: 'Poppins-Black';
  margin-left: 5px;
  align-self: center;
  /* margin-top: 5px; */
  color: black;
`;
const Touchable = styled.TouchableOpacity``;
export default LoginScreen;
