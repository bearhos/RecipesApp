import {RootState} from '@redux/reducers';
import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';


export enum ToastType {
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARNING = 'Warning',
}

export interface ToastState {
  toastMessage?: string;
  toastId?: string;
  showed?: boolean;
  toastType?: ToastType;
}
export interface SliceState {
  loading: boolean;
  toast: ToastState[];
}
const initialState = {
  loading: false,
  toast: [],
} as SliceState;
export const Slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setloading(state: SliceState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    showToast: (state: SliceState, {payload}: {payload: ToastState}) => {
      state.toast = [];
      state.toast.push({
        toastMessage: payload.toastMessage ?? '',
        toastId: `${Date.now()}`,
        showed: true,
        toastType: payload.toastType ?? ToastType.ERROR,
      });
    },

    removeToast: (state: SliceState, action: {payload: string}) => {
      const index = state.toast.findIndex(
        toast => toast.toastId === action.payload,
      );
      if (index !== -1) {
        state.toast.splice(index, 1);
      }
    },
  },
});
export const {setloading,showToast,removeToast} = Slice.actions;
export const toastSelector = (state: RootState) => state.application.toast;
export const selectloadingSelector = (state: RootState) =>
  state.application.loading;
export const launchAppAction = createAction('application/launchAppAction');
export default Slice.reducer;
