import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialiesLogComponent } from './dialies-log.component';

describe('DialiesLogComponent', () => {
  let component: DialiesLogComponent;
  let fixture: ComponentFixture<DialiesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialiesLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialiesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
