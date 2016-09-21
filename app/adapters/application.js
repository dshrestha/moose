import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'moose/config/environment';

export default DS.JSONAPIAdapter.extend({

  namespace: 'api',

  host: Ember.computed(function () {
    return ENV.APP.API_URL;
  })
});
