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
  on(ViewActions.increasePageListSize, (state) => {
    const newPageListSize = state.pageListSize + 10;
    const maxPageListSize = 200;
    const minPageListSize = 10;

    return {
      ...state,
      pageListSize: newPageListSize > maxPageListSize ? maxPageListSize : newPageListSize && newPageListSize < minPageListSize ? minPageListSize : newPageListSize
    };
  }),
  on(ViewActions.decreasePageListSize, (state) => {
    const newPageListSize = state.pageListSize - 10;
    const minPageListSize = 10;
    const maxPageListSize = 200;

    return {
      ...state,
      pageListSize: newPageListSize < minPageListSize ? minPageListSize : newPageListSize && newPageListSize > maxPageListSize ? maxPageListSize : newPageListSize
    };
  }),
  on(ViewActions.setSizePage, (state, { pageSize }) => ({
    ...state,
    pageListSize: pageSize,
  })),
  on(ViewActions.setStartScrollTimestamp, (state) => ({
    ...state,
    startScrollTimestamp: new Date().getTime(),
  })),
  on(ViewActions.toggleIsEditMode, (state) => ({
    ...state,
    isEditMode: !state.isEditMode,
  })),
);
