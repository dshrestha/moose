import Ember from 'ember';

export function checkEq(params) {
  if (params.length === 2) {
    return params[0] === params[1];
  } else {
    return false;
  }
}

export default Ember.Helper.helper(checkEq);
