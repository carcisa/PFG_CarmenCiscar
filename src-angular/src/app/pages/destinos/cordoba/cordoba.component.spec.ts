import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordobaComponent } from './cordoba.component';

describe('CordobaComponent', () => {
  let component: CordobaComponent;
  let fixture: ComponentFixture<CordobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CordobaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CordobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
