import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenegraphComponent } from './scenegraph.component';

describe('ScenegraphComponent', () => {
  let component: ScenegraphComponent;
  let fixture: ComponentFixture<ScenegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenegraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
