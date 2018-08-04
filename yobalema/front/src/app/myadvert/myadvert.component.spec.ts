import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyadvertComponent } from './myadvert.component';

describe('MyadvertComponent', () => {
  let component: MyadvertComponent;
  let fixture: ComponentFixture<MyadvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyadvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyadvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
