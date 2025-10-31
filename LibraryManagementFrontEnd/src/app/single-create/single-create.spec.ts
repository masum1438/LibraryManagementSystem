import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCreate } from './single-create';

describe('SingleCreate', () => {
  let component: SingleCreate;
  let fixture: ComponentFixture<SingleCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
