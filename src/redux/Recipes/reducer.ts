import {FoodQueryParams, JobRequestParams} from './api';
import {ScheduleClass} from '@redux/learning/reducer';
import {RootState} from '@redux/reducers';
import {Classes} from '@redux/section/reducer';
import {ProfileItemType} from '@redux/userProfile/reducer';
import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';

export interface ListResponse<T> {
  data: T[];
  number: number;
  query?: string;
}
export type ExtendedIngredients = {
  aisle: string;
  amount: number;
  consitency: string;
  id: number;
  image: string;
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
};
export type RecipesItem = {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  cheap: boolean;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredients[];
};
export interface SliceState {
  recipe: RecipesItem;
  savedRecipe: ListResponse<RecipesItem>;
  searchRecipe: {
    [id in string]: ListResponse<RecipesItem>;
  };
}
const initialState = {
  recipe: {},
  savedRecipe: {
    data: [],
  },
  searchRecipe: {},
} as SliceState;
export const Slice = createSlice({
  name: 'recipeFood',
  initialState,
  reducers: {
    UpdateRecipeAction(state: SliceState, action: PayloadAction<RecipesItem>) {
      state.recipe = action.payload;
    },
    UpdateSearchRecipe(state: SliceState, action: PayloadAction<ListResponse<RecipesItem>>) {
      const searchId = action.payload.query ??''
      const searchData = state.searchRecipe[searchId];
      if(searchData && action.payload.number > 10){
        const moreData = action.payload.data.slice(action.payload.number - 10)
        state.searchRecipe[searchId].data = [...searchData.data,...moreData]
        state.searchRecipe[searchId].number = action.payload.number
      }else{
        state.searchRecipe[searchId] = action.payload
  
      }
    
    },
    AddFavoriteList(
      state: SliceState,
      action: PayloadAction<ListResponse<RecipesItem>>,
    ) {
      const savedata = state.savedRecipe.data;
      if (savedata) {
        state.savedRecipe.data = [...savedata, ...action.payload.data];
      } else {
        state.savedRecipe.data = action.payload.data;
      }
    },
    RemoveFavoriteList(state: SliceState, action: PayloadAction<{id: number}>) {
      const index = state.savedRecipe.data.findIndex(
        recipe => recipe.id == action.payload.id,
      );
      if (index > -1) {
        state.savedRecipe.data.splice(index, 1);
      }
    },
  },
});
export const {UpdateRecipeAction,UpdateSearchRecipe, AddFavoriteList, RemoveFavoriteList} =
  Slice.actions;
export const getRecipeAction = createAction<{id: number}>(
  'recipeFood/getRecipeAction',
);
export const getSearchRecipeAction = createAction<FoodQueryParams>(
  'recipeFood/getSearchRecipeAction',
);
export const selectRecipeData = (state: RootState) => state.recipes.recipe;
export const selectSavedRecipeData = (state: RootState) =>
  state.recipes.savedRecipe;
  export const selectSearchRecipeData = (id: string)=> (state: RootState) =>{
    return state.recipes.searchRecipe[id]
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
