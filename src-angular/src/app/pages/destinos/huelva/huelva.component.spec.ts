import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuelvaComponent } from './huelva.component';

describe('HuelvaComponent', () => {
  let component: HuelvaComponent;
  let fixture: ComponentFixture<HuelvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuelvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuelvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
