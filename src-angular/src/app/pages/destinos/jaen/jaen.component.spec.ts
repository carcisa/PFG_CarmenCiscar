import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaenComponent } from './jaen.component';

describe('JaenComponent', () => {
  let component: JaenComponent;
  let fixture: ComponentFixture<JaenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JaenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
