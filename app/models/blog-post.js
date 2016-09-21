import DS from 'ember-data';
var {attr, belongsTo}=DS;

export default DS.Model.extend({
  title: attr('string'),
  createdOn: attr('date'),
  abstract: attr('string'),
  category: belongsTo('blog-category'),
  content: belongsTo('blog-post-content', {async: true})
});
