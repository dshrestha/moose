import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.findAll('blog-category').then((categories)=> {
      return categories.map(function (category) {
        return Ember.ObjectProxy.create({
          content: category,
          selected: false
        });
      });
    });
  },

  actions: {

    openCategory(category){
      this.transitionTo("blog-categories.openCategory", category);
    }

  }
});
