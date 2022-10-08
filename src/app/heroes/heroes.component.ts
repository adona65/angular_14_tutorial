import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
/*
 * OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() 
 * method to handle any additional initialization tasks. ==> Data binding is a technique to pass data from the component's class
 * to the view. Like when we use interpolation with {{}}.
 */
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  fakeHero: Hero = {
    id: 1,
    name: 'Fake hero'
  };

  /* 
   * selectedHero isn't defined since there is no selected hero in template when the application starts.
   * ==> In typescript, "?:" means a property is optional. This property can either have a value based on the type defined (here Hero) 
   *     or its value can be undefined.
   */
  selectedHero?: Hero;

  /*
   * Constructor of the class. Here, the heroService parameter simultaneously defines a private heroService property and identifies it as a 
   * HeroService injection site. When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the 
   * singleton instance of HeroService.
   */
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  /*
   * The goal of ngOnInit() method is to perform the following initialization tasks :
   * - Perform complex initializations outside of the constructor : we should not, for example, fetch data in a component constructor or worry that a new 
   *   component will try to contact a remote server when created under test or before we decide to display it. 
   * - Set up the component after Angular sets the input properties : Constructors should do no more than set the initial local variables to simple values. 
   *   A directive's data-bound input properties are not set until after construction.
   * 
   *  Please note that Angular calls ngOnInit() only once.
   */
  ngOnInit(): void {
    this.getHeroes();
  }

  /*
   * Retrieve the data to display from the service that provide it.
   */
  getHeroes(): void {
    /*
     * Observable.subscribe() retrieve data in an asynchronous way. It waits for the Observable to emit the array of heroes, which could happen now or 
     * several minutes from now. As it's asynchronous, it won't frize the browser. The subscribe() method passes the emitted data to the callback, which 
     * sets the component's heroes property.
     */
    this.heroService.getHeroes()
                    .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
