import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerThumbnailContainerComponent } from './viewer-thumbnail-container.component';

describe('ViewerThumbnailContainerComponent', () => {
  let component: ViewerThumbnailContainerComponent;
  let fixture: ComponentFixture<ViewerThumbnailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerThumbnailContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerThumbnailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
