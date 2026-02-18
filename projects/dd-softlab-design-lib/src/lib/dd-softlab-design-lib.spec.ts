import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdButtonComponent } from './components/button/dd-button.component';

describe('DdButtonComponent', () => {
  let component: DdButtonComponent;
  let fixture: ComponentFixture<DdButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DdButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
