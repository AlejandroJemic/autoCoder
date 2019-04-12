var jsonSuport = {
	isArray: function(obj) {
    	return Object.prototype.toString.call(obj) === '[object Array]';
	},
	isObject: function(obj){
    	return obj !== undefined && obj !== null && obj.constructor == Object;
	},
	isBoolean: function(obj){
    	return obj !== undefined && obj !== null && obj.constructor == Boolean;
	},
	isFunction: function (obj){
    	return obj !== undefined && obj !== null && obj.constructor == Function;
	},
	isNumber: function(obj){
    	return obj !== undefined && obj !== null && obj.constructor == Number;
	},
	isString: function(obj){
    	return obj !== undefined && obj !== null && obj.constructor == String;
    },
    isFunction: function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
	isInstanced: function(obj){
		if(obj === undefined || obj === null) { return false; }
		if(isArray(obj)) { return false; }
		if(isBoolean(obj)) { return false; }
		if(isFunction(obj)) { return false; }
		if(isNumber(obj)) { return false; }
		if(isObject(obj)) { return false; }
		if(isString(obj)) { return false; }
		return true;
	},
	HasProprty: function(obj,propertyName){
		if(obj.hasOwnProperty(propertyName)){
			return true;
		}
		else{return false;}
	},
	ForEachInJson: function(list, ExecuteFunction ){
		for (var i = 0; i < list.length; i++) { 
			ExecuteFunction(list[i]);
		}
	},
	CreateElementsForList: function(obj){
		var menu =  $("#mySidenavElements");
		console.log("creating element: " +  obj.name + ", type: "  + obj.type)
		if(obj.type == "select")
		{
			if(jsonSuport.HasProprty(generalOptions, obj.options)){
			    jsonSuport.CreateSelectForList(menu,generalOptions[obj.options], obj.name,null,"col-12");
			}
		}
		if(obj.type == "text")
		{
			jsonSuport.CreateInputText(menu,obj.options, obj.name,null,"col-12");
		}
	},
	CreateInputText: function(ParentElementHeader,options,text,onchangeFunc,col){
		var inputText =  document.createElement("INPUT");
		inputText.setAttribute("type", "text");
		$(inputText).addClass("form-control text");
		if(col != null){
			$(inputText).addClass(col);
		}
		else{
			$(inputText).addClass("col-4");
		}
		if(options == "number"){
			$(inputText).attr("onkeypress", "return EnterosPositivos(event);");
		}
		$(inputText).attr("placeholder", text);
		$(inputText).prop("title", text);
		$(inputText).attr("id", text);
		$(inputText).attr("name", text);
		if(onchangeFunc != null){
            if(this.isFunction(onchangeFunc)){
                $(inputText).change(function(){ onchangeFunc(inputText,obj); });
		    }
		}
		$(ParentElementHeader).append(inputText);
	},
	CreateSelectForList: function(ParentElementHeader,obj,text,onchangeFunc,col){
		var select = document.createElement("select");
		$(select).addClass("form-control select");
		if(col != null){
			$(select).addClass(col);
		}
		else{
			$(select).addClass("col-4");
		}
		
		$(select).attr("placeholder", text);
		$(select).prop("title", text);
		$(select).attr("id", text);
		$(select).attr("name", text);
		if(onchangeFunc != null){
            if(this.isFunction(onchangeFunc)){
                $(select).change(function(){ onchangeFunc(select,obj); });
		    }
	    }

		this.PopulateSelectFromList(select,obj,text);
        $(ParentElementHeader).append(select);
        if(obj.length == 1){
            if(this.HasProprty(obj[0],"screenSizes")){
                this.CreateSelectForList(ParentElementHeader,obj[0].screenSizes, "sizes", setSize);
			}
			if(this.HasProprty(obj[0],"orientation")){
				jsonSuport.CreateSelectForList(ParentElementHeader,obj[0].orientation, "orientation");
			}
        }
	},
	PopulateSelectFromList: function(select,obj,text){
		if(obj.length > 1){
			$(select).append($('<option></option>').val(0).html(text));
		}
		if(this.isArray(obj)){
			$.each(obj, function(i, p) {
				$(select).append($('<option></option>').val(p.id).html(p.name));
			});
			if(obj.length == 1){
                $(select).val(1);
			}
		}
	}
}