import {selectloadingSelector} from '@redux/Application/reducer';
import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

//

const DimmedOverlay = styled.View`
  flex-direction: column;
  background-color: ${props =>
    props.theme.colors.backgroundSecondary + props.theme.alpha.alpha_05};
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: ${props => props.theme.depthLevel.level_01};
  elevation: ${props => props.theme.depthLevel.level_01};
  shadow-color: transparent;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs(props => ({
  color: props.theme.colors.onSurface,
}))`
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const LoadingOverlay = () => {
  const loading = useSelector(selectloadingSelector);

  return loading ? (
    <DimmedOverlay>
      <ActivityIndicator animating size="large" color="white" />
    </DimmedOverlay>
  ) : null;
};

export default LoadingOverlay;
