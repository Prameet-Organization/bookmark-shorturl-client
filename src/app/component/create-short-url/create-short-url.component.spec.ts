import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortUrlComponent } from './create-short-url.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateShortUrlComponent', () => {
  let component: CreateShortUrlComponent;
  let fixture: ComponentFixture<CreateShortUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShortUrlComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShortUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
