import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  /*
   * @Input() indicate "hero" field must be passed to this component. This will be performed when we'll use this component's selector
   * into template of another component, by writing something like this : <app-hero-detail [hero]="selectedHero"></app-hero-detail>
   */
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
