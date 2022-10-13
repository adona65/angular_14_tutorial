import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {

  /*
   * Notice the declaration of heroes$ as an Observable. Watch inside component's template for more detail.
   *
   * Remember that the component class doesn't subscribe to the heroes$ observable. That's the job of the AsyncPipe in the template.
   */
  heroes$!: Observable<Hero[]>;

  /*
   * This property is an RxJS Subject. A Subject is both a source of observable values and an Observable itself. 
   * - We can subscribe to a Subject as we would any Observable.
   * - We can also push values into that Observable by calling its next(value) method as the search() method does.
   */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  /*
   * Push a search term into the observable stream. 
   *
   * Every time the user types in the text box, the binding calls search() with the text box value as a search term. 
   * The searchTerms becomes an Observable emitting a steady stream of search terms.
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    /*
     * Chaining RxJS operators : Passing a new search term directly to the searchHeroes() after every user keystroke creates 
     * excessive HTTP requests, which taxes server resources and burning through data plans.
     * 
     * Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number 
     * of calls to the searchHeroes(). Ultimately, this returns an observable of timely hero search results where each one is a Hero[].
     */
    this.heroes$ = this.searchTerms.pipe(
      // Wait 300ms after each keystroke before considering the term. Requests aren't likely to happen more frequently than 300 ms.
      debounceTime(300),
      // ignore new term if same as previous term. Ensures that a request is sent only if the filter text changed.
      distinctUntilChanged(),
      /*
       * Switch to new search observable each time the term changes. Calls the search service for each search term that makes it through 
       * debounce() and distinctUntilChanged(). It cancels and discards previous search observables, returning only the latest search service observable.
       * 
       * With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call. Even with a 300 ms pause between requests, 
       * we could have many HTTP requests in flight and they may not return in the order sent. switchMap() preserves the original request order while returning 
       * only the observable from the most recent HTTP method call. Results from prior calls are canceled and discarded.
       * ==> Canceling a previous searchHeroes() Observable doesn't actually cancel a pending HTTP request. Unwanted results are discarded before they reach 
       * the application code.
       */ 
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}