import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSeleccionadoComponent } from './plan-seleccionado.component';

describe('PlanSeleccionadoComponent', () => {
  let component: PlanSeleccionadoComponent;
  let fixture: ComponentFixture<PlanSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSeleccionadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
