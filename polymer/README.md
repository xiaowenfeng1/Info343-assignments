#Expanding your Tool Box -Polymer

##Demo
This is a [website](http://students.washington.edu/xfeng1/info343/challenges/polymer/) that a user can create new study cards, delete them, and mark as like. You could view the website here. However, if you would like to run this project locally, please check out the "Set up your own polymer project" section below. It utilizes and demonstrates the Polymer library and its Pubnub element.

##Why Polymer?

The Polymer library acts as a mediator between web components and custom elements. One of the largest advantages of Polymer is, it makes it simpler for developer to create and define reusable custom elements. With its great features like [two-way data binding](https://www.polymer-project.org/1.0/docs/devguide/data-binding.html), [shadow DOM](https://www.polymer-project.org/0.5/platform/shadow-dom.html) and templating, developers are able to build powerful custom elements with less code. There also are existing custom elements built by the Polymer team and others instruction for your own project. I was able to save some time while using Polymer’s material design elements for the user interface. Polymer provides a variety of modern visual elements effects, for example material design, and styles to make a website.
##Tips on Using Polymer
A good tip for using Polymer is you should explore the available resource before starting building your project from scratch. Polymer team has various visual design elements available. A limitation is that Polymer is a relative new library, it not being widely used yet, so there are not yet many examples and discussions available on the web. They also just released **Polymer 1.0**, most of the tutorials online are still in the older version. When you first start using Polymer, be sure to double check you are looking for the newest version. The polymer team is still actively improving Polymer, you should also constantly update the library throughout your project, in case of running errors. 

##Set Up Your Own Polymer Project
* [Getting Started](https://www.polymer-project.org/1.0/docs/start/psk/set-up.html) with Polymer
* **Note** that if you want to load your page into Chrome 
	* You could use the `Python SimpleHTTPServer`,instruction could be found [here](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/) 
	* You could also open the page vis WebStorm. WebStorm starts a local web server when you open the page through the editor.  

##Pubnub/ Pubnub-element
* What is [Pubnub](https://www.pubnub.com/)?
	* A secure Global Data Stream Network and API that help manage realtime applications
	* A short [video](https://vimeo.com/pubnub) about Pubnub
* To install `pubnub-element`with bower:  
`$ bower install --save pubnub-element`
* Another example with Polymer and Pubnub,
	* A real time chat application [Kitteh Anonymous](https://www.pubnub.com/blog/2015-01-15-creating-a-polymer-chat-app-with-material-design/) 

##Learn More 

* A set of great Polymer [tutorials](https://www.youtube.com/watch?v=CdV0VGYhKXk) on Youtube
* Polymer [Element](https://elements.polymer-project.org/) Catalog
* [Material Design with Polymer] (https://www.polymer-project.org/0.5/docs/elements/material.html)
