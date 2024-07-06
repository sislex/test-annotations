import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailListContainerComponent } from './thumbnail-list-container.component';

describe('ThumbnailListContainerComponent', () => {
  let component: ThumbnailListContainerComponent;
  let fixture: ComponentFixture<ThumbnailListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailListContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
