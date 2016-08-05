import Ember from 'ember';

export function toUpper(params/*, hash*/) {
  return params.toString().toUpperCase();
}

export default Ember.Helper.helper(toUpper);
