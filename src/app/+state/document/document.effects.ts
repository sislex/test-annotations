import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs';
import {HttpClient} from "@angular/common/http";

import * as DocumentActions from './document.actions';


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

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
