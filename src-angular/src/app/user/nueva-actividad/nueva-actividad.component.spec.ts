import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaActividadComponent } from './nueva-actividad.component';

describe('NuevaActividadComponent', () => {
  let component: NuevaActividadComponent;
  let fixture: ComponentFixture<NuevaActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaActividadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
