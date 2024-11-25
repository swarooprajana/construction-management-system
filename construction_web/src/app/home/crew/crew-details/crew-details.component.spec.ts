import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewDetailsComponent } from './crew-details.component';

describe('CrewDetailsComponent', () => {
  let component: CrewDetailsComponent;
  let fixture: ComponentFixture<CrewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrewDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
