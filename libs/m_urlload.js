// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ m_urlload - JavaScript url Content Loader                                                     │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright science © 2011 Sergiu Gordienco Vasile (http://first-jump.com)                      │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under http://creativecommons.org/licenses/by-nc-nd/3.0/ license.                     │ \\
// │ This work is licensed under the Creative Commons                                              │ \\
// │ Attribution-NonCommercial-NoDerivs 3.0 Unported License.                                      │ \\
// │ To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/3.0/.      │ \\
// └───────────────────────────────────────────────────────────────────────────────────────────────┘ \\

window.m_urlload = function(url,onload_f,vars,get_data,post_data,headers,method_r,responseType, sessionConnected) {
	/* check if it is a new instance */
	if(this === window)	return new m_urlload(url,onload_f,vars,get_data,post_data,headers,method_r,responseType, sessionConnected);
	this.id	= 'load_urldata_'+new Date().valueOf()+'_'+Math.floor(Math.random()*1000000);
	/* load obj to window obj */
		window[this.id]	= this;
	
	if(!vars)	vars	= {};
	if(!method_r)	method_r	= ( !post_data ? 'get' : 'post' );
	if(!responseType)	responseType	= 'text';
	var types_r	= {
		"arraybuffer"	: "arraybuffer",
		"blob"			: "blob",
		"document"		: "document",
		"json"			: "json",
		"text"			: "text",
		"binary"		: "arraybuffer"
	};
	this.responseType	= ( responseType in types_r ) ? responseType : "text";
	this.vars	= vars;
	this.method_r	= method_r;
	this.url	= url;
	this.onload_f	= onload_f;
	this.onloading_f	= ( typeof(vars) == "object" && "onloading_f" in vars && typeof(vars["onloading_f"]) == "function" ? vars["onloading_f"] : false );
	this.text	= null;
	this.sessionConnected	= !!sessionConnected;
	this.get_data	= (typeof(get_data)	== "object"	? get_data	: {});
	this.post_data	= (typeof(post_data)	== "object"	? post_data	: {});
	
	this.endEval	= function(){
		/* clean timer */
			var e;try { clearInterval(this.timer); } catch(e) {};
		/* try to eval function */
			try {var url = this.url,text=this.text,vars=this.vars,get=this.get_data,post=this.post_data,fullUrl=this.fullUrl,method_r = this.method_r;
				if(this.responseType == "binary") {
					var i,a = new Uint8Array(this.link.response),t = "";
					for(i=0;i<a.length;i++) t += String.fromCharCode( a[i] % 256 );
					text = t;
				};
				(this.onload_f)(url,text,vars,get,post,fullUrl,headers,method_r,this.responseType,this.link); } catch (e) {
				// console.error('m_urlload » endEval',e);
			};
		/* try to delete instance from window object */
			try { delete window[this.id]; } catch (e) {};
	};

	this.tmpEval	= function(){
			if(!this.onloading_f) return false;
		/* try to eval function */
			try {var url = this.url,text=this.text,vars=this.vars,get=this.get_data,post=this.post_data,fullUrl=this.fullUrl,method_r = this.method_r;
				if(this.responseType == "binary") {
					var i,a = new Uint8Array(this.link.response),t = "";
					for(i=0;i<a.length;i++) t += String.fromCharCode( a[i] % 256 );
					text = t;
				};
				(this.onloading_f)(url,text,vars,get,post,fullUrl,headers,method_r,this.responseType,this.link); } catch (e) {
				console.error('m_urlload » endEval',e);
			};
	};
	
	this.link = new XMLHttpRequest();

	var r	= [];
	var i;
	if( 'objEncodeURL' in window ) {
		r = objEncodeURL(this.get_data);
	} else {
		for(i in this.get_data)
			r.push(i+'='+encodeURIComponent(''+this.get_data[i]));
		r = r.join('&');
	};
	this.fullUrl	= this.url+(r.length ? (this.url.indexOf('?') == -1 ? '?' : (r.length ? '&' : '')) : '')+r;
	if( this.sessionConnected ) {
		this.link.withCredentials	= true;
		this.link.open( method_r, this.fullUrl, true );
	} else {
		if (typeof(sessionConnected) == "undefined") {
			this.link.withCredentials	= true;
		}
		this.link.open(method_r, this.fullUrl);
	}

	this.link.responseType	= types_r[this.responseType];

	if( 'objEncodeURL' in window ) {
		r = objEncodeURL(this.post_data);
	} else {
		r	= [];
		for(i in this.post_data)
			r.push(i+'='+encodeURIComponent(''+this.post_data[i]));
		r	= r.join('&');
	};
	if(1) {
		// if( this.sessionConnected ) {
		// 	this.link.setRequestHeader("Cookie", document.cookie || "" );
		// }
		if (typeof(headers) === "undefined") {
			try {
				this.link.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=ISO-8859-1");
			} catch(i) {};
		}
		/* try {
		in webkit is not supported
		this.link.setRequestHeader("Content-length", r.length);
		} catch(i) {};try {
		this.link.setRequestHeader("Connection", "close");
		} catch(i) {}; */
	};
	if(headers) {
		for(i=0;i<headers.length;i++)
			this.link.setRequestHeader(headers[i].name,headers[i].value);
	};
	eval("this.link.onreadystatechange = function() {var id = \""+this.id+"\";if(!(id in window)) return false;\n\
		if(window[id].link.readyState == 4){window[id].text	= window[id].link.response;window[id].endEval();}\n\
		else if(window[id].link.readyState == 3){window[id].text	= window[id].link.response;window[id].tmpEval();}\n\
		else if( ('status' in window[id] ) && ( window[id].status == 404 ) ) {window[id].endEval();}	return true; }");
	this.link.send(r);
	
	return true;
}
