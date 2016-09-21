import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('home');
  this.route('albums');
  this.route('blog-categories', function () {
    this.route('blog-category', {path: ':category_id'}, function () {
      this.route('post', {path: '/posts/:post_id'});
    });

  });
  this.route('contact');
});

export default Router;
