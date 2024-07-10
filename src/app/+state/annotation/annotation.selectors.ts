import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ANNOTATION_FEATURE_KEY, AnnotationState} from './annotation.reducer';

export const selectFeature = createFeatureSelector<AnnotationState>(ANNOTATION_FEATURE_KEY);

export const getAddAnnotation = createSelector(
  selectFeature,
  (state: AnnotationState) => state.addAnnotation,
);

export const getAddAnnotationType = createSelector(
  selectFeature,
  (state: AnnotationState) => state.addAnnotation?.type,
);
