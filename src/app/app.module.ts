import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutableHeroDetailComponent } from './routable-hero-detail/routable-hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

/*
 * In this file are declared all modules (or components) of our application. It may be :
 * - Modules of this application under "declarations".
 * - External modules we imports, under "imports".
 */
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    RoutableHeroDetailComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // HttpClient is Angular's mechanism for communicating with a remote server over HTTP.
    HttpClientModule,
    /*
     * In-memory Web API intercept HTTP requests, apply them to an in-memory data store, and return simulated responses. It is useful
     * to simulate server responses.
     * 
     * The forRoot() configuration method takes an InMemoryDataService class that primes the in-memory database.
     * 
     * IMPORTANT : Remove it when a real server is ready to receive requests.
     */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
