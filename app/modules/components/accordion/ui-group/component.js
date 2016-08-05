import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'div',

  accordionGroup: null,

  classNames: ['panel-group'],

  attributeBindings: ['role', 'aria-multiselectable'],

  role: "tablist",

  'aria-multiselectable': "true",

  initialize: function () {
    this.set('accordionGroup', this);
  }.on('init')
});
