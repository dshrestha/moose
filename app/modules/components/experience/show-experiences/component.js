import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['experience-container'],

  selectedExperience: null,

  tabs: null,

  showRole: true,

  showProjects: false,

  init() {
    this._super(...arguments);
    let selectedExperience = this.get('experiences.firstObject');
    this.set('selectedExperience', selectedExperience);
    this.set('tabs', [{'label': 'Role'}, {
      'label': 'Projects',
      'badge': Ember.get(selectedExperience, 'projects.length')
    }]);
  },


  actions: {

    selectExperience (experience) {
      this.set('selectedExperience', experience);
      let projectTab = this.get('tabs').findBy('label', 'Projects');
      Ember.set(projectTab, 'badge', Ember.get(experience, 'projects.length'));
      this.get('setTimeLineFocus')(experience);
    },

    onTabClick(option){
      if (Ember.get(option, 'label') === 'Role') {
        this.setProperties({
          showRole: true,
          showProjects: false
        });
      } else {
        this.setProperties({
          showRole: false,
          showProjects: true
        });
      }
    }
  }

});
