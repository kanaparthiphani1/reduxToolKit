const store = require("./app/store");
const cakeActions = require("./features/cake/cakeSlice").cakeActions;

console.log("Initial state :  " + JSON.stringify(store.getState()));

store.subscribe(() => {
  console.log("Updated state  : " + JSON.stringify(store.getState()));
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(8));
