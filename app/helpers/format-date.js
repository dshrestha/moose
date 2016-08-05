import Ember from 'ember';
import moment from 'moment';

export function formatDate(params) {
  let date = params[0];
  let format = params[1];

  if (date) {
    return moment(date).format(format);
  } else {
    return "";
  }
}

export default Ember.Helper.helper(formatDate);
