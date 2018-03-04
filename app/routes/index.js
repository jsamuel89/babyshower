import Route from '@ember/routing/route';
import groupBy from 'ember-group-by';

export default Route.extend({

  model() {

    var thisObj = this;

    this.gifts = Ember.Object.extend({
      all: Ember.computed(function () {
          return thisObj.store.peekAll('gift');
        })

        ,
      qview: Ember.computed('all', function () {
          return this.get('all');
        })

        //   , queued : Ember.computed.filterBy('qview', 'queued', true) //.filterBy('yettoarrive',false) // .sort Timeorder.

        //   // This should be waiting.
        //   , arrived : Ember.computed.filterBy('queued', 'yettoarrive', false)


        //   , uniquedeptartments : Ember.computed.uniqBy('all','deptname')

        //   , deptartments : Ember.computed.map('uniquedeptartments',function(deptartment) {
        //       return {title : deptartment.get('deptname') }
        //   })

        //   , uniquedoctors : Ember.computed.uniqBy('qview','proname') 

        //   , doctors : Ember.computed.map('uniquedoctors',function(doctor) {
        //       return {title : doctor.get('proname') }
        //   })

        //   , selecteddepartments : []

        //   , filtereddepartments : Ember.computed('selecteddepartments.[]' , function() {

        //     console.log(this.get('qview'))
        //     if(this.get('selecteddepartments').length > 0) {
        //       return this.get('qview').filter( (element) => {            
        //         if((this.get('selecteddepartments').indexOf(element.get('deptname'))) > -1) {
        //           return element;
        //         }            
        //       })

        //     }
        //     else {
        //       return this.get('all')
        //     }

        //   })

        //   , selecteddoctors : []

        //   , filtereddoctors : Ember.computed('selecteddoctors.[]' , function() {
        //       console.log(this.get('qview'))        
        //       if(this.get('selecteddoctors').length > 0) {

        //         return this.get('qview').filter( (element) => {        
        //           if((this.get('selecteddoctors').indexOf(element.get('proname'))) > -1) {
        //             return element;
        //           }            
        //         })

        //       }
        //       else {
        //         return this.get('all')
        //       }

        //   })

        ,
      giftsByGroups: groupBy('qview', 'type')


      // , waiting : Ember.computed.filterBy('queueByDoctors','visitstatus','waiting')

      //   , calling : Ember.computed.filterBy('queueByDoctors','visitstatus','calling')

    }).create();


    // var visitStates = ['waiting', 'calling', 'serving', 'consumed'];
    // visitStates.forEach(function(element) {
    //   Ember.defineProperty(this, element, Ember.computed.filterBy('qview', 'visitstatus', element))
    // }, this.gifts);



    return this.store.findAll('gift').then((gifts) => {

      //   Ember.set(this.gifts, 'qviewfilter', 'all');

      return Ember.RSVP.hash({
        gifts: this.gifts.get('all'),
        qi: this.gifts
      })
    })

	}
	, setupController: function(controller,model) {
    this._super(controller, model);
   
  }
  , actions: {
    blockgifts(model, guestname, passcode) {
      // check passcode here
      if(passcode === 'sahitya') {

        var blocked = model.gifts
        
        blocked.forEach(element => {
          
          if (element.get('checked') && !element.get('blockedalready')) {  
          
            var blockedarr = (element.get('blockedbycontact')) ?  [element.get('blockedbycontact')] : []
            blockedarr.push(guestname)

            var blockedonarr = (element.get('blockedon')) ?  [element.get('blockedon')] : []
            blockedonarr.push(new Date())
            
            
            element.set('blockedbycontact', blockedarr)
            element.set('blockedon', blockedonarr)
            element.set('currentcount',  element.get('currentcount')+1)
            if(element.get('currentcount') +1 >  element.get('maxcount')) element.set('status', 'blocked')          
          }
          
        });
        
        model.gifts.save().then(()=> {
          $('.modal').modal('close');
          // location.reload();
          Materialize.toast('Gifts selected', 4000 , 'green rounded') // 4000 is the duration of the toast
        })
        
      } else {
        // $('.modal').modal('close');
        Materialize.toast('Invalid credentials', 4000 , 'red rounded') // 4000 is the duration of the toast
        
      }


    }
    , triggermodal() {
      $('#hrformsubmit').modal('open');
    }

  }
});
