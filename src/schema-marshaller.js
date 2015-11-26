function SchemaMarshaller(formInstance){
    this.isAcceptable=function(obj){
	return obj!==null ||  typeof(obj)!=='undefined';
    };
    this.isObject=function(obj){
	return typeof(obj)==='object';
    };
    this.objectIsNotEmpty=function(obj){
	return Object.keys(obj).length>0;
    };
    this.dataType=function(dType){
	var value;
	if(this.isAcceptable(dType)){
	    switch(dType){
	    case "Number":
		value= parseInt();
		break;
	    case "String":
		value="";
		break;
	    case "Array":
		value={};
		break;
	    case "Date":
		value=new Date();
		break;
	    case "ObjectID":
		value="";
		break;
	    case "Mixed":
		value="";
		break;
	    case "Boolean":
		value=false;
		break;
	    }
	}
	return value;
    };
    this.mForm=formInstance;
    
}
SchemaMarshaller.prototype.marshallValidators=function(validatorObj){
    var domValidator, validationTypes=[];
    if(this.isAcceptable(validatorObj)){
	    domValidator=this.mForm.createNgMessageParent();
	    for(var obj in validatorObj){
		if(this.isObject(validatorObj[obj]))
		    for(var prop in validatorObj[obj]){
			if(this.isAcceptable(validatorObj[obj][prop])){
			    var type=validatorObj[obj][prop].type;
			    domValidator
				.appendChild(
				    this.mForm.createNgMessageChild(type)
				);
			    validationTypes.push({
				name:type,
				value:validatorObj[obj][prop][type]
			    });
			}
		    }

	    }
	}
    return {
	domValidator:domValidator,
	validationTypes:validationTypes
    };
};

SchemaMarshaller.prototype.marshallSchema=function(){
    var schema=this.mForm.schema;
    if(this.isObject(schema)){
	this.mForm.form=this.mForm.createForm();
	for(var property in schema){
	    this.mForm.model[property]=this.dataType(schema[property].instance);
	    var validations=this.marshallValidators(schema[property]);
	    var label=this.mForm.createInputFieldLabel(property);
	    var inputField=this.mForm.createInputField(
		validations.validationTypes,
		property,
		property,
		property
		);
	    var container=this.mForm.createInputContainer();
	    container.appendChild(label);
	    container.appendChild(inputField);
	    container.appendChild(validations.domValidator);
	    this.mForm.form.appendChild(container);
	}
	
    }
};

function FormBuilder(formInstance){
    SchemaMarshaller.call(this, formInstance);
}


FormBuilder.prototype=Object.create(SchemaMarshaller.prototype);
FormBuilder.prototype.constructor=FormBuilder;






