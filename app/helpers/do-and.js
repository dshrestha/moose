import Ember from 'ember';

export function doAnd(params/*, hash*/) {
  let returnValue = true;

  params.forEach(function (param) {
    returnValue = returnValue && param;
  });
  return returnValue;
}

export default Ember.Helper.helper(doAnd);
