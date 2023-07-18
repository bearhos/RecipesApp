import {FoodQueryParams, JobRequestParams} from './api';
import {ScheduleClass} from '@redux/learning/reducer';
import {RootState} from '@redux/reducers';
import {Classes} from '@redux/section/reducer';
import {ProfileItemType} from '@redux/userProfile/reducer';
import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';

export interface ListResponse<T> {
  data: T[];
  type: string;
}
export type CategoryItem = {
  id: number;
  title: string;
  image: string;

};
export interface SliceState {
  categoryFood: {
    [id in string]: ListResponse<CategoryItem>
  }
}
const initialState = {
  categoryFood: {},
} as SliceState;
export const Slice = createSlice({
  name: 'categoryFood',
  initialState,
  reducers: {
    UpdateFoodCategory(
      state: SliceState,
      action: PayloadAction<ListResponse<CategoryItem>>,
    ) {
      const foodId = action?.payload?.type
      const foodData = state.categoryFood[foodId]
      if(foodData){
        state.categoryFood[foodId]= action.payload;
      }
      else{
        state.categoryFood[foodId]= action.payload;
      }
    },
 
  }
});
export const {UpdateFoodCategory} = Slice.actions;
export const getCategoryFood = createAction<FoodQueryParams>(
  'categoryFood/getCategoryFoodAction',
);

export const selectFoodCategory= (type: string) => (state: RootState) =>
{
  return state.categoryFood.categoryFood[type]
}
 
// export const selectClassSimilar = (state: RootState) =>
//   state.classDetail.classSimilar;
// export const selectContentClass = (state: RootState) =>
//   state.classDetail.content;
// export const selectStudentOfClass = (state: RootState) =>
//   state.classDetail.studentOfClass;
// export const selectSchedulesGroup = (state: RootState) =>
//   state.classDetail.schedulesGroup;

export default Slice.reducer;
