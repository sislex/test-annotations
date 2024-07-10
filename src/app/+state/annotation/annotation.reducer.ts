import {createReducer, on} from '@ngrx/store';
import * as AnnotationActions from './annotation.actions'

export const ANNOTATION_FEATURE_KEY = 'annotation';

export interface IAddAnnotation {
  type: string | null;
  settings: any;
}

export interface AnnotationState {
  addAnnotation: IAddAnnotation | null;
}

export interface CommandsListPartialState {
  readonly [ANNOTATION_FEATURE_KEY]: AnnotationState;
}

export const initialState: AnnotationState = {
  addAnnotation: null,
};

export const annotationReducer = createReducer(
  initialState,
  on(AnnotationActions.addAnnotation, (state, { annotation }) => ({...state, addAnnotation: annotation })),
);
