import Route from '@ember/routing/route';
import RSVP from 'rsvp';


export default Route.extend({
 
  model() {
    return RSVP.hash({
      gifts :  this.store.findAll('gift'),
      newgift : this.store.createRecord('gift')
    });
  }
  , actions : {
    addnewgift(newgift) {
      // var self = this;
      newgift.save().then( () => {
        this.controller.set('model.newgift',this.store.createRecord('gift'))
        // self.set('newgift','');
      })
    
    }
  }
});
