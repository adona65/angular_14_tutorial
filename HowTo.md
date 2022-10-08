# How to make this application working
## Documentation purpose
The goal of this document is explaining various information about this project. It may contains : 
- Basics information like "how launching the application" or "how to configure it".
- Explanations about some concepts for learning purposes.
- Indications about tricky issues and how to solve them.

**What this documentation won't contains :** explanations about the code. All needed indications (including clarification given in teaching perspective) will be included in code itself as commentaries.

## Application information
#### Angular requirements
Angular requires :
- An active LTS or maintenance LTS version of Node.js. Please watch <a href="https://github.com/nodejs/release#release-schedule">Available on Node.js's github</a>.
- Npm package manager (normally installed with node.js by default).

We can check if this tools are already installed on our computer by using following commands :
- <b>Check node.js version :</b> <span style="color: green;">*node -v*</span>
- <b>Check npm packages version :</b> <span style="color: green;">*npm -v*</span>

#### Install angular
We need the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment. It's really easy, we just have to run <span style="color: green;">*npm install -g @angular/cli*</span> command.

#### Create a new workspace and an initial application
We develop applications in the context of an Angular workspace. A workspace contains the files for one or more projects. A project is the set of files that make up an application or a library.

To create a new workspace and an initial project: :
- In command prompt, goes into a folder that isn't already in an Angular workspace directory. 
- Run ng new followed by the application name :</b> <span style="color: green;">*ng new angular_14_tutorial*</span>.

This will create :
- A new workspace, with a root directory named angular-tour-of-heroes.
- An initial skeleton application project in the src/app subdirectory.
- Related configuration files.

#### Run the application
In command prompt :
- Goes into workspace directory.
- Run <span style="color: green;">*ng serve --open*</span>.

This command :
- Builds the application.
- Starts the development server.
- Watches the source files.
- Rebuilds the application as you make changes.
- Opens a browser to <a href="http://localhost:4200">http://localhost:4200</a> because of *--open* argument.

#### Creating a component
Even if we may do this manually, the best way to create a component is with the Angular CLI. For it :
- In command prompt, goes into the directory containing the application.
- Run  <span style="color: green;">*ng generate component &lt;component-name&gt;*</span>, where *&lt;component-name&gt;* is the name of the new component.
By default, this command creates the following :
- A directory named after the component.
- A component file, *&lt;component-name&gt;.component.ts*.
- A template file, *&lt;component-name&gt;.component.html*.
- A CSS file, *&lt;component-name&gt;.component.css*.
- A testing specification file, *&lt;component-name&gt;.component.spec.ts*.
It also add newly created module to *app.module.ts* file.
This behavior may be modified. See <a href="https://angular.io/cli/generate#component-command">component-command doc</a>.

#### Creating a service
Even if we may do this manually, the best way to create a component is with the Angular CLI. For it :
- In command prompt, goes into the directory containing the application.
- Run  <span style="color: green;">*ng generate service &lt;service-name&gt;*</span>, where *&lt;service-name&gt;* is the name of the new component.
By default, this command creates the following :
- A service file, *&lt;service-name&gt;.service.ts*.
- A testing specification file, *&lt;service-name&gt;.service.spec.ts*
It also provide the service at the root level by default.
More details at <a href="https://angular.io/cli/generate#service">generate service doc</a>.