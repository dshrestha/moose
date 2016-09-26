import Ember from 'ember';

export default Ember.Route.extend({

  model(params){
    return this.store.findRecord('blog-post', params.post_id);
  },

  afterModel(model){
    return model.get('content');
  }

});
