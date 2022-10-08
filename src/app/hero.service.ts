import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { delay, Observable, of } from 'rxjs';

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
  constructor(private messageService: MessageService) { }


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
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
