﻿var validArgs=function(){for(var t=[],e=PPx.Arguments;!e.atEnd();e.moveNext())t.push(e.value);return t},safeArgs=function(){for(var t=[],e=validArgs(),n=0,u=arguments.length;n<u;n++)t.push(_valueConverter(n<0||arguments.length<=n?undefined:arguments[n],e[n]));return t},_valueConverter=function(t,e){if(null==e||""===e)return null!=t?t:undefined;switch(typeof t){case"number":var n=Number(e);return isNaN(n)?t:n;case"boolean":return"false"!==e&&"0"!==e&&null!=e;default:return e}},isEmptyStr=function(t){return""===t},waitMoment=function(t){for(var e=10;t()&&(PPx.Sleep(100),!(0>=--e)););},t=80001,e="ppm_grepsyncview",n={},main=function(){var e=safeArgs("W",0,"0"),u=e[0],c=e[1],r=e[2];n.ppvid=u,n.close=1===c,n.debug="DEBUG"===r,n.lnum=PPx.Extract("%*getcust(XV_lnum)"),n.tmod=PPx.Extract("%*getcust(XV_tmod)"),n.debug&&debugMsg("start"),startPPv(),PPx.StayMode=t,ppx_Syncview()},ppx_Syncview=function(){if(isEmptyStr(PPx.Extract("%NV"+n.ppvid)))ppx_resume();else{var t=PPx.Extract('%*name(SC,"%FSC")');if("-"!==t){var e=PPx.Extract('%*name(DC,"%*comment")');e!==PPx.Extract("%*extract(V"+n.ppvid+',"%%FDC")')&&(PPx.Execute("*execute V"+n.ppvid+',%%J"'+e+'"'),waitMoment((function(){return PPx.Extract("%*extract(V"+n.ppvid+',"%%FDC")')!==e}))),PPx.Execute("*execute V"+n.ppvid+",*jumpline "+t)}}},ppx_resume=function(){PPx.StayMode=0,PPx.SyncView=0,PPx.Execute(selectevent("")+"%:"+activeevent("")),PPx.Execute("*setcust XV_lnum="+n.lnum+"%:*setcust XV_tmod="+n.tmod),n.close&&PPx.Execute("*closeppx V"+n.ppvid),n.debug&&debugMsg("discard")},startPPv=function(){var e=PPx.Extract('%*name(X,"%FDV")');PPx.Execute("*setcust XV_lnum=1%:*setcust XV_tmod=1"),PPx.Execute("%Oa *ppv -bootid:"+n.ppvid+' -k *topmostwindow %%N,1%%:*find "'+e+'"%%:*focus %n'),waitMoment((function(){return isEmptyStr(PPx.Extract("%NV"+n.ppvid))})),PPx.Execute(selectevent('*if ("%n"=="%%n")%%:*script ":'+t+',ppx_Syncview"')),PPx.Execute(activeevent('*if ("%%N%n"=="")%%:'+selectevent("")+"%%:"+activeevent("")))},selectevent=function(t){return"*linecust "+e+",KC_main:SELECTEVENT,"+t},activeevent=function(t){return"*linecust "+e+",KC_main:ACTIVEEVENT,"+t},debugMsg=function(t){return PPx.linemessage("[DEBUG] lfSyncView "+t)};main();