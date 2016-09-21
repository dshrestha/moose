import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.findAll('blog-category');
  },

  afterModel: function (categories) {
    if (categories.get('length') > 0) {
      this.transitionTo('blogs.categories.category', categories.get('firstObject'));
    }
  }
});
