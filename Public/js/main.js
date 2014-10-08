function FastClick(a){"use strict";var b,c=this;if(this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=10,this.layer=a,!a||!a.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){return FastClick.prototype.onClick.apply(c,arguments)},this.onMouse=function(){return FastClick.prototype.onMouse.apply(c,arguments)},this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(c,arguments)},this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(c,arguments)},this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(c,arguments)},FastClick.notNeeded(a)||(this.deviceIsAndroid&&(a.addEventListener("mouseover",this.onMouse,!0),a.addEventListener("mousedown",this.onMouse,!0),a.addEventListener("mouseup",this.onMouse,!0)),a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=function(b,c,d){var e=Node.prototype.removeEventListener;"click"===b?e.call(a,b,c.hijacked||c,d):e.call(a,b,c,d)},a.addEventListener=function(b,c,d){var e=Node.prototype.addEventListener;"click"===b?e.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(a,b,c,d)}),"function"==typeof a.onclick&&(b=a.onclick,a.addEventListener("click",function(a){b(a)},!1),a.onclick=null))}function Swipe(a,b){"use strict";function c(){o=r.children,p=new Array(o.length),q=a.getBoundingClientRect().width||a.offsetWidth,r.style.width=o.length*q+"px";for(var b=o.length;b--;){var c=o[b];c.style.width=q+"px",c.setAttribute("data-index",b),n.transitions&&(c.style.left=b*-q+"px",g(b,s>b?-q:b>s?q:0,0))}n.transitions||(r.style.left=s*-q+"px"),a.style.visibility="visible"}function d(){s?f(s-1):b.continuous&&f(o.length-1)}function e(){s<o.length-1?f(s+1):b.continuous&&f(0)}function f(a,c){if(s!=a){if(c=void 0!=c?c:t,n.transitions){for(var d=Math.abs(s-a)-1,e=Math.abs(s-a)/(s-a);d--;)g((a>s?a:s)-d-1,q*e,0);g(s,q*e,c),g(a,0,c)}else i(s*-q,a*-q,c);s=a,m(b.callback&&b.callback(s,o[s]))}}function g(a,b,c){h(a,b,c),p[a]=b}function h(a,b,c){var d=o[a],e=d&&d.style;e&&(e.webkitTransitionDuration=e.MozTransitionDuration=e.msTransitionDuration=e.OTransitionDuration=e.transitionDuration=c+"ms",e.webkitTransform="translate("+b+"px,0)translateZ(0)",e.msTransform=e.MozTransform=e.OTransform="translateX("+b+"px)")}function i(a,c,d){if(!d)return void(r.style.left=c+"px");var e=+new Date,f=setInterval(function(){var g=+new Date-e;return g>d?(r.style.left=c+"px",w&&j(),b.transitionEnd&&b.transitionEnd.call(event,s,o[s]),void clearInterval(f)):void(r.style.left=(c-a)*(Math.floor(g/d*100)/100)+a+"px")},4)}function j(){u=setTimeout(e,w)}function k(){w=0,clearTimeout(u)}var l=function(){},m=function(a){setTimeout(a||l,0)},n={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(a){var b=["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"];for(var c in b)if(void 0!==a.style[b[c]])return!0;return!1}(document.createElement("swipe"))};if(a){var o,p,q,r=a.children[0];b=b||{};var s=parseInt(b.startSlide,10)||0,t=b.speed||300;b.continuous=b.continuous?b.continuous:!0;var u,v,w=b.auto||0,x={},y={},z={handleEvent:function(a){switch(a.type){case"touchstart":this.start(a);break;case"touchmove":this.move(a);break;case"touchend":m(this.end(a));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":m(this.transitionEnd(a));break;case"resize":m(c.call())}b.stopPropagation&&a.stopPropagation()},start:function(a){var b=a.touches[0];x={x:b.pageX,y:b.pageY,time:+new Date},v=void 0,y={},r.addEventListener("touchmove",this,!1),r.addEventListener("touchend",this,!1)},move:function(a){if(!(a.touches.length>1||a.scale&&1!==a.scale)){b.disableScroll&&a.preventDefault();var c=a.touches[0];y={x:c.pageX-x.x,y:c.pageY-x.y},"undefined"==typeof v&&(v=!!(v||Math.abs(y.x)<Math.abs(y.y))),v||(a.preventDefault(),k(),y.x=y.x/(!s&&y.x>0||s==o.length-1&&y.x<0?Math.abs(y.x)/q+1:1),h(s-1,y.x+p[s-1],0),h(s,y.x+p[s],0),h(s+1,y.x+p[s+1],0))}},end:function(){var a=+new Date-x.time,c=Number(a)<250&&Math.abs(y.x)>20||Math.abs(y.x)>q/2,d=!s&&y.x>0||s==o.length-1&&y.x<0,e=y.x<0;v||(c&&!d?(e?(g(s-1,-q,0),g(s,p[s]-q,t),g(s+1,p[s+1]-q,t),s+=1):(g(s+1,q,0),g(s,p[s]+q,t),g(s-1,p[s-1]+q,t),s+=-1),b.callback&&b.callback(s,o[s])):(g(s-1,-q,t),g(s,0,t),g(s+1,q,t))),r.removeEventListener("touchmove",z,!1),r.removeEventListener("touchend",z,!1)},transitionEnd:function(a){parseInt(a.target.getAttribute("data-index"),10)==s&&(w&&j(),b.transitionEnd&&b.transitionEnd.call(a,s,o[s]))}};return c(),w&&j(),n.addEventListener?(n.touch&&r.addEventListener("touchstart",z,!1),n.transitions&&(r.addEventListener("webkitTransitionEnd",z,!1),r.addEventListener("msTransitionEnd",z,!1),r.addEventListener("oTransitionEnd",z,!1),r.addEventListener("otransitionend",z,!1),r.addEventListener("transitionend",z,!1)),window.addEventListener("resize",z,!1)):window.onresize=function(){c()},{setup:function(){c()},slide:function(a,b){f(a,b)},prev:function(){k(),d()},next:function(){k(),e()},getPos:function(){return s},kill:function(){k(),r.style.width="auto",r.style.left=0;for(var a=o.length;a--;){var b=o[a];b.style.width="100%",b.style.left=0,n.transitions&&h(a,0,0)}n.addEventListener?(r.removeEventListener("touchstart",z,!1),r.removeEventListener("webkitTransitionEnd",z,!1),r.removeEventListener("msTransitionEnd",z,!1),r.removeEventListener("oTransitionEnd",z,!1),r.removeEventListener("otransitionend",z,!1),r.removeEventListener("transitionend",z,!1),window.removeEventListener("resize",z,!1)):window.onresize=null}}}}if(FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0,FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent),FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent),FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),FastClick.prototype.needsClick=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(this.deviceIsIOS&&"file"===a.type||a.disabled)return!0;break;case"label":case"video":return!0}return/\bneedsclick\b/.test(a.className)},FastClick.prototype.needsFocus=function(a){"use strict";switch(a.nodeName.toLowerCase()){case"textarea":case"select":return!0;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},FastClick.prototype.sendClick=function(a,b){"use strict";var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent("click",!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},FastClick.prototype.focus=function(a){"use strict";var b;this.deviceIsIOS&&a.setSelectionRange?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},FastClick.prototype.updateScrollParent=function(a){"use strict";var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},FastClick.prototype.getTargetElementFromEventTarget=function(a){"use strict";return a.nodeType===Node.TEXT_NODE?a.parentNode:a},FastClick.prototype.onTouchStart=function(a){"use strict";var b,c,d;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],this.deviceIsIOS){if(d=window.getSelection(),d.rangeCount&&!d.isCollapsed)return!0;if(!this.deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<200&&a.preventDefault(),!0},FastClick.prototype.touchHasMoved=function(a){"use strict";var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},FastClick.prototype.findControl=function(a){"use strict";return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},FastClick.prototype.onTouchEnd=function(a){"use strict";var b,c,d,e,f,g=this.targetElement;if((this.touchHasMoved(a)||a.timeStamp-this.trackingClickStart>300)&&(this.trackingClick=!1,this.targetElement=null),!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<200)return this.cancelNextClick=!0,!0;if(this.lastClickTime=a.timeStamp,c=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,this.deviceIsIOSWithBadTarget&&(f=a.changedTouches[0],g=document.elementFromPoint(f.pageX-window.pageXOffset,f.pageY-window.pageYOffset)),d=g.tagName.toLowerCase(),"label"===d){if(b=this.findControl(g)){if(this.focus(g),this.deviceIsAndroid)return!1;g=b}}else if(this.needsFocus(g))return a.timeStamp-c>100||this.deviceIsIOS&&window.top!==window&&"input"===d?(this.targetElement=null,!1):(this.focus(g),this.deviceIsIOS4&&"select"===d||(this.targetElement=null,a.preventDefault()),!1);return this.deviceIsIOS&&!this.deviceIsIOS4&&(e=g.fastClickScrollParent,e&&e.fastClickLastScrollTop!==e.scrollTop)?!0:(this.needsClick(g)||(a.preventDefault(),this.sendClick(g,a)),!1)},FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=!1,this.targetElement=null},FastClick.prototype.onMouse=function(a){"use strict";return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0},FastClick.prototype.onClick=function(a){"use strict";var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},FastClick.prototype.destroy=function(){"use strict";var a=this.layer;this.deviceIsAndroid&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},FastClick.notNeeded=function(a){"use strict";var b;if("undefined"==typeof window.ontouchstart)return!0;if(/Chrome\/[0-9]+/.test(navigator.userAgent)){if(!FastClick.prototype.deviceIsAndroid)return!0;if(b=document.querySelector("meta[name=viewport]"),b&&-1!==b.content.indexOf("user-scalable=no"))return!0}return"none"===a.style.msTouchAction?!0:!1},FastClick.attach=function(a){"use strict";return new FastClick(a)},"undefined"!=typeof define&&define.amd?define(function(){"use strict";return FastClick}):"undefined"!=typeof module&&module.exports?(module.exports=FastClick.attach,module.exports.FastClick=FastClick):window.FastClick=FastClick,function(){function a(a,b){return[].slice.call((b||document).querySelectorAll(a))}if(window.addEventListener){var b=window.StyleFix={link:function(a){try{if("stylesheet"!==a.rel||a.hasAttribute("data-noprefix"))return}catch(c){return}var d,e=a.href||a.getAttribute("data-href"),f=e.replace(/[^\/]+$/,""),g=(/^[a-z]{3,10}:/.exec(f)||[""])[0],h=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(f)||[""])[0],i=/^([^?]*)\??/.exec(e)[1],j=a.parentNode,k=new XMLHttpRequest;k.onreadystatechange=function(){4===k.readyState&&d()},d=function(){var c=k.responseText;if(c&&a.parentNode&&(!k.status||k.status<400||k.status>600)){if(c=b.fix(c,!0,a),f){c=c.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(a,b,c){return/^([a-z]{3,10}:|#)/i.test(c)?a:/^\/\//.test(c)?'url("'+g+c+'")':/^\//.test(c)?'url("'+h+c+'")':/^\?/.test(c)?'url("'+i+c+'")':'url("'+f+c+'")'});var d=f.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");c=c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+d,"gi"),"$1")}var e=document.createElement("style");e.textContent=c,e.media=a.media,e.disabled=a.disabled,e.setAttribute("data-href",a.getAttribute("href")),j.insertBefore(e,a),j.removeChild(a),e.media=a.media}};try{k.open("GET",e),k.send(null)}catch(c){"undefined"!=typeof XDomainRequest&&(k=new XDomainRequest,k.onerror=k.onprogress=function(){},k.onload=d,k.open("GET",e),k.send(null))}a.setAttribute("data-inprogress","")},styleElement:function(a){if(!a.hasAttribute("data-noprefix")){var c=a.disabled;a.textContent=b.fix(a.textContent,!0,a),a.disabled=c}},styleAttribute:function(a){var c=a.getAttribute("style");c=b.fix(c,!1,a),a.setAttribute("style",c)},process:function(){a('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link),a("style").forEach(StyleFix.styleElement),a("[style]").forEach(StyleFix.styleAttribute)},register:function(a,c){(b.fixers=b.fixers||[]).splice(void 0===c?b.fixers.length:c,0,a)},fix:function(a,c,d){for(var e=0;e<b.fixers.length;e++)a=b.fixers[e](a,c,d)||a;return a},camelCase:function(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()}).replace("-","")},deCamelCase:function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}};!function(){setTimeout(function(){a('link[rel="stylesheet"]').forEach(StyleFix.link)},10),document.addEventListener("DOMContentLoaded",StyleFix.process,!1)}()}}(),function(a){function b(a,b,d,e,f){if(a=c[a],a.length){var g=RegExp(b+"("+a.join("|")+")"+d,"gi");f=f.replace(g,e)}return f}if(window.StyleFix&&window.getComputedStyle){var c=window.PrefixFree={prefixCSS:function(a,d){var e=c.prefix;if(c.functions.indexOf("linear-gradient")>-1&&(a=a.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi,function(a,b,c,d){return b+(c||"")+"linear-gradient("+(90-d)+"deg"})),a=b("functions","(\\s|:|,)","\\s*\\(","$1"+e+"$2(",a),a=b("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+e+"$2$3",a),a=b("properties","(^|\\{|\\s|;)","\\s*:","$1"+e+"$2:",a),c.properties.length){var f=RegExp("\\b("+c.properties.join("|")+")(?!:)","gi");a=b("valueProperties","\\b",":(.+?);",function(a){return a.replace(f,e+"$1")},a)}return d&&(a=b("selectors","","\\b",c.prefixSelector,a),a=b("atrules","@","\\b","@"+e+"$1",a)),a=a.replace(RegExp("-"+e,"g"),"-"),a=a.replace(/-\*-(?=[a-z]+)/gi,c.prefix)},property:function(a){return(c.properties.indexOf(a)>=0?c.prefix:"")+a},value:function(a,d){return a=b("functions","(^|\\s|,)","\\s*\\(","$1"+c.prefix+"$2(",a),a=b("keywords","(^|\\s)","(\\s|$)","$1"+c.prefix+"$2$3",a),c.valueProperties.indexOf(d)>=0&&(a=b("properties","(^|\\s|,)","($|\\s|,)","$1"+c.prefix+"$2$3",a)),a},prefixSelector:function(a){return a.replace(/^:{1,2}/,function(a){return a+c.prefix})},prefixProperty:function(a,b){var d=c.prefix+a;return b?StyleFix.camelCase(d):d}};!function(){var a={},b=[],d=getComputedStyle(document.documentElement,null),e=document.createElement("div").style,f=function(c){if("-"===c.charAt(0)){b.push(c);var d=c.split("-"),e=d[1];for(a[e]=++a[e]||1;d.length>3;){d.pop();var f=d.join("-");g(f)&&-1===b.indexOf(f)&&b.push(f)}}},g=function(a){return StyleFix.camelCase(a)in e};if(d.length>0)for(var h=0;h<d.length;h++)f(d[h]);else for(var i in d)f(StyleFix.deCamelCase(i));var j={uses:0};for(var k in a){var l=a[k];j.uses<l&&(j={prefix:k,uses:l})}c.prefix="-"+j.prefix+"-",c.Prefix=StyleFix.camelCase(c.prefix),c.properties=[];for(var h=0;h<b.length;h++){var i=b[h];if(0===i.indexOf(c.prefix)){var m=i.slice(c.prefix.length);g(m)||c.properties.push(m)}}"Ms"==c.Prefix&&!("transform"in e)&&!("MsTransform"in e)&&"msTransform"in e&&c.properties.push("transform","transform-origin"),c.properties.sort()}(),function(){function a(a,b){return e[b]="",e[b]=a,!!e[b]}var b={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};b["repeating-linear-gradient"]=b["repeating-radial-gradient"]=b["radial-gradient"]=b["linear-gradient"];var d={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};c.functions=[],c.keywords=[];var e=document.createElement("div").style;for(var f in b){var g=b[f],h=g.property,i=f+"("+g.params+")";!a(i,h)&&a(c.prefix+i,h)&&c.functions.push(f)}for(var j in d){var h=d[j];!a(j,h)&&a(c.prefix+j,h)&&c.keywords.push(j)}}(),function(){function b(a){return f.textContent=a+"{}",!!f.sheet.cssRules.length}var d={":read-only":null,":read-write":null,":any-link":null,"::selection":null},e={keyframes:"name",viewport:null,document:'regexp(".")'};c.selectors=[],c.atrules=[];var f=a.appendChild(document.createElement("style"));for(var g in d){var h=g+(d[g]?"("+d[g]+")":"");!b(h)&&b(c.prefixSelector(h))&&c.selectors.push(g)}for(var i in e){var h=i+" "+(e[i]||"");!b("@"+h)&&b("@"+c.prefix+h)&&c.atrules.push(i)}a.removeChild(f)}(),c.valueProperties=["transition","transition-property"],a.className+=" "+c.prefix,StyleFix.register(c.prefixCSS)}}(document.documentElement),function(){var a,b,c,d=!1,e="animation",f=prefix="",g=["Webkit","Moz","O","ms","Khtml"];$(function(){var a=document.body;if(void 0!==a.style.animationName&&(d=!0),d===!1)for(var b=0;b<g.length;b++)if(void 0!==a.style[g[b]+"AnimationName"]){prefix=g[b],e=prefix+"Animation",f="-"+prefix.toLowerCase()+"-",d=!0;break}}),a=function(a){return $("<style>").attr({"class":"keyframe-style",id:a.id,type:"text/css"}).appendTo("head")},$.keyframe={getVendorPrefix:function(){return f},isSupported:function(){return d},generate:function(b){var c,d,g,h,i,j;h=b.name||"",g="@"+f+"keyframes "+h+" {";for(j in b)if("name"!==j){g+=j+" {";for(i in b[j])g+=i+":"+b[j][i]+";";g+="}"}g=PrefixFree.prefixCSS(g+"}"),d=$("style#"+b.name),d.length>0?(d.html(g),c=$("*").filter(function(){this.style[""+e+"Name"]===h}),c.each(function(){var a,b;a=$(this),b=a.data("keyframeOptions"),a.resetKeyframe(function(){a.playKeyframe(b)})})):a({id:h}).append(g)},define:function(a){if(!a.length)return this.generate(a);for(var b=0;b<a.length;b++){var c=a[b];this.generate(c)}}},b="animation-play-state",c="running",$.fn.resetKeyframe=function(a){$(this).css(f+b,c).css(f+"animation","none");a&&setTimeout(a,1)},$.fn.pauseKeyframe=function(){$(this).css(f+b,"paused")},$.fn.resumeKeyframe=function(){return $(this).css(f+b,c)},$.fn.playKeyframe=function(a,d){var e,g,h,i,j,k;if("string"==typeof a){var l=a.trim().split(" ");a={name:l[0],duration:parseInt(l[1]),timingFunction:l[2],delay:parseInt(l[3]),repeat:l[4],direction:l[5],fillMode:l[6],complete:d}}a=$.extend({duration:0,timingFunction:"ease",delay:0,repeat:1,direction:"normal",fillMode:"forwards",complete:d},a),i=a.duration,h=a.delay,k=a.repeat,e=""+a.name+" "+i+"ms "+a.timingFunction+" "+h+"ms "+k+" "+a.direction+" "+a.fillMode,d=a.complete,g=f+"animation",j=["webkit","moz","MS","o",""];var m=function(a,b,c){var d,e,f;for(e=0,f=[];e<j.length;)j[e]||(b=b.toLowerCase()),d=j[e]+b,a.off(d).on(d,c),f.push(e++)};return this.each(function(){var h=$(this).addClass("boostKeyframe").css(f+b,c).css(g,e).data("keyframeOptions",a);d&&(m(h,"AnimationIteration",d),m(h,"AnimationEnd",d))}),this},a({id:"boost-keyframe"}).append(" .boostKeyframe{"+f+"transform:scale3d(1,1,1);}")}.call(this),"undefined"==typeof Zepto)throw new Error("Parallax.js's script requires Zepto");!function(a){function b(){x.loading?a(".wrapper").append('<div class="parallax-loading"><i class="ui-loading ui-loading-white"></i></div>'):A=!1,q=0,y="stay",r=v.length,s=a(window).width(),t=a(window).height(),w=a("[data-animation]");for(var b=0;r>b;b++)a(v[b]).attr("data-id",b+1);u.addClass(x.direction).addClass(x.swipeAnim),v.css({width:s+"px",height:t+"px"}),"horizontal"===x.direction?u.css("width",s*v.length):u.css("height",t*v.length),"cover"===x.swipeAnim&&(u.css({width:s,height:t}),v[0].style.display="block"),x.loading||(a(v[q]).addClass("current"),x.onchange(q,v[q],y),j())}function c(a){return A===!0?(event.preventDefault(),!1):(z=!0,m="horizontal"===x.direction?a.pageX:a.pageY,"default"===x.swipeAnim&&(u.addClass("drag"),p=u.css("-webkit-transform").replace("matrix(","").replace(")","").split(","),p=parseInt("horizontal"===x.direction?p[4]:p[5])),"cover"===x.swipeAnim&&x.drag&&v.addClass("drag"),void(o=1))}function d(a){return A===!0||z===!1?(event.preventDefault(),!1):(event.preventDefault(),n="horizontal"===x.direction?a.pageX:a.pageY,h(),x.drag&&!i()&&f(),void(o=2))}function e(b){A===!0||2!==o||(z=!1,n="horizontal"===x.direction?b.pageX:b.pageY,"default"!==x.swipeAnim||i()?"cover"!==x.swipeAnim||i()||(Math.abs(n-m)<=50&&n>=m&&x.drag?(g(q,"keep-backward"),y="stay"):Math.abs(n-m)<=50&&m>n&&x.drag?(g(q,"keep-forward"),y="stay"):Math.abs(n-m)>50&&n>=m&&x.drag?(g(q-1,"backward"),y="backward"):Math.abs(n-m)>50&&m>n&&x.drag?(g(q+1,"forward"),y="forward"):Math.abs(n-m)>50&&n>=m&&!x.drag?(g(q-1,"backward"),y="backward"):Math.abs(n-m)>50&&m>n&&!x.drag&&(g(q+1,"forward"),y="forward")):(u.removeClass("drag"),Math.abs(n-m)<=50?(g(q),y="stay"):n>=m?(g(q-1),y="backward"):m>n&&(g(q+1),y="forward")),x.indicator&&a(a(".parallax-h-indicator ul li, .parallax-v-indicator ul li").removeClass("current").get(q)).addClass("current"),o=3)}function f(){if("default"===x.swipeAnim){var b=p+n-m;"horizontal"===x.direction?u.css("-webkit-transform","matrix(1, 0, 0, 1, "+b+", 0)"):u.css("-webkit-transform","matrix(1, 0, 0, 1, 0, "+b+")")}else if("cover"===x.swipeAnim){var b=n-m,c=a(v[q-1]),d=a(v[q+1]);a(v).css({"z-index":0}),"horizontal"===x.direction&&n>=m?c.css({"z-index":2,display:"block","-webkit-transform":"translateX("+(b-s)+"px)"}):"horizontal"===x.direction&&m>n?d.css({"z-index":2,display:"block","-webkit-transform":"translateX("+(s+b)+"px)"}):"vertical"===x.direction&&n>=m?c.css({"z-index":2,display:"block","-webkit-transform":"translateY("+(b-t)+"px)"}):"vertical"===x.direction&&m>n&&d.css({"z-index":2,display:"block","-webkit-transform":"translateY("+(t+b)+"px)"})}}function g(b,c){if(q=b,"default"===x.swipeAnim){var d=0;d="horizontal"===x.direction?b*-s:b*-t,u.css("horizontal"===x.direction?{"-webkit-transform":"matrix(1, 0, 0, 1, "+d+", 0)"}:{"-webkit-transform":"matrix(1, 0, 0, 1, 0, "+d+")"})}else"cover"===x.swipeAnim&&("keep-backward"===c&&x.drag?(v.removeClass("drag"),a(v[q-1]).css("horizontal"===x.direction?{"-webkit-transform":"translateX(-100%)"}:{"-webkit-transform":"translateY(-100%)"})):"keep-forward"===c&&x.drag?(v.removeClass("drag"),a(v[q+1]).css("horizontal"===x.direction?{"-webkit-transform":"translateX(100%)"}:{"-webkit-transform":"translateY(100%)"})):"forward"===c&&x.drag?(v.removeClass("drag"),a(v[q-1]).addClass("back"),v[q].style.webkitTransform="translate(0, 0)"):"backward"===c&&x.drag?(v.removeClass("drag"),a(v[q+1]).addClass("back"),v[q].style.webkitTransform="translate(0, 0)"):"forward"!==c||x.drag?"backward"!==c||x.drag||(u.addClass("animate"),a(v[q+1]).addClass("back"),a(v[q]).addClass("front").show()):(u.addClass("animate"),a(v[q-1]).addClass("back"),a(v[q]).addClass("front").show()));A=!0,setTimeout(function(){A=!1},300)}function h(){"horizontal"===x.direction?n>=m?u.removeClass("forward").addClass("backward"):m>n&&u.removeClass("backward").addClass("forward"):n>=m?u.removeClass("forward").addClass("backward"):m>n&&u.removeClass("backward").addClass("forward")}function i(){if("horizontal"===x.direction){if(n>=m&&0===q||m>=n&&q===r-1)return!0}else if(n>=m&&0===q||m>=n&&q===r-1)return!0;return!1}function j(){w.css({"-webkit-animation":"none",display:"none"}),a(".current [data-animation]").each(function(b,c){var d=a(c),e=d.attr("data-animation"),f=d.attr("data-duration")||500,g=d.attr("data-timing-function")||"ease",h=d.attr("data-delay")?d.attr("data-delay"):0;"followSlide"===e&&("horizontal"===x.direction&&"forward"===y?e="followSlideToLeft":"horizontal"===x.direction&&"backward"===y?e="followSlideToRight":"vertical"===x.direction&&"forward"===y?e="followSlideToTop":"vertical"===x.direction&&"backward"===y&&(e="followSlideToBottom")),d.css({display:"block","-webkit-animation-name":e,"-webkit-animation-duration":f+"ms","-webkit-animation-timing-function":"ease","-webkit-animation-timing-function":g,"-webkit-animation-delay":h+"ms","-webkit-animation-fill-mode":"both"})})}var k=a("body").width(),l=a("body").height();a.keyframe.define([{name:"slideToTop","0%":{transform:"translate3d(0, "+l+"px, 0)"},"100%":{transform:"translate3d(0, 0px, 0)"}}]),a.keyframe.define([{name:"slideToBottom","0%":{transform:"translate3d(0, -"+l+"px, 0)"},"100%":{transform:"translate3d(0, 0px, 0)"}}]),a.keyframe.define([{name:"slideToLeft","0%":{transform:"translate3d( "+k+"px,0px, 0)"},"100%":{transform:"translate3d(0, 0px, 0)"}}]),a.keyframe.define([{name:"slideToRight","0%":{transform:"translate3d( -"+k+"px,0px, 0)"},"100%":{transform:"translate3d(0, 0px, 0)"}}]),a.keyframe.define([{name:"followSlideToBottom","0%":{transform:"translate3d(0, -"+l+"px, 0)"},"100%":{transform:"translate3d(0, 0px, 0)"}}]),a.keyframe.define([{name:"followSlideToTop","0%":{transform:"translate3d(0, "+l+"px, 0);"},"100%":{transform:"translate3d(0, 0px, 0);"}}]);var m,n,o,p,q,r,s,t,u,v,w,x,y="forward",z=!1,A=!0;a.fn.parallax=function(c){return x=a.extend({},a.fn.parallax.defaults,c),this.each(function(){u=a(this),v=u.find(".page"),b()})},a.fn.parallax.defaults={direction:"vertical",swipeAnim:"default",drag:!0,loading:!1,indicator:!1,arrow:!1,onchange:function(){},orientationchange:function(){}},a(document).on("touchstart",".page",function(a){c(a.changedTouches[0])}).on("touchmove",".page",function(a){d(a.changedTouches[0])}).on("touchend",".page",function(a){e(a.changedTouches[0])}).on("webkitAnimationEnd webkitTransitionEnd",".pages",function(){"stay"!==y&&(setTimeout(function(){a(".back").hide().removeClass("back"),a(".front").show().removeClass("front"),u.removeClass("forward backward animate")},10),a(v.removeClass("current").get(q)).addClass("current"),x.onchange(q,v[q],y),j())}),a(".page *").on("webkitAnimationEnd",function(){event.stopPropagation()}),a(window).on("load",function(){if(x.loading&&(a(".parallax-loading").remove(),A=!1,a(v[q]).addClass("current"),x.onchange(q,v[q],y),j()),x.indicator){A=!1;var b="horizontal"===x.direction?"parallax-h-indicator":"parallax-v-indicator";a(".wrapper").append("<div class="+b+"></div>");for(var c="<ul>",d=1;r>=d;d++)c+=1===d?'<li class="current"></li>':"<li></li>";c+="</ul>",a("."+b).append(c)}x.arrow&&(v.append('<span class="parallax-arrow"></span>'),a(v[r-1]).find(".parallax-arrow").remove())}),window.addEventListener("onorientationchange"in window?"orientationchange":"resize",function(){(180===window.orientation||0===window.orientation)&&x.orientationchange("portrait"),(90===window.orientation||-90===window.orientation)&&x.orientationchange("landscape")},!1),window.slideTo=function(b){var c=a(window).height();q=b,y="forward",a(".pages").css({"-webkit-transition-duration":"0ms","transition-duration":"0ms"}),a(".pages").css({"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+c*b+")"}),a(v.removeClass("current").get(q)).addClass("current"),j(),setTimeout(function(){a(".pages").css({"-webkit-transition-duration":"400ms","transition-duration":"400ms"})},300)},window.moveTo=function(b){q=b;var c=a(window).height();a(".pages").css({"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+c*b+")"})}}(Zepto),(window.jQuery||window.Zepto)&&!function(a){a.fn.Swipe=function(b){return this.each(function(){a(this).data("Swipe",new Swipe(a(this)[0],b))})}}(window.jQuery||window.Zepto),!function(a){function b(a,b){e=a.pageY,j=b.height()+50,g=b.css("-webkit-transform").replace("matrix(","").replace(")","").split(","),g=parseInt(g[5])||0}function c(a,b){j=b.height()+50,h=i.css("-webkit-transform").replace("matrix(","").replace(")","").split(","),h=Math.abs(parseInt(h[5])||0),d=a.pageY,j>k&&e>d?(f=g+d-e,Math.abs(f)<j-k&&(event.preventDefault(),event.stopPropagation(),b.css("-webkit-transform","matrix(1, 0, 0, 1, 0, "+f+")"))):0>f&&d>=e&&(event.preventDefault(),event.stopPropagation(),f=g+d-e,b.css("-webkit-transform","matrix(1, 0, 0, 1, 0, "+f+")"))}a(".pages").parallax({direction:"vertical",swipeAnim:"default",drag:!0,loading:!1,indicator:!1,arrow:!1,onchange:function(b){(2!==b||3!==b||8!==b)&&a(".content").css("-webkit-transform","none")},orientationchange:function(){}}),window.sliderTo=function(){var b=a(window).height();a(".pages").css({"-webkit-transition-duration":"0ms","transition-duration":"0ms"}),a(".pages").css({"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+b*timeIndex+")"}),setTimeout(function(){a(".pages").css({"-webkit-transition-duration":"400ms","transition-duration":"400ms"})},300)},window.moveTo=function(){var b=a(window).height();a(".pages").css({"-webkit-transform":"matrix(1, 0, 0, 1, 0, -"+b*timeIndex+")"})};Swipe(document.getElementById("slider"),{auto:3e3,continuous:!0,callback:function(){}});a(".popback").on("touchend",function(){a(".guest-pop").addClass("hide")});var d,e,f,g,h,i=a(".pages"),j=0,k=a(window).height();a(".page-timeline").on("touchstart",".page",function(){b(event.changedTouches[0],a(this).find(a(".content")))}).on("touchmove",".page",function(){c(event.changedTouches[0],a(this).find(a(".content")))}),a(".page-speaker").on("touchstart",function(){b(event.changedTouches[0],a(this).find(a(".content")))}).on("touchmove",function(){c(event.changedTouches[0],a(this).find(a(".content")))}),a(".page-history").on("touchstart",function(){b(event.changedTouches[0],a(this).find(a(".content")))}).on("touchmove",function(){c(event.changedTouches[0],a(this).find(a(".content")))}),a("#btn-invite").tap(function(){return ISSENDER?(a(".m-weixinShareLayer").removeClass("hide"),!1):void(location.href=a(this).attr("href"))})}(Zepto),!function(a){function b(a){return a.preventDefault(),!1}function c(a){0==i.isTrigger&&ISSENDER&&3==a}function d(b,c){a.post(APP+"/Home/data/",b,function(b){return function(c){var c=JSON.parse(c);return e(ISSENDER?c.to:c.from),"success"==c.status?(clearInterval(i.interval),setTimeout(function(){f(c.status)},500),!0):"matched"==c.status?(f(c.status),clearInterval(i.interval),!1):"timeout"==c.status?(f(c.status),clearInterval(i.interval),!1):(i.isTrigger=!0,void("noyet"==c.status?i.isTrigger=!1:b&&!ISSENDER&&(i.timeRemain=c.timer,a(".count-down").html(i.timeRemain),i.isFirst=!1)))}}(c))}function e(a){ISSENDER?(g.eq(0).removeClass("on"),g.eq(1).removeClass("on"),1==a?g.eq(0).addClass("on"):2==a?g.eq(1).addClass("on"):3==a&&(g.eq(0).addClass("on"),g.eq(1).addClass("on"))):(g.eq(2).removeClass("on"),g.eq(3).removeClass("on"),1==a?g.eq(2).addClass("on"):2==a?g.eq(3).addClass("on"):3==a&&(g.eq(2).addClass("on"),g.eq(3).addClass("on")))}function f(b){i.isDone||(i.isDone=!0,"timeout"==b?alert("超时"):"matched"==b&&alert("已经匹配过"),a(".game-content").addClass("game-hide"),ISSENDER?a("#sender-success").addClass("success-show"):a("#helper-success").addClass("success-show"))}var g=a(".we-gamebox .fingerprint"),h=0;a(document).on("touchstart",".btn-fingerprint-left",function(){a(".pages").on("touchmove",b),ISSENDER?g.eq(2).addClass("on"):g.eq(0).addClass("on"),h+=1,c(h)}),a(document).on("touchend",".btn-fingerprint-left",function(){a(".pages").off("touchmove",b),ISSENDER?g.eq(2).removeClass("on"):g.eq(0).removeClass("on"),h-=1
}),a(document).on("touchstart",".btn-fingerprint-right",function(){a(".pages").on("touchmove",b),ISSENDER?g.eq(3).addClass("on"):g.eq(1).addClass("on"),h+=2,c(h)}),a(document).on("touchend",".btn-fingerprint-right",function(){a(".pages").off("touchmove",b),ISSENDER?g.eq(3).removeClass("on"):g.eq(1).removeClass("on"),h-=2});var i={isTrigger:!1,timeRemain:60,isFirst:!0,interval:null,isDone:!1},j={start:function(){i.interval=setInterval(function(){var b={isSender:ISSENDER,status:h,key:KEY,timer:i.timeRemain};i.isTrigger&&(i.timeRemain-1<=0?(i.timeRemain=0,f("timeout"),clearInterval(i.interval)):i.timeRemain--,a(".count-down").html(i.timeRemain)),d(b,i.isFirst)},1e3)}};ISSENDER||j.start(i.timeRemain),window.toGame=function(){var b=a(".pages .page").index(a(".page-game"));window.slideTo(b),a(".share-content").hide(),a(".game-content").css({display:"block"});var c={isSender:ISSENDER,status:h,key:KEY,timer:i.timeRemain};d(c,i.isFirst),i.isFirst=!1,j.start(i.timeRemain)}}(Zepto),!function(){function a(){WeixinJSBridge.invoke("sendAppMessage",{img_url:d,img_width:"640",img_height:"640",link:e,desc:g,title:h},function(a){_report("send_msg",a.err_msg)})}function b(){WeixinJSBridge.invoke("shareTimeline",{img_url:d,img_width:"640",img_height:"640",link:e,desc:g,title:h},function(a){_report("timeline",a.err_msg)})}function c(){var a=navigator.userAgent.toLowerCase();return"micromessenger"==a.match(/MicroMessenger/i)?!0:!1}var d="http://imgcache.qq.com/ac/www_tencent/we/2014/images/logo.png",e=APP;if(ISSENDER){var f="from_key="+KEY;f=0==window.location.search.indexOf("?")?"&"+f:"?"+f,e=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search+f+window.location.hash}var g="这里没有商业或者公司竞争,只有前沿的科学思想和最新技术，还有天马行空般的想象力。",h="we大会";c()||alert("请在微信中打开该页面"),document.addEventListener("WeixinJSBridgeReady",function(){WeixinJSBridge.on("menu:share:appmessage",function(){window.toGame(),a()}),WeixinJSBridge.on("menu:share:timeline",function(){window.toGame(),b()}),WeixinJSBridge.on("menu:share:weibo",function(){shareWeibo()})},!1)}(Zepto);