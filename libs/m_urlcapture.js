// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ m_urlcapture - JavaScript urlController                                                       │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2011-2018 Sergiu Gordienco Vasile (http://first-jump.com)                         │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under http://creativecommons.org/licenses/by-nc-nd/3.0/ license.                     │ \\
// │ This work is licensed under the Creative Commons                                              │ \\
// │ Attribution-NonCommercial-NoDerivs 3.0 Unported License.                                      │ \\
// │ To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/3.0/.      │ \\
// └───────────────────────────────────────────────────────────────────────────────────────────────┘ \\


window.m_urlcapture	= function(){
		this.actions	= {};
		this.id		= 'm_urlcapture_'+new Date().valueOf()+'_'+Math.floor(Math.random()*1000000);
		this.debug	= false;
		this.urlHist_maxLength	= 10;
		this.urlHist		= [];
		this.defController	= 'index';
		this.defAction		= '_';
		this.log	= function(){
			if(this.debug){
				var n,r=["'LOG m_urlcapture » '"];for(n=0;n<arguments.length;n++) r.push("arguments["+n+"]");
				eval("console.log("+r.join(",")+")");
			}
		};
		this.get	= function(){
			var n,i=[];
			for(n=0;n<arguments.length;n++)	i.push(arguments[n]); // fixing IE errors
			if(i[0] in {actions:1,id:1,debug:1,urlHist:1,defController:1,defAction:1,ifNoAction:1,urlSpliter:1,onUrlChange:1,afterUrlChange:1,unescape:1,urlHist_maxLength:1}){
				var	v = this,k;
				while(i.length){
					k = i.shift();
					if(typeof(v) != "object" && k != ""){
						if(this.debug)
							this.log("Error: Method [get] can\'t find option [",k,"] in value: [",v,"];    keys ramains: ",i," ;");
						return v;
					};
					if(k in v) v = v[k];
				}
				return v;
			} else {
				if(this.debug)
					this.log("Error: Method [get].. trying to extract no-default param .. keys: ",i,"");
				return null;
			}
		};
		this.set	= function(param,v){
			if( param in {debug:1,defAction:1,defController:1,ifNoAction:1,urlSpliter:1,unescape:1,urlHist_maxLength:1}){
				this[param]	= v;
			} else if(param == 'actions'){
				if(typeof(v) == "object"){
					switch(v.act){
						case "clean"	:
							this.actions	= {};
						break;
						case "del-controller":
							if(v.controller in this.actions)
								delete this.actions[v.controller];
						break;
						case "del-action":
							if(v.controller in this.actions)
							if(v.action in this.actions[v.controller])
								delete this.actions[v.controller][v.action];
						break;
						case "add":
							var i,j;if(typeof(v.data) == "object")
							for(i in v.data) {
								if(!(i in this.actions))
									this.actions[i]	= {};
								for(j in v.data[i])
								if(typeof(v.data[i][j]) == "function" || typeof(v.data[i][j]) == "object"){
									if(this.debug) {
										if(this.actions[i][j]){
											this.log("Overwrite Controller.action : [",i,".",j,"]; old-value: ",this.actions[i][j],"    new-value: ",v.data[i][j]);
										}
									}
									this.actions[i][j]	= v.data[i][j];
								}
							}
						
						break;
					}
				}
			} else if( param == "onUrlChange" || param == "afterUrlChange" ){
				var i;for(i in v)
				if(v[i] == null){
					if(i in this[param]){
						if(this.debug)
							this.log("Deleting this.",param," : [",i,"];");
						delete this[param][i];
					} else {
						if(this.debug)
							this.log("Error: Deleting this.",param," : [",i,"]; Not Found");
					}
				} else {
					if(i in this[param] && this.debug){
						this.log("Overwrite this.",param," : [",i,"]; old-value: ",this[param][i],"    new-value: ",v[i]);
					}
					this[param][i] = v[i];
				};
			} else {
				if(this.debug)
					this.log("Error: Method[set].. param: [",param,"]    value: [",value,"];");
				return false;
			}
		}
		
		this.ifNoAction	= function(controller,action,param,data,app){
			if(this.debug)
				this.log("\tController: ",controller,"    Action: ",action);
		}
		this.unescape	= function(s){
			var e,r;try {
				r = decodeURIComponent(s)
			} catch(e){
				r = unescape(s);
			};
			return r;
		};
		this.escape	= function(s) {
			var e,r;try {
				r = encodeURIComponent(s);
			} catch(e){
				r = escape(s);
			};
			return r;
		};
		this.urlSpliter	= "#!";
		this.onUrlChange	= {};
		this.afterUrlChange	= {};
		this.onUrlDiff_noSkip	= true;
		this.onUrlDiff	= function(url,last,t_action,t_params,skipHub){
			var hide	= false;
			if(url === false){
				hide	= true;
				var controller	= last;
				var action	= t_action;
				if(!t_params)	t_params	= [];
				var params	= t_params;
				var j,i		= [];
				i.push(controller);
				i.push(action);
				for(j=0;j<params.length;j++) i.push(params[j]);
			} else {
				if(this.debug)
					this.log('Document.location Change to: "',url,'"    from: "',last)
				var j,i = url.split(this.urlSpliter);
				i.shift();i = i.join(this.urlSpliter).split('/');
				for(j=0;j<i.length;j++)	i[j]	= this.unescape(i[j]);
				if(i.length < 1) i.push(this.defController);
				if(i.length < 2) i.push(this.defAction);
				var controller	= i[0];
				var action	= i[1];
			}
			if(action == '')	action	= this.defAction;
			if(controller == '')	controller	= this.defController;
			
			if(this.debug){
				this.log('Execution: Controller: ',controller,' Action: ',action);
			}
			var e,data	= {url:url,last:last,parts:i,obj:this,hide:hide,skipHub:(skipHub !== undefined ? skipHub : false)};
			for(j in this.onUrlChange)
				try {
					(this.onUrlChange[j])(controller,action,i.slice(2),data)
				} catch (e) {
					this.log("Error: onUrlChange[",j,"] .. ",e);
				}
			
				var no_act	= this.onUrlDiff_noSkip;
				    no_act	= true;
			
			if(controller in this.actions){
				if(action in this.actions[controller]){
					(this.actions[controller][action])(
						controller,
						action,
						i.slice(2),
						data,
						this
					);
					no_act = false;
				}
			}
			
			for(j in this.afterUrlChange)
				try {
					(this.afterUrlChange[j])(controller,action,i.slice(2),data)
				} catch (e) {
					this.log("Error: afterUrlChange[",j,"] .. ",e);
				}
			if(this.debug) this.log('Execution Status: ',!(no_act));
			if(no_act) {
				(this.ifNoAction)(
					controller,
					action,
					i.slice(2),
					data,
					this
				);
			};
		};
		this.urlCheck	= function(){
			var last;
			if(this.urlHist.length < 1){
				last	= '';
			} else {
				last	= this.urlHist[this.urlHist.length-1];
			};
			var url	= document.location.href;
			if(last != url){
				this.urlHist.push(url);
				if(this.urlHist.length > this.urlHist_maxLength)	this.urlHist.shift();
				if(this.urlHist.length > this.urlHist_maxLength)	this.urlHist.shift();
				this.onUrlDiff(url,last);
			}
		};
		
		this.parseUrl	= function(url){
			var j,i = url.split(this.urlSpliter);
			i.shift();i = i.join(this.urlSpliter).split('/');
			for(j=0;j<i.length;j++)	i[j]	= this.unescape(i[j]);
			return {
				controller	: (i.length ? i.shift() : false),
				action		: (i.length ? i.shift() : false),
				params		: i
			}
		};
		
		// creating timer sinaps
		this.timer	= false;
		this.start	= function(){
			this.stop();	// prevent double init
			// check for _escaped_fragment_
			var r = '',m,p;
			var e;
			try {
				var urlData	= (window.location.href+"").parseUrl(true);
				p = urlData.pathname;
				if( !r && "_escaped_fragment_" in urlData.get_vars )
					r = urlData.get_vars["_escaped_fragment_"];
				if( !r && ( m = urlData.pathname.match(/^([\s\S]*)\/\_\!(\/|$)([\s\S]*)$/) ) ) {
					r = m[3];
					p = m[1];
				};
				if( r.length && "replaceState" in window.history )
				this.replaceUrl(urlData.origin+p+this.urlSpliter+r);
			} catch(e) {
				this.log("Warn:", e);
			}
			// check for ajaxPage
			eval("this.timer	= setInterval(function(){window['"+this.id+"'].urlCheck()},50);")
		};
		this.replaceUrl	= function (url) {
			window.history.replaceState({}, 'm-urlcapture-redirect', url);
		};
		this.stop	= function(){
			var e;try{
				clearInterval(this.timer);
			} catch(e){}
		};
		// assigning object to global vars
			window[this.id]	= this;
		return this;
	};


