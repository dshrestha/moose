import Ember from 'ember';

export default Ember.Component.extend({

  selectedExperience: null,

  init() {
    this._super(...arguments);
    this.set('selectedExperience', this.get('experiences.firstObject'));
  },

  actions: {

    setSelectedExperience: function (experience) {
      this.set('selectedExperience', experience);
      this.sendAction("setTimeLineFocus", experience);
    }
  }

});
