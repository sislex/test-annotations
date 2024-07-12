import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { concatLatestFrom } from '@ngrx/operators';

import * as DocumentActions from './document.actions';
import {Store} from "@ngrx/store";
import {getActiveDocument, getActivePage} from './document.selectors';


@Injectable()
export class DocumentEffects {
  loadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.loadDocument),
      mergeMap(action =>
        this.http.get(`http://localhost:4200/documents/${action.id}.json` ).pipe(
          map(document => DocumentActions.setDocument({ document }) )
        )
      )
    ),
  );

  setActiveScrollPage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DocumentActions.setActiveScrollPage),
        concatLatestFrom(() => this.store.select(getActivePage)),
        tap(([{activePageNumber}, getActivePage]) => {
          if (activePageNumber !== getActivePage) {
            this.store.dispatch(DocumentActions.setActivePage({activePageNumber}))
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  saveAnnotation$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DocumentActions.editAnnotation),
        concatLatestFrom(() => this.store.select(getActiveDocument)),
        tap(([{annotation, pageNumber}, activeDocument]) => {
          if (activeDocument) {
            const annotations = activeDocument.pages.find((page) => page.number === pageNumber)?.annotations || [];
            let isAnnotationExists = false;
            const newAnnotations = annotations.map((a) => {
              if (a.settings.id === annotation.settings.id) {
                isAnnotationExists = true;
                return annotation;
              }
              return a;
            });

            if (!isAnnotationExists) {
              newAnnotations.push(annotation);
            }

            const document = {
              ...activeDocument,
              pages: activeDocument.pages.map((page) => {
                if (page.number === pageNumber) {
                  return {
                    ...page,
                    annotations: newAnnotations
                  }
                }
                return page;
              })
            };

            this.store.dispatch(DocumentActions.setDocument({document}));
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteAnnotation$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DocumentActions.deleteAnnotation),
        concatLatestFrom(() => this.store.select(getActiveDocument)),
        tap(([{ annotation, pageNumber }, activeDocument]) => {
          if (activeDocument) {
            const annotations = activeDocument.pages.find((page) => page.number === pageNumber)?.annotations || [];

            const newAnnotations = annotations.filter((a) => a.settings.id !== annotation.settings.id);

            const document = {
              ...activeDocument,
              pages: activeDocument.pages.map((page) => {
                if (page.number === pageNumber) {
                  return {
                    ...page,
                    annotations: newAnnotations
                  };
                }
                return page;
              })
            };

            this.store.dispatch(DocumentActions.setDocument({ document }));
          }
        })
      ),
    {
      dispatch: false,
    }
  );


  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient,
  ) {}
}
