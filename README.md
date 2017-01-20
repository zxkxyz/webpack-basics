# Webpack basics
## Module bundling for plebs

Disclaimer: I’ve got my own explanations for a couple things below and I’ve probably made a couple statements people might disagree with but generally I think the idea is correct. Make a pull request or file an issue if you think there’s something worth correcting, I welcome contributions and **contructive** criticism.

Also, this first draft is built with my students in mind (at [Hack Reactor](http://www.hackreactor.com/)) so I’ll specify when some of my comments are specifically targeted for those students. But generally this whole document in its current state was written with those students and their projects in mind.

### What is it?
Webpack is a module bundler. Imagine you’re building a react application and each component has certain dependencies. These dependencies might not just be limited to `node_modules` from npm, it’s possible that we might also have images and CSS as dependencies in our application. Webpack will take our code along with its dependencies and combine them all into static assets*.

*By static assets I mean simple files that can be processed by a browser, such as .js, .png, .html, .css files, and so on.

*Hack Reactor Students: at least for your Greenfield projects, you’re probably not going to need/want to process anything with webpack other than javascript files, in particular your client side JS code. This is for simplicity sake. Webpack is a massive rabbit hole that you don’t want to focus too much of your time on at this point in the program. Your goal should be to understand it on a basic level and get it to transpile/bundle your client code.*

### Why would we want to do that?
Well think about traditional web development, you’ll have all sorts of dependencies for your application: Angular, lodash, React, rxjs, whatever it might be. If we wanted these to be available to us on the client, we’d have to add these in as scripts tags and refer to those libraries using their global variables (`window.Angular`, `window.React` and so on). This isn’t exactly clean and eventually we’re going to end up with a lot of scripts tags and a lot of global variable referencing. Now imagine we’re dealing with React and we’re using ES6 syntax, we’d have to transpire all of our JSX, polypill our ES6 code for browsers that don’t have ES6 compatibility and so forth. Sure, we could run all of those files through babel but that doesn’t solve the problem of using global variables. The same goes for CSS: we might be building out a React component and we want to style that react component. How are we doing to do that? Well we could make a css file specifically for that component, give all of our JSX tags classNames and just load that css file in our html right? Well in that our JS component and CSS file are related to each other but we have to develop as if the two are separate.

So below is an example of having a JSX component along with a separate style sheet. This is how you would structure your code without webpack:

App.jsx:

```javascript
class App extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = { message: 'hello!' };
  }
  
  render() {
	  return (
		  <div className="myDiv">
			  Hello world!
		  </div>
	  );
  }
}

window.App = App;
```

App_Styles.css:

```css
.myDiv {
	color: "red";
}
```

^ And somewhere in our index.html we would be loading in the transpired App.jsx in somewhere as a script and the css file in using a link tag

Webpack solves most of these issues because it allows us to treat all of those resources as dependencies. In fact all we need to do in our webpack config is specify what type of **loader** to use depending on which file we're trying to load into our application. So for example, we might want [Babel](https://babeljs.io/) to load all of javascript files because babel will also transpire those javascript files for us. We might want to use a [CSS Loader](https://github.com/webpack/css-loader) for our css files because that will convert our css into javascript objects that we can use in our component code. In the same way we can `require` or `import` node modules in Node, we can now do the same for the frontend because Webpack will resolve all of those statements for us using the loaders we specified. Same for css files, we can import our css file into our react component and webpack will convert that css file into an object of style properties that can we can then just apply to our JSX.

So using Webpack, this is how we would do the same thing as above:

App.jsx:

```javascript
import React from 'react';
Import styles from './App_Styles.css';

class App extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = { message: 'hello!' };
  }
  
  render() {
	  return (
		  <div className={styles.myDiv}>
			  Hello world!
		  </div>
	  );
  }
}

export default App;
```

App_Styles.css: 

```css
.myDiv {
	color: "red";
}
```

So notice three main things changed: 1) We're not manually importing React into our code base (we're importing it from our node modules), 2) We're not using a className string anymore, we're importing the css file as an object using our css-loader, and 3) We're exporting the App class using ES6 module syntax.

The beauty behind this system is that we can code with dependencies similar to how we've coded when dealing with Node dependencies: we just use require in those app dependencies and boom, we're good to go.

The beauty of this system is that even though our development style has changed to be something a little more easier to reason about, webpack will generate static files similar to those I mentioned above. The way we'd go about doing this is first of all we'd need to specify one of those files as our webpack **entry point**. In this case, since App.jsx is our main file and requires in all of our other app dependencies, we'll want our App.jsx to be our entry point**. What webpack will do is generate one big 'bundled' file that will contain all of our code and its depdencies. So in this case, we'd end up with a file that contains all of the React module, all of the converted  App_Style.css stuff we imported using the css-loader in webpack and finally all of the App.jsx code we imported using the babel loader for webpack.

**In a larger scale app, you might end up with multiple entry points which would potentially generate multiple bundles. 

That's enough for now, I'm going to update this later. It's a little rushed because I just wanted to push something out today, let me know if you have any questions by emailing me (zak@0x7cf.com), making a github issue (or slack me if you're a student).