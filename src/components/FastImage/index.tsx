import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ViewProps, TextStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import styled from 'styled-components/native';

//

//

export interface ComponentPropsInteface {
  contentStyle?: ViewProps;
  emptyText?: string;
  onPress?: () => void;
  emptyTextStyle?: TextStyle;
  mediumUrl?: string;
}

const ContentView = styled.TouchableOpacity``;
const BackdropView = styled.View`
  background-color: ${props =>
    props.theme.colors.textSecondary + props.theme.alpha.alpha_04};
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: ${props => props.theme.colors.textHighlight};
  font-size: 30px;
  line-height: 32px;
  font-family: ${props => props.theme.fonts.poppins.bold};
`;

const Component = ({
  emptyText,
  contentStyle,
  onPress,
  style,
  emptyTextStyle,
  mediumUrl,
  ...props
}: ComponentPropsInteface & {style?: any} & FastImageProps) => {
  const [undoneProgress, setUndoneProgress] = useState(true);
  const isError = useRef(false);
  let haveSource = false;
  if (typeof props?.source === 'number') {
    haveSource = true;
  } else if (props?.source?.uri || mediumUrl) {
    haveSource = true;
  }

  const renderEmptyComponent = () => {
    if (emptyText) {
      return <EmptyText style={emptyTextStyle}>{emptyText}</EmptyText>;
    }
    if (props.defaultSource) {
      return <FastImage style={[style]} source={props.defaultSource} />;
    }

    return null;
  };

  useEffect(() => {
    // if (props.source) {
    //   setUndoneProgress(true);
    // }
  }, [props.source]);

  const RenderAvatar = useCallback(() => {
    const newProps = {...props, source: null};
    return (
      <>
        <FastImage
          style={[style]}
          defaultSource={require('./activityProgress.gif')}
          {...props}
          onLoadEnd={() => {
            mediumUrl && !isError.current && setUndoneProgress(false);
          }}
          onError={() => {
            isError.current = true;
          }}
        />
        {undoneProgress && mediumUrl && (
          <MediumImage
            style={[style]}
            {...newProps}
            defaultSource={require('./activityProgress.gif')}
            source={{uri: mediumUrl}}
          />
        )}
      </>
    );
  }, [mediumUrl, props, style, undoneProgress]);

  return (
    <ContentView
      style={contentStyle}
      onPress={onPress}
      disabled={onPress ? false : true}>
      {haveSource ? (
        <RenderAvatar />
      ) : (
        <BackdropView style={style}>{renderEmptyComponent()}</BackdropView>
      )}
    </ContentView>
  );
};

const MediumImage = styled(FastImage)`
  position: absolute;
`;

export default Component;
