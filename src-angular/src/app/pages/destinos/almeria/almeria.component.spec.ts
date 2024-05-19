import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmeriaComponent } from './almeria.component';

describe('AlmeriaComponent', () => {
  let component: AlmeriaComponent;
  let fixture: ComponentFixture<AlmeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmeriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
