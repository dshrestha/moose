import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement(){
    var container = this.get('element');
    Ember.$(container).height(this.get("height"));
    Ps.initialize(container);
  }

});
