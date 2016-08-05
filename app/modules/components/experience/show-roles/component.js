import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    showProjects: function (experience) {
      this.sendAction('showProjects', experience);
    }

  }
});
