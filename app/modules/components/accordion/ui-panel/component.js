import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['panel', 'panel-default'],

  groupId: null,

  expanded: false,

  headingId: Ember.computed('elementId', function () {
    return this.get('elementId') + '-heading';
  }),

  bodyId: Ember.computed('elementId', function () {
    return this.get('elementId') + '-body';
  }),

  show(event){
    let context = event.data.scope;
    if (context.attrs.show) {
      context.attrs.show();
    }
  },

  shown(event){
    let context = event.data.scope;
    if (context.attrs.shown) {
      context.attrs.shown();
    }
  },

  hide(event){
    let context = event.data.scope;
    if (context.attrs.hide) {
      context.attrs.hide();
    }
  },

  hidden(event){
    let context = event.data.scope;
    if (context.attrs.hidden) {
      context.attrs.hidden();
    }
  },

  didInsertElement(){
    this._super(...arguments);
    Ember.$(this.get('element')).on('show.bs.collapse', {scope: this}, this.show);
    Ember.$(this.get('element')).on('shown.bs.collapse', {scope: this}, this.shown);
    Ember.$(this.get('element')).on('hide.bs.collapse', {scope: this}, this.hide);
    Ember.$(this.get('element')).on('hidden.bs.collapse', {scope: this}, this.hidden);
  },

  willDestroyElement(){
    this._super(...arguments);
    Ember.$(this.get('element')).off('show.bs.collapse', this.show);
    Ember.$(this.get('element')).off('shown.bs.collapse', this.shown);
    Ember.$(this.get('element')).off('hide.bs.collapse', this.hide);
    Ember.$(this.get('element')).off('hidden.bs.collapse', this.hidden);
  }
});
