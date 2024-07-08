import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DOCUMENT_FEATURE_KEY, DocumentState, IDocument} from './document.reducer';

export const selectFeature = createFeatureSelector<DocumentState>(DOCUMENT_FEATURE_KEY);

export const getActiveDocument = createSelector(
  selectFeature,
  (state: DocumentState) => state.activeDocument,
);

export const getActiveDocumentName = createSelector(
  getActiveDocument,
  (activeDocument: IDocument | null) => activeDocument ? activeDocument.name : '',
);

export const getActiveDocumentPages = createSelector(
  getActiveDocument,
  (activeDocument: IDocument | null) => activeDocument ? activeDocument.pages : [],
);
