import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebproductsComponent } from './webproducts.component';

describe('WebproductsComponent', () => {
  let component: WebproductsComponent;
  let fixture: ComponentFixture<WebproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
