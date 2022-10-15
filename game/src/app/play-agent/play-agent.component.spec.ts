import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAgentComponent } from './play-agent.component';

describe('PlayAgentComponent', () => {
  let component: PlayAgentComponent;
  let fixture: ComponentFixture<PlayAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
