import messagesReducer from './messageHandler/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import applicationReducer, {
  Slice as applicationSlice,
} from '@redux/Application/reducer';
import searchCurrent, {Slice as currentJob} from '@redux/JobSearch/reducer';
import categoryFood, {Slice as categoryFoodSlice} from '@redux/Home/reducer';
import sessionReducer, {Slice as sessionSlice} from '@redux/Session/reducer';
import recipeReducer, {Slice as recipeSlice} from '@redux/Recipes/reducer';
import {usersReducer} from '@redux/components/reducers';
import {MiddlewareArray, configureStore} from '@reduxjs/toolkit';
import {persistCombineReducers} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

const reducers = {

  searchCurrent: searchCurrent,
  session: sessionReducer,
  application: applicationReducer,
  categoryFood: categoryFood,
  recipes: recipeReducer,
};
type ReducerType = ReturnType<typeof rootReducer>;
type ReducerNameEnum = keyof ReducerType;
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  blacklist: [
    // these reducer have filtering dont need to save persist
    'searchCurrent',
 
  ] as ReducerNameEnum[] as string[],
};
const sagaMiddleware = createSagaMiddleware();

const middlewareArray = new MiddlewareArray().concat(sagaMiddleware);

export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);
export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: middlewareArray,
});
export type RootState = ReturnType<typeof persistedRootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default persistedRootReducer;
