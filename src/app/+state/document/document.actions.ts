import { createAction, props } from '@ngrx/store';

export const loadDocument = createAction(
  '[Document] loadDocument',
  props<{ id: any }>()
);

export const loadDocumentSuccess = createAction(
  '[Document] LoadDocumentSuccess',
  props<{ document: any }>()
);


