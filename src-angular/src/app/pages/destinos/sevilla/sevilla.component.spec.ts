import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevillaComponent } from './sevilla.component';

describe('SevillaComponent', () => {
  let component: SevillaComponent;
  let fixture: ComponentFixture<SevillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SevillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SevillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
