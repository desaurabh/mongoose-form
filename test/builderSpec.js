
var schemaTable=JSON.parse(JSON.stringify({"user":{"username":{"enumValues":[],"path":"username","instance":"String","validators":[]},"fName":{"enumValues":[],"path":"fName","instance":"String","validators":[]},"lName":{"enumValues":[],"path":"lName","instance":"String","validators":[]},"password":{"enumValues":[],"path":"password","instance":"String","validators":[]},"email":{"enumValues":[],"path":"email","instance":"String","validators":[]},"userCreated":{"path":"userCreated","instance":"Date","validators":[]},"activated":{"path":"activated","instance":"Boolean","validators":[]},"role":{"enumValues":[],"path":"role","instance":"String","validators":[]},"_id":{"path":"_id","instance":"ObjectID","validators":[]}},"test":{"name":{"enumValues":[],"path":"name","instance":"String","validators":[]},"binary":{"path":"binary","instance":"Buffer","validators":[]},"living":{"path":"living","instance":"Boolean","validators":[]},"updated":{"path":"updated","instance":"Date","validators":[]},"age":{"path":"age","instance":"Number","validators":[{"message":"Path `{PATH}` is required.","type":"required"},{"message":"Path `{PATH}` ({VALUE}) is less than minimum allowed value (18).","type":"min","min":18},{"message":"Path `{PATH}` ({VALUE}) is more than maximum allowed value (65).","type":"max","max":65}],"isRequired":true},"mixed":{"path":"mixed","instance":"Mixed","validators":[]},"_someId":{"path":"_someId","instance":"ObjectID","validators":[]},"array":{"caster":{"path":"array","instance":"Mixed","validators":[]},"path":"array","instance":"Array","validators":[]},"ofString":{"enumValues":[],"path":"ofString","instance":"String","validators":[{"message":"Path `{PATH}` (`{VALUE}`) is longer than the maximum allowed length (22).","type":"maxlength","maxlength":22}]},"ofNumber":{"caster":{"path":"ofNumber","instance":"Number","validators":[]},"path":"ofNumber","instance":"Array","validators":[]},"ofDates":{"caster":{"path":"ofDates","instance":"Date","validators":[]},"path":"ofDates","instance":"Array","validators":[]},"ofBuffer":{"caster":{"path":"ofBuffer","instance":"Buffer","validators":[]},"path":"ofBuffer","instance":"Array","validators":[]},"ofBoolean":{"caster":{"path":"ofBoolean","instance":"Boolean","validators":[]},"path":"ofBoolean","instance":"Array","validators":[]},"ofMixed":{"caster":{"path":"ofMixed","instance":"Mixed","validators":[]},"path":"ofMixed","instance":"Array","validators":[]},"ofObjectId":{"caster":{"path":"ofObjectId","instance":"ObjectID","validators":[]},"path":"ofObjectId","instance":"Array","validators":[]},"nested.stuff":{"enumValues":[],"path":"nested.stuff","instance":"String","validators":[]},"_id":{"path":"_id","instance":"ObjectID","validators":[]}}}));

describe("form-builder suite", function() {
    
    it("Initializing 'MaterialForm' & expecting 'initializing' to be false",function(){
	var obj=new MaterialForm();
	expect(obj.initialized).toBe(false);
    });

    it("Initializing 'MaterialForm(model, modelName)' & expecting 'initializing' to be true",function(){
	var obj=new MaterialForm(schemaTable.test, "test");
	expect(obj.initialized).toBe(true);
    });

    it("Initializing 'MaterialForm(schemaTable, modelName)' & expecting 'initializing' to be true",function(){
	var obj=new MaterialForm(schemaTable, "test");
	expect(obj.initialized).toBe(true);
    });

});
