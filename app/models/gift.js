import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
     name : DS.attr('string')
    , status : DS.attr('string',{defaultValue : 'queued'})
    , type : DS.attr('string')
    , maxcount : DS.attr('number',{defaultValue : 1 })
    , currentcount : DS.attr('number',{defaultValue : 0 })
    , blockedbycontact : DS.attr()
    , blockedon : DS.attr()
    , createdon : DS.attr('date',{defaultValue : new Date()})
    , createdby : DS.attr()
    
    ,checked : computed('maxcount','currentcount',function(){
        
        if(this.get('currentcount') >= this.get('maxcount')) return true;
        else return false;
    })

    ,blockedalready : computed('maxcount','currentcount',function(){
        
        if(this.get('currentcount') == this.get('maxcount')) return true;
        else return false;
    })


    //blockedby is actually blocked
    // ,checked : DS.attr('boolean',{defaultValue : false})
});
