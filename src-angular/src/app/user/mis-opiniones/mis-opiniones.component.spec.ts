import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisOpinionesComponent } from './mis-opiniones.component';

describe('MisOpinionesComponent', () => {
  let component: MisOpinionesComponent;
  let fixture: ComponentFixture<MisOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
