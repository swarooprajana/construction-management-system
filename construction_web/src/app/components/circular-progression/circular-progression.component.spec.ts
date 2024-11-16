import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularProgressionComponent } from './circular-progression.component';

describe('CircularProgressionComponent', () => {
  let component: CircularProgressionComponent;
  let fixture: ComponentFixture<CircularProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircularProgressionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
