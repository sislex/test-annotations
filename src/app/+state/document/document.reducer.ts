import {createReducer, on} from '@ngrx/store';
import * as DocumentActions from './document.actions'

export const DOCUMENT_FEATURE_KEY = 'document';

export interface IPage {
  number: number;
  imageUrl: string;
}

export interface IDocument {
  name: string;
  pages: IPage[];
}

export interface DocumentState {
  activeDocument: IDocument | null;
}

export interface CommandsListPartialState {
  readonly [DOCUMENT_FEATURE_KEY]: DocumentState;
}

export const initialState: DocumentState = {
  activeDocument: null,
};

export const documentReducer = createReducer(
  initialState,
  on(DocumentActions.loadDocumentSuccess, (state, { document }) => ({
    ...state,
    activeDocument: document })),
);
