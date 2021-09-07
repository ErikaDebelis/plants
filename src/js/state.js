//Here's our function for storing state. Note that all the function names are abstracted. We could potentially reuse this function elsewhere as needed, too.
const storeState = () => {
  let currentState = {};
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}
// 1. our outer function is stored in the constant storeState. It does not take an argument. The only job of the outer function is to store the currentState of an object.
// 2. The currentState of an object will be initialized as a {}. Note that we use let because the currentState will be mutated each time the inner function is called.
// 3. Our outer function returns an anonymous inner function that takes one parameter called stateChangeFunction. This inner function will take a function as an argument. The function that we pass in will specify the exact change that should be made to currentState. Note that we've already written the function that will be passed in as an argument 
// 4. The line const newState = stateChangeFunction(currentState); will take the function we pass in as an argument and then call it on currentState. Instead of mutating currentState, we will save the new state in a constant called newState.
// 5.Now it's time to break the rules. We are going to need to update the currentState. We will make a copy of newState and assign it to currentState. 
// 6. Finally, our inner function will return the newState. Why are we returning newState instead of currentState? Well, in this particular use case, it doesn't matter which we do because both newState and currentState are equal. 

//Next, we will need to store our function in another constant like this:
const stateControl = storeState();

// Why are we calling it stateControl instead of something like stateChanger? Well, we might also just want to look at the current state - not change it - so stateChanger wouldn't be the best name in that situation.
// Let's take a look at the value of stateControl:
(stateChangeFunction) => {
  const newState = stateChangeFunction(currentState);
  currentState = {...newState};
  return newState;
}

// As we can see, stateControl holds the inner function. It also retains the currentState variable from the outer function. When storeState() is called and stored in the stateControl variable, currentState is set to {}.
// Now let's try passing one of our feeding functions into stateControl. Specifically, we'll pass in the feeding function blueFood() which we created in the last lesson. This function increments the food level of a plant by 5.
const fedPlant = stateControl(blueFood);
// { soil: 5 }
//1. We passed in the variable blueFood into stateControl. This invokes the inner function inside storeState(). (Be careful here - we don't want to pass in blueFood() because we don't want the function to be invoked yet!)
//2. blueFood is passed in as an argument for the stateChangeFunction parameter. Now const newState = blueFood(currentState);.


//When blueFood(currentState) is called, it invokes the following function:
(state) => ({
  ...state,
  ["soil"] : (state["soil"] || 0) + 5
})

//Remember that 5 replaces the value variable and "soil" replaces the prop variable because blueFood increments soil by 5. If this isn't clear, you may want to review how we used a curried function in the last lesson to create blueFood in the first place.

//1. currentState is passed into the state parameter. Because currentState doesn't have a soil property yet, it defaults to 0 before 5 is added. This is because we are using the || operator to ensure the default value of the soil property is 0 if it hasn't been defined.

// Now, if we pass in greenFood, we'll get the following:
const plantFedAgain = stateControl(greenFood);
// { soil: 15 }

// Our function is successfully storing the plant's state!