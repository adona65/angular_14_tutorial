import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutableHeroDetailComponent } from './routable-hero-detail.component';

describe('RoutableHeroDetailComponent', () => {
  let component: RoutableHeroDetailComponent;
  let fixture: ComponentFixture<RoutableHeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutableHeroDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutableHeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
