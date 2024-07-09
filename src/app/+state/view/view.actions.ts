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
