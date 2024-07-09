import {createReducer, on} from '@ngrx/store';
import * as ViewActions from './view.actions'

export const VIEW_FEATURE_KEY = 'view';

export interface ViewState {
  isThumbnailListOpened: boolean;
  pageListSize: number;
}

export interface CommandsListPartialState {
  readonly [VIEW_FEATURE_KEY]: ViewState;
}

export const initialState: ViewState = {
  isThumbnailListOpened: true,
  pageListSize: 50,
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
    pageListSize: pageSize
  })),
);
