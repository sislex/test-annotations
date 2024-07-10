import { createAction, props } from '@ngrx/store';
import {IAddAnnotation} from "./annotation.reducer";

export const addAnnotation = createAction(
  '[Annotation] addAnnotation',
  props<{ annotation: IAddAnnotation }>()
);


