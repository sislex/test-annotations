import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Store} from "@ngrx/store";
import * as ViewActions from './view.actions';
import {debounceTime, tap, withLatestFrom} from 'rxjs';
import {getIsEditMode, getStartScrollTimestamp, pageListSize} from './view.selectors';
import {getActiveDocumentPages, getActivePage} from '../document/document.selectors';
import {setActiveScrollPage} from '../document/document.actions';
import {scrollToElementPage} from '../../helpers/scrollToElement';


@Injectable()
export class ViewEffects {

  increasePageListSize$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ViewActions.increasePageListSize),
        withLatestFrom(
          this.store.select(pageListSize),
          this.store.select(getIsEditMode),
        ),
        tap(([{}, pageListSize, isEditMode]) => {
          const maxPageListSize = 200;
          const minPageListSize = 10;
          const newPageListSize = pageListSize + 10;

          const adjustedPageListSize = newPageListSize > maxPageListSize
            ? maxPageListSize
            : newPageListSize < minPageListSize
              ? minPageListSize
              : newPageListSize;

          this.store.dispatch(ViewActions.updatePageListSize({ pageListSize: adjustedPageListSize }));

          if (isEditMode) {
            this.store.dispatch(ViewActions.setReadMode());
            setTimeout(() => {
              this.store.dispatch(ViewActions.setEditMode());
            }, 200);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  decreasePageListSize$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ViewActions.decreasePageListSize),
        withLatestFrom(
          this.store.select(pageListSize),
          this.store.select(getIsEditMode),
        ),
        tap(([{}, pageListSize, isEditMode]) => {
          const maxPageListSize = 200;
          const minPageListSize = 10;
          const newPageListSize = pageListSize - 10;

          const adjustedPageListSize = newPageListSize < minPageListSize
            ? minPageListSize
            : newPageListSize > maxPageListSize
              ? maxPageListSize
              : newPageListSize;

          this.store.dispatch(ViewActions.updatePageListSize({ pageListSize: adjustedPageListSize }));

          if (isEditMode) {
            this.store.dispatch(ViewActions.setReadMode());
            setTimeout(() => {
              this.store.dispatch(ViewActions.setEditMode());
            }, 200);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  setSizePage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ViewActions.setSizePage),
        withLatestFrom(
          this.store.select(getIsEditMode),
        ),
        tap(([{pageSize}, isEditMode]) => {
          this.store.dispatch(ViewActions.updatePageListSize({ pageListSize: pageSize }));
          if (isEditMode) {
            this.store.dispatch(ViewActions.setReadMode());
            setTimeout(() => {
              this.store.dispatch(ViewActions.setEditMode());
            }, 200);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  toggleIsThumbnailListOpened$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ViewActions.toggleIsThumbnailListOpened),
        withLatestFrom(
          this.store.select(getIsEditMode),
        ),
        tap(([{}, isEditMode]) => {
          if (isEditMode) {
            this.store.dispatch(ViewActions.setReadMode());
            setTimeout(() => {
              this.store.dispatch(ViewActions.setEditMode());
            }, 200);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

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
