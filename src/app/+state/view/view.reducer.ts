import {createReducer, on} from '@ngrx/store';
import * as ViewActions from './view.actions'

export const VIEW_FEATURE_KEY = 'view';

export interface ViewState {
  isThumbnailListOpened: boolean;
  pageListSize: number;
  startScrollTimestamp: number;
  isEditMode: boolean;
}

export interface CommandsListPartialState {
  readonly [VIEW_FEATURE_KEY]: ViewState;
}

export const initialState: ViewState = {
  isThumbnailListOpened: true,
  pageListSize: 50,
  startScrollTimestamp: 0,
  isEditMode: false,
};

export const viewReducer = createReducer(
  initialState,
  on (ViewActions.toggleIsThumbnailListOpened, (state) => ({...state, isThumbnailListOpened: !state.isThumbnailListOpened })),
  on (ViewActions.updatePageListSize, (state, {pageListSize}) => ({...state, pageListSize })),
  on(ViewActions.setStartScrollTimestamp, (state) => ({
    ...state,
    startScrollTimestamp: new Date().getTime(),
  })),
  on(ViewActions.setReadMode, (state) => ({
    ...state,
    isEditMode: false,
  })),
  on(ViewActions.setEditMode, (state) => ({
    ...state,
    isEditMode: true,
  })),
);
