import {LoginPayload, RegisterPayload} from './api';
import {RootState} from '@redux/reducers';
import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';

export type LoginType = {
  username?: string;
  accessToken?: string;
  phoneNumber?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
};
export interface SliceState {
  AuthState: LoginType;
}
const initialState = {
  AuthState: {
    username: '',
    accessToken: '',
    phoneNumber: '',
    email: '',
    photoURL: '',
    uid: '',
  },
} as SliceState;
export const Slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    UpdateSessionData(state: SliceState, action: PayloadAction<LoginType>) {
      state.AuthState = action.payload;
    },
  },
});
export const {UpdateSessionData} = Slice.actions;
export const loginSessionAction = createAction<LoginPayload>(
  'session/loginSessionAction',
);
export const registerSessionAction = createAction<RegisterPayload>(
  'session/registerSessinAction',
);
export const logoutSessionAction = createAction('session/logoutSessinAction');
export const selectAccessToken = (state: RootState) =>
  state.session.AuthState.accessToken;
export const selectSession = (state: RootState) => state.session;
export default Slice.reducer;
