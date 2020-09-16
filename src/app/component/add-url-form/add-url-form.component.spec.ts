import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUrlFormComponent } from './add-url-form.component';

describe('AddUrlFormComponent', () => {
  let component: AddUrlFormComponent;
  let fixture: ComponentFixture<AddUrlFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUrlFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
