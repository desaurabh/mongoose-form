function Form(schema, schemaName){
    this.form={};
    this.schema=schema;
    this.name=schemaName;
    this.formName=new String();
    this.model={};
    this.default={
	messages:{
	//mongoose default validator types
	required:"This field is required",
	min:"This field cannot be less then its minimum value",
	max:"This field cannot be more then its maximum value",
	minlength:"Minimum length required",
	maxlength:"Cannot exceed its maximum character length",
	match:"This must be matched",
	    enums:"This field does not match the criteria"
	},
	ngErrorAttr:{
	    required:"required",
	    min:"ng-minlength",
	    max:"ng-maxlength",
	    minlength:"ng-minlength",
	    maxlength:"ng-maxlength"
	}
    };

}

Form.prototype.createNgMessageChild=function(validationType, message){
    var parentElement=document.createElement("div");
    var parentAttr=document.createAttribute("ng-message");
    parentAttr.value=this.default.ngErrorAttr[validationType];
    parentElement.setAttributeNode(parentAttr);
    message=typeof(message)!=='undefined' ?
	message :this.default.messages[validationType];
    var content=document.createTextNode(message);
    parentElement.appendChild(content);
    return parentElement;
};

Form.prototype.createNgMessageParent=function(parentName, elemRole){
    var parentElement=document.createElement("div");
    var parentAttr=document.createAttribute("ng-messages");
    var roleAttr=document.createAttribute("role");
                roleAttr.value=typeof(elemRole)!=='undefined' ? elemRole : "alert";
                parentAttr.value=this.formName+"."+parentName+".$error";
    parentElement.setAttributeNode(parentAttr);
                parentElement.setAttributeNode(roleAttr);
    return parentElement;
};

Form.prototype.createForm=function(fName){
    var form;
    if(typeof(this.name)!=='undefined'){
	this.formName=typeof(fName)==='string' ?
	    fName+"Form":this.name + "Form";
        form=document.createElement("form");
	var formName=document.createAttribute("name");
	formName.value=this.formName;
	form.setAttributeNode(formName);
    }
    return form;
};

Form.prototype.createInputField=function(validationAttr, name, label, path){
    var parentInputField;
    parentInputField=document.createElement("input");
    var nameAttr=document.createAttribute("name");
    nameAttr.value=name;
    var pathAttr=document.createAttribute("ng-model");
    pathAttr.value=this.name+"."+path;
    parentInputField.setAttributeNode(pathAttr);
    parentInputField.setAttributeNode(nameAttr);
    if(typeof(validationAttr)!=='undefined'){
	for(var attr in validationAttr){
	    var valAttr=document.createAttribute(validationAttr[attr].type);
	    valAttr.value=validationAttr[attr].value;
	    parentInputField.setAttributeNode(valAttr);
	}
	    
    }
    return parentInputField;
};
Form.prototype.createInputFieldLabel=function(labelName){
    var parent;
    if(typeof(labelName)!=='undefined'){
	parent=document.createElement("label");
	parent.appendChild(document.createTextNode(labelName));
    }
    return parent;
};

Form.prototype.createInputContainer=function(className){
    var parent=document.createElement("md-input-container");
    var attr=document.createAttribute("class");
    attr.value=typeof(className)!=='undefined' ? className : "md-block";
    parent.setAttributeNode(attr);
    return parent;
};

function MaterialForm(schema,schemaName){
    this.initialized=false;
    if(typeof(schema)==='object' && typeof(schemaName)==='string'){
	    Form.call(this,
		      schema.hasOwnProperty(schemaName) ?
		      schema[schemaName] : schema,
		      schemaName
		     );
	this.initialized=true;
	
    }
}

MaterialForm.prototype=Object.create(Form.prototype);
MaterialForm.prototype.constructor=MaterialForm;
