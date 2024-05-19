import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalagaComponent } from './malaga.component';

describe('MalagaComponent', () => {
  let component: MalagaComponent;
  let fixture: ComponentFixture<MalagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MalagaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MalagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
