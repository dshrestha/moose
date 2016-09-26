import DS from 'ember-data';
var {attr}=DS;

export default DS.Model.extend({
  content: attr('string')
});
