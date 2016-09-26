import Ember from 'ember';
import Resolver from 'ember-resolver';

const moduleRoutes = ['blog-categories'];

let resolver = Resolver.extend({


  /**
   * Custom resolver for hybrid approach of organizing(resolving) resources/files.
   * The method allows for placing resources such as components/routes within your
   * parent route folder. It supports following folder structure
   *
   * app
   *  |-modules
   *      |-parent-route
   *           |-models
   *               |-model-a
   *                  |-model.js
   *                  |-adapter.js
   *                  |-serializer.js
   *           |-components
   *                |-some-component
   *                      |-component.js
   *                      |-template.hbs
   *           |-routes
   *                |-index
   *                    |-route.js
   *                    |-template.hbs
   *                |-route.js
   *                |-template.hbs
   *
   * @method 'mooseCustomResolver'
   * @param {String} route name
   * @param {Object} parsed resource name
   * @return {String} path to resource
   * */
  mooseCustomResolver: function (module, parsedName) {
    let podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;
    let path = null;
    let re = new RegExp('^' + module + '(/)?');
    let fullNameWithoutType = parsedName.fullNameWithoutType;
    let moduleNameMatch = fullNameWithoutType.match(re);
    let lookInSubFolder = null;

    switch (parsedName.type) {
      case "controller":
      case "route":
        lookInSubFolder = moduleNameMatch ? "routes" : null;
        break;
      case "component":
        lookInSubFolder = "components";
        break;
      case "template":
        //templates can be for components as well as for routes so use different paths based on what context the template is being used.
        let isComponentTemplate = fullNameWithoutType.match(/^components\//);
        fullNameWithoutType = isComponentTemplate ? fullNameWithoutType.replace(/^components\//, '') : fullNameWithoutType;
        lookInSubFolder = isComponentTemplate ? "components" : "routes";
        break;
      case "adapter":
      case "model":
      case "serializer":
        lookInSubFolder = "models";
        break;
    }

    if (lookInSubFolder) {
      path = (podPrefix + '/' + module + '/' + lookInSubFolder + '/' + fullNameWithoutType.replace(re, '') + '/' + parsedName.type).replace(/\/{2,}/g, '/');
    }
    return path;
  },

  moduleNameLookupPatterns: Ember.computed(function () {
    let defaults = this._super();

    moduleRoutes.forEach((module)=> {
      let studioModule = module + 'BasedModuleName';

      if (this[studioModule]) {
        defaults.pushObject(this[studioModule]);
      }
    });

    return defaults;
  })
});

/**
 * Dynamically injects methods based on module which calls our custom resolver
 * */
moduleRoutes.forEach(function (module) {
  let obj = {};
  let methodName = module + 'BasedModuleName';
  obj[methodName] = function (parsedName) {
    return this.mooseCustomResolver(module, parsedName);
  };
  resolver.reopen(obj);
});

export default resolver;
