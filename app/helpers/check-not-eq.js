import Ember from 'ember';

export function checkNotEq(params/*, hash*/) {
  if (params.length === 2) {
    return params[0] !== params[1];
  } else {
    return false;
  }
}

export default Ember.Helper.helper(checkNotEq);
