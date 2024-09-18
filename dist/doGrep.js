﻿function _construct(e,t,r){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,t);var i=new(e.bind.apply(e,n));return r&&_setPrototypeOf(i,r.prototype),i}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _isNativeReflectConstruct(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(_isNativeReflectConstruct=function(){return!!e})()}function _extends(){return _extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},_extends.apply(null,arguments)}!function(){if("object"!=typeof JSON){JSON={};var e,t,r,n,i=/^[\],:{}\s]*$/,u=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,a=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,o=/(?:^|:|,)(?:\s*\[)+/g,c=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,s=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":"Invalid Date"}),"function"!=typeof JSON.stringify&&(r={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(r,i,u){var a;if(e="",t="","number"==typeof u)for(a=0;a<u;a+=1)t+=" ";else"string"==typeof u&&(t=u);if(n=i,i&&"function"!=typeof i&&("object"!=typeof i||"number"!=typeof i.length))throw new Error("JSON.stringify");return str("",{"":r})}),"function"!=typeof JSON.parse&&(JSON.parse=function(e,t){var r;function walk(e,r){var n,i,u=e[r];if(u&&"object"==typeof u)for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&((i=walk(u,n))!==undefined?u[n]=i:delete u[n]);return t.call(e,r,u)}if(e=String(e),s.lastIndex=0,s.test(e)&&(e=e.replace(s,(function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))),i.test(e.replace(u,"@").replace(a,"]").replace(o,"")))return r=Function("return ("+e+")")(),"function"==typeof t?walk({"":r},""):r;throw new Error("JSON.parse")})}function f(e){return e<10?"0"+e:e}function quote(e){return c.lastIndex=0,c.test(e)?'"'+e.replace(c,(function(e){var t=r[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+e+'"'}function str(r,i){var u,a,o,c,s,l=e,p=i[r];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(r)),"function"==typeof n&&(p=n.call(i,r,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";case"boolean":return String(p);case"object":if(!p)return"null";if(e+=t,s=[],"[object Array]"===Object.prototype.toString.apply(p)){for(c=p.length,u=0;u<c;u+=1)s[u]=str(String(u),p)||"null";return o=0===s.length?"[]":e?"[\n"+e+s.join(",\n"+e)+"\n"+l+"]":"["+s.join(",")+"]",e=l,o}if(n&&"object"==typeof n)for(c=n.length,u=0;u<c;u+=1)"string"==typeof n[u]&&(o=str(a=String(n[u]),p))&&s.push(quote(a)+(e?": ":":")+o);else for(a in p)Object.prototype.hasOwnProperty.call(p,a)&&(o=str(a,p))&&s.push(quote(a)+(e?": ":":")+o);return o=0===s.length?"{}":e?"{\n"+e+s.join(",\n"+e)+"\n"+l+"}":"{"+s.join(",")+"}",e=l,o}return"null"}}();var e,t,r,n,validArgs=function(){for(var e=[],t=PPx.Arguments;!t.atEnd();t.moveNext())e.push(t.value);return e},safeArgs=function(){for(var e=[],t=validArgs(),r=0,n=arguments.length;r<n;r++)e.push(_valueConverter(r<0||arguments.length<=r?undefined:arguments[r],t[r]));return e},_valueConverter=function(e,t){if(null==t||""===t)return null!=e?e:undefined;switch(typeof e){case"number":var r=Number(t);return isNaN(r)?e:r;case"boolean":return null!=t&&"false"!==t&&"0"!==t;default:return t}},i={ppmName:"ppx-plugin-manager",ppmVersion:.95,language:"ja",encode:"utf16le",nlcode:"\r\n",nltype:"crlf",ppmID:"P",ppmSubID:"Q"},u={initialCfg:"_initial.cfg",globalCfg:"_global.cfg",nopluginCfg:"_noplugin.cfg",pluginList:"_pluginlist",manageFiles:"_managefiles",updateLog:"_updateLog",repoDir:"repo",archDir:"arch",cacheDir:function(){return"cache\\"+PPx.Extract("%0").slice(3).replace(/\\/g,"@")}},a={tempKey:"K_ppmTemp",tempMenu:"M_ppmTemp",lfDset:"ppm_lfdset",virtualEntry:"ppm_ve"},tmp=function(){var e=PPx.Extract('%*extract(C,"%%*temp()")');return{dir:e,file:e+"_ppmtemp",lf:e+"_temp.xlf",stdout:e+"_stdout",stderr:e+"_stderr",ppmDir:function(){var e=PPx.Extract("%'temp'%\\ppm");return PPx.Execute("*makedir "+e),e}}},isEmptyStr=function(e){return""===e},isEmptyObj=function(e){if(e===undefined)return!1;if(null===e)return!0;for(var t in e)return!1;return!0},o=PPx.CreateObject("Scripting.FileSystemObject"),c={TypeToCode:{crlf:"\r\n",cr:"\r",lf:"\n"},CodeToType:{"\r\n":"crlf","\r":"cr","\n":"lf"},Ppx:{lf:"%%bl",cr:"%%br",crlf:"%%bn",unix:"%%bl",mac:"%%br",dos:"%%bn","\n":"%%bl","\r":"%%br","\r\n":"%%bn"},Ascii:{lf:"10",cr:"13",crlf:"-1",unix:"10",mac:"13",dos:"-1","\n":"10","\r":"13","\r\n":"-1"}},s={app:{"^":"\\^",$:"\\$","(":"\\(",")":"\\)","[":"\\[","|":"\\|","=":"\\=","*":"\\*","+":"\\+","?":"\\?",".":"\\.","/":"\\/","\\":"\\\\"},exclude:{"\\^":"^","\\$":"$","\\(":"(","\\)":")","\\[":"[","\\]":"]","\\|":"|","\\=":"=","\\*":"*","\\+":"+","\\?":"?","\\.":".","\\/":"/","\\s":" ","\\t":"\t","\\\\":"\\"}},expandNlCode=function(e){var t="\n",r=e.indexOf("\r");return~r&&(t="\r\n"===e.substring(r,r+2)?"\r\n":"\r"),t},isCV8=function(){return"ClearScriptV8"===PPx.ScriptEngineName},_exec=function(e,t){try{var r;return[!1,null!=(r=t())?r:""]}catch(n){return[!0,""]}finally{e.Close()}},read=function(e){var t=e.path,r=e.enc,n=void 0===r?"utf8":r;if(!o.FileExists(t))return[!0,t+" not found"];var i=o.GetFile(t);if(0===i.Size)return[!0,t+" has no data"];var u=!1,a="";if("utf8"===n){var c=PPx.CreateObject("ADODB.Stream"),s=_exec(c,(function(){return c.Open(),c.Charset="UTF-8",c.LoadFromFile(t),c.ReadText(-1)}));u=s[0],a=s[1]}else{var l="utf16le"===n?-1:0,p=i.OpenAsTextStream(1,l),x=_exec(p,(function(){return p.ReadAll()}));u=x[0],a=x[1]}return u?[!0,"Unable to read "+t]:[!1,a]},readLines=function(e){var t,r=e.path,n=e.enc,i=void 0===n?"utf8":n,u=e.linefeed,a=read({path:r,enc:i}),o=a[0],c=a[1];if(o)return[!0,c];u=null!=(t=u)?t:expandNlCode(c.slice(0,1e3));var s=c.split(u);return isEmptyStr(s[s.length-1])&&s.pop(),[!1,{lines:s,nl:u}]},writeLines=function(e){var t=e.path,r=e.data,n=e.enc,u=void 0===n?"utf8":n,a=e.append,s=void 0!==a&&a,l=e.overwrite,p=void 0!==l&&l,x=e.linefeed,d=void 0===x?i.nlcode:x;if(!p&&!s&&o.FileExists(t))return[!0,t+" already exists"];var P,g=o.GetParentFolderName(t);if(o.FolderExists(g)||PPx.Execute("*makedir "+g),"utf8"===u){if(isCV8()){var m=r.join(d),v=s?"AppendAllText":"WriteAllText";return[!1,NETAPI.System.IO.File[v](t,m)]}var h=p||s?2:1,E=PPx.CreateObject("ADODB.Stream");P=_exec(E,(function(){E.Open(),E.Charset="UTF-8",E.LineSeparator=Number(c.Ascii[d]),s?(E.LoadFromFile(t),E.Position=E.Size,E.SetEOS):E.Position=0,E.WriteText(r.join(d),1),E.SaveToFile(t,h)}))[0]}else{var O=s?8:p?2:1;o.FileExists(t)||PPx.Execute("%Osq *makefile "+t);var y="utf16le"===u?-1:0,b=o.GetFile(t).OpenAsTextStream(O,y);P=_exec(b,(function(){b.Write(r.join(d)+d)}))[0]}return P?[!0,"Could not write to "+t]:[!1,""]},pathSelf=function(){var e,t,r=PPx.ScriptName;return~r.indexOf("\\")?(e=extractFileName(r),t=PPx.Extract("%*name(DKN,"+r+")")):(e=r,t=PPx.Extract("%FDN")),{scriptName:e,parentDir:t.replace(/\\$/,"")}},extractFileName=function(e,t){return void 0===t&&(t="\\"),"\\"!==t&&"/"!==t&&(t="\\"),e.slice(e.lastIndexOf(t)+1)},l=/^([ABCEFHKMPSVX][BCEVTt]?_|_[CPSUWo]|Mes)/,rejectInvalidString=function(e,t){if(0===t.indexOf("@")){if(t=PPx.Extract(t).substring(1),!o.FileExists(t))return 2}else if(!e.test(t))return 13;return 0},dialog=function(e,t,r){return void 0===t&&(t=""),t=isEmptyStr(t)?"":"/"+t,0===PPx.Execute('%"ppm'+t+'" %OC %'+e+'"'+r+'"')},runPPmTest=function(){return"undefined"!=typeof ppm_test_run&&ppm_test_run<=2},hasTargetId=function(e){return"."!==e},cache={lang:i.language},createCache=function(e){var t=PPx.Extract("%*getcust(S_ppm#global:"+e+")");return cache[e]=t,t},autoselectEnter=function(e){return PPx.Execute("%OC *setcust "+a.tempKey+':ENTER,*if -1==%%*sendmessage(%%N-L,392,0,0)%%:%%K"@DOWN"%bn%bt%%K"@ENTER"'),PPx.Execute("%OC *setcust "+a.tempKey+':\\ENTER,*if -1==%%*sendmessage(%%N-L,392,0,0)%%:%%K"@DOWN"%bn%bt%%K"@ENTER"'),"*mapkey use,"+a.tempKey+"%%:"+e},p={echo:function(e,t,r){var n=r?"("+String(r)+")":"";return dialog("I",""+e,""+t+n)},question:function(e,t){return dialog("Q",""+e,t)},choice:function(e,t,r,n,i,u,a){void 0===n&&(n="ynC");var o="Mes0411",c={yes:o+":IMYE",no:o+":IMNO",cancel:o+":IMTC"},s="."===e,l=s?'%K"@LOADCUST"':'%%K"@LOADCUST"',x=[],d=x[0],P=x[1],g=x[2],m="",v="",h="",E=!1;i&&(d=PPx.Extract("%*getcust("+c.yes+")"),m="*setcust "+c.yes+"="+i+"%:",E=!0),u&&(P=PPx.Extract("%*getcust("+c.no+")"),v="*setcust "+c.no+"="+u+"%:",E=!0),a&&(g=PPx.Extract("%*getcust("+c.cancel+")"),h="*setcust "+c.cancel+"="+a+"%:",E=!0),E&&(PPx.Execute(""+m+v+h),p.execute(e,l));var O={0:"cancel",1:"yes",2:"no"},y=s?"":e,b=PPx.Extract("%OCP %*extract("+y+'"%%*choice(-text""'+r+'"" -title:""'+t+'"" -type:'+n+')")');return E&&(d&&PPx.Execute("*setcust "+c.yes+"="+d),P&&PPx.Execute("*setcust "+c.no+"="+P),g&&PPx.Execute("*setcust "+c.cancel+"= "+g),p.execute(e,l)),O[b]},execute:function(e,t,r){if(void 0===r&&(r=!1),isEmptyStr(t))return 1;if(runPPmTest())return 2===ppm_test_run&&PPx.Execute("*execute B,*linemessage %%bx1b[2F[Execute] "+e+",%("+t+"%)");if("tray"===e)return PPx.Execute("*pptray -c "+t);if(hasTargetId(e)){if(r){var n=PPx.Extract("%*extract("+e+',"'+t+'%%&0")');return isEmptyStr(n)?1:Number(n)}return PPx.Execute("*execute "+e+","+t)}if(r){var i=PPx.Extract(t+"%&0");return isEmptyStr(i)?1:Number(i)}return PPx.Execute(t)},execSync:function(e,t){if(isEmptyStr(t))return 1;if(runPPmTest())return 2===ppm_test_run&&PPx.Execute("*execute B,*linemessage %%bx1b[2F[Execute] "+e+",%("+t+"%)");if(1===e.length)e="b"+e;else if(0!==e.toUpperCase().indexOf("B"))return 6;return isEmptyStr(PPx.Extract("%N"+e))?6:Number(PPx.Extract("%*extract("+e.toUpperCase()+',"'+t+'%%:%%*exitcode")'))},extract:function(e,t){if(isEmptyStr(t))return[13,""];var r=hasTargetId(e)?PPx.Extract("%*extract("+e+',"'+t+'")'):PPx.Extract(t);return[Number(PPx.Extract()),r]},lang:function(){var e=cache.lang;if(!isEmptyStr(e))return e;var t=PPx.Extract("%*getcust(S_ppm#global:lang)");return e="en"===t||"ja"===t?t:i.language,cache.lang=e,e},global:function(e){var t,r,n=cache[e];if(n)return n;if(/^ppm[ahrcl]?/.test(e)){if(n=PPx.Extract("%sgu'"+e+"'"),isEmptyStr(n)){var i=e.replace("ppm","");switch(i){case"":n=null!=(t=cache.ppm)?t:PPx.Extract("%*getcust(S_ppm#global:ppm)");break;case"home":n=null!=(r=cache.home)?r:PPx.Extract("%*getcust(S_ppm#global:home)");break;case"lib":var a;n=(null!=(a=cache.ppm)?a:createCache("ppm"))+"\\dist\\lib";break;default:var o,c=null!=(o=cache.home)?o:createCache("home");"cache"===i&&(n=c+"\\"+u.cacheDir())}}}else n=PPx.Extract("%*getcust(S_ppm#global:"+e+")");return cache[e]=n,n},user:function(e){return PPx.Extract('%*extract("%%*getcust(S_ppm#user:'+e+')")')},setuser:function(e,t){return isEmptyStr(t)?1:PPx.Execute("*setcust S_ppm#user:"+e+"="+t)},getpath:function(e,t,r){void 0===r&&(r="");var n=rejectInvalidString(/^[CXTDHLKBNPRVSU]+$/,e);if(0!==n)return[n,""];if(isEmptyStr(t))return[1,""];var i=isEmptyStr(r)?"":',"'+r+'"',u=PPx.Extract("%*name("+e+',"'+t+'"'+i+")");return[n=Number(PPx.Extract()),u]},getcust:function(e){if(isEmptyStr(e))return[1,""];var t=rejectInvalidString(l,e);return 0!==t?[t,""]:[t,PPx.Extract("%*getcust("+e+")")]},setcust:function(e,t){if(void 0===t&&(t=!1),isEmptyStr(e))return 1;var r=rejectInvalidString(l,e);if(0!==r)return r;var n=t?"%OC ":"";return PPx.Execute(n+"*setcust "+e)},deletecust:function(e,t,r){var n="boolean"==typeof t,i=/^\s*"?([^"\s]+)"?\s*?$/,u=e.replace(i,"$1"),a=String(t),o=rejectInvalidString(l,u);if(0!==o)return o;var c=null==t||n||isEmptyStr(a)?'"'+u+'"':u+","+("string"==typeof t?'"'+t.replace(i,"$1")+'"':""+t);return PPx.Execute("*deletecust "+c),r&&PPx.Execute('%K"loadcust"'),0},setkey:function(e,t,r,n){if(void 0===r&&(r=!1),void 0===n&&(n=""),isEmptyStr(e))throw new Error("SubId not specified");isEmptyStr(n)||(n="*skip "+n+"%bn%bt",r=!0);var i=r?"%OC ":"";return PPx.Execute(i+"*setcust "+a.tempKey+":"+e+","+n+t),a.tempKey},deletemenu:function(){PPx.Execute('*deletecust "'+a.tempMenu+'"')},deletekeys:function(){PPx.Execute('*deletecust "'+a.tempKey+'"')},linecust:function(e){var t=e.label,r=e.id,n=e.sep,i=void 0===n?"=":n,u=e.value,a=void 0===u?"":u,o=e.esc,c=void 0!==o&&o,s=e.once,l=void 0!==s&&s?"*linecust "+t+","+r+",%%:":"";!isEmptyStr(a)&&c&&(a="%("+a+"%)"),PPx.Execute("*linecust "+t+","+r+i+l+a)},getvalue:function(e,t,r){if(isEmptyStr(r))return[1,""];var n=hasTargetId(e)?PPx.Extract("%*extract("+e+',"%%s'+t+"'"+r+"'\")"):PPx.Extract("%s"+t+"'"+r+"'");return[isEmptyStr(n)?13:0,n]},setvalue:function(e,t,r,n){return isEmptyStr(r)?1:hasTargetId(e)?PPx.Execute("*execute "+e+",*string "+t+","+r+"="+n):PPx.Execute("*string "+t+","+r+"="+n)},getinput:function(e){var t=e.message,r=void 0===t?"":t,n=e.title,i=void 0===n?"":n,u=e.mode,a=void 0===u?"g":u,o=e.select,c=void 0===o?"a":o,s=e.multi,l=void 0!==s&&s,p=e.leavecancel,x=void 0!==p&&p,d=e.forpath,P=void 0!==d&&d,g=e.fordijit,m=void 0!==g&&g,v=e.autoselect,h=void 0!==v&&v,E=e.k,O=void 0===E?"":E,y=/^[gnmshdcfuxeREOUX][gnmshdcfuxeSUX,]*$/,b=l?" -multi":"",_=x?" -leavecancel":"",T=P?" -forpath":"",S=m?" -fordijit":"";h&&(O=autoselectEnter(O));var C=""!==O?" -k %%OP- "+O:"",N=rejectInvalidString(y,a);if(0!==N)return[N,""];var w=PPx.Extract('%OCP %*input("'+r+'" -title:"'+i+'" -mode:'+a+" -select:"+c+b+_+T+S+C+")");return N=Number(PPx.Extract()),this.deletemenu(),this.deletekeys(),[N,w]},linemessage:function(e,t,r,n){var i,u="B"===PPx.Extract("%n").substring(0,1);if("object"==typeof t){var a=n?"%%bn":" ";i=t.join(a)}else i=t;e="."===e?"":e,i=r&&!u?'!"'+i:i,PPx.Execute("%OC *execute "+e+",*linemessage "+i)},report:function(e){var t="string"==typeof e?e:e.join(i.nlcode);0===PPx.Extract("%n").indexOf("B")?PPx.linemessage(t):PPx.report(t)},close:function(e){PPx.Execute("*closeppx "+e)},jobstart:function(e){return p.execute(e,"*job start"),function(){return p.execute(e,"*job end")}},getVersion:function(e){var t=readLines({path:e+="\\package.json"}),r=t[0],n=t[1];if(!r)for(var i=/^\s*"version":\s*"([0-9\.]+)"\s*,/,u=2,a=n.lines.length;u<a;u++)if(~n.lines[u].indexOf('"version":'))return n.lines[u].replace(i,"$1")}};Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var r;if(null==this)throw new Error('Array.indexOf: "this" is null or not defined');var n=Object(this),i=n.length>>>0;if(0===i)return-1;var u=null!=t?t:0;if(Math.abs(u)===Infinity&&(u=0),u>=i)return-1;for(r=Math.max(u>=0?u:i-Math.abs(u),0);r<i;){if(r in n&&n[r]===e)return r;r++}return-1}),Object.keys||(Object.keys=(e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=(r=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]).length,function(i){if("function"!=typeof i&&("object"!=typeof i||null==i))throw new Error("Object.keys: called on non-object");var u,a,o=[];for(u in i)e.call(i,u)&&o.push(u);if(t)for(a=0;a<n;a++)e.call(i,r[a])&&o.push(r[a]);return o}));var parseSource=function(e,t){var r=JSON.parse(t.replace(/\\/g,"\\\\"));return r.path="remote"===r.location?PPx.Extract("%*getcust(S_ppm#global:home)")+"\\repo\\"+e:r.path,_extends({name:e},r)},expandSource=function(e){var t=PPx.Extract("%*getcust(S_ppm#sources:"+e+")");return isEmptyStr(t)?undefined:parseSource(e,t)};PPx.Extract('%sgu"ppmcache"'),Array.prototype.removeEmpty||(Array.prototype.removeEmpty=function(){for(var e=[],t=0,r=this.length;t<r;t++){var n=this[t];null==n||""===n||n instanceof Array&&0===n.length||n instanceof Object&&isEmptyObj(n)||e.push(n)}return e});var x=";ListFile",d=";charset",P=";Base",dateToBit=function(){for(var e,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];if(1===r.length)e=r[0];else{var i=r[0],u=r[1],a=r.slice(2);e=_construct(Date,[i,u-1].concat(a)).getTime()}var o=(.001*e+11644473600)/1e-7/Math.pow(2,32),c=Math.floor(o);return{high:c,low:(o-c)*Math.pow(2,32)}},getFiletime=function(e){var t,r=[],n=null!=(t=e.split(","))?t:[0];if(~e.indexOf("."))return e;for(var i=0;i<n.length;i++){var u=n[i];r.push(Number(u))}var a=dateToBit.apply(void 0,r);return a.high+"."+a.low},formLfData=function(e,t,r,n){var i,u,a;void 0===n&&(n=!1);var o=undefined,c=undefined;~(e=e.replace(t,r)).indexOf(",Size,")&&(e=e.replace(/(,Size,.+)}$/,(function(e,t){return c=t,"}"}))),~e.indexOf(',"ext":,')&&(e=e.replace(',"ext":',"")),~e.indexOf(',"comment":')&&(e=e.replace(/,"comment":\s?"(.*)"/,(function(e,t){return o=""+t.replace(/""/g,"`"),""})));var s=function(){e=e.replace(/\\/g,"\\\\");try{return JSON.parse(e)}catch(t){return o=e,{name:"---",sname:"-",att:"264"}}}(),l=null!=s.att&&""!==s.att?s.att:"0",p=null!=s.reparse?"R:"+s.reparse:undefined,x=null!=s.ext?"X:"+s.ext:undefined,d=s.hl?"H:"+s.hl:undefined,P=s.mark?"M:"+s.mark:undefined,g=s.oid&&s.ovalue?"O"+s.oid+':"'+s.ovalue+'"':undefined,m=null!=(i=s.name)?i:"",v=[],h=v[0],E=v[1],O=v[2];if(n){var y="-"===m?["-","---"]:[o,m];m=y[0],o=y[1]}return s.date?(E=h=getFiletime(s.date),O=h):(h=s.create?getFiletime(s.create):"0.0",E=s.access?getFiletime(s.access):"0.0",O=s.write?getFiletime(s.write):"0.0"),o&&(o='T:"'+o+'"'),['"'+m+'"','"'+(null!=(u=s.sname)?u:"")+'"',"A:H"+l,"C:"+h,"L:"+E,"W:"+O,"S:"+(null!=(a=s.size)?a:"0.0"),p,x,d,P,g,o,c].removeEmpty().join(",")},createLfItems=function(e){for(var t=e.lines,r=e.rgx,n=e.rep,i=e.virtualEntry,u=void 0!==i&&i,a=[],o=0;o<t.length;o++){var c=t[o];a.push(formLfData(c,r,n,u))}return a},createLfMeta=function(e){var t=e.charset,r=void 0===t?"utf16le":t,n=e.basepath,i=e.dirtype,u=void 0===i?"0":i,a=e.opts,o=[x];if("utf16le"!==r&&o.push(d+"="+r),""!==n&&o.push(P+"="+n+"|"+u),a&&a.length>0)for(var c=0;c<a.length;c++){var s=a[c];o.push(s)}return o},getLfMeta=function(e){for(var t={},r=/^;([^=]+)=(.+)$/,n=1,i=e.length;n<i&&0===e[n].indexOf(";");n++)e[n].replace(r,(function(e,r,n){if("Base"===r){var i=n.split("|");t.base=i[0],t.dirtype=i[1]}else t[r.toLowerCase()]=n;return""}));return t},g={BUTTON:"Edit_OptionCmd",CMD:"grepCmd",OUTPUT:"grepOutput",OPTION:"grepOption",COMPLIST:"grepComplist",OPT_FIXED:"fixed",OPT_ADDED:"added",OPT_FLEN:"flen",OPT_ALEN:"alen",MENU_ID:"M_ppmGrep",KEY_ID:"K_ppmGrep",SWITCH_KEY:"grep_switchkey",SWITCH_TYPE:"grep_switchtype",COMMIT_KEY:"grep_commitkey",COMMIT_HASH:"commitHash"},m={getParent:function(e,t,r){var n;void 0===t&&(t=PPx.Extract("%FD")),void 0===r&&(r=PPx.Extract("%FDV"));var i={};if(4===e){n="lf";var u=readLines({path:r,enc:"utf16le"}),a=u[0],o=u[1];t=a?"":(i=getLfMeta(o.lines)).base?i.base:""}else~r.indexOf("aux:")&&(n="aux",t=r.replace(/^aux:(\/\/)?[MS]_[^\\/]+[\\/](.*)/,"$2"));return{pwd:t,vtype:n,metaSource:i}},correctWord:function(e,t){return[(e=e.replace(/^\^|\$$/g,"")).replace(/(\\.)/g,(function(e,t){return s.exclude[e]||t})),"grep"===t?e.replace(/\\/g,"\\\\"):e]},createResult:function(e){var t=e.dirtype,r=e.pwd,n=e.keyword,i=e.path,u=';cmd=*viewstyle -temp format "'+PPx.Extract("%*getcust(S_ppm#user:grep_viewstyle)")+'"',a=createLfMeta({basepath:r,dirtype:t,opts:[";Search="+n,u,";ppm=grep",";mapkey="+g.KEY_ID,";freq=every"]}),o=readLines({path:i,enc:"utf8",linefeed:"\n"}),c=o[0],s=o[1];if(c)return[!1,[]];var l=/^([0-9a-zA-Z]{7,8}:)?(.*?)[-:](\d*)([-:])\s*(.*)/,rep=function(e,t,r,n,i,u){return'{"name":"'+(isEmptyStr(r)?i:r)+'","sname":"'+n+'","att":"'+(~i.indexOf(":")?0:3)+'","comment":"'+u.replace(/"/g,'""')+'"}'},p=createLfItems({lines:s.lines,rgx:l,rep:rep,virtualEntry:!0});return[!0,[].concat(a,p)]}},v={en:{invalidPath:"Invalid path",noResult:"No results found",selectCommit:"Select the tharget commit",warning:function(e,t){return"Execute "+e+" on "+t}},ja:{invalidPath:"無効なパスです",noResult:"該当なし",selectCommit:"対象とするコミットを選択してください",warning:function(e,t){return t+" を対象に "+e+" を実行します"}}},h=pathSelf().scriptName,E=v[p.lang()],O=tmp(),y=O.dir+"\\ppmgrepcommithash.txt",b=a.virtualEntry,main=function(){var e=safeArgs("grep","lf","w",0),t=e[0],r=e[1],n=e[2],i=e[3],u=PPx.DirectoryType,a=m.getParent(u),o=a.pwd,c=a.vtype,s=a.metaSource,l=t.toLowerCase(),x=r.toLowerCase();isEmptyStr(o)&&(p.echo(h,E.invalidPath),PPx.Quit(1));var d=0!==PPx.EntryMarkCount;d&&"aux"===c&&!p.question(h,E.warning(l,o))&&PPx.Quit(1),PPx.Execute("*delete "+y),createButton();var P=doSearch(l,x,s.commit||""),v=P[0],O=P[1];v&&PPx.Quit(1);var b=d?"%#FCB":0===i?PPx.Extract('"%R"'):"";l=PPx.getIValue(g.CMD).toLowerCase(),x=PPx.getIValue(g.OUTPUT).toLowerCase();var T=m.correctWord(O,l),S=T[0],C=T[1],N=outputPath(S.replace(/["':/\\\|\s\.]/g,"_"),x),w="gitgrep"===l?PPx.getIValue(g.COMMIT_HASH):"";if(isEmptyStr(w)||(s.commit=w),"ppv"!==x&&(PPx.Execute('%Osq *run -noppb -hide -d:"'+o+'" %si"'+g.CMD+'" %si"'+g.OPTION+'" "%('+C+'%)" '+w+" "+b+">"+N),setVariableI("","","",""),"lf"===x)){var D=m.createResult({dirtype:u,pwd:o,keyword:S,path:N,metaSource:s}),j=D[0],I=D[1];j||(p.linemessage(".",E.noResult,!0),PPx.Quit(1)),writeLines({path:N,data:I,enc:"utf16le",overwrite:!0,linefeed:"\r\n"})}_[x]({filepath:N,pwd:o,entry:b,id:n,keyword:S,searchTerm:C,commit:w})},outputPath=function(e,t){var r="edit"===t?"ppmgrep_e":"ppmgrep";return""+O.dir+e+"."+r},createButton=function(){PPx.Execute("*string i,"+g.BUTTON+"=%(*string i,"+g.OPTION+"=%*input(\"%si'"+g.OPTION+"'\" -title:\"%si'"+g.CMD+"' option (fixed: %se'"+g.OPT_FIXED+"')\" -mode:e -select:%se'"+g.OPT_FLEN+"',%se'"+g.OPT_ALEN+"' -k *completelist -set -detail:\"user 2user1\" -file:\"%sgu'ppmcache'\\complist\\%se'"+g.COMPLIST+"'\")%:*setcaption [%si'"+g.OUTPUT+"'] %si'"+g.CMD+"' %si'"+g.OPTION+"'%)")},setVariableI=function(e,t,r,n){PPx.Execute("*string i,"+g.CMD+"="+e+"%:*string i,"+g.OPTION+"="+t+"%:*string i,"+g.OUTPUT+"="+r+"%:*string i,"+g.COMMIT_HASH+"="+n)},setTempKeys=function(){var e,t=null==(e=expandSource("ppm-grep"))?void 0:e.path,r=p.user(g.SWITCH_KEY),n=p.user(g.COMMIT_KEY);!isEmptyStr(r)&&t&&p.setkey(r,'*script "'+t+'\\dist\\switchGrep.js",'+p.user(g.SWITCH_TYPE)),!isEmptyStr(n)&&p.setkey(n,["*string o,path="+y,'%(*ifmatch "o:e,a:d-","%so\'path\'"%:*goto start%)','%(%Obd git log --date=short --format="%OD%%h %;%%ad *%%s%%d%OD-" -50>"%so\'path\'"%&%)',"%(%mstart *string o,hash=%*input(\"%si'"+g.COMMIT_HASH+'\'" -title:"'+E.selectCommit+'" -mode:e -k *completelist -file:"%so\'path\'")%)',"%(*setcaption [%*regexp(\"%si'"+g.OUTPUT+'\'","tr/a-z/A-Z")] %si\''+g.CMD+"' %si'"+g.OPTION+"'  (commit: %so'hash')%)"].join("%bn%bt"),!0)},doSearch=function(e,t,r){var n=JSON.parse(p.getcust(g.MENU_ID+":"+e+t)[1]),i=0===n.added.indexOf("-")?" ":"";setVariableI(e,""+n.fixed+i+n.added,t,r);var u="*string e,"+g.OPT_FIXED+"="+n.fixed+"%:*string e,"+g.OPT_ADDED+"="+n.added+"%:*string e,"+g.COMPLIST+"="+n.listname+"%:*string e,"+g.OPT_FLEN+"="+n.fixed.length+"%:*string e,"+g.OPT_ALEN+"=%*js(\"PPx.result=PPx.Extract('%si'"+g.OPTION+"'').length;\")";setTempKeys();var o=p.getinput({title:"["+t.toUpperCase()+"] "+e+" "+n.fixed+i+n.added,mode:"Os",k:"%(*mapkey use,"+a.tempKey+"%:"+u+"%)"}),c=o[0],s=o[1];return PPx.Execute("*string i,"+g.BUTTON+"="),p.deletekeys(),c>0?(setVariableI("","","",""),[!0,""]):[!1,s]},_={lf:function(e){PPx.Execute("*ppc -r -single -mps -bootid:"+e.id+" "+e.filepath);var t=b+"C"+e.id+",KC_main";PPx.Execute("*linecust "+t+":CLOSEEVENT,*linecust "+t+":LOADEVENT,%%:*linecust "+t+":CLOSEEVENT,")},ppv:function(e){PPx.Execute("*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod)%%:*linecust tmod,KV_main:CLOSEEVENT,"),PPx.Execute("*setcust XV_tmod=1"),PPx.Execute('*cd "'+e.pwd+'"%:%Obd %si"'+g.CMD+'" %si"'+g.OPTION+'" "%('+e.searchTerm+'%)" '+e.commit+" "+e.entry+"|%0ppvw -bootid:"+e.id+' -esc -document -utf8 -k *string p,grep=1%%:*find "'+e.keyword+'"'),setVariableI("","","","")},edit:function(e){var t=/\$\{pwd\}|\$\{filepath\}|\$\{keyword\}/gm,replacer=function(t){return{"${pwd}":e.pwd,"${filepath}":e.filepath,"${keyword}":e.keyword}[t]},r=PPx.Extract("%*getcust(S_ppm#user:grep_edit)");PPx.Execute("%OP *execute ,%(%OP- "+r.replace(t,replacer)+"%)")}};main();
