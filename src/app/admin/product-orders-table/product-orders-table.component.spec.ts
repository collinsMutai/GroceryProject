import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrdersTableComponent } from './product-orders-table.component';

describe('ProductOrdersTableComponent', () => {
  let component: ProductOrdersTableComponent;
  let fixture: ComponentFixture<ProductOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOrdersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
