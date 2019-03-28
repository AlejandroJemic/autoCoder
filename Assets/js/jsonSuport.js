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
	ForEachInJson: function(obj, ExecuteFunction ){
		Object.keys(obj).forEach(ExecuteFunction(key));
	},
	CreateSelectForList: function(ParentElementHeader,obj,text,onchangeFunc){
		var select = document.createElement("select");
		$(select).addClass("form-control select col-4");
		$(select).attr("placeholder", text);
		$(select).attr("id", text);
        $(select).attr("name", text);
        if(this.isFunction(onchangeFunc)){
            $(select).change(function(){ onchangeFunc(select,obj); });
        }

		this.PopulateSelectFromList(select,obj,text);
        $(ParentElementHeader).append(select);
        if(obj.length == 1){
            if(this.HasProprty(obj[0],"tamaños_pantalla")){
                this.CreateSelectForList(ParentElementHeader,obj[0].tamaños_pantalla, "tamaños", setTamaño);
			}
			if(this.HasProprty(obj[0],"orientacion")){
				jsonSuport.CreateSelectForList(ParentElementHeader,obj[0].orientacion, "orientacion");
			}
        }
	},
	PopulateSelectFromList: function(select,obj,text){
		if(obj.length > 1){
			$(select).append($('<option></option>').val(0).html(text));
		}
		if(this.isArray(obj)){
			$.each(obj, function(i, p) {
				$(select).append($('<option></option>').val(p.id).html(p.nombre));
			});
			if(obj.length == 1){
                $(select).val(1);
			}
		}
	}
}