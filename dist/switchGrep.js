﻿!function(){if("object"!=typeof JSON){JSON={};var t,e,n,r,u=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,i=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,p=/(?:^|:|,)(?:\s*\[)+/g,a=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":"Invalid Date"}),"function"!=typeof JSON.stringify&&(n={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(n,u,o){var i;if(t="",e="","number"==typeof o)for(i=0;i<o;i+=1)e+=" ";else"string"==typeof o&&(e=o);if(r=u,u&&"function"!=typeof u&&("object"!=typeof u||"number"!=typeof u.length))throw new Error("JSON.stringify");return str("",{"":n})}),"function"!=typeof JSON.parse&&(JSON.parse=function(t,e){var n;function walk(t,n){var r,u,o=t[n];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&((u=walk(o,r))!==undefined?o[r]=u:delete o[r]);return e.call(t,n,o)}if(t=String(t),c.lastIndex=0,c.test(t)&&(t=t.replace(c,(function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))),u.test(t.replace(o,"@").replace(i,"]").replace(p,"")))return n=Function("return ("+t+")")(),"function"==typeof e?walk({"":n},""):n;throw new Error("JSON.parse")})}function f(t){return t<10?"0"+t:t}function quote(t){return a.lastIndex=0,a.test(t)?'"'+t.replace(a,(function(t){var e=n[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+t+'"'}function str(n,u){var o,i,p,a,c,s=t,l=u[n];switch(l&&"object"==typeof l&&"function"==typeof l.toJSON&&(l=l.toJSON(n)),"function"==typeof r&&(l=r.call(u,n,l)),typeof l){case"string":return quote(l);case"number":return isFinite(l)?String(l):"null";case"boolean":return String(l);case"object":if(!l)return"null";if(t+=e,c=[],"[object Array]"===Object.prototype.toString.apply(l)){for(a=l.length,o=0;o<a;o+=1)c[o]=str(String(o),l)||"null";return p=0===c.length?"[]":t?"[\n"+t+c.join(",\n"+t)+"\n"+s+"]":"["+c.join(",")+"]",t=s,p}if(r&&"object"==typeof r)for(a=r.length,o=0;o<a;o+=1)"string"==typeof r[o]&&(p=str(i=String(r[o]),l))&&c.push(quote(i)+(t?": ":":")+p);else for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(p=str(i,l))&&c.push(quote(i)+(t?": ":":")+p);return p=0===c.length?"{}":t?"{\n"+t+c.join(",\n"+t)+"\n"+s+"}":"{"+c.join(",")+"}",t=s,p}return"null"}}();var t={ppmName:"ppx-plugin-manager",ppmVersion:.95,language:"ja",nlcode:"\r\n",nltype:"crlf",ppmID:"P",ppmSubID:"Q"},validArgs=function(){for(var t=[],e=PPx.Arguments;!e.atEnd();e.moveNext())t.push(e.value);return t},safeArgs=function(){for(var t=[],e=validArgs(),n=0,r=arguments.length;n<r;n++)t.push(_valueConverter(n<0||arguments.length<=n?undefined:arguments[n],e[n]));return t},_valueConverter=function(t,e){if(null==e||""===e)return null!=t?t:undefined;switch(typeof t){case"number":var n=Number(e);return isNaN(n)?t:n;case"boolean":return"false"!==e&&"0"!==e&&null!=e;default:return e}},isEmptyObj=function(t){if(t===undefined)return!1;if(null===t)return!0;for(var e in t)return!1;return!0};Array.prototype.removeEmpty||(Array.prototype.removeEmpty=function(){for(var t=[],e=0,n=this.length;e<n;e++){var r=this[e];null!=r&&""!==r&&(r instanceof Array&&0===r.length||r instanceof Object&&isEmptyObj(r)||t.push(r))}return t}),PPx.CreateObject("Scripting.FileSystemObject");var e={button:"Edit_OptionCmd",cmd:"grepCmd",output:"grepOutput",option:"grepOption",complist:"grepComplist",optFixed:"fixed",optAdded:"added",optFlen:"flen",optAlen:"alen",muneId:"M_ppmGrep",keyId:"K_ppmGrep",switchKey:"grep_switchkey",switchType:"grep_switchtype",commitKey:"grep_commitkey",commitHash:"commitHash"},main=function(){var t=safeArgs(!1)[0],e=nextProp(t),n=JSON.parse(e.replace(/^[A-Z]+\s*=\s*/,"")),r=switchGrep(n);PPx.Execute(r),PPx.Execute("*setcaption ["+n.output+"] "+n.cmd+" "+n.option)},nextProp=function(n){if(n)return PPx.Extract('%k"down"%:%'+e.muneId)||PPx.Quit(1);var r=PPx.Extract("%si'"+e.cmd+"'%si'"+e.output+"'").toUpperCase();r=r.replace(" ","");for(var u=PPx.Extract("%*getcust("+e.muneId+")").split(t.nlcode),o=u.length-3,i=1;i<o&&!~u[i].indexOf(r);i++);return u[i===o?1:++i]},switchGrep=function(t){var n=0===t.added.indexOf("-")?" ":"";return t.option=""+t.fixed+n+t.added,"*string i,"+e.cmd+"="+t.cmd+"%:*string i,"+e.output+"="+t.output+"%:*string i,"+e.option+"="+t.option+"%:*string e,"+e.complist+"="+t.listname+"%:*string e,"+e.optFixed+"="+t.fixed+"%:*string e,"+e.optAdded+"="+t.added+"%:*string e,"+e.optFlen+"="+t.fixed.length+"%:*string e,"+e.optAlen+"="+(t.fixed.length+n.length+t.added.length)};main();
