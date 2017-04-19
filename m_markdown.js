// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ m_markdown - JavaScript url Content Loader                                                    │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright science © 2011 Sergiu Gordienco Vasile (http://first-jump.com)                      │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under http://creativecommons.org/licenses/by-nc-nd/3.0/ license.                     │ \\
// │ This work is licensed under the Creative Commons                                              │ \\
// │ Attribution-NonCommercial-NoDerivs 3.0 Unported License.                                      │ \\
// │ To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/3.0/.      │ \\
// └───────────────────────────────────────────────────────────────────────────────────────────────┘ \\

// jshint -W002
// jshint -W014
// jshint -W032
// jshint -W043
// jshint -W049
// jshint -W061
// jshint -W083
// jshint -W084
// jshint -W086

;((function () {
	if (!String.prototype.subs) {
		String.prototype.subs	= function(p,i){
			if(p < 0) return this.substring(this.length+p,( typeof(i) == "number" ? this.length+p+i : this.length ));
			if((i === 0 || i < 0) && p >=0) return this.substring(p,this.length+i);
			if(!i)	return this.substring(0,p);
			return this.substring(p,p+i);
		};
	}
	if (!String.prototype.escape) {
		String.prototype.escape		= function() { return escape(this); };
	}
	if (!String.prototype.encodeURI) {
		String.prototype.encodeURI	= function() { return encodeURIComponent(this); };
	}
	if (!String.prototype.unescape) {
		String.prototype.unescape	= function() { return unescape(this); };
	}
	if (!String.prototype.decodeURI) {
		String.prototype.decodeURI	= function() { return decodeURIComponent(this); };
	}
	if (!String.prototype.escapeHex) {
		String.prototype.escapeHex	= function() { return escape(this).replace(/\%u/g,'\\u').replace(/\%/g,'\\x'); };
	}
	if (!String.prototype.parseUrl) {
		String.prototype.parseUrlVars	= function(json,params) {
			if(!params) params = {
				keepOBJ	: false,
				isURL	: false
			};
			var s = this;
			json	= !!json;
			if(params.isURL) s.replace(/^[\s\S]*?\?/,'');
			var r = {},p = s.split('&');
			p.forEach(function(v){
				var m,v;
				if(m = v.match(/^([^\=]+)\=([\s\S]*)$/)) {
					k = m[1];
					v = m[2];
					if(!json) {
						r[k]	= (v).decodeURI();
					} else {
						var a = [];
						var p = /^(\[([^\]]*)\]|([^\[]+))/,y;
						while( y = k.match(p) ) {
							if(!y[0]) break;
							k = k.replace(p,'');
							if(typeof(y[2]) != "undefined") {
								a.push(y[2]);
							} else {
								a.push( y[2] || y[3] );
							}
						};
						a = a.map(function(v) { if((""+v).match(/[^0-9]/))return '"'+(""+v).escapeHex()+'"'; return ""+v; });
						a.forEach(function(k,i,ar){
							var l;
							if(i > 0) {
								eval('l = r['+a.slice(0,i).join('][')+']');
							} else {
								l = r;
							};
							if(k == '') {
								if(Array.isArray(l)) {
									k	= l.length;
								} else if( typeof(l) == "object" ) {
									k = 0;
									var i,n;for(i in l)
									if((""+i).match(/^\d+$/)) {
										n	= parseInt(i);
										if(k <= n)
											k = n+1;
									}
								};
								a[i] = k;
							};
							// transform array to obj
							if(Array.isArray(l) && (""+k).match(/[^0-9]/)) {
								var t = {},n;
								for(n=0;n<l.length;n++)
									t[n]	= l[n];
								eval('r['+a.slice(0,i).join('][')+'] = t;');
							};
							if( i == a.length-1 ) {
								eval('r['+a.slice(0,i+1).join('][')+'] = v.decodeURI();');
							} else {
								eval('if(typeof(r['+a.slice(0,i+1).join('][')+']) == "undefined" || typeof(r['+a.slice(0,i+1).join('][')+']) == "string") r['+a.slice(0,i+1).join('][')+'] = '+( params.keepOBJ ? '{}' : '[]' )+';');
							};
						});
					};
				}
			});
			return r;
		};
		String.prototype.parseUrl	= function(k) {
			var url	= this;
			var domain	= url.split('//');
			domain	= (''+domain[1]).split('/');
			domain	= domain[0];
			var o	= {
				original	: url,
				origin	: url.replace(/^(.*?\/\/[^\/]+)[\s\S]*?$/,'$1'),
				domain	: domain,
				domain_short	: domain.replace(/^www\./,''),
				pathname: url.replace(/(\?|\x23)[\s\S]*$/,'').replace(/^.*?\/\/[^\/]+/,''),
				reqQuery	: url.replace(/^[^\?]*(\?|)/,'').replace(/\#[\s\S]*$/,''),
				protocol: url.split('://')[0],
				protocoll: url.split('://')[0]+'://',
				url		: url.replace(/\/+$/gi,'').replace(/^.*?\/\//gi,''),
				url_p		: url.replace(/\/+$/gi,''),
				isIp	: domain
			};
			if(k == 'get_vars' || k === true)
				o['get_vars']	= o.reqQuery.parseUrlVars(true);
			if( k && k !== true ) {
				if(k in o)
					return o[k];
				return false;
			};
			return o;
		};
	};

	String.prototype.markdown	= function (conf){
		var _config	= {
			syntaxCallback	: 'auto' // codemirror
		};
		if (typeof(conf) === "object" && conf) {
			if ((typeof(conf.syntaxCallback) === "string" && ["auto", "highlight", "codemirror", "none"].indexOf(conf.syntaxCallback) !== -1) || typeof(conf.syntaxCallback) === "function") {
				_config.syntaxCallback	= conf.syntaxCallback;
			}
		}
		var s = this;var h='';

		var definitions = {};

		((function () {
			// read definitions in definition
			var rule = /(^|\n)\[[^\n\]\[]+\]\:\s*[^\n]+/gi;
			var matches = s.match(rule);
			if (Array.isArray(matches)) {
				matches.forEach(function (m) {
					s = s.replace(m, (m[0] === '\n' ? '\n' : ''));
					var name = m.match(/(^|\n)\[([^\n\]\[]+)\]\:/);

					if (!name) return;

					name = name[2];

					var params = ((m.replace(/.*?\:/, '') + " ").match(/(\".*?\"\s|\(.*?\)|\S+)/g) || [])
						.map(function (param) {
							if (param.match(/^(\"|\')(.*)\1$/)) {
								param = param.replace(/^(\"|\')(.*)\1$/, '$2');
							} else if (param.match(/^(\()(.*)(\))$/)) {
								param = param.replace(/^(\()(.*)(\))$/, '$2');
							}
							return param;
						});
					definitions[name] = params;
				});
			}
		})());

		console.log(definitions);

		function E(s){return escape(s + "").replace(/\%u([0-9a-f]{4})/gi,'&#x$1;').replace(/\%([0-9a-f]{2})/gi,'&#x$1;')
				.replace(/\&\#x20\;/gi,' ')
				.replace(/\&\#x5f\;/gi,'_')
				.replace(/\&\#x7e\;/gi,'~')
				.replace(/\&\#x23\;/gi,'#')
				.replace(/\&\#x26\;/gi,'&')
				.replace(/\&\#x2a\;/gi,'*')
				.replace(/\&\#x5b\;/gi,'[')
				.replace(/\&\#x5d\;/gi,']')
				.replace(/\&\#x5c\;/gi,'\x5c')
				.replace(/\&\#x23\;/gi,'#')
				.replace(/\&\#x3d\;/gi,'=')
				.replace(/\&\#x21\;/gi,'!')
				.replace(/\&\#x2e\;/gi,'.')
				.replace(/\&\#x2c\;/gi,',')
				.replace(/\&\#x3a\;/gi,':')
				.replace(/\&\#x3b\;/gi,';')
				.replace(/\&\#x0a\;/gi,'\n')
				.replace(/\&\#x0d\;/gi,'\r')
				.replace(/\&\#x09\;/gi,'\t')
				.replace(/\&\#x60\;/gi,'`')
				.replace(/\&\#x28\;/gi,'(')
				.replace(/\&\#x29\;/gi,')')
				.replace(/\&\#x25\;/gi,'%')
				.replace(/\&\#x02\;/gi,'\x02');
		}

		function I(s){
			var nodes	= {};
			var node_k	= 0;
			var f_match	= function (str, upd) {
				if (typeof(str) === "string") {
					node_k++;
					s	= s.split(str).join('\x02'+node_k+'\x02');
					nodes[node_k]	= upd + "";
				} else {
					var m	= null;
					var v_match	= [];
					var data	= "";
					while(m = s.match(str)) {
						node_k++;
						s	= s.split(m[0]).join('\x02'+node_k+'\x02');
						data	= "";
						v_match	= [];
						m[0].replace(str, function () {
							v_match	= arguments;
							return '';
						});
						if (typeof(upd) === "function") {
							data	= upd.apply(s, v_match);
						} else {
							data	= (upd + "").replace(/\$(\d+)/g, function (s0, s1) {
								s1	= (parseInt(s1, 10) || 0);
								if (s1 && typeof(v_match[s1]) !== "undefined") {
									return v_match[s1];
								}
								return s0;
							});
						}
						nodes[node_k]	= data;
					}
				}
			};
			var f_apply	= function () {
				var m	= null;
				var l	= 237;
				while (m = s.match(/\x02(\d+)\x02/) && l-- > 0) {
					s	= s.replace(/\x02(\d+)\x02/, function(s0, s1) {
						s1	= (parseInt(s1, 10) || 0);
						if (s1 && typeof(nodes[s1]) !== "undefined") {
							return nodes[s1] || "";
						}
						return '';
					});
				}
			};

			s	= E(s);
			f_match("\x5c\x5c","\x5c");
			f_match("\x5c`","`");
			f_match("\x5c_","_");
			f_match("\x5c[","[");
			f_match("\x5c]","]");
			f_match("\x5c)",")");
			f_match("\x5c(","(");
			f_match("\x5c*","*");
			f_match("\x5c~","~");
			f_match("\x5c&","&");

			f_match(/```([a-z\-0-9\.\/])\n([\s\S]+?)```/g,'<pre class="language-$1"><code lang="$1">$2</code></pre>');
			f_match(/``([\s\S]+?)``/g,'<pre><code>$1</code></pre>');
			f_match(/`([^`]+)`/g,'<code>$1</code>');


			f_match(/\!image\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2, s3, s4) {
				if (s1.match(/^\d+$/)) {
					s1 += 'px';
				}
				if (s2.match(/^\d+$/)) {
					s2 += 'px';
				}
				return '<img style="width: ' + (s1) + '; height:'+ (s2) + ';" src="'+E(s4)+'" title="'+E(s3)+'" />';
			});
			f_match(/\!\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2) {
				return "<img src=\""+E(s2)+"\" title=\""+E(s1)+"\" alt=\""+E(s1)+"\" style=\"max-width: 100%; height: auto;\">";
			});

			f_match(/\!object\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\(([^(]+)\)/g,'<object width="$1" height="$2" src="$4">$3</object>');
			f_match(/\!iframe\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\(([^(]+)\)/g,'<iframe width="$1" height="$2" src="$4">$3</iframe>');
			f_match(/\!video\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\(([^(]+)\)/g, function (match, s1, s2, s3, s4) {
				return '<video width="'+s1+'" height="'+s2+'" controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(s).replace('#','" type="')+'">';}).join("")+''+I(s3)+'</video>';
			});
			f_match(/!audio\[([^\]]*)]\(([^(]+)\)/g, function (match, s3, s4) {
				return '<audio controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(s).replace('#','" type="')+'">';}).join("")+''+I(s3)+'</audio>';
			});
			f_match(/\[([^\]]*)]\(([^(]+)\)\[blank\]/g, function (s0, s1, s2) {
				return "<a href=\""+E(s2)+"\" target=\"_blank\">"+I(s1)+"</a>";
			});
			f_match(/\[([^\]]*)]\(([^(]+)\)\[download\=([^\]]+)\]/g, function (s0, s1, s2, s3) {
				return "<a href=\""+E(s2)+"\" download=\""+E(s3)+"\">"+I(s1)+"</a>";
			});
			f_match(/\[([^\]]*)]\(([^(]+)\)\[([^\]]+)\]/g, function (s0, s1, s2, s3) {
				return "<a href=\""+E(s2)+"\" name=\""+E(s3)+"\">"+I(s1)+"</a>";
			});
			f_match(/\[([^\]]*)]\(([^(]+)\)/g, function (s0, s1, s2) {
				return "<a href=\""+E(s2)+"\">"+I(s1)+"</a>";
			});


			f_match(/\!image\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\[([^\[\]]+)\]/g, function (s0, s1, s2, s3, s4) {
				if (s1.match(/^\d+$/)) {
					s1 += 'px';
				}
				if (s2.match(/^\d+$/)) {
					s2 += 'px';
				}
				var definition = definitions[s4] || [];
				return '<img style="width: ' + (s1 || definition[2] || 'auto') + '; height:'+ (s2 || definition[3] || 'auto') + ';" src="'+E(definition[0] || '')+'" title="'+E(s3 || definition[1] || '')+'" />';
			});
			f_match(/\!\[([^\]]*)]\[([^\[\]]+)\]/g, function (s0, s1, s2) {
				var definition = definitions[s2] || [];
				return "<img src=\""+E(definition[0] || '')+"\" title=\""+E(s1 || definition[1] || '')+"\" alt=\""+E(s1 || definition[1] || '')+"\" style=\"max-width: 100%; height: auto;\">";
			});

			f_match(/\!object\-(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)x(\d+\%{0,1}|auto|\d+vw|\d+vh|\d+vmin|\d+vmax|\d+em|\d+pt|\d+px|)\[([^\]]*)]\[([^\[\]]+)\]/g, function (s0, s1, s2, s3, s4) {
				var definition = definitions[s4] || [];
				return '<object width="'+E(s1 || definition[2] || '')+'" height="'+E(s2 || definition[3] || '')+'" src="'+E(definition[0] || '')+'">'+E(s3 || definition[1] || '')+'</object>';
			});
			f_match(/\!iframe\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\[([^\[\]]+)\]/g, function (s0, s1, s2, s3, s4) {
				var definition = definitions[s4] || [];
				return '<iframe width="'+E(s1 || definition[2] || '')+'" height="'+E(s2 || definition[3] || '')+'" src="'+E(definition[0] || '')+'">'+E(s3 || definition[1] || '')+'</iframe>';
			});
			// f_match(/\!video\-(\d+\%{0,1})x(\d+\%{0,1})\[([^\]]*)]\(([^(]+)\)/g, function (match, s1, s2, s3, s4) {
			// 	return '<video width="'+s1+'" height="'+s2+'" controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(s).replace('#','" type="')+'">';}).join("")+''+I(s3)+'</video>';
			// });
			// f_match(/!audio\[([^\]]*)]\(([^(]+)\)/g, function (match, s3, s4) {
			// 	return '<audio controls>'+(s4 + '').split(';').filter(function (v) { return v.length; }).map(function (s) { return '<source src="'+E(s).replace('#','" type="')+'">';}).join("")+''+I(s3)+'</audio>';
			// });
			f_match(/\[([^\]]*)]\[([^\[\]]+)\]\[blank\]/g, function (s0, s1, s2) {
				var definition = definitions[s2] || [];
				return "<a href=\""+E(definition[0] || '')+"\" target=\"_blank\">"+I(s1 || definition[1] || '')+"</a>";
			});
			f_match(/\[([^\]]*)]\[([^\[\]]+)\]\[download\=([^\]]*)\]/g, function (s0, s1, s2, s3) {
				var definition = definitions[s2] || [];
				return "<a href=\""+E(definition[0] || '')+"\" download=\""+E(s3 || definition[2] || 'file')+"\">"+I(s1 || definition[1] || '')+"</a>";
			});
			f_match(/\[([^\]]*)]\[([^\[\]]+)\]\[([^\]\[]*)\]/g, function (s0, s1, s2, s3) {
				var definition = definitions[s2] || [];
				return "<a href=\""+E(definition[0] || '')+"\" name=\""+E(s3 || definition[2] || '')+"\">"+I(s1 || definition[1] || '')+"</a>";
			});
			f_match(/\[([^\]]*)]\[([^\[\]]+)\]/g, function (s0, s1, s2) {
				var definition = definitions[s2] || [];
				return "<a href=\""+E(definition[0] || '')+"\">"+I(definition[1] || '')+"</a>";
			});



			f_match(/(\_\_\_)([^\<\>]+?)\1/g, function (s0, s1, s2) {
				return '<u>'+I(s2)+'</u>';
			});
			f_match(/(\*\*|\_\_)([^\<\>]+?)\1/g, function (s0, s1, s2) {
				return '<strong>'+I(s2)+'</strong>';
			});
			f_match(/(\*|\_)([^\<\>]+?)\1/g, function (s0, s1, s2) {
				return '<em>'+I(s2)+'</em>';
			});
			f_match(/(\~)([^\<\>]+?)\1/g, function (s0, s1, s2) {
				return '<s>'+I(s2)+'</s>';
			});

			f_apply();

			return s;
		}
		s
		.replace(/^\s+|\r|\s+$/g,'')
		.replace(/\t/g,'    ')
		.split('\n```').forEach(function (s, k, list) {
			if (k % 2) {
				s	= s.split(/\n/);
				var lang	= E(s.shift().replace(/^\s+/,'').replace(/\s+$/,''));
				h += '<pre class="language-'+lang+'"><code lang="'+lang+'">'+E(s.join('\n'))+'</code></pre>';
			} else {
				var statuses	= {
					'p'    : function () { return { type: 'p', indent : 1, rows: [] }; },
					'code' : function () { return { type: 'code', rows: [] }; },
					'ul'   : function () { return { type: 'ul', style: '*', items : [] }; },
					'ol'   : function () { return { type: 'ol', style: 'number', items : [] }; },
					'quote': function () { return { type: 'quote', rows: [] }; },
					'h1'   : function () { return { type: 'h1', rows: [] }; },
					'h2'   : function () { return { type: 'h2', rows: [] }; },
					'h3'   : function () { return { type: 'h3', rows: [] }; },
					'h4'   : function () { return { type: 'h4', rows: [] }; },
					'h5'   : function () { return { type: 'h5', rows: [] }; },
					'h6'   : function () { return { type: 'h6', rows: [] }; }
				};
				var data	= [];
				var current	= statuses.p();
				s.split("\n").forEach(function (line, k, lines) {
					var status	= current.type;
					var m;
					if (/*k > 0 && lines[k-1] === '' && */line === '') {
						status	= 'p';
					}
					if (line.match(/^\x23{1}\s/))	status	= 'h1';
					if (line.match(/^\x23{2}\s/))	status	= 'h2';
					if (line.match(/^\x23{3}\s/))	status	= 'h3';
					if (line.match(/^\x23{4}\s/))	status	= 'h4';
					if (line.match(/^\x23{5}\s/))	status	= 'h5';
					if (line.match(/^\x23{6}\s/))	status	= 'h6';
					if (line.match(/^\>\s/))	status	= 'quote';
					if (['p','quote'].indexOf(status) !== -1) {
						if (['-','*'].indexOf(line[0] || '') !== -1) {
							status	= 'ul';
						} else if (line.match(/^\d+\.\s/)) {
							status	= 'ol';
						}
					} else if (status === 'code' && !line.match(/^\040\040\040\040/)) {
						status	= 'p';
					}
					if (['p','quote','h1','h2','h3','h4','h5','h6'].indexOf(status) !== -1 && line.match(/^\040\040\040\040/)) {
						status	= 'code';
					}
					if (current.type !== status) {
						data.push(current);
						current	= statuses[status]();
					}
					switch(current.type) {
						case 'h1':
						case 'h2':
						case 'h3':
						case 'h4':
						case 'h5':
						case 'h6':
						case 'p':
						case 'quote':
							if (current.type[0] === 'h') {
								current.rows.push(line.replace(/^\x23+\s/gi,''));
							} else if (current.type === 'quote') {
								current.rows.push(line.replace(/^\>\s/gi,''));
							} else {
								current.rows.push(line);
							}
						break;
						case 'code':
							current.rows.push(line.replace(/^\040\040\040\040/,''));
						break;
						case 'ol':
						case 'ul':
							m = false;
							if (current.type === 'ol') {
								m = !(line.match(/^\s*\d+\.\s*/));
							} else if (current.type === 'ul') {
								m = !(line.match(/^\s*[\-\*]\s*/));
							}
							if (m) {
								if (current.items.length) {
									current.items[current.items.length - 1].row	= (current.items[current.items.length - 1].row || '') + "\n" + line.replace(/^\s*/,'');
								} else {
									current.items.push({
										level	: Math.ceil((line.match(/^\040+/) || [''])[0].length / 4),
										row		: line.replace(/^\s*\S\s*/,'')
									});
								}
							} else {
								current.items.push({
									level	: Math.ceil((line.match(/^\040+/) || [''])[0].length / 4),
									row		: line.replace(/^\s*(\d+\.|\S)\s*/,'')
								});
							}
						break;
					}
				});
				if (current.type) {
					data.push(current);
				}
				// console.log(data);
				if (data.length) {
					if (data[0].type === "p")
					if (data[0].rows.length === 0) {
						data.shift();
					}
				}
				h += data.map(function (node) {
					if (node.type === 'h1') {
						return '<h1>'+I(node.rows.join('\n'))+'</h1>';
					} else if (node.type === 'h2') {
						return '<h2>'+I(node.rows.join('\n'))+'</h2>';
					} else if (node.type === 'h3') {
						return '<h3>'+I(node.rows.join('\n'))+'</h3>';
					} else if (node.type === 'h4') {
						return '<h4>'+I(node.rows.join('\n'))+'</h4>';
					} else if (node.type === 'h5') {
						return '<h5>'+I(node.rows.join('\n'))+'</h5>';
					} else if (node.type === 'h6') {
						return '<h6>'+I(node.rows.join('\n'))+'</h6>';
					} else if (node.type === 'p') {
						return '<p>'+I(node.rows.join('\n').replace(/^\n+/,'').replace(/\n+$/,''))+'</p>';
					} else if (node.type === 'quote') {
						return '<blockquote>'+I(node.rows.join('\n').replace(/^\n+/,'').replace(/\n+$/,''))+'</blockquote>';
					} else if (node.type === 'code') {
						return '<pre><code>'+node.rows.join('\n')+'</code></pre>';
					} else if (['ol', 'ul'].indexOf(node.type) != -1) {
						var code	= [];
						var index	= -1;
						node.items.forEach(function (li) {
							if (index < li.level) {
								while (index < li.level) {
									index++;
									code.push('<'+node.type+'>');
								}
							}
							if (index > li.level) {
								while (index > li.level) {
									index--;
									code.push('</'+node.type+'>');
								}
							}
							// console.log("Link Code", );
							code.push('<li>'+I(li.row+'')+'</li>');
						});
						if (index > -1) {
							while (index > -1) {
								index--;
								code.push('</'+node.type+'>');
							}
						}
						return code.join('');
					} else {
						return JSON.stringify(node);
					}
				}).join('');
				/*
				(s+'').split(/\n\n+/)
				.forEach(function(b,f,R){
					R={
						'*':[/\n\* /,'<ul><li>','</li></ul>'],
						1:[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],
						' ':[/\n    /,'<pre><code>','</pre></code>','\n'],
						'>':[/\n> /,'<blockquote>','</blockquote>','\n']
					}[f=b[0]];
					h+=R?R[1]+('\n'+b).split(R[0]).slice(1).map(R[3]?E:I).join(R[3]||'</li>\n<li>')+R[2]:f=='#'?'<h'+(f=b.indexOf(' '))+'>'+I(b.slice(f+1))+'</h'+f+'>':f=='<'?b:'<p>'+I(b)+'</p>'
				})
				*/
			}
		});
		return h;
	};
	if ("newCss" in window) {
		newCss(SITE_dURL()+"parts/gadget/m_markdown/m_markdown.css");
		loadObj('hljs', function () {
			if (!("highlightBlockNumbers" in hljs)) {
				hljs.highlightBlockNumbers	= hljs.highlightBlock;
			}
		});
	} else {
		if (window.hljs) {
			if (!("highlightBlockNumbers" in hljs)) {
				hljs.highlightBlockNumbers	= hljs.highlightBlock;
			}
		}

		window.loadObj	= function (l, f, v) {
			(f)(v || {});
		};
	}
	var urlController	= false;
	var _methods	= {
		encode	: function (s, return_node) {
			if (return_node) {
				var e	= document.createElement('div');
				e.className	= 'markdown-code';
				e.innerHTML	= ((s || '')+ "").markdown();
				return e;
			} else {
				return ((s || '')+'').markdown();
			}
		},
		setBrowser	: function (conf, callback_f) {
			if (typeof(conf) !== "object" || typeof(callback_f) !== "function")
				return false;
			rootMethods	= _methods;
			loadObj('m_urlcapture, m_urlload', function (vars, list) {
				var _config	= {
					base	: false, // http://  .. or "//"
					url		: "",
					lastUrl : "",
					node	: false,
					name	: 'default',
					controllerName	: "md",
					actionName		: "view",
					urlController	: false
				};
				(function () {
					var i;
					for (i in _config) {
						if (i in vars.conf) {
							_config[i]	= vars.conf[i];
						}
					}
				})();
				if (!_config.node)
					return false;
				var _methods	= {
					baseUrl	: function(url) {
						if (typeof(url) === "string") {
							_config.base	= url;
						}
						if ((url !== true && !_config.base) || typeof(_config.base) !== "string") {
							return document.location.href.parseUrl().origin + "/";
						}
						return _config.base + (_config.base.match(/\/$/) === '/' ? '' : '/');
					},
					node	: function(node) {
						if (typeof(node) !== "undefined") {
							_config.node	= node;
						}
						return _config.node;
					},
					updateLinks	: function (currentUrl) {
						var list	= _methods.node().querySelectorAll('a');
						var i, node, tmp, link;
						var base	= _methods.baseUrl(true);
						for(i=0;i<list.length;i++) {
							node	= list[i];
							link	= (node.getAttribute("href") || "");
							if (link[0] === '/') {
								link	= base + link.replace(/^[\s\S]/,'');
							} else {
								if (!link.match(/^(\x23|data\:|((http|https|ftp|call|mailto|sftp|ws|wss)\:|\/\/))/)){
									link	= currentUrl.replace(/[^\/]+$/,'')+ link;
									tmp	= link.replace(/(\/[^\/]+\/\.\.\/|\/.\/)/gi, '/').replace(/([^\:])\/\//gi, '$1/');
									while (tmp !== link) {
										link	= tmp;
										tmp	= link.replace(/(\/[^\/]+\/\.\.\/|\/.\/)/gi, '/').replace(/([^\:])\/\//gi, '$1/');
									}
								}
							}
							if (!node.getAttribute("download") && node.getAttribute("target") != "_blank" && !link.match(/^(\#|data\:)/)) {
								link	= _methods.url(link, true);
							}
							if (link[0] === '#') {
								node.onclick	= function () {
									var e;
									try {
										(document.querySelector('a[name="'+this.getAttribute('href').replace(/^\x23/,'')+'"]') || { focus: function () {}}).focus();
									} catch(e) {};
									return false;
								};
							}
							node.setAttribute("href", link);
						};
						list	= _methods.node().querySelectorAll('source,object,img,iframe');
						for(i=0;i<list.length;i++) {
							node	= list[i];
							link	= (node.getAttribute("src") || "");
							if (link.subs(0, 1) === '/') {
								link	= base + link.subs(1,0);
							} else if (!link.match(/^(data\:|((http|https|ftp|call|mailto|sftp|ws|wss)\:|)\/\/)/)){
								link	= currentUrl.replace(/[^\/]+$/,'')+ link;
								tmp	= link.replace(/(\/[^\/]+\/\.\.\/|\/.\/)/gi, '/');
								while (tmp !== link) {
									link	= tmp;
									tmp	= link.replace(/(\/[^\/]+\/\.\.\/|\/.\/)/gi, '/');
								}
							}
							node.setAttribute("src", link);
						};
						if ("hljs" in window) {
							var i;
							var list	= _methods.node().querySelectorAll('pre > code');
							for (i=0;i<list.length;i++) {
								hljs.highlightBlockNumbers(list[i].parentElement);
							}
						}
					},
					urlController	: function (check_mode) {
						if (check_mode) {
							var controller_started	= false;
							if (!_config.urlController) {
								_config.urlController	= new m_urlcapture();
								controller_started	= true;
							}
							var actions	= _config.urlController.get("actions");
							var update	= false;
							if (!(_config.controllerName in actions)) {
								update	= true;
							} else {
								if (!(_config.actionName in actions[_config.controllerName])) {
									update	= true;
								}
							}
							if (update) {
								var actionsUpdate	= { act: "add", data: {} };
								actionsUpdate.data[_config.controllerName]	= {};
								actionsUpdate.data[_config.controllerName][_config.actionName]	= function (controller, action, params, request, instance) {
									var base	= _methods.baseUrl(true);
									if (!params.length || (params.length === 1 && params[0] === "")) {
										params	= ["index.md"];
									}
									var urlPath	= params.map(function (s) {
											var e;
											try {
												return decodeURIComponent(s + "");
											} catch(e) {
												return unescape(s + "");
											}
										}).join("/");
									var pageUrl	= false;
									if (urlPath.match(/^(http\:|https\:|)\/\//)) {
										pageUrl	= urlPath;
									} else {
										pageUrl	= base + urlPath;
									}
									m_urlload(pageUrl, function (url, text, vars, get, post, fullUrl, headers, method_r, responseType, link) {
										var textUnicodeCache	= "";
										var textUnicode	= function () {
											var e;try {
												textUnicodeCache	= decodeURIComponent( escape( text ) );
											} catch(e) {
												textUnicodeCache	= text;
											};
											return textUnicodeCache;
										};

										var container;

										if ([0, 400, 404, 500, 501, 505].indexOf(link.status) == -1) {
											var extension	= url.substr(url.lastIndexOf('.') + 1, url.length).toLowerCase();
											var syntax_mode	= false;
											container	= _methods.node();
											if (text === null || text === "" || text.length == 0) {
												container.innerHTML	= '';
												container.appendChild(m_markdown.encode("# Viewing an empty file\n\n-- **Path** : ["+fullUrl+"]("+fullUrl+")\n\n*sorry, but file is empty* you can try to open [Index](/)\n", true));
											} else
											switch(extension) {
												case 'md':
													container.innerHTML	= '';
													debugger;
													container.appendChild(m_markdown.encode(textUnicode() + "", true));
													_methods.updateLinks(url);
												break;
												case 'html':
													container.innerHTML	= textUnicode() + '';
													_methods.updateLinks(url);
												break;
												case 'jpg':
												case 'jpeg':
												case 'png':
												case 'gif':
													var e	= document.createElement('img');
													e.src	= 'data:image/'+extension+';base64,'+base64.encode(text);
													container.innerHTML	= '';
													container.appendChild(e);
												case 'js':
													if (syntax_mode === false)
														syntax_mode	= 'javascript';
												case 'css':
													if (syntax_mode === false)
														syntax_mode	= 'css';
												case 'tpl':
												case 'hmtl':
												case 'xml':
													if (syntax_mode === false)
														syntax_mode	= 'html';
												default	:
													if (syntax_mode === false)
														syntax_mode	= '';
													if (!syntax_mode && textUnicode().match(/[\s\n]*(\<\!DOCTYPE|\<\?xml|\<[^\<\>].*?\>)/))
														syntax_mode	= 'html';
													if ("hljs" in window) {
														_methods.node().innerHTML	= '<pre class="language-'+syntax_mode+'"><code lang="'+syntax_mode+'">'+(textUnicode()).replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'</code></pre>';
														hljs.highlightBlockNumbers(_methods.node().querySelector('pre > code').parentElement);
													} else {
														container.innerHTML	= '';
														container.appendChild(m_markdown.encode("# Viewing file\n\
\n\
-- **File** : ["+fullUrl+"]("+fullUrl+")[_blank]\n\
\n\
[Index](/)\n\n\
``` "+syntax_mode+"\n\
"+((textUnicode() || "")+"").split("\n").join("\n")+"\n\
```\n\
\n\
[Index](/)\n\
", true));
														_methods.updateLinks(url);
													}
												break;
											}
										} else {
											container	= _methods.node();
											container.innerHTML	= '';
											container.appendChild(m_markdown.encode("# Loading error ( "+link.status+" )\n\nUrl: ["+fullUrl+"]("+fullUrl+")[blank]\n\nResponse Status: "+link.status+" ; "+(link.statusText || ""), true));
											_methods.updateLinks(url);
										}
									}, {}, false, false, false, "get", "binary");
								};
								_config.urlController.set("actions", actionsUpdate);
								_config.urlController.ifNoAction	= function () {
									_config.urlController.onUrlDiff(false, _config.controllerName, _config.actionName, []);
								};
							}
							if (controller_started) {
								_config.urlController.start();
							}
						}
						return _config.urlController;
					},
					url		: function (url, transform_only) {
						var url	= (url || "")+"";
						var base	= _methods.baseUrl(true);
						if (url) {
							if (url.subs(0, base.length) === base) {
								url	= url.subs(base.length, 0);
							}
						}
						var params	= ((url || "")+"").split("/").map(function (s) {
							return s.decodeURI();
						});
						var urlResult	=
							document.location.href.split('#')[0].split(_config.urlController.urlSpliter)[0]
							+ _config.urlController.urlSpliter
							+ _config.controllerName + "/"
							+ _config.actionName + "/"
							+ params.map(function (s) {
								return (s + "").encodeURI();
							}).join("/");
						if (transform_only) {
							return urlResult;
						} else {
							if ((_config.urlController.urlHist[0] || "") === urlResult) {
								_config.urlController.urlHist[0].pop();
							} else {
								_config.urlController.replaceUrl(urlResult);
							}
						}
					},
					redraw	: function (data, url) {
						var container	= _methods.node();
						if (data || data === false) {
							container.innerHTML	= '';
						}
						if (data) {
							container.appendChild(m_markdown.encode(data + "", true));
						}
						if (url) {
							_methods.updateLinks(url);
						} else {
							_methods.updateLinks(_methods.baseUrl(true)+"/index.md");
						}
					},
					init	: function () {
						if (!_config.init) {
							_config.init	= true;
							_methods.urlController(true);

							if (typeof(_config.url) === "string" && _config.url.length)
								_methods.url(_config.url);
						}
					}
				};
				_methods.init();
				vars.callback_f("init", _methods);
			}, { conf: conf, callback_f : callback_f });
			return true;
		}
	};
	window.m_markdown	= _methods;
})());
