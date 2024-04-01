import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentControlsComponent } from './parent-controls.component';

describe('ParentControlsComponent', () => {
  let component: ParentControlsComponent;
  let fixture: ComponentFixture<ParentControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
