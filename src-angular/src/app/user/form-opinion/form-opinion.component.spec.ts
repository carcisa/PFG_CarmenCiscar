import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOpinionComponent } from './form-opinion.component';

describe('FormOpinionComponent', () => {
  let component: FormOpinionComponent;
  let fixture: ComponentFixture<FormOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOpinionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
