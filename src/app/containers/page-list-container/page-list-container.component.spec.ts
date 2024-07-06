import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListContainerComponent } from './page-list-container.component';

describe('PageListContainerComponent', () => {
  let component: PageListContainerComponent;
  let fixture: ComponentFixture<PageListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
