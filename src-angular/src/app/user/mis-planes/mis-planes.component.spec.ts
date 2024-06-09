import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPlanesComponent } from './mis-planes.component';

describe('MisPlanesComponent', () => {
  let component: MisPlanesComponent;
  let fixture: ComponentFixture<MisPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisPlanesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
