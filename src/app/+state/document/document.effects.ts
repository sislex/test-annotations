import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { concatLatestFrom } from '@ngrx/operators';

import * as DocumentActions from './document.actions';
import {Store} from "@ngrx/store";
import {getActivePage} from "./document.selectors";
import {setActivePage} from "./document.actions";


@Injectable()
export class DocumentEffects {
  loadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.loadDocument),
      mergeMap(action =>
        this.http.get(`http://localhost:4200/documents/${action.id}.json` ).pipe(
          map(document => DocumentActions.loadDocumentSuccess({ document }) )
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
            this.store.dispatch(setActivePage({activePageNumber}))
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
