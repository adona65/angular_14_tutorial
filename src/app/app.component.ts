import { Component } from '@angular/core';

/*
 * Components are the building blocks that compose an Angular application. They display data on the screen, listen for user input,
 * and take action based on that input. A component includes :
 * - A TypeScript class with a @Component() decorator (this class) that defines behavior.
 * - An HTML template (defined below in "templateUrl").
 * - And styles (defined below in "styleUrls"). 
 */
@Component({
  /**
   * CSS selector that defines how the component is used in a template. HTML elements in your template that match this selector become instances 
   * of the component. In other words, a selector instructs Angular to instantiate this component wherever it finds the corresponding tag in template 
   * HTML. Thus, this component may be used in a template by writing <app-root></app-root> (correspond to the value declared inside "selector"). When 
   * Angular will renders this component, the resulting DOM will contains those <app-root></app-root>. We may for example see it if we inspect page's 
   * html code into browser when placed in template "app.component.html" corresponding to this component.
    */
  selector: 'app-root',
  /*
   * HTML template that instructs Angular how to render the component. Here we reference an external file, but we also may write the HTML code directly within 
   * the component. For this, we would use "template" instead of "templateUrl". We won't do it here because for lisibility it's better to write the HTML in
   * it's own file.
   */
  templateUrl: './app.component.html',
  /*
   * Optional set of CSS styles that define the appearance of the template's HTML elements. As for template, we may defined styles in the own file(s), or directly
   * inside component using "styles".
   */
  styleUrls: ['./app.component.css']
  /*
   * Finally, concerning style, we will note that "ng new" command used at application setup created an empty "/src/styles.css" file for holding styles that will
   * apply through application-wide.
   */
})

export class AppComponent {
  // Fields of a component may be used in corresponding template. Watch inside "app.component.html" for more details.
  title = 'Tour of Heroes !';
}
