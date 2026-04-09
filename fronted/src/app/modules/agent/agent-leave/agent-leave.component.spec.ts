import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLeaveComponent } from './agent-leave.component';

describe('AgentLeaveComponent', () => {
  let component: AgentLeaveComponent;
  let fixture: ComponentFixture<AgentLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentLeaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
