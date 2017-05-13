<img align="right" src="../img/cphbusinessWhite.png" />  
#React day3
##State and props, Events, lifecycle methods, React Router

Here is an article with [10 usefull design patterns for working with React](https://hackernoon.com/10-react-mini-patterns-c1da92f068c5#.uvrnr03q1) 

Here is a step by step tutorial on [react router](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/01-setting-up). When using this tutorial do it in a new create-react-app instead of cloning the project from the tutorial. (The projects used in the tutorial are using webpack directly which is a bit harder to configure). Another tutorial to suplement with: [Tutorial](https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.rdjy76252)

###React-router

In the terminal write. (save option is to add it to the package.json file)

```
npm install --save react-router@3.0.0
```

## Routing in a Single Page Application

Since all content in the web application is in the same basic page we need a way to show only part of this content to the user. We do that by creating the illution  that the app serves static pages when ever we request a new ressource from the URL.

This means that by changing the URL we can load specific components that are associated with that particular URL string.

#### Example of nested components

This is a javascript class file called App.js. 

```react
render() {
      document.title = "Router Demo"
    return (
      <div className="ProductApp">
          <TopMenu/>
          <CategoryView>
              <CategoryItem category="Hunting Gear" update="this.update"/>
              <CategoryItem category="Fishing Gear" update="this.update"/>
              <CategoryItem category="General Gear" update="this.update"/>
              <CategoryItem category="Survival Gear" update="this.update"/>
          </CategoryView>
          <ProductView/>
      </div>
    );
  }
```

Using react routing we would instead do something like this:

```react
//index.js
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>

            <Route path="/products" component={
                (props) => (<ProductContainer><CategoryView/><ProductView/></ProductContainer>)
            }/>
            <Route path="/about" component={About}/>
        </Route>
    </Router>),
  document.getElementById('root')
```

### Look in the demo project [here](../demo/day3/router)

###props.children 

- This means all the content between begin and end-tag of component.
- [See example here](https://facebook.github.io/react/docs/composition-vs-inheritance.html#containment)


### Routing with parameters

Here is an example of how parameters (props) are put in to the component when using the router. Note that the attributes are now put on the Route component and not on the App component as we would normally do.

```react
facade.loadCars(() => {
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route facade={facade} path='/' component={App}>
            <IndexRoute facade={facade} delete={App.deleteCar} edit={App.grabCar} component={UsedCarsView} />

            <Route path='/add' component={CarInput} />
            <Route path='*' component={NotFound} />
        </Route>
    </Router>)
, document.getElementById('root'));
});
```

### lifecycle methods

read this article [Here](http://busypeoples.github.io/post/react-component-lifecycle/)

Look at example in the solution to usedcarapp.