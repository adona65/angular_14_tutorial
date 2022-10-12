import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-routable-hero-detail',
  templateUrl: './routable-hero-detail.component.html',
  styleUrls: ['./routable-hero-detail.component.css']
})
export class RoutableHeroDetailComponent implements OnInit {

  hero: Hero | undefined;

  /*
   * - The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. This component is 
   *   interested in the route's parameters extracted from the URL. The "id" parameter is the id of the hero to display.
   * - The location is an Angular service for interacting with the browser. This service lets navigate back to the previous view.
   */
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    /*
     * - The route.snapshot is a static image of the route information shortly after the component was created.
     * - The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch. 
     *   Route parameters are always strings. The JavaScript Number function converts the string to a number, which is what a hero id should be.
     */
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
                    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    /*
     * Use Location service to navigates backward one step in the browser's history.
     */
    this.location.back();
  }
  
  /*
   * Persists hero name changes using the hero service updateHero() method and then navigates back to the previous view.
   */
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
                      .subscribe(() => this.goBack());
    }
  }
}