/*
		to create an urlController
			var urlController	= new m_urlcapture();
		
		
		to init it type:
			urlController.start();
		
		to stop it type:
			urlController.stop();
		
		to set an Default action for url Change
		
			urlController.set("ifNoAction",function(controller,action,param,data){
				// data is an object .. ex: {url:"..string..",parts:[controller,action,param[0]...]}
			})
		
		to enable/disable debug mode use ( default is disabled )
		
			urlController.set("debug",true);
		
		to set default Controller Name
			urlController.set("defController","public");
		
		to set default action name
			urlController.set("defAction","exec");
		
		to get params from object
		
			urlController.get("debug");		// to get debug state
			urlController.get("defController");	// get default controller name
			urlController.get("defAction");		// get default action name
			urlController.get("urlHist");		// get History of URLS
			urlController.get("ifNoAction");	// get function if no Action
			
			// geting id
				var id = urlController.get("id");
				
				alert(window[id] == urlController) // it will return TRUE
			
			// geting an controller actions set
				var controller_set = urlController.get("actions","controller_name");
			
			// geting an action function
				var action_func = urlController.get("actions","controller_name","action_name");
		
		to clean actions list
			urlController.set("actions",{act:"clean"});
		
		to clean actions from a specific controller
		
			urlController.set("actions",{
						act		: "del-controller"
						controller	: "controller_name"
					});
		
		to delete an action
		
			urlController.set("actions",{
						act		: "del-action",
						controller	: "controller_name",
						action		: "action_name"
					});
		
		to add actions
			urlController.set("actions",{
						act	: "add",
						data	: {
							controller_name	: {
								action_name	: function(){},
								action_name_1	: function(){},
								action_name_2	: function(){}
							},
							otherController	: {
								// other actions
							}
						}
					});
		
		updating function for onUrlChange and afterUrlChange
		
		urlController.set("onUrlChange",{
			funct_1	: function(c,a,p,d){	// adding a function
				...
			},
			funct_1	: null			// deleting a function
		})
		
		urlController.set("afterUrlChange",{
			... the same as for onUrlChange,
			funct_1	: function(c,a,p,d){	// adding a function
				if(d.obj.onUrlDiff_noSkip) {	// controller is no found
					d.obj.onUrlDiff_noSkip	= false; // disable default action
				}
			}
		})
		
	
	*/

