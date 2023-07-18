// import Icon from '@components/Button/Icon';
import {useAppSelector} from '@api/hook';
import {MaxSize} from '@api/utils/common';
import {ToastType, toastSelector} from '@redux/Application/reducer';
import React, {useState, useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
import styled from 'styled-components/native';

const INITIAL_TOP_LANDSCAPE = 50;
const INITIAL_TOP_PORTRAIT = 20;
let {height, width} = Dimensions.get('window');

const Container = styled(Animated.View)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  elevation: 100;
  align-items: center;
  z-index: 100;
  margin-top: 10px;
`;

interface Props {
  positionValue?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  liveDuration?: number;
  opacity?: number;
  toastMessage: string;
  onHide: () => void;
  onShow: () => void;
  showed: boolean;
  index?: number;
  toastType?: ToastType;
}

const TitleToast = styled.Text`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 16px;
  font-weight: 600;
`;

const ContentToast = styled.Text`
  color: ${props => props.theme.colors.textHighlight};
  font-size: 15px;
`;

const ToastView = styled.View`
  padding: 20px;
  width: ${MaxSize.WIDTH}px;
`;

const ContainerToast = styled.View`
  min-height: 50px;
  background-color: ${props => props.theme.colors.backgroundPrimary};
  border-radius: 5px;
  flex-direction: row;
`;

const LineLeft = styled.View<{type?: ToastType}>`
  height: 100%;
  width: 5px;
  background-color: ${props =>
    props.type === ToastType.ERROR
      ? props.theme.colors.error
      : props.type === ToastType.SUCCESS
      ? props.theme.colors.success
      : props.theme.colors.warning};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const TextContainer = styled.View`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const ViewRight = styled.View`
  width: 32px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const DURATION = {
  LENGTH_LONG: 2000,
  LENGTH_SHORT: 500,
  FOREVER: 0,
};

const Toast: React.FC<Props> = ({
  positionValue = width > height ? INITIAL_TOP_LANDSCAPE : INITIAL_TOP_PORTRAIT,
  fadeInDuration = 500,
  fadeOutDuration = 500,
  liveDuration = DURATION.LENGTH_SHORT,
  opacity = 1.0,
  toastMessage,
  onHide,
  onShow,
  showed,
  index = 0,
  toastType,
}) => {
  const newToasts = useAppSelector(toastSelector);
  const toastMessagesArray = Object.keys(newToasts).map(
    (key: any) => newToasts[key],
  );
  const [isShow, setIsShow] = useState(false);
  const [initialTop, setInitialTop] = useState(positionValue);
  const opacityAnimatedValue = useRef(new Animated.Value(0)).current;
  const transformAnimatedValue = useRef(new Animated.Value(0)).current;
  let closeTimer: any = useRef(0);

  // Component will mount
  useEffect(() => {
    const dimensionHandler = (dims: any) => {
      width = dims.window.width;
      height = dims.window.height;
      if (width > height) {
        setInitialTop(INITIAL_TOP_LANDSCAPE);
      } else {
        setInitialTop(INITIAL_TOP_PORTRAIT);
      }
    };

    let dimensionsHandler = Dimensions.addEventListener(
      'change',
      dimensionHandler,
    );

    return function cleanup() {
      clearTimeout(closeTimer.current);
      dimensionsHandler.remove();
    };
  }, []);

  // Update Top
  useEffect(() => {
    let margin = 0;
    toastMessagesArray.forEach((item, i) => {
      if (i < index) {
        margin += 90;
      }
    });
    if (margin === 0) {
      margin = index * 90;
    }

    Animated.timing(transformAnimatedValue, {
      toValue: initialTop + margin,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {});
  }, [index, initialTop, transformAnimatedValue, toastMessagesArray]);

  // Show toast
  useEffect(() => {
    const showToast = () => {
      setIsShow(true);
      onShow();
      Animated.timing(opacityAnimatedValue, {
        toValue: opacity,
        duration: fadeInDuration,
        useNativeDriver: true,
      }).start(() => {
        if (liveDuration !== DURATION.FOREVER) {
          closeToast();
        }
      });
    };

    const closeToast = () => {
      let delay = liveDuration;

      if (delay === DURATION.FOREVER) {
        delay = 500;
      }

      closeTimer.current = setTimeout(() => {
        Animated.timing(opacityAnimatedValue, {
          toValue: 0.0,
          duration: fadeOutDuration,
          useNativeDriver: true,
        }).start(() => {
          setIsShow(false);
          onHide();
        });
      }, delay);
    };

    if (showed) {
      showToast();
    } else {
      setIsShow(false);
    }
  }, [
    fadeInDuration,
    fadeOutDuration,
    liveDuration,
    onHide,
    onShow,
    opacity,
    opacityAnimatedValue,
    showed,
  ]);

  return isShow ? (
    <Container
      style={{
        transform: [{translateY: transformAnimatedValue}],
      }}>
      <Animated.View
        style={{
          opacity: opacityAnimatedValue,
        }}>
        <ToastView>
          <ContainerToast>
            <LineLeft type={toastType} />
            {/* <Icon
              iconName={`${
                toastType === ToastType.SUCCESS
                  ? 'icon_check_outline'
                  : toastType === ToastType.ERROR
                  ? 'icon_prohibit'
                  : 'icon_warning'
              }`}
              size={22}
              disabled
              color={
                toastType === ToastType.SUCCESS
                  ? colorSuccess
                  : toastType === ToastType.ERROR
                  ? colorError
                  : colorWarning
              }
            /> */}
            <TextContainer>
              <TitleToast>{toastType}</TitleToast>
              <ContentToast>{toastMessage}</ContentToast>
            </TextContainer>

            {/* <ViewRight>
              <Icon
                iconName="icon_close"
                color={DefaultTheme.colors.gray_C4}
                onPress={onHide}
              />
            </ViewRight> */}
          </ContainerToast>
        </ToastView>
      </Animated.View>
    </Container>
  ) : (
    <></>
  );
};

export default Toast;
