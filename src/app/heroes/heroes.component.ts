import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

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

  heroes = HEROES;

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
   * "Just" the constructor of the class. 
   */
  constructor() { }

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
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
