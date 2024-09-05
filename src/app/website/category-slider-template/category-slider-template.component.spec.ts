import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySliderTemplateComponent } from './category-slider-template.component';

describe('CategorySliderTemplateComponent', () => {
  let component: CategorySliderTemplateComponent;
  let fixture: ComponentFixture<CategorySliderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySliderTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySliderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
