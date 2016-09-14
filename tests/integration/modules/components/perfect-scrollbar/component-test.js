import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('perfect-scrollbar', 'Integration | Component | perfect scrollbar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{perfect-scrollbar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#perfect-scrollbar}}
      template block text
    {{/perfect-scrollbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
