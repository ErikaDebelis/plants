//we create a function literal. The function takes a plant as an argument. It will not mutate state. Instead, it will return a new object that represents the plant's new state. We will use the spread operator to return the new state of the plant. The value of plant.water will be set to (plant.water || 0) + 1. Note that we use the || operator here - if an object doesn't contain a water property, then plant.water will equal NaN. This way, the value default to 0 if there is no water property.

const hydrate = (plant) => {
  return {
    ...plant,
    water: (plant.water || 0) + 1
  }
};

const feed = (plant) => {
  return {
    ...plant,
    soil: (plant.soil || 0) + 1
  }
};

//Because the methods look so similar, we clearly have a chance to refactor here. (below)
const changePlantState = (plant, property) => {
  return {
    ...plant,
    [property]: (plant[property] || 0) + 1
  }
}
//Now we are passing in both a plant and the specific property that we want to change. Note that we can use square brackets to pass the value of a variable into an object key or property. This is a piece of functionality from ES6.
let plant = { soil: 0, light: 0, water: 0 }
changePlantState(plant, "soil")
// {soil: 1, light: 0, water: 0}



//we'll make our variables more abstract. Now our function is no longer limited to just working with plants. It could increment any property of state by 1. Note that we call the property passed in prop. prop or props is a common name for this variable and you'll see it frequently in React.
const changeState = (state, prop) => {
  return {
    ...state,
    [prop]: (state[prop] || 0) + 1
  }
}

//Our function is gradually improving but it could still be a lot better. Why would we want to limit ourselves to just incrementing a property by 1? Let's refactor our function again. Now it will also accept a value: 
const changeState = (state, prop, value) => ({
  ...state,
  [prop] : (state[prop] || 0) + value
})


//It's time to curry this function! Our outer function will take just one argument. This outer function will return a second function which takes another argument. Finally, this inner function will return yet another inner function that will take the final argument. Here's how our curried function looks:
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

//Now we can create some function factories! Note that prop is passed into the outer function, then value is passed to the inner function, and finally, state is passed to the innermost function. We could pass in those arguments in any order we like. However, our current setup isn't accidental. We can now use this function to make some smaller, more specific functions. Here are some examples:

const feed = changeState("soil");
const hydrate = changeState("water");
const giveLight = changeState("light");

// We just used our function to easily create more specific functions for each kind of property. We could add 5 to the soil of a plant by doing the following:
feed(5)(plant)

// We could theoretically drill down and get even more specific:
const blueFood = changeState("soil")(5)
const greenFood = changeState("soil")(10)
const yuckyFood = changeState("soil")(-5)

// This will increase a plant's food level by 5.
blueFood(plant)


//Our function is pure, does not mutate state, and has no side effects;
// Our function is unary and takes only one argument;
// Our function uses currying, which allows us to reuse it as a function factory;
// Our function takes advantage of closures (because we wouldn't be able to curry without it);
// Our function is sufficiently abstracted that it could be used with other types of objects that could be incremented or decremented as well.