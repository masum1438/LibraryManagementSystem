import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchById } from './search-by-id';

describe('SearchById', () => {
  let component: SearchById;
  let fixture: ComponentFixture<SearchById>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchById]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchById);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
