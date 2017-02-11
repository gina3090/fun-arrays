var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter((element, index, array) => {
  return element.amount > 100000.00;
});

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example 
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = dataset.bankBalances.map((element, index, array) => {
  return {
    amount: element.amount,
    state: element.state,
    rounded: Math.round(element.amount)
  };
});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example 
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances.map((element, index, array) => {
  return {
    amount: Math.round(element.amount * 10) / 10,
    state: element.state
  };
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances.reduce((previous, current, index, array) => {
  var sum = previous + parseFloat(current.amount);
  return Math.round(sum * 100) / 100;
}, 0);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset.bankBalances.filter((element, index, array) => {
  var states = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
  if(states.indexOf(element.state) > -1) {
    return true;
  } else {
    return false;
  }
})
.reduce((previous, current, index, array) => {
  var sum = previous + (current.amount * (18.9 / 100));
  return Math.round(sum * 100) / 100;
}, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances.reduce((accounts, currentAccount) => {
  if(accounts.hasOwnProperty(currentAccount.state) === false) {
    accounts[currentAccount.state] = 0;
  }
  accounts[currentAccount.state] += parseFloat(currentAccount.amount);
  // round to cents
  accounts[currentAccount.state] = Math.round(accounts[currentAccount.state] * 100) / 100; 
  return accounts;
}, {});

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = Object.keys(stateSums)
// filter out the states that we don't care about
.filter((state) => ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf(state) === -1)
// convert amount to be the interest
.map((state) => {
  return {
    state,
    interest: Math.round(stateSums[state] * 18.9) / 100
  };
})
// use only interest amounts that are greater than 50,000
.filter((account) => {
  return account.interest > 50000;
})
// add all the states interests together
.reduce((prevInterest, currentAccount) => {
  return prevInterest + currentAccount.interest;
}, 0);
sumOfHighInterests = Math.round(sumOfHighInterests * 100) / 100;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = Object.keys(stateSums).filter(state => {
  if(stateSums[state] < 1000000) {
    return state;
  }
});

/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss
  
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
