import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { delay, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/*
 * Components shouldn't fetch or save data directly. They should focus on presenting data and delegate data access to a service. That's
 * the goal of services. Services are a great way to share information among classes that don't know each other. 
 * 
 * @Injectable() marks the class as one that participates in the dependency injection system of Angular. The @Injectable() decorator accepts 
 * a metadata object for the service, the same way the @Component() decorator did for component classes.
 * 
 * So, this class will provide an injectable service. One of main goals of a service the following : it get data from anywhere such as a web service, 
 * local storage, or a mock data source. Removing data access from components means we can change our mind about the implementation anytime, without 
 * touching any components. We would only change code into service's class, and components will still works. They don't know how the service works, and
 * won't have to display data.
 */
@Injectable({
  /*
   * We must make the service available to the dependency injection system before Angular can inject it into components by registering a provider. A provider 
   * is something that can create or deliver a service. In this case, it instantiates the HeroService class to provide the service.
   * 
   * To make sure that the HeroService can provide this service, we have to register it with the injector. The injector is the object that chooses and injects 
   * the provider where the application requires it.
   * 
   * By default, "ng generate service" command registers a provider with the root injector for the service by including provider metadata : "providedIn: 'root'".
   * 
   * When we provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it. Registering 
   * the provider in the @Injectable metadata also allows Angular to optimize the application by removing the service if it isn't used.
   */
  providedIn: 'root'
})
export class HeroService {

  /*
   * Here is an example of a typical service-in-service scenario in which we inject the MessageService into the HeroService (which is injected into the HeroesComponent).
   */
  constructor(private http: HttpClient, private messageService: MessageService) { }

  /*
   * URL to web api : url of the form :base/:collectionName with the address of the heroes resource on the server. 
   * Here : 
   * - base is the resource to which requests are made
   * - collectionName is the heroes data object in the in-memory-data-service.ts.
   */
  private heroesUrl = 'api/heroes';  // URL to web api

  /*
   * If we would just write the method like "getHeroes(): Hero[]", it would have a synchronous signature , which implies that the HeroService can fetch heroes 
   * synchronously. This approach won't work in a real application that works with a server and uses asynchronous calls. Indeed, if getHeroes() had a synchronous 
   * signature and we call it in a component, but the method can't return immediately the data, that would block the browser as it waits to return this data.
   * 
   * That's why this method must have an asynchronous signature of some kind. Here, it will returns an Observable so that it can use the Angular HttpClient.get 
   * method to fetch the heroes and have HttpClient.get() return an Observable. We will note that Observable is one of the key classes in the RxJS library.
   * 
   */
  getHeroes(): Observable<Hero[]> {
    /*
     * Here we simulates getting data from a server with the RxJS of() function. of(HEROES) returns an Observable<Hero[]> that emits a single value, 
     * the array of mock heroes.
     */
    // Mock replaced by method of getting heroes from the server. Keeped code for tutorial purposes.
    // this.messageService.add('HeroService: fetched heroes');
    //const heroes = of(HEROES);
    //return heroes;

    /* 
     * GET heroes from the server.
     *
     * HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , 
     * adds TypeScript capabilities, which reduce errors during compile time.
     * 
     * Despite it's not discussed here, please note that other APIs may bury the data within an object. We might have to dig that data out by processing 
     * the Observable result with the RxJS map() operator.
     */
    return this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(
                      /*
                       * The HeroService methods taps into the flow of observable values and send a message, using the log() method, to the message area at 
                       * the bottom of the page. The RxJS tap() operator enables this ability by looking at the observable values, doing something with those 
                       * values, and passing them along. The tap() call back doesn't access the values themselves.
                       */
                      tap(_ => this.log('fetched heroes')),
                      /*
                       * To catch errors, we "pipe" the observable result from http.get() through an RxJS catchError() operator. The catchError() operator 
                       * intercepts an Observable that failed. The operator then passes the error to the error handling function.
                       */
                      catchError(this.handleError<Hero[]>('getHeroes', []))
                    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
     // Mock replaced by method of getting hero from the server. Keeped code for tutorial purposes.
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    //const hero = HEROES.find(h => h.id === id)!;
    // IMPORTANT: The backtick ( ` ) characters define a JavaScript template literal
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(hero);

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
                    .pipe(
                      tap(_ => this.log(`fetched hero id=${id}`)),
                      catchError(this.handleError<Hero>(`getHero id=${id}`))
                    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * 
   * Because each service method returns a different kind of Observable result, handleError() takes a type parameter to return the safe value as 
   * the type that the application expects.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /*
   * The heroes web API expects a special header in HTTP save requests.  
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    /*
     * HttpClient.put() persist the changed hero on the server. It takes three parameters :
     * - The URL. Here it is unchanged. The heroes web API knows which hero to update by looking at the hero's id.
     * - The data to update, which is the modified hero in this case
     * - Options
     */
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
                    .pipe(
                      tap(_ => this.log(`updated hero id=${hero.id}`)),
                      catchError(this.handleError<any>('updateHero'))
                    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
                    .pipe(
                      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
                      catchError(this.handleError<Hero>('addHero'))
                    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
                    .pipe(
                      tap(_ => this.log(`deleted hero id=${id}`)),
                      catchError(this.handleError<Hero>('deleteHero'))
                    );
  }
}
