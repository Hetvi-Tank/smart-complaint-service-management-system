import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAgentsComponent } from './view-all-agents.component';

describe('ViewAllAgentsComponent', () => {
  let component: ViewAllAgentsComponent;
  let fixture: ComponentFixture<ViewAllAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAgentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
