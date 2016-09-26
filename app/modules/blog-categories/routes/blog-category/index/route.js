import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    let category = this.modelFor('blog-categories.blog-category');
    return this.store.query('blog-post', {categoryId: category.get('id')});
  },

  actions: {

    openPost(post){
      this.transitionTo("blog-categories.blog-category.post", post);
    }
  }

});
