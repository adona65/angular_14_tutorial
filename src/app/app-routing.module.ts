import { NgModule } from '@angular/core';
// Mandatory import so the application can have routing capability. 
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/*
 * Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
 * A typical Angular Route has two properties:
 * - path : a string that matches the URL in the browser address bar.
 * - component : the component that the router should create when navigating to this route.
 */
const routes: Routes = [
  // The following tells the router to match that URL to path: 'heroes' and display the HeroesComponent when the URL is something like localhost:4200/heroes.
  { path: 'heroes', component: HeroesComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  /*
   * When the application starts, the browser's address bar points to the web site's root. That doesn't match any existing route so the router doesn't navigate 
   * anywhere. To fix this, we may used an empty path as bellow, that will make the application navigate to the dashboard automatically.
   */
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

/*
 * In Angular, the best practice is to load and configure the router in a separate, top-level module. The router is dedicated to routing 
 * and imported by the root AppModule. 
 * 
 * The @NgModule metadata initializes the router and starts it listening for browser location changes.
 */
@NgModule({
  /*
   * Adds the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot().
   * The method is called forRoot() because we configure the router at the application's root level. The forRoot() method supplies the service providers 
   * and directives needed for routing, and performs the initial navigation based on the current browser URL.
   */
  imports: [RouterModule.forRoot(routes)],
  // Exports RouterModule to be available throughout the application.
  exports: [RouterModule]
})
/* 
 * By convention, the module class name is AppRoutingModule and it belongs in the app-routing.module.ts in the src/app directory.
 */
export class AppRoutingModule { }
