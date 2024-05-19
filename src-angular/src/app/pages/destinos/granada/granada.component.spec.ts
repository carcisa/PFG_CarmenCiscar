import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranadaComponent } from './granada.component';

describe('GranadaComponent', () => {
  let component: GranadaComponent;
  let fixture: ComponentFixture<GranadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GranadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GranadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
