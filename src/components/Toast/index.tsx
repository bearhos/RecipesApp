import ToastItem from './Item';
import {useAppDispatch, useAppSelector} from '@api/hook';
import {removeToast, toastSelector} from '@redux/Application/reducer';
import React from 'react';

const ToastSection = () => {
  const dispatch = useAppDispatch();
  const newToasts = useAppSelector(toastSelector);

  const onHideToast = (toastId: string) => () => {
    dispatch(removeToast(toastId));
  };

  const onShowToast = (toastId: string) => () => {};
  return (
    <>
      {newToasts.map((item, index) => (
        <ToastItem
          key={item.toastId}
          toastMessage={item.toastMessage ?? ''}
          toastType={item.toastType}
          showed={item.showed ?? true}
          liveDuration={3000}
          onHide={onHideToast(item.toastId ?? '')}
          onShow={onShowToast(item.toastId ?? '')}
          index={index}
        />
      ))}
    </>
  );
};

export default ToastSection;
