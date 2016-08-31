import Ember from 'ember';

export default Ember.Component.extend({

  selectedTab: null,

  classNames: ['tab-pane'],

  fade: true,

  init(){
    this._super(...arguments);
    this.set('selectedTab', this.get('tabs.firstObject'));
  },

  actions: {

    onTabClick(tab){
      let callBack = function () {
        this.set('selectedTab', tab);
        this.get('onTabClick')(tab);
      }.bind(this);
      if (this.get('fade')) {
        Ember.$(this.get('element')).find('.tab-content > div').fadeOut("fast", callBack);
      } else {
        callBack();
      }
      if (this.get('fade')) {
        Ember.$(this.get('element')).find('.tab-content > div').fadeIn("slow");
      }
    }
  }
});
