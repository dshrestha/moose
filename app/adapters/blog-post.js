import applicationAdapter from './application';

export default applicationAdapter.extend({

  namespace: 'api/blog',

  pathForType: function () {
    return 'posts';
  }
});
