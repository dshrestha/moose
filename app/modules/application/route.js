import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    loading(transition) {
      if (this.controller) {
        let controller = this.controller;
        controller.set('loading', true);
        transition.promise.finally(function () {
          controller.set('loading', false);
        });
      }
    }

  }
});
