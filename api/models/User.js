/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var bcrypt = require('bcrypt');


module.exports = {
  schema:true,

  attributes: {
  	//atributos permitidos son: string, text, integer, float, date, datetime, boolean, binary, array, json, email.
  	firstname: {
    	type: 'string',
      	required: true
    },
    lastname: {
      	type: 'string',
      	required: true
    },
    email: {
      	type: 'string',
      	required: true,
      	unique: true
    },
    encryptedPassword: {
    	type: 'string'
    },
    // Este método es para evitar pasar toda la información del modelo
    // Evitamos pasar los siguientes parámetros: password, confirmation, encryptedPassword y _csrf. 
    toJSON: function() { 
      	var obj = this.toObject();
	    delete obj.password;
	    delete obj.confirmation;
	    delete obj.encryptedPassword;
	    delete obj._csrf;
	    return obj;
    }

    //Facebook id desde el callback
    /*facebookId: {
        type: 'string',
        required: true,
        unique: true
    },*/
  },
  /*
  * Podemos ocupar metodos CALLBACK para ejecutar después de ciertas acciones
    
    *Callbacks on create
    beforeValidate: fn(values, cb)
    afterValidate: fn(values, cb)
    beforeCreate: fn(values, cb)
    afterCreate: fn(newlyInsertedRecord, cb)
    
    *Callbacks on update
    beforeValidate: fn(valuesToUpdate, cb)
    afterValidate: fn(valuesToUpdate, cb)
    beforeUpdate: fn(valuesToUpdate, cb)
    afterUpdate: fn(updatedRecord, cb)
    
    *Callbacks on destroy
    beforeDestroy: fn(criteria, cb)
    afterDestroy: fn(destroyedRecords, cb)
  */

  beforeCreate: function(values, next){
      console.log(values);
      //verificar si los passwords son iguales
      if(!values.password || values.password != values.confirmation){
        return next({err: ["Los passwords no coinciden."]});
      }

      bcrypt.hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
        if(err) return next(err);
        values.encryptedPassword = encryptedPassword;
        next();
      });
    }

};

