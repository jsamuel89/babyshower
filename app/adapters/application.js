import DS from 'ember-data';
import { camelize } from '@ember/string';
import ENV from "../config/environment";


export default DS.JSONAPIAdapter.extend({


    host: ENV.host,
    namespace: 'api',
    // change default naming scheme from dasherize to camelize
    pathForType(type) {
      var camelized = camelize(type);
      return Ember.String.pluralize(camelized);
    }
});
