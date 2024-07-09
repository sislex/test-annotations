import {createReducer, on} from '@ngrx/store';
import * as DocumentActions from './document.actions'

export const DOCUMENT_FEATURE_KEY = 'document';

export interface IPage {
  number: number;
  imageUrl: string;
  annotations?: any[];
}

export interface IDocument {
  name: string;
  pages: IPage[];
}

export interface DocumentState {
  activeDocument: IDocument | null;
  activePage: number;
}

export interface CommandsListPartialState {
  readonly [DOCUMENT_FEATURE_KEY]: DocumentState;
}

export const initialState: DocumentState = {
  activeDocument: null,
  activePage: 1,
};

export const documentReducer = createReducer(
  initialState,
  on(DocumentActions.loadDocumentSuccess, (state, { document }) => ({
    ...state,
    activeDocument: document })),
  on(DocumentActions.setActivePage, (state, { activePageNumber }) => ({...state, activePage: activePageNumber })),
);
