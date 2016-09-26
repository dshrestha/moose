import DS from 'ember-data';
var {attr}=DS;

export default DS.Model.extend({
  name: attr('string'),
  'post-count': attr('number')
});
