import { createAction, props } from '@ngrx/store';

export const loadDocument = createAction(
  '[Document] loadDocument',
  props<{ id: any }>()
);

export const loadDocumentSuccess = createAction(
  '[Document] loadDocumentSuccess',
  props<{ document: any }>()
);

export const setActivePage = createAction(
  '[Document] setActivePage',
  props<{ activePageNumber: number }>()
);

export const setActiveScrollPage = createAction(
  '[Document] setActivePage',
  props<{ activePageNumber: number }>()
);


