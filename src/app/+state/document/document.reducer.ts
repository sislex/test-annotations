import { createReducer, on } from '@ngrx/store';
import * as DocumentActions from './document.actions';

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

export const initialState: DocumentState = {
  activeDocument: null,
  activePage: 1,
};

export const documentReducer = createReducer(
  initialState,
  on(DocumentActions.loadDocumentSuccess, (state, { document }) => ({
    ...state,
    activeDocument: document
  })),
  on(DocumentActions.setActivePage, (state, { activePageNumber }) => ({
    ...state,
    activePage: activePageNumber
  })),
  on(DocumentActions.saveAnnotation, (state, { annotation, pageNumber }) => {
    if (!state.activeDocument) {
      return state;
    }

    const updatedPages = state.activeDocument.pages.map(page => {
      if (page.number === pageNumber) {
        const updatedAnnotations = page.annotations ? [...page.annotations, annotation] : [annotation];
        return { ...page, annotations: updatedAnnotations };
      }
      return page;
    });

    return {
      ...state,
      activeDocument: { ...state.activeDocument, pages: updatedPages }
    };
  })
);
