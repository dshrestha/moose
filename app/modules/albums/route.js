import Ember from 'ember';

export default Ember.Route.extend({

  getAlbums() {
    return new Ember.RSVP.Promise(function (resolve) {
      resolve([{
          "id": 1,
          "uploadDate": new Date(2014, 3, 30),
          "name": "Portland, OR",
          "coverPhoto": "IMG_6123.jpg",
          "description": [
            "My very first Ember conference as well as my first stay in the hipster city of Portland was quite memorable. " +
            "I had stayed near Pioneer Courthouse Square and it was always lively there, the city felt new, super relaxed" +
            "with lots of restaurants and shops nearby.",
            "An hour or two hours drive from the city and you are welcomed by gorgeous walter falls, hiking trails and scenic views."
          ]
        }]
      );
    });
  },

  model(){
    return this.getAlbums();
  }


});
