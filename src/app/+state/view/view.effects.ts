import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Store} from "@ngrx/store";
import * as ViewActions from './view.actions';
import {debounceTime, tap, withLatestFrom} from 'rxjs';
import {getStartScrollTimestamp} from './view.selectors';
import {getActiveDocumentPages, getActivePage} from '../document/document.selectors';
import {setActiveScrollPage} from '../document/document.actions';
import {scrollToElementPage} from '../../helpers/scrollToElement';


@Injectable()
export class ViewEffects {

  scrollPageList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ViewActions.scrollPageList),
        withLatestFrom(
          this.store.select(getStartScrollTimestamp),
          this.store.select(getActiveDocumentPages),
          this.store.select(getActivePage),
        ),
        debounceTime(100),
        tap(([{activeItem}, startScrollTimestamp, pages, activePage]) => {
          if (new Date().getTime() - startScrollTimestamp > 1500) {
            const activePageNumber = pages[activeItem].number;

            if (activePageNumber != activePage) {
              this.store.dispatch(setActiveScrollPage({ activePageNumber }))
              scrollToElementPage('thumbnail-' + activePageNumber.toString());
            }
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
  ) {}
}
