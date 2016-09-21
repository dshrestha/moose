import Ember from 'ember';

export default Ember.Route.extend({

  redirect(model){
    this.replaceWith("blog-categories.blog-category", model.get('firstObject'));
  }
});
