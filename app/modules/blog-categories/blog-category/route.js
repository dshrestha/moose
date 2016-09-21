import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(){
    this.modelFor('blog-categories').setEach('selected', false);
  },

  model(params){
    return this.modelFor('blog-categories').findBy('id', params.category_id);
  },

  afterModel(model){
    model.set('selected', true);
  }

});
