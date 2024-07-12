import { createAction, props } from '@ngrx/store';

export const loadDocument = createAction(
  '[Document] loadDocument',
  props<{ id: any }>()
);

export const setDocument = createAction(
  '[Document] setDocument',
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

export const editAnnotation = createAction(
  '[Annotation] editAnnotation',
  props<{ annotation: { type: string, settings: any }, pageNumber: number }>()
);

export const deleteAnnotation = createAction(
  '[Annotation] deleteAnnotation',
  props<{ annotation: { type: string, settings: any }, pageNumber: number }>()
);

