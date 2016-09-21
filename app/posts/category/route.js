import Ember from 'ember';

export default Ember.Route.extend({

  serialize: function (model) {
    return {category_id: model.get('id')};
  }

});
