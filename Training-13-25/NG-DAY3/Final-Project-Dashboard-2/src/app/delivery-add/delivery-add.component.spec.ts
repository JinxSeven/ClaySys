import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddComponent } from './delivery-add.component';

describe('DeliveryAddComponent', () => {
  let component: DeliveryAddComponent;
  let fixture: ComponentFixture<DeliveryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
