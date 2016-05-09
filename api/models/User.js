/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

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

    //Facebook id desde el callback
  	/*facebookId: {
      	type: 'string',
      	required: true,
      	unique: true
    },*/

     //model validation messages definitions
    validationMessages: { //hand for i18n & l10n
        email: {
            required: 'Email is required',
            email: 'Provide valid email address',
            unique: 'Email address is already taken'
        },
        firstname: {
            required: 'Username is required'
        },
        lastname: {
            required: 'Username is required'
        }
    },


    // Este método es para evitar pasar toda la información del modelo
    // Evitamos pasar los siguientes parámetros: password, confirmation, encryptedpassword y _csrf. 
    toJSON: function() { 
      	var obj = this.toObject();
	    delete obj.password;
	    delete obj.confirmation;
	    delete obj.encryptedPassword;
	    delete obj._csrf;
	    return obj;
    }

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

  }
};

