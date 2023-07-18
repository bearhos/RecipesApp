import {JobRequestParams} from './api';
import {ScheduleClass} from '@redux/learning/reducer';
import {RootState} from '@redux/reducers';
import {Classes} from '@redux/section/reducer';
import {ProfileItemType} from '@redux/userProfile/reducer';
import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';

export interface ListResponse<T> {
  data: T[];
  parameters?: {
    query: string;
    page: number;
    numPages: number;
    datePosted: string;
  };
}
export type SearchItem = {
  employer_name: string;
  employer_logo: string;
  employer_website: string;
  employer_company_type: string;
  job_publisher: string;
  job_id: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_apply_quality_score: number;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string;
  job_google_link: string;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number;

  job_required_skills: string;

  job_experience_in_place_of_education: boolean;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_currency: string;
  job_salary_period: string;
  job_highlights: string;
  job_job_title: string;
  job_posting_language: string;
  job_onet_soc: string;
};
export interface SliceState {
  popularJob: ListResponse<SearchItem>;
  recentJob: ListResponse<SearchItem>;
}
const initialState = {
  popularJob: {},
  recentJob: {},
} as SliceState;
export const Slice = createSlice({
  name: 'currentJob',
  initialState,
  reducers: {
    UpdateSearchCurrentData(
      state: SliceState,
      action: PayloadAction<ListResponse<SearchItem>>,
    ) {
      state.popularJob = action.payload;
    },
    UpdateSearchRecentJob(
      state: SliceState,
      action: PayloadAction<ListResponse<SearchItem>>,
    ) {
      state.recentJob = action.payload;
    },
  }
});
export const {UpdateSearchCurrentData, UpdateSearchRecentJob} = Slice.actions;
export const getDataSearchCurrentAction = createAction<JobRequestParams>(
  'currentJob/getDataSearchCurrentAction',
);

export const selectSearchCurrenData = (state: RootState) =>
  state?.searchCurrent.popularJob;
  export const selectSearchRecentData = (state: RootState) =>
  state?.searchCurrent.recentJob;
// export const selectClassSimilar = (state: RootState) =>
//   state.classDetail.classSimilar;
// export const selectContentClass = (state: RootState) =>
//   state.classDetail.content;
// export const selectStudentOfClass = (state: RootState) =>
//   state.classDetail.studentOfClass;
// export const selectSchedulesGroup = (state: RootState) =>
//   state.classDetail.schedulesGroup;

export default Slice.reducer;
