import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPageContainerComponent } from './viewer-page-container.component';

describe('ViewerPageContainerComponent', () => {
  let component: ViewerPageContainerComponent;
  let fixture: ComponentFixture<ViewerPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerPageContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
