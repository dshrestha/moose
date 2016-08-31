import Ember from 'ember';

export default Ember.Component.extend({

  selectedTab: null,

  classNames: ['tab-pane'],

  init(){
    this._super(...arguments);
    this.set('selectedTab', this.get('tabs.firstObject'));
  },

  actions: {

    onTabClick(tab){
      this.set('selectedTab', tab);
      this.get('onTabClick')(tab);
    }
  }
});
