import { createAction, props } from '@ngrx/store';

export const toggleIsThumbnailListOpened = createAction(
  '[View] toggleIsThumbnailListOpened',
);

export const increasePageListSize = createAction(
  '[View] increasePageListSize',
);

export const decreasePageListSize = createAction(
  '[View] decreasePageListSize',
);

export const setSizePage = createAction(
  '[View] setSizePage',
  props<{ pageSize: number }>()
);

export const setStartScrollTimestamp = createAction(
  '[View] setStartScrollTimestamp',
);

export const scrollPageList = createAction(
  '[View] scrollPageList',
  props<{ activeItem: number }>()
);

export const setEditMode = createAction(
  '[View] setEditMode',
);

export const setReadMode = createAction(
  '[View] setReadMode',
);

export const updatePageListSize = createAction(
  '[View] updatePageListSize',
  props<{ pageListSize: number }>()
);
