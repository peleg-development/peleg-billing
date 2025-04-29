(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();function O0(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Gu={exports:{}},Ti={},Ku={exports:{}},F={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qn=Symbol.for("react.element"),F0=Symbol.for("react.portal"),A0=Symbol.for("react.fragment"),H0=Symbol.for("react.strict_mode"),V0=Symbol.for("react.profiler"),U0=Symbol.for("react.provider"),W0=Symbol.for("react.context"),Q0=Symbol.for("react.forward_ref"),Y0=Symbol.for("react.suspense"),G0=Symbol.for("react.memo"),K0=Symbol.for("react.lazy"),Zs=Symbol.iterator;function J0(e){return e===null||typeof e!="object"?null:(e=Zs&&e[Zs]||e["@@iterator"],typeof e=="function"?e:null)}var Ju={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Xu=Object.assign,Zu={};function rn(e,t,r){this.props=e,this.context=t,this.refs=Zu,this.updater=r||Ju}rn.prototype.isReactComponent={};rn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};rn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function qu(){}qu.prototype=rn.prototype;function Xa(e,t,r){this.props=e,this.context=t,this.refs=Zu,this.updater=r||Ju}var Za=Xa.prototype=new qu;Za.constructor=Xa;Xu(Za,rn.prototype);Za.isPureReactComponent=!0;var qs=Array.isArray,ed=Object.prototype.hasOwnProperty,qa={current:null},td={key:!0,ref:!0,__self:!0,__source:!0};function rd(e,t,r){var n,o={},i=null,l=null;if(t!=null)for(n in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)ed.call(t,n)&&!td.hasOwnProperty(n)&&(o[n]=t[n]);var s=arguments.length-2;if(s===1)o.children=r;else if(1<s){for(var c=Array(s),p=0;p<s;p++)c[p]=arguments[p+2];o.children=c}if(e&&e.defaultProps)for(n in s=e.defaultProps,s)o[n]===void 0&&(o[n]=s[n]);return{$$typeof:qn,type:e,key:i,ref:l,props:o,_owner:qa.current}}function X0(e,t){return{$$typeof:qn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function es(e){return typeof e=="object"&&e!==null&&e.$$typeof===qn}function Z0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var ec=/\/+/g;function nl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Z0(""+e.key):t.toString(36)}function Io(e,t,r,n,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case qn:case F0:l=!0}}if(l)return l=e,o=o(l),e=n===""?"."+nl(l,0):n,qs(o)?(r="",e!=null&&(r=e.replace(ec,"$&/")+"/"),Io(o,t,r,"",function(p){return p})):o!=null&&(es(o)&&(o=X0(o,r+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(ec,"$&/")+"/")+e)),t.push(o)),1;if(l=0,n=n===""?".":n+":",qs(e))for(var s=0;s<e.length;s++){i=e[s];var c=n+nl(i,s);l+=Io(i,t,r,c,o)}else if(c=J0(e),typeof c=="function")for(e=c.call(e),s=0;!(i=e.next()).done;)i=i.value,c=n+nl(i,s++),l+=Io(i,t,r,c,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function lo(e,t,r){if(e==null)return e;var n=[],o=0;return Io(e,n,"","",function(i){return t.call(r,i,o++)}),n}function q0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var je={current:null},Do={transition:null},ep={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:Do,ReactCurrentOwner:qa};function nd(){throw Error("act(...) is not supported in production builds of React.")}F.Children={map:lo,forEach:function(e,t,r){lo(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return lo(e,function(){t++}),t},toArray:function(e){return lo(e,function(t){return t})||[]},only:function(e){if(!es(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};F.Component=rn;F.Fragment=A0;F.Profiler=V0;F.PureComponent=Xa;F.StrictMode=H0;F.Suspense=Y0;F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ep;F.act=nd;F.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Xu({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=qa.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(c in t)ed.call(t,c)&&!td.hasOwnProperty(c)&&(n[c]=t[c]===void 0&&s!==void 0?s[c]:t[c])}var c=arguments.length-2;if(c===1)n.children=r;else if(1<c){s=Array(c);for(var p=0;p<c;p++)s[p]=arguments[p+2];n.children=s}return{$$typeof:qn,type:e.type,key:o,ref:i,props:n,_owner:l}};F.createContext=function(e){return e={$$typeof:W0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:U0,_context:e},e.Consumer=e};F.createElement=rd;F.createFactory=function(e){var t=rd.bind(null,e);return t.type=e,t};F.createRef=function(){return{current:null}};F.forwardRef=function(e){return{$$typeof:Q0,render:e}};F.isValidElement=es;F.lazy=function(e){return{$$typeof:K0,_payload:{_status:-1,_result:e},_init:q0}};F.memo=function(e,t){return{$$typeof:G0,type:e,compare:t===void 0?null:t}};F.startTransition=function(e){var t=Do.transition;Do.transition={};try{e()}finally{Do.transition=t}};F.unstable_act=nd;F.useCallback=function(e,t){return je.current.useCallback(e,t)};F.useContext=function(e){return je.current.useContext(e)};F.useDebugValue=function(){};F.useDeferredValue=function(e){return je.current.useDeferredValue(e)};F.useEffect=function(e,t){return je.current.useEffect(e,t)};F.useId=function(){return je.current.useId()};F.useImperativeHandle=function(e,t,r){return je.current.useImperativeHandle(e,t,r)};F.useInsertionEffect=function(e,t){return je.current.useInsertionEffect(e,t)};F.useLayoutEffect=function(e,t){return je.current.useLayoutEffect(e,t)};F.useMemo=function(e,t){return je.current.useMemo(e,t)};F.useReducer=function(e,t,r){return je.current.useReducer(e,t,r)};F.useRef=function(e){return je.current.useRef(e)};F.useState=function(e){return je.current.useState(e)};F.useSyncExternalStore=function(e,t,r){return je.current.useSyncExternalStore(e,t,r)};F.useTransition=function(){return je.current.useTransition()};F.version="18.3.1";Ku.exports=F;var T=Ku.exports;const Ee=O0(T);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tp=T,rp=Symbol.for("react.element"),np=Symbol.for("react.fragment"),op=Object.prototype.hasOwnProperty,ip=tp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,lp={key:!0,ref:!0,__self:!0,__source:!0};function od(e,t,r){var n,o={},i=null,l=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(n in t)op.call(t,n)&&!lp.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:rp,type:e,key:i,ref:l,props:o,_owner:ip.current}}Ti.Fragment=np;Ti.jsx=od;Ti.jsxs=od;Gu.exports=Ti;var a=Gu.exports,Yl={},id={exports:{}},Fe={},ld={exports:{}},ad={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,_){var I=E.length;E.push(_);e:for(;0<I;){var W=I-1>>>1,Q=E[W];if(0<o(Q,_))E[W]=_,E[I]=Q,I=W;else break e}}function r(E){return E.length===0?null:E[0]}function n(E){if(E.length===0)return null;var _=E[0],I=E.pop();if(I!==_){E[0]=I;e:for(var W=0,Q=E.length,Xt=Q>>>1;W<Xt;){var Je=2*(W+1)-1,Pt=E[Je],_e=Je+1,mt=E[_e];if(0>o(Pt,I))_e<Q&&0>o(mt,Pt)?(E[W]=mt,E[_e]=I,W=_e):(E[W]=Pt,E[Je]=I,W=Je);else if(_e<Q&&0>o(mt,I))E[W]=mt,E[_e]=I,W=_e;else break e}}return _}function o(E,_){var I=E.sortIndex-_.sortIndex;return I!==0?I:E.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var l=Date,s=l.now();e.unstable_now=function(){return l.now()-s}}var c=[],p=[],y=1,w=null,f=3,x=!1,k=!1,j=!1,C=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function u(E){for(var _=r(p);_!==null;){if(_.callback===null)n(p);else if(_.startTime<=E)n(p),_.sortIndex=_.expirationTime,t(c,_);else break;_=r(p)}}function g(E){if(j=!1,u(E),!k)if(r(c)!==null)k=!0,M(S);else{var _=r(p);_!==null&&H(g,_.startTime-E)}}function S(E,_){k=!1,j&&(j=!1,h($),$=-1),x=!0;var I=f;try{for(u(_),w=r(c);w!==null&&(!(w.expirationTime>_)||E&&!oe());){var W=w.callback;if(typeof W=="function"){w.callback=null,f=w.priorityLevel;var Q=W(w.expirationTime<=_);_=e.unstable_now(),typeof Q=="function"?w.callback=Q:w===r(c)&&n(c),u(_)}else n(c);w=r(c)}if(w!==null)var Xt=!0;else{var Je=r(p);Je!==null&&H(g,Je.startTime-_),Xt=!1}return Xt}finally{w=null,f=I,x=!1}}var b=!1,v=null,$=-1,R=5,L=-1;function oe(){return!(e.unstable_now()-L<R)}function te(){if(v!==null){var E=e.unstable_now();L=E;var _=!0;try{_=v(!0,E)}finally{_?ue():(b=!1,v=null)}}else b=!1}var ue;if(typeof d=="function")ue=function(){d(te)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,P=B.port2;B.port1.onmessage=te,ue=function(){P.postMessage(null)}}else ue=function(){C(te,0)};function M(E){v=E,b||(b=!0,ue())}function H(E,_){$=C(function(){E(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){k||x||(k=!0,M(S))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return r(c)},e.unstable_next=function(E){switch(f){case 1:case 2:case 3:var _=3;break;default:_=f}var I=f;f=_;try{return E()}finally{f=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,_){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var I=f;f=E;try{return _()}finally{f=I}},e.unstable_scheduleCallback=function(E,_,I){var W=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?W+I:W):I=W,E){case 1:var Q=-1;break;case 2:Q=250;break;case 5:Q=1073741823;break;case 4:Q=1e4;break;default:Q=5e3}return Q=I+Q,E={id:y++,callback:_,priorityLevel:E,startTime:I,expirationTime:Q,sortIndex:-1},I>W?(E.sortIndex=I,t(p,E),r(c)===null&&E===r(p)&&(j?(h($),$=-1):j=!0,H(g,I-W))):(E.sortIndex=Q,t(c,E),k||x||(k=!0,M(S))),E},e.unstable_shouldYield=oe,e.unstable_wrapCallback=function(E){var _=f;return function(){var I=f;f=_;try{return E.apply(this,arguments)}finally{f=I}}}})(ad);ld.exports=ad;var ap=ld.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sp=T,Oe=ap;function z(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sd=new Set,Nn={};function mr(e,t){Vr(e,t),Vr(e+"Capture",t)}function Vr(e,t){for(Nn[e]=t,e=0;e<t.length;e++)sd.add(t[e])}var kt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Gl=Object.prototype.hasOwnProperty,cp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,tc={},rc={};function up(e){return Gl.call(rc,e)?!0:Gl.call(tc,e)?!1:cp.test(e)?rc[e]=!0:(tc[e]=!0,!1)}function dp(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function fp(e,t,r,n){if(t===null||typeof t>"u"||dp(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ce(e,t,r,n,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ve[e]=new Ce(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ve[t]=new Ce(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ve[e]=new Ce(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ve[e]=new Ce(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ve[e]=new Ce(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ve[e]=new Ce(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ve[e]=new Ce(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ve[e]=new Ce(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ve[e]=new Ce(e,5,!1,e.toLowerCase(),null,!1,!1)});var ts=/[\-:]([a-z])/g;function rs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ts,rs);ve[t]=new Ce(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ts,rs);ve[t]=new Ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ts,rs);ve[t]=new Ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ve[e]=new Ce(e,1,!1,e.toLowerCase(),null,!1,!1)});ve.xlinkHref=new Ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ve[e]=new Ce(e,1,!1,e.toLowerCase(),null,!0,!0)});function ns(e,t,r,n){var o=ve.hasOwnProperty(t)?ve[t]:null;(o!==null?o.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(fp(t,r,o,n)&&(r=null),n||o===null?up(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):o.mustUseProperty?e[o.propertyName]=r===null?o.type===3?!1:"":r:(t=o.attributeName,n=o.attributeNamespace,r===null?e.removeAttribute(t):(o=o.type,r=o===3||o===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var zt=sp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ao=Symbol.for("react.element"),jr=Symbol.for("react.portal"),Cr=Symbol.for("react.fragment"),os=Symbol.for("react.strict_mode"),Kl=Symbol.for("react.profiler"),cd=Symbol.for("react.provider"),ud=Symbol.for("react.context"),is=Symbol.for("react.forward_ref"),Jl=Symbol.for("react.suspense"),Xl=Symbol.for("react.suspense_list"),ls=Symbol.for("react.memo"),Nt=Symbol.for("react.lazy"),dd=Symbol.for("react.offscreen"),nc=Symbol.iterator;function sn(e){return e===null||typeof e!="object"?null:(e=nc&&e[nc]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Object.assign,ol;function vn(e){if(ol===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);ol=t&&t[1]||""}return`
`+ol+e}var il=!1;function ll(e,t){if(!e||il)return"";il=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var n=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){n=p}e.call(t.prototype)}else{try{throw Error()}catch(p){n=p}e()}}catch(p){if(p&&n&&typeof p.stack=="string"){for(var o=p.stack.split(`
`),i=n.stack.split(`
`),l=o.length-1,s=i.length-1;1<=l&&0<=s&&o[l]!==i[s];)s--;for(;1<=l&&0<=s;l--,s--)if(o[l]!==i[s]){if(l!==1||s!==1)do if(l--,s--,0>s||o[l]!==i[s]){var c=`
`+o[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=s);break}}}finally{il=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?vn(e):""}function pp(e){switch(e.tag){case 5:return vn(e.type);case 16:return vn("Lazy");case 13:return vn("Suspense");case 19:return vn("SuspenseList");case 0:case 2:case 15:return e=ll(e.type,!1),e;case 11:return e=ll(e.type.render,!1),e;case 1:return e=ll(e.type,!0),e;default:return""}}function Zl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Cr:return"Fragment";case jr:return"Portal";case Kl:return"Profiler";case os:return"StrictMode";case Jl:return"Suspense";case Xl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ud:return(e.displayName||"Context")+".Consumer";case cd:return(e._context.displayName||"Context")+".Provider";case is:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ls:return t=e.displayName||null,t!==null?t:Zl(e.type)||"Memo";case Nt:t=e._payload,e=e._init;try{return Zl(e(t))}catch{}}return null}function hp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Zl(t);case 8:return t===os?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Qt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function mp(e){var t=fd(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){n=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(l){n=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function so(e){e._valueTracker||(e._valueTracker=mp(e))}function pd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=fd(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function ri(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ql(e,t){var r=t.checked;return ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function oc(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=Qt(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function hd(e,t){t=t.checked,t!=null&&ns(e,"checked",t,!1)}function ea(e,t){hd(e,t);var r=Qt(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ta(e,t.type,r):t.hasOwnProperty("defaultValue")&&ta(e,t.type,Qt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ic(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function ta(e,t,r){(t!=="number"||ri(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var yn=Array.isArray;function Ir(e,t,r,n){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&n&&(e[r].defaultSelected=!0)}else{for(r=""+Qt(r),t=null,o=0;o<e.length;o++){if(e[o].value===r){e[o].selected=!0,n&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function ra(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(z(91));return ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function lc(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(z(92));if(yn(r)){if(1<r.length)throw Error(z(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Qt(r)}}function md(e,t){var r=Qt(t.value),n=Qt(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function ac(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function na(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var co,vd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,o){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(co=co||document.createElement("div"),co.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=co.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Tn(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var bn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gp=["Webkit","ms","Moz","O"];Object.keys(bn).forEach(function(e){gp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),bn[t]=bn[e]})});function yd(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||bn.hasOwnProperty(e)&&bn[e]?(""+t).trim():t+"px"}function xd(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,o=yd(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,o):e[r]=o}}var vp=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function oa(e,t){if(t){if(vp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(z(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(z(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(z(61))}if(t.style!=null&&typeof t.style!="object")throw Error(z(62))}}function ia(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var la=null;function as(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var aa=null,Dr=null,Or=null;function sc(e){if(e=ro(e)){if(typeof aa!="function")throw Error(z(280));var t=e.stateNode;t&&(t=Di(t),aa(e.stateNode,e.type,t))}}function wd(e){Dr?Or?Or.push(e):Or=[e]:Dr=e}function Sd(){if(Dr){var e=Dr,t=Or;if(Or=Dr=null,sc(e),t)for(e=0;e<t.length;e++)sc(t[e])}}function bd(e,t){return e(t)}function kd(){}var al=!1;function jd(e,t,r){if(al)return e(t,r);al=!0;try{return bd(e,t,r)}finally{al=!1,(Dr!==null||Or!==null)&&(kd(),Sd())}}function _n(e,t){var r=e.stateNode;if(r===null)return null;var n=Di(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(z(231,t,typeof r));return r}var sa=!1;if(kt)try{var cn={};Object.defineProperty(cn,"passive",{get:function(){sa=!0}}),window.addEventListener("test",cn,cn),window.removeEventListener("test",cn,cn)}catch{sa=!1}function yp(e,t,r,n,o,i,l,s,c){var p=Array.prototype.slice.call(arguments,3);try{t.apply(r,p)}catch(y){this.onError(y)}}var kn=!1,ni=null,oi=!1,ca=null,xp={onError:function(e){kn=!0,ni=e}};function wp(e,t,r,n,o,i,l,s,c){kn=!1,ni=null,yp.apply(xp,arguments)}function Sp(e,t,r,n,o,i,l,s,c){if(wp.apply(this,arguments),kn){if(kn){var p=ni;kn=!1,ni=null}else throw Error(z(198));oi||(oi=!0,ca=p)}}function gr(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Cd(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cc(e){if(gr(e)!==e)throw Error(z(188))}function bp(e){var t=e.alternate;if(!t){if(t=gr(e),t===null)throw Error(z(188));return t!==e?null:e}for(var r=e,n=t;;){var o=r.return;if(o===null)break;var i=o.alternate;if(i===null){if(n=o.return,n!==null){r=n;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===r)return cc(o),e;if(i===n)return cc(o),t;i=i.sibling}throw Error(z(188))}if(r.return!==n.return)r=o,n=i;else{for(var l=!1,s=o.child;s;){if(s===r){l=!0,r=o,n=i;break}if(s===n){l=!0,n=o,r=i;break}s=s.sibling}if(!l){for(s=i.child;s;){if(s===r){l=!0,r=i,n=o;break}if(s===n){l=!0,n=i,r=o;break}s=s.sibling}if(!l)throw Error(z(189))}}if(r.alternate!==n)throw Error(z(190))}if(r.tag!==3)throw Error(z(188));return r.stateNode.current===r?e:t}function $d(e){return e=bp(e),e!==null?zd(e):null}function zd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=zd(e);if(t!==null)return t;e=e.sibling}return null}var Pd=Oe.unstable_scheduleCallback,uc=Oe.unstable_cancelCallback,kp=Oe.unstable_shouldYield,jp=Oe.unstable_requestPaint,ne=Oe.unstable_now,Cp=Oe.unstable_getCurrentPriorityLevel,ss=Oe.unstable_ImmediatePriority,Ed=Oe.unstable_UserBlockingPriority,ii=Oe.unstable_NormalPriority,$p=Oe.unstable_LowPriority,Bd=Oe.unstable_IdlePriority,_i=null,pt=null;function zp(e){if(pt&&typeof pt.onCommitFiberRoot=="function")try{pt.onCommitFiberRoot(_i,e,void 0,(e.current.flags&128)===128)}catch{}}var tt=Math.clz32?Math.clz32:Bp,Pp=Math.log,Ep=Math.LN2;function Bp(e){return e>>>=0,e===0?32:31-(Pp(e)/Ep|0)|0}var uo=64,fo=4194304;function xn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function li(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,o=e.suspendedLanes,i=e.pingedLanes,l=r&268435455;if(l!==0){var s=l&~o;s!==0?n=xn(s):(i&=l,i!==0&&(n=xn(i)))}else l=r&~o,l!==0?n=xn(l):i!==0&&(n=xn(i));if(n===0)return 0;if(t!==0&&t!==n&&!(t&o)&&(o=n&-n,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-tt(t),o=1<<r,n|=e[r],t&=~o;return n}function Lp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Np(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-tt(i),s=1<<l,c=o[l];c===-1?(!(s&r)||s&n)&&(o[l]=Lp(s,t)):c<=t&&(e.expiredLanes|=s),i&=~s}}function ua(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ld(){var e=uo;return uo<<=1,!(uo&4194240)&&(uo=64),e}function sl(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function eo(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-tt(t),e[t]=r}function Tp(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var o=31-tt(r),i=1<<o;t[o]=0,n[o]=-1,e[o]=-1,r&=~i}}function cs(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-tt(r),o=1<<n;o&t|e[n]&t&&(e[n]|=t),r&=~o}}var U=0;function Nd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Td,us,_d,Md,Rd,da=!1,po=[],Dt=null,Ot=null,Ft=null,Mn=new Map,Rn=new Map,_t=[],_p="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dc(e,t){switch(e){case"focusin":case"focusout":Dt=null;break;case"dragenter":case"dragleave":Ot=null;break;case"mouseover":case"mouseout":Ft=null;break;case"pointerover":case"pointerout":Mn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Rn.delete(t.pointerId)}}function un(e,t,r,n,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[o]},t!==null&&(t=ro(t),t!==null&&us(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Mp(e,t,r,n,o){switch(t){case"focusin":return Dt=un(Dt,e,t,r,n,o),!0;case"dragenter":return Ot=un(Ot,e,t,r,n,o),!0;case"mouseover":return Ft=un(Ft,e,t,r,n,o),!0;case"pointerover":var i=o.pointerId;return Mn.set(i,un(Mn.get(i)||null,e,t,r,n,o)),!0;case"gotpointercapture":return i=o.pointerId,Rn.set(i,un(Rn.get(i)||null,e,t,r,n,o)),!0}return!1}function Id(e){var t=tr(e.target);if(t!==null){var r=gr(t);if(r!==null){if(t=r.tag,t===13){if(t=Cd(r),t!==null){e.blockedOn=t,Rd(e.priority,function(){_d(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Oo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=fa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);la=n,r.target.dispatchEvent(n),la=null}else return t=ro(r),t!==null&&us(t),e.blockedOn=r,!1;t.shift()}return!0}function fc(e,t,r){Oo(e)&&r.delete(t)}function Rp(){da=!1,Dt!==null&&Oo(Dt)&&(Dt=null),Ot!==null&&Oo(Ot)&&(Ot=null),Ft!==null&&Oo(Ft)&&(Ft=null),Mn.forEach(fc),Rn.forEach(fc)}function dn(e,t){e.blockedOn===t&&(e.blockedOn=null,da||(da=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,Rp)))}function In(e){function t(o){return dn(o,e)}if(0<po.length){dn(po[0],e);for(var r=1;r<po.length;r++){var n=po[r];n.blockedOn===e&&(n.blockedOn=null)}}for(Dt!==null&&dn(Dt,e),Ot!==null&&dn(Ot,e),Ft!==null&&dn(Ft,e),Mn.forEach(t),Rn.forEach(t),r=0;r<_t.length;r++)n=_t[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<_t.length&&(r=_t[0],r.blockedOn===null);)Id(r),r.blockedOn===null&&_t.shift()}var Fr=zt.ReactCurrentBatchConfig,ai=!0;function Ip(e,t,r,n){var o=U,i=Fr.transition;Fr.transition=null;try{U=1,ds(e,t,r,n)}finally{U=o,Fr.transition=i}}function Dp(e,t,r,n){var o=U,i=Fr.transition;Fr.transition=null;try{U=4,ds(e,t,r,n)}finally{U=o,Fr.transition=i}}function ds(e,t,r,n){if(ai){var o=fa(e,t,r,n);if(o===null)yl(e,t,n,si,r),dc(e,n);else if(Mp(o,e,t,r,n))n.stopPropagation();else if(dc(e,n),t&4&&-1<_p.indexOf(e)){for(;o!==null;){var i=ro(o);if(i!==null&&Td(i),i=fa(e,t,r,n),i===null&&yl(e,t,n,si,r),i===o)break;o=i}o!==null&&n.stopPropagation()}else yl(e,t,n,null,r)}}var si=null;function fa(e,t,r,n){if(si=null,e=as(n),e=tr(e),e!==null)if(t=gr(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Cd(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return si=e,null}function Dd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Cp()){case ss:return 1;case Ed:return 4;case ii:case $p:return 16;case Bd:return 536870912;default:return 16}default:return 16}}var Rt=null,fs=null,Fo=null;function Od(){if(Fo)return Fo;var e,t=fs,r=t.length,n,o="value"in Rt?Rt.value:Rt.textContent,i=o.length;for(e=0;e<r&&t[e]===o[e];e++);var l=r-e;for(n=1;n<=l&&t[r-n]===o[i-n];n++);return Fo=o.slice(e,1<n?1-n:void 0)}function Ao(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ho(){return!0}function pc(){return!1}function Ae(e){function t(r,n,o,i,l){this._reactName=r,this._targetInst=o,this.type=n,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(r=e[s],this[s]=r?r(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ho:pc,this.isPropagationStopped=pc,this}return ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ho)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ho)},persist:function(){},isPersistent:ho}),t}var nn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ps=Ae(nn),to=ee({},nn,{view:0,detail:0}),Op=Ae(to),cl,ul,fn,Mi=ee({},to,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fn&&(fn&&e.type==="mousemove"?(cl=e.screenX-fn.screenX,ul=e.screenY-fn.screenY):ul=cl=0,fn=e),cl)},movementY:function(e){return"movementY"in e?e.movementY:ul}}),hc=Ae(Mi),Fp=ee({},Mi,{dataTransfer:0}),Ap=Ae(Fp),Hp=ee({},to,{relatedTarget:0}),dl=Ae(Hp),Vp=ee({},nn,{animationName:0,elapsedTime:0,pseudoElement:0}),Up=Ae(Vp),Wp=ee({},nn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Qp=Ae(Wp),Yp=ee({},nn,{data:0}),mc=Ae(Yp),Gp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Kp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Jp[e])?!!t[e]:!1}function hs(){return Xp}var Zp=ee({},to,{key:function(e){if(e.key){var t=Gp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ao(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Kp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hs,charCode:function(e){return e.type==="keypress"?Ao(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ao(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qp=Ae(Zp),e1=ee({},Mi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gc=Ae(e1),t1=ee({},to,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hs}),r1=Ae(t1),n1=ee({},nn,{propertyName:0,elapsedTime:0,pseudoElement:0}),o1=Ae(n1),i1=ee({},Mi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),l1=Ae(i1),a1=[9,13,27,32],ms=kt&&"CompositionEvent"in window,jn=null;kt&&"documentMode"in document&&(jn=document.documentMode);var s1=kt&&"TextEvent"in window&&!jn,Fd=kt&&(!ms||jn&&8<jn&&11>=jn),vc=" ",yc=!1;function Ad(e,t){switch(e){case"keyup":return a1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var $r=!1;function c1(e,t){switch(e){case"compositionend":return Hd(t);case"keypress":return t.which!==32?null:(yc=!0,vc);case"textInput":return e=t.data,e===vc&&yc?null:e;default:return null}}function u1(e,t){if($r)return e==="compositionend"||!ms&&Ad(e,t)?(e=Od(),Fo=fs=Rt=null,$r=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Fd&&t.locale!=="ko"?null:t.data;default:return null}}var d1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!d1[e.type]:t==="textarea"}function Vd(e,t,r,n){wd(n),t=ci(t,"onChange"),0<t.length&&(r=new ps("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Cn=null,Dn=null;function f1(e){ef(e,0)}function Ri(e){var t=Er(e);if(pd(t))return e}function p1(e,t){if(e==="change")return t}var Ud=!1;if(kt){var fl;if(kt){var pl="oninput"in document;if(!pl){var wc=document.createElement("div");wc.setAttribute("oninput","return;"),pl=typeof wc.oninput=="function"}fl=pl}else fl=!1;Ud=fl&&(!document.documentMode||9<document.documentMode)}function Sc(){Cn&&(Cn.detachEvent("onpropertychange",Wd),Dn=Cn=null)}function Wd(e){if(e.propertyName==="value"&&Ri(Dn)){var t=[];Vd(t,Dn,e,as(e)),jd(f1,t)}}function h1(e,t,r){e==="focusin"?(Sc(),Cn=t,Dn=r,Cn.attachEvent("onpropertychange",Wd)):e==="focusout"&&Sc()}function m1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ri(Dn)}function g1(e,t){if(e==="click")return Ri(t)}function v1(e,t){if(e==="input"||e==="change")return Ri(t)}function y1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ot=typeof Object.is=="function"?Object.is:y1;function On(e,t){if(ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var o=r[n];if(!Gl.call(t,o)||!ot(e[o],t[o]))return!1}return!0}function bc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function kc(e,t){var r=bc(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=bc(r)}}function Qd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yd(){for(var e=window,t=ri();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=ri(e.document)}return t}function gs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function x1(e){var t=Yd(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Qd(r.ownerDocument.documentElement,r)){if(n!==null&&gs(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=r.textContent.length,i=Math.min(n.start,o);n=n.end===void 0?i:Math.min(n.end,o),!e.extend&&i>n&&(o=n,n=i,i=o),o=kc(r,i);var l=kc(r,n);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>n?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var w1=kt&&"documentMode"in document&&11>=document.documentMode,zr=null,pa=null,$n=null,ha=!1;function jc(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;ha||zr==null||zr!==ri(n)||(n=zr,"selectionStart"in n&&gs(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),$n&&On($n,n)||($n=n,n=ci(pa,"onSelect"),0<n.length&&(t=new ps("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=zr)))}function mo(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Pr={animationend:mo("Animation","AnimationEnd"),animationiteration:mo("Animation","AnimationIteration"),animationstart:mo("Animation","AnimationStart"),transitionend:mo("Transition","TransitionEnd")},hl={},Gd={};kt&&(Gd=document.createElement("div").style,"AnimationEvent"in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),"TransitionEvent"in window||delete Pr.transitionend.transition);function Ii(e){if(hl[e])return hl[e];if(!Pr[e])return e;var t=Pr[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Gd)return hl[e]=t[r];return e}var Kd=Ii("animationend"),Jd=Ii("animationiteration"),Xd=Ii("animationstart"),Zd=Ii("transitionend"),qd=new Map,Cc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Gt(e,t){qd.set(e,t),mr(t,[e])}for(var ml=0;ml<Cc.length;ml++){var gl=Cc[ml],S1=gl.toLowerCase(),b1=gl[0].toUpperCase()+gl.slice(1);Gt(S1,"on"+b1)}Gt(Kd,"onAnimationEnd");Gt(Jd,"onAnimationIteration");Gt(Xd,"onAnimationStart");Gt("dblclick","onDoubleClick");Gt("focusin","onFocus");Gt("focusout","onBlur");Gt(Zd,"onTransitionEnd");Vr("onMouseEnter",["mouseout","mouseover"]);Vr("onMouseLeave",["mouseout","mouseover"]);Vr("onPointerEnter",["pointerout","pointerover"]);Vr("onPointerLeave",["pointerout","pointerover"]);mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),k1=new Set("cancel close invalid load scroll toggle".split(" ").concat(wn));function $c(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,Sp(n,t,void 0,e),e.currentTarget=null}function ef(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],o=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var l=n.length-1;0<=l;l--){var s=n[l],c=s.instance,p=s.currentTarget;if(s=s.listener,c!==i&&o.isPropagationStopped())break e;$c(o,s,p),i=c}else for(l=0;l<n.length;l++){if(s=n[l],c=s.instance,p=s.currentTarget,s=s.listener,c!==i&&o.isPropagationStopped())break e;$c(o,s,p),i=c}}}if(oi)throw e=ca,oi=!1,ca=null,e}function G(e,t){var r=t[xa];r===void 0&&(r=t[xa]=new Set);var n=e+"__bubble";r.has(n)||(tf(t,e,2,!1),r.add(n))}function vl(e,t,r){var n=0;t&&(n|=4),tf(r,e,n,t)}var go="_reactListening"+Math.random().toString(36).slice(2);function Fn(e){if(!e[go]){e[go]=!0,sd.forEach(function(r){r!=="selectionchange"&&(k1.has(r)||vl(r,!1,e),vl(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[go]||(t[go]=!0,vl("selectionchange",!1,t))}}function tf(e,t,r,n){switch(Dd(t)){case 1:var o=Ip;break;case 4:o=Dp;break;default:o=ds}r=o.bind(null,t,r,e),o=void 0,!sa||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),n?o!==void 0?e.addEventListener(t,r,{capture:!0,passive:o}):e.addEventListener(t,r,!0):o!==void 0?e.addEventListener(t,r,{passive:o}):e.addEventListener(t,r,!1)}function yl(e,t,r,n,o){var i=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var l=n.tag;if(l===3||l===4){var s=n.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(l===4)for(l=n.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===o||c.nodeType===8&&c.parentNode===o))return;l=l.return}for(;s!==null;){if(l=tr(s),l===null)return;if(c=l.tag,c===5||c===6){n=i=l;continue e}s=s.parentNode}}n=n.return}jd(function(){var p=i,y=as(r),w=[];e:{var f=qd.get(e);if(f!==void 0){var x=ps,k=e;switch(e){case"keypress":if(Ao(r)===0)break e;case"keydown":case"keyup":x=qp;break;case"focusin":k="focus",x=dl;break;case"focusout":k="blur",x=dl;break;case"beforeblur":case"afterblur":x=dl;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=hc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Ap;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=r1;break;case Kd:case Jd:case Xd:x=Up;break;case Zd:x=o1;break;case"scroll":x=Op;break;case"wheel":x=l1;break;case"copy":case"cut":case"paste":x=Qp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=gc}var j=(t&4)!==0,C=!j&&e==="scroll",h=j?f!==null?f+"Capture":null:f;j=[];for(var d=p,u;d!==null;){u=d;var g=u.stateNode;if(u.tag===5&&g!==null&&(u=g,h!==null&&(g=_n(d,h),g!=null&&j.push(An(d,g,u)))),C)break;d=d.return}0<j.length&&(f=new x(f,k,null,r,y),w.push({event:f,listeners:j}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",f&&r!==la&&(k=r.relatedTarget||r.fromElement)&&(tr(k)||k[jt]))break e;if((x||f)&&(f=y.window===y?y:(f=y.ownerDocument)?f.defaultView||f.parentWindow:window,x?(k=r.relatedTarget||r.toElement,x=p,k=k?tr(k):null,k!==null&&(C=gr(k),k!==C||k.tag!==5&&k.tag!==6)&&(k=null)):(x=null,k=p),x!==k)){if(j=hc,g="onMouseLeave",h="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(j=gc,g="onPointerLeave",h="onPointerEnter",d="pointer"),C=x==null?f:Er(x),u=k==null?f:Er(k),f=new j(g,d+"leave",x,r,y),f.target=C,f.relatedTarget=u,g=null,tr(y)===p&&(j=new j(h,d+"enter",k,r,y),j.target=u,j.relatedTarget=C,g=j),C=g,x&&k)t:{for(j=x,h=k,d=0,u=j;u;u=vr(u))d++;for(u=0,g=h;g;g=vr(g))u++;for(;0<d-u;)j=vr(j),d--;for(;0<u-d;)h=vr(h),u--;for(;d--;){if(j===h||h!==null&&j===h.alternate)break t;j=vr(j),h=vr(h)}j=null}else j=null;x!==null&&zc(w,f,x,j,!1),k!==null&&C!==null&&zc(w,C,k,j,!0)}}e:{if(f=p?Er(p):window,x=f.nodeName&&f.nodeName.toLowerCase(),x==="select"||x==="input"&&f.type==="file")var S=p1;else if(xc(f))if(Ud)S=v1;else{S=m1;var b=h1}else(x=f.nodeName)&&x.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(S=g1);if(S&&(S=S(e,p))){Vd(w,S,r,y);break e}b&&b(e,f,p),e==="focusout"&&(b=f._wrapperState)&&b.controlled&&f.type==="number"&&ta(f,"number",f.value)}switch(b=p?Er(p):window,e){case"focusin":(xc(b)||b.contentEditable==="true")&&(zr=b,pa=p,$n=null);break;case"focusout":$n=pa=zr=null;break;case"mousedown":ha=!0;break;case"contextmenu":case"mouseup":case"dragend":ha=!1,jc(w,r,y);break;case"selectionchange":if(w1)break;case"keydown":case"keyup":jc(w,r,y)}var v;if(ms)e:{switch(e){case"compositionstart":var $="onCompositionStart";break e;case"compositionend":$="onCompositionEnd";break e;case"compositionupdate":$="onCompositionUpdate";break e}$=void 0}else $r?Ad(e,r)&&($="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&($="onCompositionStart");$&&(Fd&&r.locale!=="ko"&&($r||$!=="onCompositionStart"?$==="onCompositionEnd"&&$r&&(v=Od()):(Rt=y,fs="value"in Rt?Rt.value:Rt.textContent,$r=!0)),b=ci(p,$),0<b.length&&($=new mc($,e,null,r,y),w.push({event:$,listeners:b}),v?$.data=v:(v=Hd(r),v!==null&&($.data=v)))),(v=s1?c1(e,r):u1(e,r))&&(p=ci(p,"onBeforeInput"),0<p.length&&(y=new mc("onBeforeInput","beforeinput",null,r,y),w.push({event:y,listeners:p}),y.data=v))}ef(w,t)})}function An(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ci(e,t){for(var r=t+"Capture",n=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=_n(e,r),i!=null&&n.unshift(An(e,i,o)),i=_n(e,t),i!=null&&n.push(An(e,i,o))),e=e.return}return n}function vr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function zc(e,t,r,n,o){for(var i=t._reactName,l=[];r!==null&&r!==n;){var s=r,c=s.alternate,p=s.stateNode;if(c!==null&&c===n)break;s.tag===5&&p!==null&&(s=p,o?(c=_n(r,i),c!=null&&l.unshift(An(r,c,s))):o||(c=_n(r,i),c!=null&&l.push(An(r,c,s)))),r=r.return}l.length!==0&&e.push({event:t,listeners:l})}var j1=/\r\n?/g,C1=/\u0000|\uFFFD/g;function Pc(e){return(typeof e=="string"?e:""+e).replace(j1,`
`).replace(C1,"")}function vo(e,t,r){if(t=Pc(t),Pc(e)!==t&&r)throw Error(z(425))}function ui(){}var ma=null,ga=null;function va(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ya=typeof setTimeout=="function"?setTimeout:void 0,$1=typeof clearTimeout=="function"?clearTimeout:void 0,Ec=typeof Promise=="function"?Promise:void 0,z1=typeof queueMicrotask=="function"?queueMicrotask:typeof Ec<"u"?function(e){return Ec.resolve(null).then(e).catch(P1)}:ya;function P1(e){setTimeout(function(){throw e})}function xl(e,t){var r=t,n=0;do{var o=r.nextSibling;if(e.removeChild(r),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(n===0){e.removeChild(o),In(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=o}while(r);In(t)}function At(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Bc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var on=Math.random().toString(36).slice(2),dt="__reactFiber$"+on,Hn="__reactProps$"+on,jt="__reactContainer$"+on,xa="__reactEvents$"+on,E1="__reactListeners$"+on,B1="__reactHandles$"+on;function tr(e){var t=e[dt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[jt]||r[dt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Bc(e);e!==null;){if(r=e[dt])return r;e=Bc(e)}return t}e=r,r=e.parentNode}return null}function ro(e){return e=e[dt]||e[jt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Er(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(z(33))}function Di(e){return e[Hn]||null}var wa=[],Br=-1;function Kt(e){return{current:e}}function J(e){0>Br||(e.current=wa[Br],wa[Br]=null,Br--)}function Y(e,t){Br++,wa[Br]=e.current,e.current=t}var Yt={},Se=Kt(Yt),Be=Kt(!1),ur=Yt;function Ur(e,t){var r=e.type.contextTypes;if(!r)return Yt;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in r)o[i]=t[i];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Le(e){return e=e.childContextTypes,e!=null}function di(){J(Be),J(Se)}function Lc(e,t,r){if(Se.current!==Yt)throw Error(z(168));Y(Se,t),Y(Be,r)}function rf(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var o in n)if(!(o in t))throw Error(z(108,hp(e)||"Unknown",o));return ee({},r,n)}function fi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Yt,ur=Se.current,Y(Se,e),Y(Be,Be.current),!0}function Nc(e,t,r){var n=e.stateNode;if(!n)throw Error(z(169));r?(e=rf(e,t,ur),n.__reactInternalMemoizedMergedChildContext=e,J(Be),J(Se),Y(Se,e)):J(Be),Y(Be,r)}var yt=null,Oi=!1,wl=!1;function nf(e){yt===null?yt=[e]:yt.push(e)}function L1(e){Oi=!0,nf(e)}function Jt(){if(!wl&&yt!==null){wl=!0;var e=0,t=U;try{var r=yt;for(U=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}yt=null,Oi=!1}catch(o){throw yt!==null&&(yt=yt.slice(e+1)),Pd(ss,Jt),o}finally{U=t,wl=!1}}return null}var Lr=[],Nr=0,pi=null,hi=0,Ve=[],Ue=0,dr=null,xt=1,wt="";function qt(e,t){Lr[Nr++]=hi,Lr[Nr++]=pi,pi=e,hi=t}function of(e,t,r){Ve[Ue++]=xt,Ve[Ue++]=wt,Ve[Ue++]=dr,dr=e;var n=xt;e=wt;var o=32-tt(n)-1;n&=~(1<<o),r+=1;var i=32-tt(t)+o;if(30<i){var l=o-o%5;i=(n&(1<<l)-1).toString(32),n>>=l,o-=l,xt=1<<32-tt(t)+o|r<<o|n,wt=i+e}else xt=1<<i|r<<o|n,wt=e}function vs(e){e.return!==null&&(qt(e,1),of(e,1,0))}function ys(e){for(;e===pi;)pi=Lr[--Nr],Lr[Nr]=null,hi=Lr[--Nr],Lr[Nr]=null;for(;e===dr;)dr=Ve[--Ue],Ve[Ue]=null,wt=Ve[--Ue],Ve[Ue]=null,xt=Ve[--Ue],Ve[Ue]=null}var De=null,Ie=null,X=!1,et=null;function lf(e,t){var r=We(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Tc(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,De=e,Ie=At(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,De=e,Ie=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=dr!==null?{id:xt,overflow:wt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=We(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,De=e,Ie=null,!0):!1;default:return!1}}function Sa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ba(e){if(X){var t=Ie;if(t){var r=t;if(!Tc(e,t)){if(Sa(e))throw Error(z(418));t=At(r.nextSibling);var n=De;t&&Tc(e,t)?lf(n,r):(e.flags=e.flags&-4097|2,X=!1,De=e)}}else{if(Sa(e))throw Error(z(418));e.flags=e.flags&-4097|2,X=!1,De=e}}}function _c(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function yo(e){if(e!==De)return!1;if(!X)return _c(e),X=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!va(e.type,e.memoizedProps)),t&&(t=Ie)){if(Sa(e))throw af(),Error(z(418));for(;t;)lf(e,t),t=At(t.nextSibling)}if(_c(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(z(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Ie=At(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Ie=null}}else Ie=De?At(e.stateNode.nextSibling):null;return!0}function af(){for(var e=Ie;e;)e=At(e.nextSibling)}function Wr(){Ie=De=null,X=!1}function xs(e){et===null?et=[e]:et.push(e)}var N1=zt.ReactCurrentBatchConfig;function pn(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(z(309));var n=r.stateNode}if(!n)throw Error(z(147,e));var o=n,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var s=o.refs;l===null?delete s[i]:s[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(z(284));if(!r._owner)throw Error(z(290,e))}return e}function xo(e,t){throw e=Object.prototype.toString.call(t),Error(z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Mc(e){var t=e._init;return t(e._payload)}function sf(e){function t(h,d){if(e){var u=h.deletions;u===null?(h.deletions=[d],h.flags|=16):u.push(d)}}function r(h,d){if(!e)return null;for(;d!==null;)t(h,d),d=d.sibling;return null}function n(h,d){for(h=new Map;d!==null;)d.key!==null?h.set(d.key,d):h.set(d.index,d),d=d.sibling;return h}function o(h,d){return h=Wt(h,d),h.index=0,h.sibling=null,h}function i(h,d,u){return h.index=u,e?(u=h.alternate,u!==null?(u=u.index,u<d?(h.flags|=2,d):u):(h.flags|=2,d)):(h.flags|=1048576,d)}function l(h){return e&&h.alternate===null&&(h.flags|=2),h}function s(h,d,u,g){return d===null||d.tag!==6?(d=zl(u,h.mode,g),d.return=h,d):(d=o(d,u),d.return=h,d)}function c(h,d,u,g){var S=u.type;return S===Cr?y(h,d,u.props.children,g,u.key):d!==null&&(d.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Nt&&Mc(S)===d.type)?(g=o(d,u.props),g.ref=pn(h,d,u),g.return=h,g):(g=Go(u.type,u.key,u.props,null,h.mode,g),g.ref=pn(h,d,u),g.return=h,g)}function p(h,d,u,g){return d===null||d.tag!==4||d.stateNode.containerInfo!==u.containerInfo||d.stateNode.implementation!==u.implementation?(d=Pl(u,h.mode,g),d.return=h,d):(d=o(d,u.children||[]),d.return=h,d)}function y(h,d,u,g,S){return d===null||d.tag!==7?(d=lr(u,h.mode,g,S),d.return=h,d):(d=o(d,u),d.return=h,d)}function w(h,d,u){if(typeof d=="string"&&d!==""||typeof d=="number")return d=zl(""+d,h.mode,u),d.return=h,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case ao:return u=Go(d.type,d.key,d.props,null,h.mode,u),u.ref=pn(h,null,d),u.return=h,u;case jr:return d=Pl(d,h.mode,u),d.return=h,d;case Nt:var g=d._init;return w(h,g(d._payload),u)}if(yn(d)||sn(d))return d=lr(d,h.mode,u,null),d.return=h,d;xo(h,d)}return null}function f(h,d,u,g){var S=d!==null?d.key:null;if(typeof u=="string"&&u!==""||typeof u=="number")return S!==null?null:s(h,d,""+u,g);if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ao:return u.key===S?c(h,d,u,g):null;case jr:return u.key===S?p(h,d,u,g):null;case Nt:return S=u._init,f(h,d,S(u._payload),g)}if(yn(u)||sn(u))return S!==null?null:y(h,d,u,g,null);xo(h,u)}return null}function x(h,d,u,g,S){if(typeof g=="string"&&g!==""||typeof g=="number")return h=h.get(u)||null,s(d,h,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ao:return h=h.get(g.key===null?u:g.key)||null,c(d,h,g,S);case jr:return h=h.get(g.key===null?u:g.key)||null,p(d,h,g,S);case Nt:var b=g._init;return x(h,d,u,b(g._payload),S)}if(yn(g)||sn(g))return h=h.get(u)||null,y(d,h,g,S,null);xo(d,g)}return null}function k(h,d,u,g){for(var S=null,b=null,v=d,$=d=0,R=null;v!==null&&$<u.length;$++){v.index>$?(R=v,v=null):R=v.sibling;var L=f(h,v,u[$],g);if(L===null){v===null&&(v=R);break}e&&v&&L.alternate===null&&t(h,v),d=i(L,d,$),b===null?S=L:b.sibling=L,b=L,v=R}if($===u.length)return r(h,v),X&&qt(h,$),S;if(v===null){for(;$<u.length;$++)v=w(h,u[$],g),v!==null&&(d=i(v,d,$),b===null?S=v:b.sibling=v,b=v);return X&&qt(h,$),S}for(v=n(h,v);$<u.length;$++)R=x(v,h,$,u[$],g),R!==null&&(e&&R.alternate!==null&&v.delete(R.key===null?$:R.key),d=i(R,d,$),b===null?S=R:b.sibling=R,b=R);return e&&v.forEach(function(oe){return t(h,oe)}),X&&qt(h,$),S}function j(h,d,u,g){var S=sn(u);if(typeof S!="function")throw Error(z(150));if(u=S.call(u),u==null)throw Error(z(151));for(var b=S=null,v=d,$=d=0,R=null,L=u.next();v!==null&&!L.done;$++,L=u.next()){v.index>$?(R=v,v=null):R=v.sibling;var oe=f(h,v,L.value,g);if(oe===null){v===null&&(v=R);break}e&&v&&oe.alternate===null&&t(h,v),d=i(oe,d,$),b===null?S=oe:b.sibling=oe,b=oe,v=R}if(L.done)return r(h,v),X&&qt(h,$),S;if(v===null){for(;!L.done;$++,L=u.next())L=w(h,L.value,g),L!==null&&(d=i(L,d,$),b===null?S=L:b.sibling=L,b=L);return X&&qt(h,$),S}for(v=n(h,v);!L.done;$++,L=u.next())L=x(v,h,$,L.value,g),L!==null&&(e&&L.alternate!==null&&v.delete(L.key===null?$:L.key),d=i(L,d,$),b===null?S=L:b.sibling=L,b=L);return e&&v.forEach(function(te){return t(h,te)}),X&&qt(h,$),S}function C(h,d,u,g){if(typeof u=="object"&&u!==null&&u.type===Cr&&u.key===null&&(u=u.props.children),typeof u=="object"&&u!==null){switch(u.$$typeof){case ao:e:{for(var S=u.key,b=d;b!==null;){if(b.key===S){if(S=u.type,S===Cr){if(b.tag===7){r(h,b.sibling),d=o(b,u.props.children),d.return=h,h=d;break e}}else if(b.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Nt&&Mc(S)===b.type){r(h,b.sibling),d=o(b,u.props),d.ref=pn(h,b,u),d.return=h,h=d;break e}r(h,b);break}else t(h,b);b=b.sibling}u.type===Cr?(d=lr(u.props.children,h.mode,g,u.key),d.return=h,h=d):(g=Go(u.type,u.key,u.props,null,h.mode,g),g.ref=pn(h,d,u),g.return=h,h=g)}return l(h);case jr:e:{for(b=u.key;d!==null;){if(d.key===b)if(d.tag===4&&d.stateNode.containerInfo===u.containerInfo&&d.stateNode.implementation===u.implementation){r(h,d.sibling),d=o(d,u.children||[]),d.return=h,h=d;break e}else{r(h,d);break}else t(h,d);d=d.sibling}d=Pl(u,h.mode,g),d.return=h,h=d}return l(h);case Nt:return b=u._init,C(h,d,b(u._payload),g)}if(yn(u))return k(h,d,u,g);if(sn(u))return j(h,d,u,g);xo(h,u)}return typeof u=="string"&&u!==""||typeof u=="number"?(u=""+u,d!==null&&d.tag===6?(r(h,d.sibling),d=o(d,u),d.return=h,h=d):(r(h,d),d=zl(u,h.mode,g),d.return=h,h=d),l(h)):r(h,d)}return C}var Qr=sf(!0),cf=sf(!1),mi=Kt(null),gi=null,Tr=null,ws=null;function Ss(){ws=Tr=gi=null}function bs(e){var t=mi.current;J(mi),e._currentValue=t}function ka(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function Ar(e,t){gi=e,ws=Tr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ze=!0),e.firstContext=null)}function Ye(e){var t=e._currentValue;if(ws!==e)if(e={context:e,memoizedValue:t,next:null},Tr===null){if(gi===null)throw Error(z(308));Tr=e,gi.dependencies={lanes:0,firstContext:e}}else Tr=Tr.next=e;return t}var rr=null;function ks(e){rr===null?rr=[e]:rr.push(e)}function uf(e,t,r,n){var o=t.interleaved;return o===null?(r.next=r,ks(t)):(r.next=o.next,o.next=r),t.interleaved=r,Ct(e,n)}function Ct(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Tt=!1;function js(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function df(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function St(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ht(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,A&2){var o=n.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),n.pending=t,Ct(e,r)}return o=n.interleaved,o===null?(t.next=t,ks(n)):(t.next=o.next,o.next=t),n.interleaved=t,Ct(e,r)}function Ho(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,cs(e,r)}}function Rc(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var o=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var l={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?o=i=l:i=i.next=l,r=r.next}while(r!==null);i===null?o=i=t:i=i.next=t}else o=i=t;r={baseState:n.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function vi(e,t,r,n){var o=e.updateQueue;Tt=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var c=s,p=c.next;c.next=null,l===null?i=p:l.next=p,l=c;var y=e.alternate;y!==null&&(y=y.updateQueue,s=y.lastBaseUpdate,s!==l&&(s===null?y.firstBaseUpdate=p:s.next=p,y.lastBaseUpdate=c))}if(i!==null){var w=o.baseState;l=0,y=p=c=null,s=i;do{var f=s.lane,x=s.eventTime;if((n&f)===f){y!==null&&(y=y.next={eventTime:x,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var k=e,j=s;switch(f=t,x=r,j.tag){case 1:if(k=j.payload,typeof k=="function"){w=k.call(x,w,f);break e}w=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=j.payload,f=typeof k=="function"?k.call(x,w,f):k,f==null)break e;w=ee({},w,f);break e;case 2:Tt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[s]:f.push(s))}else x={eventTime:x,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},y===null?(p=y=x,c=w):y=y.next=x,l|=f;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;f=s,s=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(!0);if(y===null&&(c=w),o.baseState=c,o.firstBaseUpdate=p,o.lastBaseUpdate=y,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);pr|=l,e.lanes=l,e.memoizedState=w}}function Ic(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],o=n.callback;if(o!==null){if(n.callback=null,n=r,typeof o!="function")throw Error(z(191,o));o.call(n)}}}var no={},ht=Kt(no),Vn=Kt(no),Un=Kt(no);function nr(e){if(e===no)throw Error(z(174));return e}function Cs(e,t){switch(Y(Un,t),Y(Vn,e),Y(ht,no),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:na(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=na(t,e)}J(ht),Y(ht,t)}function Yr(){J(ht),J(Vn),J(Un)}function ff(e){nr(Un.current);var t=nr(ht.current),r=na(t,e.type);t!==r&&(Y(Vn,e),Y(ht,r))}function $s(e){Vn.current===e&&(J(ht),J(Vn))}var Z=Kt(0);function yi(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Sl=[];function zs(){for(var e=0;e<Sl.length;e++)Sl[e]._workInProgressVersionPrimary=null;Sl.length=0}var Vo=zt.ReactCurrentDispatcher,bl=zt.ReactCurrentBatchConfig,fr=0,q=null,se=null,fe=null,xi=!1,zn=!1,Wn=0,T1=0;function ye(){throw Error(z(321))}function Ps(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!ot(e[r],t[r]))return!1;return!0}function Es(e,t,r,n,o,i){if(fr=i,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Vo.current=e===null||e.memoizedState===null?I1:D1,e=r(n,o),zn){i=0;do{if(zn=!1,Wn=0,25<=i)throw Error(z(301));i+=1,fe=se=null,t.updateQueue=null,Vo.current=O1,e=r(n,o)}while(zn)}if(Vo.current=wi,t=se!==null&&se.next!==null,fr=0,fe=se=q=null,xi=!1,t)throw Error(z(300));return e}function Bs(){var e=Wn!==0;return Wn=0,e}function ct(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fe===null?q.memoizedState=fe=e:fe=fe.next=e,fe}function Ge(){if(se===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=fe===null?q.memoizedState:fe.next;if(t!==null)fe=t,se=e;else{if(e===null)throw Error(z(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},fe===null?q.memoizedState=fe=e:fe=fe.next=e}return fe}function Qn(e,t){return typeof t=="function"?t(e):t}function kl(e){var t=Ge(),r=t.queue;if(r===null)throw Error(z(311));r.lastRenderedReducer=e;var n=se,o=n.baseQueue,i=r.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}n.baseQueue=o=i,r.pending=null}if(o!==null){i=o.next,n=n.baseState;var s=l=null,c=null,p=i;do{var y=p.lane;if((fr&y)===y)c!==null&&(c=c.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),n=p.hasEagerState?p.eagerState:e(n,p.action);else{var w={lane:y,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};c===null?(s=c=w,l=n):c=c.next=w,q.lanes|=y,pr|=y}p=p.next}while(p!==null&&p!==i);c===null?l=n:c.next=s,ot(n,t.memoizedState)||(ze=!0),t.memoizedState=n,t.baseState=l,t.baseQueue=c,r.lastRenderedState=n}if(e=r.interleaved,e!==null){o=e;do i=o.lane,q.lanes|=i,pr|=i,o=o.next;while(o!==e)}else o===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function jl(e){var t=Ge(),r=t.queue;if(r===null)throw Error(z(311));r.lastRenderedReducer=e;var n=r.dispatch,o=r.pending,i=t.memoizedState;if(o!==null){r.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);ot(i,t.memoizedState)||(ze=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function pf(){}function hf(e,t){var r=q,n=Ge(),o=t(),i=!ot(n.memoizedState,o);if(i&&(n.memoizedState=o,ze=!0),n=n.queue,Ls(vf.bind(null,r,n,e),[e]),n.getSnapshot!==t||i||fe!==null&&fe.memoizedState.tag&1){if(r.flags|=2048,Yn(9,gf.bind(null,r,n,o,t),void 0,null),he===null)throw Error(z(349));fr&30||mf(r,t,o)}return o}function mf(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function gf(e,t,r,n){t.value=r,t.getSnapshot=n,yf(t)&&xf(e)}function vf(e,t,r){return r(function(){yf(t)&&xf(e)})}function yf(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!ot(e,r)}catch{return!0}}function xf(e){var t=Ct(e,1);t!==null&&rt(t,e,1,-1)}function Dc(e){var t=ct();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qn,lastRenderedState:e},t.queue=e,e=e.dispatch=R1.bind(null,q,e),[t.memoizedState,e]}function Yn(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function wf(){return Ge().memoizedState}function Uo(e,t,r,n){var o=ct();q.flags|=e,o.memoizedState=Yn(1|t,r,void 0,n===void 0?null:n)}function Fi(e,t,r,n){var o=Ge();n=n===void 0?null:n;var i=void 0;if(se!==null){var l=se.memoizedState;if(i=l.destroy,n!==null&&Ps(n,l.deps)){o.memoizedState=Yn(t,r,i,n);return}}q.flags|=e,o.memoizedState=Yn(1|t,r,i,n)}function Oc(e,t){return Uo(8390656,8,e,t)}function Ls(e,t){return Fi(2048,8,e,t)}function Sf(e,t){return Fi(4,2,e,t)}function bf(e,t){return Fi(4,4,e,t)}function kf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function jf(e,t,r){return r=r!=null?r.concat([e]):null,Fi(4,4,kf.bind(null,t,e),r)}function Ns(){}function Cf(e,t){var r=Ge();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Ps(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function $f(e,t){var r=Ge();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Ps(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function zf(e,t,r){return fr&21?(ot(r,t)||(r=Ld(),q.lanes|=r,pr|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ze=!0),e.memoizedState=r)}function _1(e,t){var r=U;U=r!==0&&4>r?r:4,e(!0);var n=bl.transition;bl.transition={};try{e(!1),t()}finally{U=r,bl.transition=n}}function Pf(){return Ge().memoizedState}function M1(e,t,r){var n=Ut(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},Ef(e))Bf(t,r);else if(r=uf(e,t,r,n),r!==null){var o=ke();rt(r,e,n,o),Lf(r,t,n)}}function R1(e,t,r){var n=Ut(e),o={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(Ef(e))Bf(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,s=i(l,r);if(o.hasEagerState=!0,o.eagerState=s,ot(s,l)){var c=t.interleaved;c===null?(o.next=o,ks(t)):(o.next=c.next,c.next=o),t.interleaved=o;return}}catch{}finally{}r=uf(e,t,o,n),r!==null&&(o=ke(),rt(r,e,n,o),Lf(r,t,n))}}function Ef(e){var t=e.alternate;return e===q||t!==null&&t===q}function Bf(e,t){zn=xi=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Lf(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,cs(e,r)}}var wi={readContext:Ye,useCallback:ye,useContext:ye,useEffect:ye,useImperativeHandle:ye,useInsertionEffect:ye,useLayoutEffect:ye,useMemo:ye,useReducer:ye,useRef:ye,useState:ye,useDebugValue:ye,useDeferredValue:ye,useTransition:ye,useMutableSource:ye,useSyncExternalStore:ye,useId:ye,unstable_isNewReconciler:!1},I1={readContext:Ye,useCallback:function(e,t){return ct().memoizedState=[e,t===void 0?null:t],e},useContext:Ye,useEffect:Oc,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Uo(4194308,4,kf.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Uo(4194308,4,e,t)},useInsertionEffect:function(e,t){return Uo(4,2,e,t)},useMemo:function(e,t){var r=ct();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=ct();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=M1.bind(null,q,e),[n.memoizedState,e]},useRef:function(e){var t=ct();return e={current:e},t.memoizedState=e},useState:Dc,useDebugValue:Ns,useDeferredValue:function(e){return ct().memoizedState=e},useTransition:function(){var e=Dc(!1),t=e[0];return e=_1.bind(null,e[1]),ct().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=q,o=ct();if(X){if(r===void 0)throw Error(z(407));r=r()}else{if(r=t(),he===null)throw Error(z(349));fr&30||mf(n,t,r)}o.memoizedState=r;var i={value:r,getSnapshot:t};return o.queue=i,Oc(vf.bind(null,n,i,e),[e]),n.flags|=2048,Yn(9,gf.bind(null,n,i,r,t),void 0,null),r},useId:function(){var e=ct(),t=he.identifierPrefix;if(X){var r=wt,n=xt;r=(n&~(1<<32-tt(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=Wn++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=T1++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},D1={readContext:Ye,useCallback:Cf,useContext:Ye,useEffect:Ls,useImperativeHandle:jf,useInsertionEffect:Sf,useLayoutEffect:bf,useMemo:$f,useReducer:kl,useRef:wf,useState:function(){return kl(Qn)},useDebugValue:Ns,useDeferredValue:function(e){var t=Ge();return zf(t,se.memoizedState,e)},useTransition:function(){var e=kl(Qn)[0],t=Ge().memoizedState;return[e,t]},useMutableSource:pf,useSyncExternalStore:hf,useId:Pf,unstable_isNewReconciler:!1},O1={readContext:Ye,useCallback:Cf,useContext:Ye,useEffect:Ls,useImperativeHandle:jf,useInsertionEffect:Sf,useLayoutEffect:bf,useMemo:$f,useReducer:jl,useRef:wf,useState:function(){return jl(Qn)},useDebugValue:Ns,useDeferredValue:function(e){var t=Ge();return se===null?t.memoizedState=e:zf(t,se.memoizedState,e)},useTransition:function(){var e=jl(Qn)[0],t=Ge().memoizedState;return[e,t]},useMutableSource:pf,useSyncExternalStore:hf,useId:Pf,unstable_isNewReconciler:!1};function Ze(e,t){if(e&&e.defaultProps){t=ee({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function ja(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:ee({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Ai={isMounted:function(e){return(e=e._reactInternals)?gr(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=ke(),o=Ut(e),i=St(n,o);i.payload=t,r!=null&&(i.callback=r),t=Ht(e,i,o),t!==null&&(rt(t,e,o,n),Ho(t,e,o))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=ke(),o=Ut(e),i=St(n,o);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=Ht(e,i,o),t!==null&&(rt(t,e,o,n),Ho(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=ke(),n=Ut(e),o=St(r,n);o.tag=2,t!=null&&(o.callback=t),t=Ht(e,o,n),t!==null&&(rt(t,e,n,r),Ho(t,e,n))}};function Fc(e,t,r,n,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,l):t.prototype&&t.prototype.isPureReactComponent?!On(r,n)||!On(o,i):!0}function Nf(e,t,r){var n=!1,o=Yt,i=t.contextType;return typeof i=="object"&&i!==null?i=Ye(i):(o=Le(t)?ur:Se.current,n=t.contextTypes,i=(n=n!=null)?Ur(e,o):Yt),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ai,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Ac(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&Ai.enqueueReplaceState(t,t.state,null)}function Ca(e,t,r,n){var o=e.stateNode;o.props=r,o.state=e.memoizedState,o.refs={},js(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Ye(i):(i=Le(t)?ur:Se.current,o.context=Ur(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(ja(e,t,i,r),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Ai.enqueueReplaceState(o,o.state,null),vi(e,r,o,n),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Gr(e,t){try{var r="",n=t;do r+=pp(n),n=n.return;while(n);var o=r}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Cl(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function $a(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var F1=typeof WeakMap=="function"?WeakMap:Map;function Tf(e,t,r){r=St(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){bi||(bi=!0,Ra=n),$a(e,t)},r}function _f(e,t,r){r=St(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var o=t.value;r.payload=function(){return n(o)},r.callback=function(){$a(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){$a(e,t),typeof n!="function"&&(Vt===null?Vt=new Set([this]):Vt.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),r}function Hc(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new F1;var o=new Set;n.set(t,o)}else o=n.get(t),o===void 0&&(o=new Set,n.set(t,o));o.has(r)||(o.add(r),e=eh.bind(null,e,t,r),t.then(e,e))}function Vc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Uc(e,t,r,n,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=St(-1,1),t.tag=2,Ht(r,t,1))),r.lanes|=1),e)}var A1=zt.ReactCurrentOwner,ze=!1;function be(e,t,r,n){t.child=e===null?cf(t,null,r,n):Qr(t,e.child,r,n)}function Wc(e,t,r,n,o){r=r.render;var i=t.ref;return Ar(t,o),n=Es(e,t,r,n,i,o),r=Bs(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,$t(e,t,o)):(X&&r&&vs(t),t.flags|=1,be(e,t,n,o),t.child)}function Qc(e,t,r,n,o){if(e===null){var i=r.type;return typeof i=="function"&&!Fs(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,Mf(e,t,i,n,o)):(e=Go(r.type,null,n,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var l=i.memoizedProps;if(r=r.compare,r=r!==null?r:On,r(l,n)&&e.ref===t.ref)return $t(e,t,o)}return t.flags|=1,e=Wt(i,n),e.ref=t.ref,e.return=t,t.child=e}function Mf(e,t,r,n,o){if(e!==null){var i=e.memoizedProps;if(On(i,n)&&e.ref===t.ref)if(ze=!1,t.pendingProps=n=i,(e.lanes&o)!==0)e.flags&131072&&(ze=!0);else return t.lanes=e.lanes,$t(e,t,o)}return za(e,t,r,n,o)}function Rf(e,t,r){var n=t.pendingProps,o=n.children,i=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Y(Mr,Re),Re|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Y(Mr,Re),Re|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,Y(Mr,Re),Re|=n}else i!==null?(n=i.baseLanes|r,t.memoizedState=null):n=r,Y(Mr,Re),Re|=n;return be(e,t,o,r),t.child}function If(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function za(e,t,r,n,o){var i=Le(r)?ur:Se.current;return i=Ur(t,i),Ar(t,o),r=Es(e,t,r,n,i,o),n=Bs(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,$t(e,t,o)):(X&&n&&vs(t),t.flags|=1,be(e,t,r,o),t.child)}function Yc(e,t,r,n,o){if(Le(r)){var i=!0;fi(t)}else i=!1;if(Ar(t,o),t.stateNode===null)Wo(e,t),Nf(t,r,n),Ca(t,r,n,o),n=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var c=l.context,p=r.contextType;typeof p=="object"&&p!==null?p=Ye(p):(p=Le(r)?ur:Se.current,p=Ur(t,p));var y=r.getDerivedStateFromProps,w=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function";w||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==n||c!==p)&&Ac(t,l,n,p),Tt=!1;var f=t.memoizedState;l.state=f,vi(t,n,l,o),c=t.memoizedState,s!==n||f!==c||Be.current||Tt?(typeof y=="function"&&(ja(t,r,y,n),c=t.memoizedState),(s=Tt||Fc(t,r,s,n,f,c,p))?(w||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),l.props=n,l.state=c,l.context=p,n=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{l=t.stateNode,df(e,t),s=t.memoizedProps,p=t.type===t.elementType?s:Ze(t.type,s),l.props=p,w=t.pendingProps,f=l.context,c=r.contextType,typeof c=="object"&&c!==null?c=Ye(c):(c=Le(r)?ur:Se.current,c=Ur(t,c));var x=r.getDerivedStateFromProps;(y=typeof x=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==w||f!==c)&&Ac(t,l,n,c),Tt=!1,f=t.memoizedState,l.state=f,vi(t,n,l,o);var k=t.memoizedState;s!==w||f!==k||Be.current||Tt?(typeof x=="function"&&(ja(t,r,x,n),k=t.memoizedState),(p=Tt||Fc(t,r,p,n,f,k,c)||!1)?(y||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(n,k,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(n,k,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=k),l.props=n,l.state=k,l.context=c,n=p):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),n=!1)}return Pa(e,t,r,n,i,o)}function Pa(e,t,r,n,o,i){If(e,t);var l=(t.flags&128)!==0;if(!n&&!l)return o&&Nc(t,r,!1),$t(e,t,i);n=t.stateNode,A1.current=t;var s=l&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&l?(t.child=Qr(t,e.child,null,i),t.child=Qr(t,null,s,i)):be(e,t,s,i),t.memoizedState=n.state,o&&Nc(t,r,!0),t.child}function Df(e){var t=e.stateNode;t.pendingContext?Lc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Lc(e,t.context,!1),Cs(e,t.containerInfo)}function Gc(e,t,r,n,o){return Wr(),xs(o),t.flags|=256,be(e,t,r,n),t.child}var Ea={dehydrated:null,treeContext:null,retryLane:0};function Ba(e){return{baseLanes:e,cachePool:null,transitions:null}}function Of(e,t,r){var n=t.pendingProps,o=Z.current,i=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Y(Z,o&1),e===null)return ba(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=n.children,e=n.fallback,i?(n=t.mode,i=t.child,l={mode:"hidden",children:l},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=Ui(l,n,0,null),e=lr(e,n,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Ba(r),t.memoizedState=Ea,e):Ts(t,l));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return H1(e,t,l,n,s,o,r);if(i){i=n.fallback,l=t.mode,o=e.child,s=o.sibling;var c={mode:"hidden",children:n.children};return!(l&1)&&t.child!==o?(n=t.child,n.childLanes=0,n.pendingProps=c,t.deletions=null):(n=Wt(o,c),n.subtreeFlags=o.subtreeFlags&14680064),s!==null?i=Wt(s,i):(i=lr(i,l,r,null),i.flags|=2),i.return=t,n.return=t,n.sibling=i,t.child=n,n=i,i=t.child,l=e.child.memoizedState,l=l===null?Ba(r):{baseLanes:l.baseLanes|r,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~r,t.memoizedState=Ea,n}return i=e.child,e=i.sibling,n=Wt(i,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Ts(e,t){return t=Ui({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function wo(e,t,r,n){return n!==null&&xs(n),Qr(t,e.child,null,r),e=Ts(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function H1(e,t,r,n,o,i,l){if(r)return t.flags&256?(t.flags&=-257,n=Cl(Error(z(422))),wo(e,t,l,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=n.fallback,o=t.mode,n=Ui({mode:"visible",children:n.children},o,0,null),i=lr(i,o,l,null),i.flags|=2,n.return=t,i.return=t,n.sibling=i,t.child=n,t.mode&1&&Qr(t,e.child,null,l),t.child.memoizedState=Ba(l),t.memoizedState=Ea,i);if(!(t.mode&1))return wo(e,t,l,null);if(o.data==="$!"){if(n=o.nextSibling&&o.nextSibling.dataset,n)var s=n.dgst;return n=s,i=Error(z(419)),n=Cl(i,n,void 0),wo(e,t,l,n)}if(s=(l&e.childLanes)!==0,ze||s){if(n=he,n!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(n.suspendedLanes|l)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,Ct(e,o),rt(n,e,o,-1))}return Os(),n=Cl(Error(z(421))),wo(e,t,l,n)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=th.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Ie=At(o.nextSibling),De=t,X=!0,et=null,e!==null&&(Ve[Ue++]=xt,Ve[Ue++]=wt,Ve[Ue++]=dr,xt=e.id,wt=e.overflow,dr=t),t=Ts(t,n.children),t.flags|=4096,t)}function Kc(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),ka(e.return,t,r)}function $l(e,t,r,n,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=o)}function Ff(e,t,r){var n=t.pendingProps,o=n.revealOrder,i=n.tail;if(be(e,t,n.children,r),n=Z.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Kc(e,r,t);else if(e.tag===19)Kc(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(Y(Z,n),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(r=t.child,o=null;r!==null;)e=r.alternate,e!==null&&yi(e)===null&&(o=r),r=r.sibling;r=o,r===null?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),$l(t,!1,o,r,i);break;case"backwards":for(r=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&yi(e)===null){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}$l(t,!0,r,null,i);break;case"together":$l(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Wo(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function $t(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),pr|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(z(153));if(t.child!==null){for(e=t.child,r=Wt(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Wt(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function V1(e,t,r){switch(t.tag){case 3:Df(t),Wr();break;case 5:ff(t);break;case 1:Le(t.type)&&fi(t);break;case 4:Cs(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,o=t.memoizedProps.value;Y(mi,n._currentValue),n._currentValue=o;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(Y(Z,Z.current&1),t.flags|=128,null):r&t.child.childLanes?Of(e,t,r):(Y(Z,Z.current&1),e=$t(e,t,r),e!==null?e.sibling:null);Y(Z,Z.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return Ff(e,t,r);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Y(Z,Z.current),n)break;return null;case 22:case 23:return t.lanes=0,Rf(e,t,r)}return $t(e,t,r)}var Af,La,Hf,Vf;Af=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};La=function(){};Hf=function(e,t,r,n){var o=e.memoizedProps;if(o!==n){e=t.stateNode,nr(ht.current);var i=null;switch(r){case"input":o=ql(e,o),n=ql(e,n),i=[];break;case"select":o=ee({},o,{value:void 0}),n=ee({},n,{value:void 0}),i=[];break;case"textarea":o=ra(e,o),n=ra(e,n),i=[];break;default:typeof o.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=ui)}oa(r,n);var l;r=null;for(p in o)if(!n.hasOwnProperty(p)&&o.hasOwnProperty(p)&&o[p]!=null)if(p==="style"){var s=o[p];for(l in s)s.hasOwnProperty(l)&&(r||(r={}),r[l]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Nn.hasOwnProperty(p)?i||(i=[]):(i=i||[]).push(p,null));for(p in n){var c=n[p];if(s=o!=null?o[p]:void 0,n.hasOwnProperty(p)&&c!==s&&(c!=null||s!=null))if(p==="style")if(s){for(l in s)!s.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(r||(r={}),r[l]="");for(l in c)c.hasOwnProperty(l)&&s[l]!==c[l]&&(r||(r={}),r[l]=c[l])}else r||(i||(i=[]),i.push(p,r)),r=c;else p==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,s=s?s.__html:void 0,c!=null&&s!==c&&(i=i||[]).push(p,c)):p==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(p,""+c):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Nn.hasOwnProperty(p)?(c!=null&&p==="onScroll"&&G("scroll",e),i||s===c||(i=[])):(i=i||[]).push(p,c))}r&&(i=i||[]).push("style",r);var p=i;(t.updateQueue=p)&&(t.flags|=4)}};Vf=function(e,t,r,n){r!==n&&(t.flags|=4)};function hn(e,t){if(!X)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags&14680064,n|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags,n|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function U1(e,t,r){var n=t.pendingProps;switch(ys(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return Le(t.type)&&di(),xe(t),null;case 3:return n=t.stateNode,Yr(),J(Be),J(Se),zs(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(yo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,et!==null&&(Oa(et),et=null))),La(e,t),xe(t),null;case 5:$s(t);var o=nr(Un.current);if(r=t.type,e!==null&&t.stateNode!=null)Hf(e,t,r,n,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(z(166));return xe(t),null}if(e=nr(ht.current),yo(t)){n=t.stateNode,r=t.type;var i=t.memoizedProps;switch(n[dt]=t,n[Hn]=i,e=(t.mode&1)!==0,r){case"dialog":G("cancel",n),G("close",n);break;case"iframe":case"object":case"embed":G("load",n);break;case"video":case"audio":for(o=0;o<wn.length;o++)G(wn[o],n);break;case"source":G("error",n);break;case"img":case"image":case"link":G("error",n),G("load",n);break;case"details":G("toggle",n);break;case"input":oc(n,i),G("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},G("invalid",n);break;case"textarea":lc(n,i),G("invalid",n)}oa(r,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="children"?typeof s=="string"?n.textContent!==s&&(i.suppressHydrationWarning!==!0&&vo(n.textContent,s,e),o=["children",s]):typeof s=="number"&&n.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&vo(n.textContent,s,e),o=["children",""+s]):Nn.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&G("scroll",n)}switch(r){case"input":so(n),ic(n,i,!0);break;case"textarea":so(n),ac(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=ui)}n=o,t.updateQueue=n,n!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gd(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=l.createElement(r,{is:n.is}):(e=l.createElement(r),r==="select"&&(l=e,n.multiple?l.multiple=!0:n.size&&(l.size=n.size))):e=l.createElementNS(e,r),e[dt]=t,e[Hn]=n,Af(e,t,!1,!1),t.stateNode=e;e:{switch(l=ia(r,n),r){case"dialog":G("cancel",e),G("close",e),o=n;break;case"iframe":case"object":case"embed":G("load",e),o=n;break;case"video":case"audio":for(o=0;o<wn.length;o++)G(wn[o],e);o=n;break;case"source":G("error",e),o=n;break;case"img":case"image":case"link":G("error",e),G("load",e),o=n;break;case"details":G("toggle",e),o=n;break;case"input":oc(e,n),o=ql(e,n),G("invalid",e);break;case"option":o=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},o=ee({},n,{value:void 0}),G("invalid",e);break;case"textarea":lc(e,n),o=ra(e,n),G("invalid",e);break;default:o=n}oa(r,o),s=o;for(i in s)if(s.hasOwnProperty(i)){var c=s[i];i==="style"?xd(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&vd(e,c)):i==="children"?typeof c=="string"?(r!=="textarea"||c!=="")&&Tn(e,c):typeof c=="number"&&Tn(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Nn.hasOwnProperty(i)?c!=null&&i==="onScroll"&&G("scroll",e):c!=null&&ns(e,i,c,l))}switch(r){case"input":so(e),ic(e,n,!1);break;case"textarea":so(e),ac(e);break;case"option":n.value!=null&&e.setAttribute("value",""+Qt(n.value));break;case"select":e.multiple=!!n.multiple,i=n.value,i!=null?Ir(e,!!n.multiple,i,!1):n.defaultValue!=null&&Ir(e,!!n.multiple,n.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=ui)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return xe(t),null;case 6:if(e&&t.stateNode!=null)Vf(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(z(166));if(r=nr(Un.current),nr(ht.current),yo(t)){if(n=t.stateNode,r=t.memoizedProps,n[dt]=t,(i=n.nodeValue!==r)&&(e=De,e!==null))switch(e.tag){case 3:vo(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&vo(n.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[dt]=t,t.stateNode=n}return xe(t),null;case 13:if(J(Z),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(X&&Ie!==null&&t.mode&1&&!(t.flags&128))af(),Wr(),t.flags|=98560,i=!1;else if(i=yo(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(z(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(z(317));i[dt]=t}else Wr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;xe(t),i=!1}else et!==null&&(Oa(et),et=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||Z.current&1?ce===0&&(ce=3):Os())),t.updateQueue!==null&&(t.flags|=4),xe(t),null);case 4:return Yr(),La(e,t),e===null&&Fn(t.stateNode.containerInfo),xe(t),null;case 10:return bs(t.type._context),xe(t),null;case 17:return Le(t.type)&&di(),xe(t),null;case 19:if(J(Z),i=t.memoizedState,i===null)return xe(t),null;if(n=(t.flags&128)!==0,l=i.rendering,l===null)if(n)hn(i,!1);else{if(ce!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=yi(e),l!==null){for(t.flags|=128,hn(i,!1),n=l.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)i=r,e=n,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Y(Z,Z.current&1|2),t.child}e=e.sibling}i.tail!==null&&ne()>Kr&&(t.flags|=128,n=!0,hn(i,!1),t.lanes=4194304)}else{if(!n)if(e=yi(l),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),hn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!X)return xe(t),null}else 2*ne()-i.renderingStartTime>Kr&&r!==1073741824&&(t.flags|=128,n=!0,hn(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(r=i.last,r!==null?r.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ne(),t.sibling=null,r=Z.current,Y(Z,n?r&1|2:r&1),t):(xe(t),null);case 22:case 23:return Ds(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?Re&1073741824&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),null;case 24:return null;case 25:return null}throw Error(z(156,t.tag))}function W1(e,t){switch(ys(t),t.tag){case 1:return Le(t.type)&&di(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yr(),J(Be),J(Se),zs(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return $s(t),null;case 13:if(J(Z),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(z(340));Wr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return J(Z),null;case 4:return Yr(),null;case 10:return bs(t.type._context),null;case 22:case 23:return Ds(),null;case 24:return null;default:return null}}var So=!1,we=!1,Q1=typeof WeakSet=="function"?WeakSet:Set,N=null;function _r(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){re(e,t,n)}else r.current=null}function Na(e,t,r){try{r()}catch(n){re(e,t,n)}}var Jc=!1;function Y1(e,t){if(ma=ai,e=Yd(),gs(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var o=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var l=0,s=-1,c=-1,p=0,y=0,w=e,f=null;t:for(;;){for(var x;w!==r||o!==0&&w.nodeType!==3||(s=l+o),w!==i||n!==0&&w.nodeType!==3||(c=l+n),w.nodeType===3&&(l+=w.nodeValue.length),(x=w.firstChild)!==null;)f=w,w=x;for(;;){if(w===e)break t;if(f===r&&++p===o&&(s=l),f===i&&++y===n&&(c=l),(x=w.nextSibling)!==null)break;w=f,f=w.parentNode}w=x}r=s===-1||c===-1?null:{start:s,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(ga={focusedElem:e,selectionRange:r},ai=!1,N=t;N!==null;)if(t=N,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,N=e;else for(;N!==null;){t=N;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var j=k.memoizedProps,C=k.memoizedState,h=t.stateNode,d=h.getSnapshotBeforeUpdate(t.elementType===t.type?j:Ze(t.type,j),C);h.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var u=t.stateNode.containerInfo;u.nodeType===1?u.textContent="":u.nodeType===9&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(z(163))}}catch(g){re(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,N=e;break}N=t.return}return k=Jc,Jc=!1,k}function Pn(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var o=n=n.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Na(t,r,i)}o=o.next}while(o!==n)}}function Hi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function Ta(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Uf(e){var t=e.alternate;t!==null&&(e.alternate=null,Uf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[dt],delete t[Hn],delete t[xa],delete t[E1],delete t[B1])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wf(e){return e.tag===5||e.tag===3||e.tag===4}function Xc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _a(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=ui));else if(n!==4&&(e=e.child,e!==null))for(_a(e,t,r),e=e.sibling;e!==null;)_a(e,t,r),e=e.sibling}function Ma(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(Ma(e,t,r),e=e.sibling;e!==null;)Ma(e,t,r),e=e.sibling}var me=null,qe=!1;function Bt(e,t,r){for(r=r.child;r!==null;)Qf(e,t,r),r=r.sibling}function Qf(e,t,r){if(pt&&typeof pt.onCommitFiberUnmount=="function")try{pt.onCommitFiberUnmount(_i,r)}catch{}switch(r.tag){case 5:we||_r(r,t);case 6:var n=me,o=qe;me=null,Bt(e,t,r),me=n,qe=o,me!==null&&(qe?(e=me,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):me.removeChild(r.stateNode));break;case 18:me!==null&&(qe?(e=me,r=r.stateNode,e.nodeType===8?xl(e.parentNode,r):e.nodeType===1&&xl(e,r),In(e)):xl(me,r.stateNode));break;case 4:n=me,o=qe,me=r.stateNode.containerInfo,qe=!0,Bt(e,t,r),me=n,qe=o;break;case 0:case 11:case 14:case 15:if(!we&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){o=n=n.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&Na(r,t,l),o=o.next}while(o!==n)}Bt(e,t,r);break;case 1:if(!we&&(_r(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(s){re(r,t,s)}Bt(e,t,r);break;case 21:Bt(e,t,r);break;case 22:r.mode&1?(we=(n=we)||r.memoizedState!==null,Bt(e,t,r),we=n):Bt(e,t,r);break;default:Bt(e,t,r)}}function Zc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Q1),t.forEach(function(n){var o=rh.bind(null,e,n);r.has(n)||(r.add(n),n.then(o,o))})}}function Xe(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var o=r[n];try{var i=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:me=s.stateNode,qe=!1;break e;case 3:me=s.stateNode.containerInfo,qe=!0;break e;case 4:me=s.stateNode.containerInfo,qe=!0;break e}s=s.return}if(me===null)throw Error(z(160));Qf(i,l,o),me=null,qe=!1;var c=o.alternate;c!==null&&(c.return=null),o.return=null}catch(p){re(o,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Yf(t,e),t=t.sibling}function Yf(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Xe(t,e),lt(e),n&4){try{Pn(3,e,e.return),Hi(3,e)}catch(j){re(e,e.return,j)}try{Pn(5,e,e.return)}catch(j){re(e,e.return,j)}}break;case 1:Xe(t,e),lt(e),n&512&&r!==null&&_r(r,r.return);break;case 5:if(Xe(t,e),lt(e),n&512&&r!==null&&_r(r,r.return),e.flags&32){var o=e.stateNode;try{Tn(o,"")}catch(j){re(e,e.return,j)}}if(n&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=r!==null?r.memoizedProps:i,s=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&hd(o,i),ia(s,l);var p=ia(s,i);for(l=0;l<c.length;l+=2){var y=c[l],w=c[l+1];y==="style"?xd(o,w):y==="dangerouslySetInnerHTML"?vd(o,w):y==="children"?Tn(o,w):ns(o,y,w,p)}switch(s){case"input":ea(o,i);break;case"textarea":md(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?Ir(o,!!i.multiple,x,!1):f!==!!i.multiple&&(i.defaultValue!=null?Ir(o,!!i.multiple,i.defaultValue,!0):Ir(o,!!i.multiple,i.multiple?[]:"",!1))}o[Hn]=i}catch(j){re(e,e.return,j)}}break;case 6:if(Xe(t,e),lt(e),n&4){if(e.stateNode===null)throw Error(z(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(j){re(e,e.return,j)}}break;case 3:if(Xe(t,e),lt(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{In(t.containerInfo)}catch(j){re(e,e.return,j)}break;case 4:Xe(t,e),lt(e);break;case 13:Xe(t,e),lt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Rs=ne())),n&4&&Zc(e);break;case 22:if(y=r!==null&&r.memoizedState!==null,e.mode&1?(we=(p=we)||y,Xe(t,e),we=p):Xe(t,e),lt(e),n&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!y&&e.mode&1)for(N=e,y=e.child;y!==null;){for(w=N=y;N!==null;){switch(f=N,x=f.child,f.tag){case 0:case 11:case 14:case 15:Pn(4,f,f.return);break;case 1:_r(f,f.return);var k=f.stateNode;if(typeof k.componentWillUnmount=="function"){n=f,r=f.return;try{t=n,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(j){re(n,r,j)}}break;case 5:_r(f,f.return);break;case 22:if(f.memoizedState!==null){eu(w);continue}}x!==null?(x.return=f,N=x):eu(w)}y=y.sibling}e:for(y=null,w=e;;){if(w.tag===5){if(y===null){y=w;try{o=w.stateNode,p?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=w.stateNode,c=w.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,s.style.display=yd("display",l))}catch(j){re(e,e.return,j)}}}else if(w.tag===6){if(y===null)try{w.stateNode.nodeValue=p?"":w.memoizedProps}catch(j){re(e,e.return,j)}}else if((w.tag!==22&&w.tag!==23||w.memoizedState===null||w===e)&&w.child!==null){w.child.return=w,w=w.child;continue}if(w===e)break e;for(;w.sibling===null;){if(w.return===null||w.return===e)break e;y===w&&(y=null),w=w.return}y===w&&(y=null),w.sibling.return=w.return,w=w.sibling}}break;case 19:Xe(t,e),lt(e),n&4&&Zc(e);break;case 21:break;default:Xe(t,e),lt(e)}}function lt(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Wf(r)){var n=r;break e}r=r.return}throw Error(z(160))}switch(n.tag){case 5:var o=n.stateNode;n.flags&32&&(Tn(o,""),n.flags&=-33);var i=Xc(e);Ma(e,i,o);break;case 3:case 4:var l=n.stateNode.containerInfo,s=Xc(e);_a(e,s,l);break;default:throw Error(z(161))}}catch(c){re(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function G1(e,t,r){N=e,Gf(e)}function Gf(e,t,r){for(var n=(e.mode&1)!==0;N!==null;){var o=N,i=o.child;if(o.tag===22&&n){var l=o.memoizedState!==null||So;if(!l){var s=o.alternate,c=s!==null&&s.memoizedState!==null||we;s=So;var p=we;if(So=l,(we=c)&&!p)for(N=o;N!==null;)l=N,c=l.child,l.tag===22&&l.memoizedState!==null?tu(o):c!==null?(c.return=l,N=c):tu(o);for(;i!==null;)N=i,Gf(i),i=i.sibling;N=o,So=s,we=p}qc(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,N=i):qc(e)}}function qc(e){for(;N!==null;){var t=N;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:we||Hi(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!we)if(r===null)n.componentDidMount();else{var o=t.elementType===t.type?r.memoizedProps:Ze(t.type,r.memoizedProps);n.componentDidUpdate(o,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ic(t,i,n);break;case 3:var l=t.updateQueue;if(l!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Ic(t,l,r)}break;case 5:var s=t.stateNode;if(r===null&&t.flags&4){r=s;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&r.focus();break;case"img":c.src&&(r.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var y=p.memoizedState;if(y!==null){var w=y.dehydrated;w!==null&&In(w)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(z(163))}we||t.flags&512&&Ta(t)}catch(f){re(t,t.return,f)}}if(t===e){N=null;break}if(r=t.sibling,r!==null){r.return=t.return,N=r;break}N=t.return}}function eu(e){for(;N!==null;){var t=N;if(t===e){N=null;break}var r=t.sibling;if(r!==null){r.return=t.return,N=r;break}N=t.return}}function tu(e){for(;N!==null;){var t=N;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Hi(4,t)}catch(c){re(t,r,c)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var o=t.return;try{n.componentDidMount()}catch(c){re(t,o,c)}}var i=t.return;try{Ta(t)}catch(c){re(t,i,c)}break;case 5:var l=t.return;try{Ta(t)}catch(c){re(t,l,c)}}}catch(c){re(t,t.return,c)}if(t===e){N=null;break}var s=t.sibling;if(s!==null){s.return=t.return,N=s;break}N=t.return}}var K1=Math.ceil,Si=zt.ReactCurrentDispatcher,_s=zt.ReactCurrentOwner,Qe=zt.ReactCurrentBatchConfig,A=0,he=null,ae=null,ge=0,Re=0,Mr=Kt(0),ce=0,Gn=null,pr=0,Vi=0,Ms=0,En=null,$e=null,Rs=0,Kr=1/0,gt=null,bi=!1,Ra=null,Vt=null,bo=!1,It=null,ki=0,Bn=0,Ia=null,Qo=-1,Yo=0;function ke(){return A&6?ne():Qo!==-1?Qo:Qo=ne()}function Ut(e){return e.mode&1?A&2&&ge!==0?ge&-ge:N1.transition!==null?(Yo===0&&(Yo=Ld()),Yo):(e=U,e!==0||(e=window.event,e=e===void 0?16:Dd(e.type)),e):1}function rt(e,t,r,n){if(50<Bn)throw Bn=0,Ia=null,Error(z(185));eo(e,r,n),(!(A&2)||e!==he)&&(e===he&&(!(A&2)&&(Vi|=r),ce===4&&Mt(e,ge)),Ne(e,n),r===1&&A===0&&!(t.mode&1)&&(Kr=ne()+500,Oi&&Jt()))}function Ne(e,t){var r=e.callbackNode;Np(e,t);var n=li(e,e===he?ge:0);if(n===0)r!==null&&uc(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&uc(r),t===1)e.tag===0?L1(ru.bind(null,e)):nf(ru.bind(null,e)),z1(function(){!(A&6)&&Jt()}),r=null;else{switch(Nd(n)){case 1:r=ss;break;case 4:r=Ed;break;case 16:r=ii;break;case 536870912:r=Bd;break;default:r=ii}r=r0(r,Kf.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Kf(e,t){if(Qo=-1,Yo=0,A&6)throw Error(z(327));var r=e.callbackNode;if(Hr()&&e.callbackNode!==r)return null;var n=li(e,e===he?ge:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=ji(e,n);else{t=n;var o=A;A|=2;var i=Xf();(he!==e||ge!==t)&&(gt=null,Kr=ne()+500,ir(e,t));do try{Z1();break}catch(s){Jf(e,s)}while(!0);Ss(),Si.current=i,A=o,ae!==null?t=0:(he=null,ge=0,t=ce)}if(t!==0){if(t===2&&(o=ua(e),o!==0&&(n=o,t=Da(e,o))),t===1)throw r=Gn,ir(e,0),Mt(e,n),Ne(e,ne()),r;if(t===6)Mt(e,n);else{if(o=e.current.alternate,!(n&30)&&!J1(o)&&(t=ji(e,n),t===2&&(i=ua(e),i!==0&&(n=i,t=Da(e,i))),t===1))throw r=Gn,ir(e,0),Mt(e,n),Ne(e,ne()),r;switch(e.finishedWork=o,e.finishedLanes=n,t){case 0:case 1:throw Error(z(345));case 2:er(e,$e,gt);break;case 3:if(Mt(e,n),(n&130023424)===n&&(t=Rs+500-ne(),10<t)){if(li(e,0)!==0)break;if(o=e.suspendedLanes,(o&n)!==n){ke(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ya(er.bind(null,e,$e,gt),t);break}er(e,$e,gt);break;case 4:if(Mt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,o=-1;0<n;){var l=31-tt(n);i=1<<l,l=t[l],l>o&&(o=l),n&=~i}if(n=o,n=ne()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*K1(n/1960))-n,10<n){e.timeoutHandle=ya(er.bind(null,e,$e,gt),n);break}er(e,$e,gt);break;case 5:er(e,$e,gt);break;default:throw Error(z(329))}}}return Ne(e,ne()),e.callbackNode===r?Kf.bind(null,e):null}function Da(e,t){var r=En;return e.current.memoizedState.isDehydrated&&(ir(e,t).flags|=256),e=ji(e,t),e!==2&&(t=$e,$e=r,t!==null&&Oa(t)),e}function Oa(e){$e===null?$e=e:$e.push.apply($e,e)}function J1(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var o=r[n],i=o.getSnapshot;o=o.value;try{if(!ot(i(),o))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Mt(e,t){for(t&=~Ms,t&=~Vi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-tt(t),n=1<<r;e[r]=-1,t&=~n}}function ru(e){if(A&6)throw Error(z(327));Hr();var t=li(e,0);if(!(t&1))return Ne(e,ne()),null;var r=ji(e,t);if(e.tag!==0&&r===2){var n=ua(e);n!==0&&(t=n,r=Da(e,n))}if(r===1)throw r=Gn,ir(e,0),Mt(e,t),Ne(e,ne()),r;if(r===6)throw Error(z(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,er(e,$e,gt),Ne(e,ne()),null}function Is(e,t){var r=A;A|=1;try{return e(t)}finally{A=r,A===0&&(Kr=ne()+500,Oi&&Jt())}}function hr(e){It!==null&&It.tag===0&&!(A&6)&&Hr();var t=A;A|=1;var r=Qe.transition,n=U;try{if(Qe.transition=null,U=1,e)return e()}finally{U=n,Qe.transition=r,A=t,!(A&6)&&Jt()}}function Ds(){Re=Mr.current,J(Mr)}function ir(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,$1(r)),ae!==null)for(r=ae.return;r!==null;){var n=r;switch(ys(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&di();break;case 3:Yr(),J(Be),J(Se),zs();break;case 5:$s(n);break;case 4:Yr();break;case 13:J(Z);break;case 19:J(Z);break;case 10:bs(n.type._context);break;case 22:case 23:Ds()}r=r.return}if(he=e,ae=e=Wt(e.current,null),ge=Re=t,ce=0,Gn=null,Ms=Vi=pr=0,$e=En=null,rr!==null){for(t=0;t<rr.length;t++)if(r=rr[t],n=r.interleaved,n!==null){r.interleaved=null;var o=n.next,i=r.pending;if(i!==null){var l=i.next;i.next=o,n.next=l}r.pending=n}rr=null}return e}function Jf(e,t){do{var r=ae;try{if(Ss(),Vo.current=wi,xi){for(var n=q.memoizedState;n!==null;){var o=n.queue;o!==null&&(o.pending=null),n=n.next}xi=!1}if(fr=0,fe=se=q=null,zn=!1,Wn=0,_s.current=null,r===null||r.return===null){ce=1,Gn=t,ae=null;break}e:{var i=e,l=r.return,s=r,c=t;if(t=ge,s.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var p=c,y=s,w=y.tag;if(!(y.mode&1)&&(w===0||w===11||w===15)){var f=y.alternate;f?(y.updateQueue=f.updateQueue,y.memoizedState=f.memoizedState,y.lanes=f.lanes):(y.updateQueue=null,y.memoizedState=null)}var x=Vc(l);if(x!==null){x.flags&=-257,Uc(x,l,s,i,t),x.mode&1&&Hc(i,p,t),t=x,c=p;var k=t.updateQueue;if(k===null){var j=new Set;j.add(c),t.updateQueue=j}else k.add(c);break e}else{if(!(t&1)){Hc(i,p,t),Os();break e}c=Error(z(426))}}else if(X&&s.mode&1){var C=Vc(l);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Uc(C,l,s,i,t),xs(Gr(c,s));break e}}i=c=Gr(c,s),ce!==4&&(ce=2),En===null?En=[i]:En.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var h=Tf(i,c,t);Rc(i,h);break e;case 1:s=c;var d=i.type,u=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(Vt===null||!Vt.has(u)))){i.flags|=65536,t&=-t,i.lanes|=t;var g=_f(i,s,t);Rc(i,g);break e}}i=i.return}while(i!==null)}qf(r)}catch(S){t=S,ae===r&&r!==null&&(ae=r=r.return);continue}break}while(!0)}function Xf(){var e=Si.current;return Si.current=wi,e===null?wi:e}function Os(){(ce===0||ce===3||ce===2)&&(ce=4),he===null||!(pr&268435455)&&!(Vi&268435455)||Mt(he,ge)}function ji(e,t){var r=A;A|=2;var n=Xf();(he!==e||ge!==t)&&(gt=null,ir(e,t));do try{X1();break}catch(o){Jf(e,o)}while(!0);if(Ss(),A=r,Si.current=n,ae!==null)throw Error(z(261));return he=null,ge=0,ce}function X1(){for(;ae!==null;)Zf(ae)}function Z1(){for(;ae!==null&&!kp();)Zf(ae)}function Zf(e){var t=t0(e.alternate,e,Re);e.memoizedProps=e.pendingProps,t===null?qf(e):ae=t,_s.current=null}function qf(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=W1(r,t),r!==null){r.flags&=32767,ae=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ce=6,ae=null;return}}else if(r=U1(r,t,Re),r!==null){ae=r;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);ce===0&&(ce=5)}function er(e,t,r){var n=U,o=Qe.transition;try{Qe.transition=null,U=1,q1(e,t,r,n)}finally{Qe.transition=o,U=n}return null}function q1(e,t,r,n){do Hr();while(It!==null);if(A&6)throw Error(z(327));r=e.finishedWork;var o=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(z(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(Tp(e,i),e===he&&(ae=he=null,ge=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||bo||(bo=!0,r0(ii,function(){return Hr(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=Qe.transition,Qe.transition=null;var l=U;U=1;var s=A;A|=4,_s.current=null,Y1(e,r),Yf(r,e),x1(ga),ai=!!ma,ga=ma=null,e.current=r,G1(r),jp(),A=s,U=l,Qe.transition=i}else e.current=r;if(bo&&(bo=!1,It=e,ki=o),i=e.pendingLanes,i===0&&(Vt=null),zp(r.stateNode),Ne(e,ne()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)o=t[r],n(o.value,{componentStack:o.stack,digest:o.digest});if(bi)throw bi=!1,e=Ra,Ra=null,e;return ki&1&&e.tag!==0&&Hr(),i=e.pendingLanes,i&1?e===Ia?Bn++:(Bn=0,Ia=e):Bn=0,Jt(),null}function Hr(){if(It!==null){var e=Nd(ki),t=Qe.transition,r=U;try{if(Qe.transition=null,U=16>e?16:e,It===null)var n=!1;else{if(e=It,It=null,ki=0,A&6)throw Error(z(331));var o=A;for(A|=4,N=e.current;N!==null;){var i=N,l=i.child;if(N.flags&16){var s=i.deletions;if(s!==null){for(var c=0;c<s.length;c++){var p=s[c];for(N=p;N!==null;){var y=N;switch(y.tag){case 0:case 11:case 15:Pn(8,y,i)}var w=y.child;if(w!==null)w.return=y,N=w;else for(;N!==null;){y=N;var f=y.sibling,x=y.return;if(Uf(y),y===p){N=null;break}if(f!==null){f.return=x,N=f;break}N=x}}}var k=i.alternate;if(k!==null){var j=k.child;if(j!==null){k.child=null;do{var C=j.sibling;j.sibling=null,j=C}while(j!==null)}}N=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,N=l;else e:for(;N!==null;){if(i=N,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Pn(9,i,i.return)}var h=i.sibling;if(h!==null){h.return=i.return,N=h;break e}N=i.return}}var d=e.current;for(N=d;N!==null;){l=N;var u=l.child;if(l.subtreeFlags&2064&&u!==null)u.return=l,N=u;else e:for(l=d;N!==null;){if(s=N,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Hi(9,s)}}catch(S){re(s,s.return,S)}if(s===l){N=null;break e}var g=s.sibling;if(g!==null){g.return=s.return,N=g;break e}N=s.return}}if(A=o,Jt(),pt&&typeof pt.onPostCommitFiberRoot=="function")try{pt.onPostCommitFiberRoot(_i,e)}catch{}n=!0}return n}finally{U=r,Qe.transition=t}}return!1}function nu(e,t,r){t=Gr(r,t),t=Tf(e,t,1),e=Ht(e,t,1),t=ke(),e!==null&&(eo(e,1,t),Ne(e,t))}function re(e,t,r){if(e.tag===3)nu(e,e,r);else for(;t!==null;){if(t.tag===3){nu(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Vt===null||!Vt.has(n))){e=Gr(r,e),e=_f(t,e,1),t=Ht(t,e,1),e=ke(),t!==null&&(eo(t,1,e),Ne(t,e));break}}t=t.return}}function eh(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=ke(),e.pingedLanes|=e.suspendedLanes&r,he===e&&(ge&r)===r&&(ce===4||ce===3&&(ge&130023424)===ge&&500>ne()-Rs?ir(e,0):Ms|=r),Ne(e,t)}function e0(e,t){t===0&&(e.mode&1?(t=fo,fo<<=1,!(fo&130023424)&&(fo=4194304)):t=1);var r=ke();e=Ct(e,t),e!==null&&(eo(e,t,r),Ne(e,r))}function th(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),e0(e,r)}function rh(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,o=e.memoizedState;o!==null&&(r=o.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(z(314))}n!==null&&n.delete(t),e0(e,r)}var t0;t0=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)ze=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return ze=!1,V1(e,t,r);ze=!!(e.flags&131072)}else ze=!1,X&&t.flags&1048576&&of(t,hi,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Wo(e,t),e=t.pendingProps;var o=Ur(t,Se.current);Ar(t,r),o=Es(null,t,n,e,o,r);var i=Bs();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Le(n)?(i=!0,fi(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,js(t),o.updater=Ai,t.stateNode=o,o._reactInternals=t,Ca(t,n,e,r),t=Pa(null,t,n,!0,i,r)):(t.tag=0,X&&i&&vs(t),be(null,t,o,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Wo(e,t),e=t.pendingProps,o=n._init,n=o(n._payload),t.type=n,o=t.tag=oh(n),e=Ze(n,e),o){case 0:t=za(null,t,n,e,r);break e;case 1:t=Yc(null,t,n,e,r);break e;case 11:t=Wc(null,t,n,e,r);break e;case 14:t=Qc(null,t,n,Ze(n.type,e),r);break e}throw Error(z(306,n,""))}return t;case 0:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Ze(n,o),za(e,t,n,o,r);case 1:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Ze(n,o),Yc(e,t,n,o,r);case 3:e:{if(Df(t),e===null)throw Error(z(387));n=t.pendingProps,i=t.memoizedState,o=i.element,df(e,t),vi(t,n,null,r);var l=t.memoizedState;if(n=l.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Gr(Error(z(423)),t),t=Gc(e,t,n,r,o);break e}else if(n!==o){o=Gr(Error(z(424)),t),t=Gc(e,t,n,r,o);break e}else for(Ie=At(t.stateNode.containerInfo.firstChild),De=t,X=!0,et=null,r=cf(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Wr(),n===o){t=$t(e,t,r);break e}be(e,t,n,r)}t=t.child}return t;case 5:return ff(t),e===null&&ba(t),n=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,va(n,o)?l=null:i!==null&&va(n,i)&&(t.flags|=32),If(e,t),be(e,t,l,r),t.child;case 6:return e===null&&ba(t),null;case 13:return Of(e,t,r);case 4:return Cs(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Qr(t,null,n,r):be(e,t,n,r),t.child;case 11:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Ze(n,o),Wc(e,t,n,o,r);case 7:return be(e,t,t.pendingProps,r),t.child;case 8:return be(e,t,t.pendingProps.children,r),t.child;case 12:return be(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,Y(mi,n._currentValue),n._currentValue=l,i!==null)if(ot(i.value,l)){if(i.children===o.children&&!Be.current){t=$t(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){l=i.child;for(var c=s.firstContext;c!==null;){if(c.context===n){if(i.tag===1){c=St(-1,r&-r),c.tag=2;var p=i.updateQueue;if(p!==null){p=p.shared;var y=p.pending;y===null?c.next=c:(c.next=y.next,y.next=c),p.pending=c}}i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),ka(i.return,r,t),s.lanes|=r;break}c=c.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(z(341));l.lanes|=r,s=l.alternate,s!==null&&(s.lanes|=r),ka(l,r,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}be(e,t,o.children,r),t=t.child}return t;case 9:return o=t.type,n=t.pendingProps.children,Ar(t,r),o=Ye(o),n=n(o),t.flags|=1,be(e,t,n,r),t.child;case 14:return n=t.type,o=Ze(n,t.pendingProps),o=Ze(n.type,o),Qc(e,t,n,o,r);case 15:return Mf(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Ze(n,o),Wo(e,t),t.tag=1,Le(n)?(e=!0,fi(t)):e=!1,Ar(t,r),Nf(t,n,o),Ca(t,n,o,r),Pa(null,t,n,!0,e,r);case 19:return Ff(e,t,r);case 22:return Rf(e,t,r)}throw Error(z(156,t.tag))};function r0(e,t){return Pd(e,t)}function nh(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function We(e,t,r,n){return new nh(e,t,r,n)}function Fs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function oh(e){if(typeof e=="function")return Fs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===is)return 11;if(e===ls)return 14}return 2}function Wt(e,t){var r=e.alternate;return r===null?(r=We(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Go(e,t,r,n,o,i){var l=2;if(n=e,typeof e=="function")Fs(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Cr:return lr(r.children,o,i,t);case os:l=8,o|=8;break;case Kl:return e=We(12,r,t,o|2),e.elementType=Kl,e.lanes=i,e;case Jl:return e=We(13,r,t,o),e.elementType=Jl,e.lanes=i,e;case Xl:return e=We(19,r,t,o),e.elementType=Xl,e.lanes=i,e;case dd:return Ui(r,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cd:l=10;break e;case ud:l=9;break e;case is:l=11;break e;case ls:l=14;break e;case Nt:l=16,n=null;break e}throw Error(z(130,e==null?e:typeof e,""))}return t=We(l,r,t,o),t.elementType=e,t.type=n,t.lanes=i,t}function lr(e,t,r,n){return e=We(7,e,n,t),e.lanes=r,e}function Ui(e,t,r,n){return e=We(22,e,n,t),e.elementType=dd,e.lanes=r,e.stateNode={isHidden:!1},e}function zl(e,t,r){return e=We(6,e,null,t),e.lanes=r,e}function Pl(e,t,r){return t=We(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ih(e,t,r,n,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=sl(0),this.expirationTimes=sl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=sl(0),this.identifierPrefix=n,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function As(e,t,r,n,o,i,l,s,c){return e=new ih(e,t,r,s,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=We(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},js(i),e}function lh(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:jr,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function n0(e){if(!e)return Yt;e=e._reactInternals;e:{if(gr(e)!==e||e.tag!==1)throw Error(z(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Le(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(z(171))}if(e.tag===1){var r=e.type;if(Le(r))return rf(e,r,t)}return t}function o0(e,t,r,n,o,i,l,s,c){return e=As(r,n,!0,e,o,i,l,s,c),e.context=n0(null),r=e.current,n=ke(),o=Ut(r),i=St(n,o),i.callback=t??null,Ht(r,i,o),e.current.lanes=o,eo(e,o,n),Ne(e,n),e}function Wi(e,t,r,n){var o=t.current,i=ke(),l=Ut(o);return r=n0(r),t.context===null?t.context=r:t.pendingContext=r,t=St(i,l),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=Ht(o,t,l),e!==null&&(rt(e,o,l,i),Ho(e,o,l)),l}function Ci(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ou(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Hs(e,t){ou(e,t),(e=e.alternate)&&ou(e,t)}function ah(){return null}var i0=typeof reportError=="function"?reportError:function(e){console.error(e)};function Vs(e){this._internalRoot=e}Qi.prototype.render=Vs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(z(409));Wi(e,t,null,null)};Qi.prototype.unmount=Vs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;hr(function(){Wi(null,e,null,null)}),t[jt]=null}};function Qi(e){this._internalRoot=e}Qi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Md();e={blockedOn:null,target:e,priority:t};for(var r=0;r<_t.length&&t!==0&&t<_t[r].priority;r++);_t.splice(r,0,e),r===0&&Id(e)}};function Us(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Yi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function iu(){}function sh(e,t,r,n,o){if(o){if(typeof n=="function"){var i=n;n=function(){var p=Ci(l);i.call(p)}}var l=o0(t,n,e,0,null,!1,!1,"",iu);return e._reactRootContainer=l,e[jt]=l.current,Fn(e.nodeType===8?e.parentNode:e),hr(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof n=="function"){var s=n;n=function(){var p=Ci(c);s.call(p)}}var c=As(e,0,!1,null,null,!1,!1,"",iu);return e._reactRootContainer=c,e[jt]=c.current,Fn(e.nodeType===8?e.parentNode:e),hr(function(){Wi(t,c,r,n)}),c}function Gi(e,t,r,n,o){var i=r._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var s=o;o=function(){var c=Ci(l);s.call(c)}}Wi(t,l,e,o)}else l=sh(r,t,e,o,n);return Ci(l)}Td=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=xn(t.pendingLanes);r!==0&&(cs(t,r|1),Ne(t,ne()),!(A&6)&&(Kr=ne()+500,Jt()))}break;case 13:hr(function(){var n=Ct(e,1);if(n!==null){var o=ke();rt(n,e,1,o)}}),Hs(e,1)}};us=function(e){if(e.tag===13){var t=Ct(e,134217728);if(t!==null){var r=ke();rt(t,e,134217728,r)}Hs(e,134217728)}};_d=function(e){if(e.tag===13){var t=Ut(e),r=Ct(e,t);if(r!==null){var n=ke();rt(r,e,t,n)}Hs(e,t)}};Md=function(){return U};Rd=function(e,t){var r=U;try{return U=e,t()}finally{U=r}};aa=function(e,t,r){switch(t){case"input":if(ea(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var o=Di(n);if(!o)throw Error(z(90));pd(n),ea(n,o)}}}break;case"textarea":md(e,r);break;case"select":t=r.value,t!=null&&Ir(e,!!r.multiple,t,!1)}};bd=Is;kd=hr;var ch={usingClientEntryPoint:!1,Events:[ro,Er,Di,wd,Sd,Is]},mn={findFiberByHostInstance:tr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},uh={bundleType:mn.bundleType,version:mn.version,rendererPackageName:mn.rendererPackageName,rendererConfig:mn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=$d(e),e===null?null:e.stateNode},findFiberByHostInstance:mn.findFiberByHostInstance||ah,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ko=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ko.isDisabled&&ko.supportsFiber)try{_i=ko.inject(uh),pt=ko}catch{}}Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ch;Fe.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Us(t))throw Error(z(200));return lh(e,t,null,r)};Fe.createRoot=function(e,t){if(!Us(e))throw Error(z(299));var r=!1,n="",o=i0;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=As(e,1,!1,null,null,r,!1,n,o),e[jt]=t.current,Fn(e.nodeType===8?e.parentNode:e),new Vs(t)};Fe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(z(188)):(e=Object.keys(e).join(","),Error(z(268,e)));return e=$d(t),e=e===null?null:e.stateNode,e};Fe.flushSync=function(e){return hr(e)};Fe.hydrate=function(e,t,r){if(!Yi(t))throw Error(z(200));return Gi(null,e,t,!0,r)};Fe.hydrateRoot=function(e,t,r){if(!Us(e))throw Error(z(405));var n=r!=null&&r.hydratedSources||null,o=!1,i="",l=i0;if(r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(l=r.onRecoverableError)),t=o0(t,null,e,1,r??null,o,!1,i,l),e[jt]=t.current,Fn(e),n)for(e=0;e<n.length;e++)r=n[e],o=r._getVersion,o=o(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,o]:t.mutableSourceEagerHydrationData.push(r,o);return new Qi(t)};Fe.render=function(e,t,r){if(!Yi(t))throw Error(z(200));return Gi(null,e,t,!1,r)};Fe.unmountComponentAtNode=function(e){if(!Yi(e))throw Error(z(40));return e._reactRootContainer?(hr(function(){Gi(null,null,e,!1,function(){e._reactRootContainer=null,e[jt]=null})}),!0):!1};Fe.unstable_batchedUpdates=Is;Fe.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Yi(r))throw Error(z(200));if(e==null||e._reactInternals===void 0)throw Error(z(38));return Gi(e,t,r,!1,n)};Fe.version="18.3.1-next-f1338f8080-20240426";function l0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l0)}catch(e){console.error(e)}}l0(),id.exports=Fe;var dh=id.exports,lu=dh;Yl.createRoot=lu.createRoot,Yl.hydrateRoot=lu.hydrateRoot;const a0=T.createContext(null),Fa=()=>!window.invokeNative,de=async(e,t={})=>{if(Fa())return{ok:!0};const r={method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify(t)},n=window.GetParentResourceName?window.GetParentResourceName():"peleg-billing";return await(await fetch(`https://${n}/${e}`,r)).json()},fh=({children:e})=>{const[t,r]=T.useState({showMenu:!1,showQuickBill:!1,cid:"",myBills:[],societyBills:[],billingHistory:[],showSocietyMenu:!1,showInspectCitizen:!1,canBill:!1,players:[],nearbyPlayers:[],selectedBill:null,selectedPlayer:null,selectedPlayerBills:[],isLoading:!1,localeValues:{},developmentMode:!1,showSelectedPlayerMenu:!1,isClosing:!1,jobAccess:!1,inspectCitizen:!1,billingStats:{}});T.useEffect(()=>{if(Fa()){const u={showMenu:!0,cid:"DUMMY12345",myBills:[{id:"bill1",amount:350,reason:"Medical Services",billedBy:{name:"Dr. Smith",job:"EMS"},date:"2023-05-15",time:"14:30",paid:!1},{id:"bill2",amount:120.75,reason:"Speeding Ticket",billedBy:{name:"Officer Johnson",job:"Police"},date:"2023-05-12",time:"09:45",paid:!1},{id:"bill3",amount:85.5,reason:"Vehicle Repair",billedBy:{name:"Mike's Mechanics",job:"Mechanic"},date:"2023-05-10",time:"16:20",paid:!0}],societyBills:[{id:"soc1",amount:560,reason:"Equipment Purchase",billedBy:{name:"Supply Co.",job:"Admin"},date:"2023-05-14",time:"11:15",paid:!0},{id:"soc2",amount:890.25,reason:"Building Maintenance",billedBy:{name:"City Services",job:"Maintenance"},date:"2023-05-09",time:"15:40",paid:!0}],billingHistory:[{id:"hist1",amount:230,reason:"Property Tax",billedBy:{name:"City Hall",job:"Government"},date:"2023-04-30",time:"10:00",paid:!0},{id:"hist2",amount:75,reason:"Weapons License",billedBy:{name:"Officer Williams",job:"Police"},date:"2023-04-25",time:"13:20",paid:!0}],nearbyPlayers:[{id:"player1",name:"John Doe",cid:"CID123456"},{id:"player2",name:"Jane Smith",cid:"CID789012"},{id:"player3",name:"Robert Johnson",cid:"CID345678"}],players:[{id:"player4",name:"Alice Williams",cid:"CID901234"},{id:"player5",name:"Bob Anderson",cid:"CID567890"},{id:"player6",name:"Carol Davis",cid:"CID234567"}],showSocietyMenu:!0,showInspectCitizen:!0,canBill:!0,localeValues:{billHub:"Bills",currencySymbol:"$",closeButton:"Close",myBillsLabel:"My Bills",myBillsHeading:"My Bills",noBillsAvailable:"No Bills Available",noBillsAvailableDescription:"You currently don't have any bills. Check back later!",paidStatus:"Paid",pendingStatus:"Pending",viewReceipt:"View Receipt",viewDetails:"View Details",historyLabel:"History",billingHistoryHeading:"Billing History",societyLabel:"Society",societyBillsHeading:"Society Bills",billPlayerLabel:"Bill Player",billPlayerHeading:"Bill Player",inspectLabel:"Inspect",inspectCitizenHeading:"Inspect Citizen"}};r(g=>({...g,...u}))}},[]),T.useEffect(()=>{const u=S=>{const{data:b}=S;if(b.type==="openMe"){const v=b.data;r($=>({...$,showMenu:!0,cid:v.cid||"",myBills:Array.isArray(v.myBills)?v.myBills:[],societyBills:Array.isArray(v.societyBills)?v.societyBills:[],billingHistory:Array.isArray(v.billingHistory)?v.billingHistory:[],showSocietyMenu:v.jobAccess||!1,showInspectCitizen:v.inspectCitizen||!1,canBill:v.canBill||!1,localeValues:v.locale||{}}))}else if(b.type==="openQuickBill"){const v=b.data;r($=>({...$,showQuickBill:!0,localeValues:(v==null?void 0:v.locale)||{}}))}else if(b.type==="updatePlayerBills")r(v=>({...v,selectedPlayerBills:Array.isArray(b.bills)?b.bills:[],showSelectedPlayerMenu:!0,showMenu:!0}));else if(b.type==="updateBillingStats")r(v=>({...v,billingStats:b.stats||{}}));else if(b.type==="billStatusUpdated"){const v=b.bill;if(!v||!v.id)return;r($=>{const R={...$};return R.myBills=$.myBills.map(L=>L.id===v.id?v:L),(v.status==="canceled"||v.status==="refunded")&&$.myBills.some(L=>L.id===v.id)&&(R.myBills=$.myBills.filter(L=>L.id!==v.id),$.billingHistory.some(L=>L.id===v.id)||(R.billingHistory=[v,...$.billingHistory])),R.societyBills=$.societyBills.map(L=>L.id===v.id?v:L),R.billingHistory=$.billingHistory.map(L=>L.id===v.id?v:L),R.selectedPlayerBills=$.selectedPlayerBills.map(L=>L.id===v.id?v:L),$.selectedBill&&$.selectedBill.id===v.id&&(R.selectedBill=v),v.status!=="pending"&&($.myBills.some(L=>L.id===v.id)||$.societyBills.some(L=>L.id===v.id))&&(Fa()?setTimeout(()=>{de("peleg-billing:callback:getBillingStats",{societyMode:$.showSocietyMenu})},500):de("peleg-billing:callback:getBillingStats",{societyMode:$.showSocietyMenu})),R})}},g=S=>{S.key==="Escape"&&(t.selectedBill?(r(b=>({...b,selectedBill:null})),S.preventDefault()):t.selectedPlayer&&t.showSelectedPlayerMenu?(r(b=>({...b,showSelectedPlayerMenu:!1,selectedPlayer:null,selectedPlayerBills:[],showMenu:!0})),S.preventDefault()):t.showMenu&&(i(),S.preventDefault()))};return window.addEventListener("message",u),window.addEventListener("keydown",g),()=>{window.removeEventListener("message",u),window.removeEventListener("keydown",g)}},[t.showMenu,t.selectedBill,t.selectedPlayer,t.showSelectedPlayerMenu]);const n=T.useCallback(async()=>{try{r(g=>({...g,isLoading:!0}));const u=await de("peleg-billing:callback:getNearbyPlayers");Array.isArray(u)?r(g=>({...g,nearbyPlayers:u.map(S=>({id:S.id,name:S.name||"Unknown",cid:S.cid||S.id}))})):u&&Array.isArray(u.players)?r(g=>({...g,nearbyPlayers:u.players.map(S=>({id:S.id,name:S.name||"Unknown",cid:S.cid||S.id}))})):r(g=>({...g,nearbyPlayers:[]}))}catch(u){console.error("Error fetching nearby players:",u),r(g=>({...g,nearbyPlayers:[]}))}finally{r(u=>({...u,isLoading:!1}))}},[]),o=async u=>{r(g=>({...g,isLoading:!0}));try{const g=await de("peleg-billing:callback:getOnlinePlayers",{query:u});r(S=>({...S,players:Array.isArray(g)?g:[],isLoading:!1}))}catch(g){console.error("Error fetching online players:",g),r(S=>({...S,isLoading:!1}))}},i=()=>{r(u=>({...u,isClosing:!0})),de("peleg-billing:callback:close",{}),setTimeout(()=>{r(u=>({...u,showMenu:!1,isClosing:!1}))},300)},l=()=>{r(u=>({...u,showQuickBill:!1}));try{de("peleg-billing:callback:closeQuickBill")}catch(u){console.error("Error closing QuickBill UI:",u)}},s=async u=>{const g=t.myBills.find(S=>S.id===u);if(g)try{(await de("peleg-billing:callback:checkBalance",{amount:g.amount})).hasEnough?await de("peleg-billing:callback:payBill",{billId:u,payFromJobAccount:!1})==="ok"&&(r(v=>({...v,myBills:v.myBills.filter($=>$.id!==u),billingHistory:[...v.billingHistory,{...g,paid:!0}],selectedBill:null})),de("peleg-billing:callback:notify",{title:"Success",message:"Bill paid successfully",type:"success"})):de("peleg-billing:callback:notify",{title:"Error",message:"You do not have enough money to pay this bill",type:"error"})}catch(S){console.error("Error paying bill:",S),de("peleg-billing:callback:notify",{title:"Error",message:"Failed to pay the bill",type:"error"})}},c=async(u,g,S)=>{if(!(!u||!g||!S))try{await de("peleg-billing:callback:billPlayer",{cid:u,reason:g,amount:parseFloat(S.toString())})==="ok"&&(r(v=>({...v,selectedPlayer:null})),de("peleg-billing:callback:notify",{title:"Success",message:"Bill sent successfully",type:"success"}))}catch(b){console.error("Error billing player:",b),de("peleg-billing:callback:notify",{title:"Error",message:"Failed to send bill",type:"error"})}},p=T.useCallback(async(u,g,S)=>{try{return r(b=>({...b,isLoading:!0})),await de("peleg-billing:callback:quickBillPlayer",{cid:u,reason:g,amount:S}),r(b=>({...b,isLoading:!1})),setTimeout(()=>{r(b=>({...b,showQuickBill:!1}));try{de("peleg-billing:callback:closeQuickBill")}catch(b){console.error("Error closing UI:",b)}},300),!0}catch(b){return console.error("Failed to quick bill player:",b),r(v=>({...v,isLoading:!1})),setTimeout(()=>{r(v=>({...v,showQuickBill:!1}));try{de("peleg-billing:callback:closeQuickBill")}catch(v){console.error("Error closing UI:",v)}},300),!1}},[]),y=u=>{r(g=>({...g,selectedBill:u}))},w=u=>{r(g=>({...g,selectedPlayer:u}))},f=()=>{r(u=>({...u,selectedPlayer:null}))},x=async u=>{try{const g=t.players.find(S=>S.cid===u||S.id===u)||{id:u,name:"Player "+u,cid:u};r(S=>({...S,selectedPlayer:g,showSelectedPlayerMenu:!0,showMenu:!0}));try{await de("peleg-billing:callback:fetchPlayerBills",{cid:u}),setTimeout(()=>{t.selectedPlayerBills.length===0&&r(S=>({...S,selectedPlayerBills:[{id:"dummy1",amount:150,reason:"Fine",billedBy:{name:"System",job:"police"},date:new Date().toISOString().split("T")[0],time:new Date().toTimeString().split(" ")[0].substring(0,5),paid:!1}],showMenu:!0}))},2e3)}catch(S){console.error("Error fetching player bills:",S),r(b=>({...b,selectedPlayerBills:[{id:"dummy1",amount:150,reason:"Fine",billedBy:{name:"System",job:"police"},date:new Date().toISOString().split("T")[0],time:new Date().toTimeString().split(" ")[0].substring(0,5),paid:!1}],showMenu:!0}))}}catch(g){console.error("Critical error in fetchPlayerBills:",g),r(S=>({...S,showSelectedPlayerMenu:!0,selectedPlayer:{id:u,name:"Player "+u,cid:u},selectedPlayerBills:[{id:"dummy-fallback",amount:100,reason:"System Fine",billedBy:{name:"System",job:"admin"},date:new Date().toISOString().split("T")[0],time:new Date().toTimeString().split(" ")[0].substring(0,5),paid:!1}],showMenu:!0}))}},k=(u,g="")=>t.localeValues[u]||g,j=()=>{t.developmentMode?r(u=>({...u,developmentMode:!1})):C()},C=()=>{const u={myBills:[{id:"bill1",amount:350,reason:"Medical Services",billedBy:{name:"Dr. Smith",job:"EMS"},date:"2023-05-15",time:"14:30",paid:!1},{id:"bill2",amount:120.75,reason:"Speeding Ticket",billedBy:{name:"Officer Johnson",job:"Police"},date:"2023-05-12",time:"09:45",paid:!1},{id:"bill3",amount:85.5,reason:"Vehicle Repair",billedBy:{name:"Mike's Mechanics",job:"Mechanic"},date:"2023-05-10",time:"16:20",paid:!0}],societyBills:[{id:"soc1",amount:560,reason:"Equipment Purchase",billedBy:{name:"Supply Co.",job:"Admin"},date:"2023-05-14",time:"11:15",paid:!0},{id:"soc2",amount:890.25,reason:"Building Maintenance",billedBy:{name:"City Services",job:"Maintenance"},date:"2023-05-09",time:"15:40",paid:!0}],billingHistory:[{id:"hist1",amount:230,reason:"Property Tax",billedBy:{name:"City Hall",job:"Government"},date:"2023-04-30",time:"10:00",paid:!0},{id:"hist2",amount:75,reason:"Weapons License",billedBy:{name:"Officer Williams",job:"Police"},date:"2023-04-25",time:"13:20",paid:!0}],nearbyPlayers:[{id:"player1",name:"John Doe",cid:"CID123456"},{id:"player2",name:"Jane Smith",cid:"CID789012"},{id:"player3",name:"Robert Johnson",cid:"CID345678"}],players:[{id:"player4",name:"Alice Williams",cid:"CID901234"},{id:"player5",name:"Bob Anderson",cid:"CID567890"},{id:"player6",name:"Carol Davis",cid:"CID234567"}],showSocietyMenu:!0,showInspectCitizen:!0,canBill:!0};r(g=>({...g,developmentMode:!0,myBills:u.myBills,societyBills:u.societyBills,billingHistory:u.billingHistory,nearbyPlayers:u.nearbyPlayers,players:u.players,showSocietyMenu:u.showSocietyMenu,showInspectCitizen:u.showInspectCitizen,canBill:u.canBill}))},h=T.useCallback(()=>{r(u=>({...u,showSelectedPlayerMenu:!1,selectedPlayer:null,selectedPlayerBills:[]}))},[]),d={...t,fetchNearbyPlayers:n,fetchOnlinePlayers:o,closeUI:i,closeQuickBill:l,payBill:s,billPlayer:c,quickBillPlayer:p,selectBill:y,selectPlayer:w,clearSelectedPlayer:f,fetchPlayerBills:x,getLocale:k,toggleDummyMode:j,setState:r,closePlayerBills:h};return a.jsx(a0.Provider,{value:d,children:e})},Te=()=>{const e=T.useContext(a0);if(!e)throw new Error("useNui must be used within a NuiProvider");return e};var Pe=function(){return Pe=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},Pe.apply(this,arguments)};function Kn(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,i;n<o;n++)(i||!(n in t))&&(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var K="-ms-",Ln="-moz-",V="-webkit-",s0="comm",Ki="rule",Ws="decl",ph="@import",c0="@keyframes",hh="@layer",u0=Math.abs,Qs=String.fromCharCode,Aa=Object.assign;function mh(e,t){return pe(e,0)^45?(((t<<2^pe(e,0))<<2^pe(e,1))<<2^pe(e,2))<<2^pe(e,3):0}function d0(e){return e.trim()}function vt(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,r){return e.replace(t,r)}function Ko(e,t,r){return e.indexOf(t,r)}function pe(e,t){return e.charCodeAt(t)|0}function Jr(e,t,r){return e.slice(t,r)}function ut(e){return e.length}function f0(e){return e.length}function Sn(e,t){return t.push(e),e}function gh(e,t){return e.map(t).join("")}function au(e,t){return e.filter(function(r){return!vt(r,t)})}var Ji=1,Xr=1,p0=0,Ke=0,ie=0,ln="";function Xi(e,t,r,n,o,i,l,s){return{value:e,root:t,parent:r,type:n,props:o,children:i,line:Ji,column:Xr,length:l,return:"",siblings:s}}function Lt(e,t){return Aa(Xi("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function yr(e){for(;e.root;)e=Lt(e.root,{children:[e]});Sn(e,e.siblings)}function vh(){return ie}function yh(){return ie=Ke>0?pe(ln,--Ke):0,Xr--,ie===10&&(Xr=1,Ji--),ie}function nt(){return ie=Ke<p0?pe(ln,Ke++):0,Xr++,ie===10&&(Xr=1,Ji++),ie}function ar(){return pe(ln,Ke)}function Jo(){return Ke}function Zi(e,t){return Jr(ln,e,t)}function Ha(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function xh(e){return Ji=Xr=1,p0=ut(ln=e),Ke=0,[]}function wh(e){return ln="",e}function El(e){return d0(Zi(Ke-1,Va(e===91?e+2:e===40?e+1:e)))}function Sh(e){for(;(ie=ar())&&ie<33;)nt();return Ha(e)>2||Ha(ie)>3?"":" "}function bh(e,t){for(;--t&&nt()&&!(ie<48||ie>102||ie>57&&ie<65||ie>70&&ie<97););return Zi(e,Jo()+(t<6&&ar()==32&&nt()==32))}function Va(e){for(;nt();)switch(ie){case e:return Ke;case 34:case 39:e!==34&&e!==39&&Va(ie);break;case 40:e===41&&Va(e);break;case 92:nt();break}return Ke}function kh(e,t){for(;nt()&&e+ie!==57;)if(e+ie===84&&ar()===47)break;return"/*"+Zi(t,Ke-1)+"*"+Qs(e===47?e:nt())}function jh(e){for(;!Ha(ar());)nt();return Zi(e,Ke)}function Ch(e){return wh(Xo("",null,null,null,[""],e=xh(e),0,[0],e))}function Xo(e,t,r,n,o,i,l,s,c){for(var p=0,y=0,w=l,f=0,x=0,k=0,j=1,C=1,h=1,d=0,u="",g=o,S=i,b=n,v=u;C;)switch(k=d,d=nt()){case 40:if(k!=108&&pe(v,w-1)==58){Ko(v+=O(El(d),"&","&\f"),"&\f",u0(p?s[p-1]:0))!=-1&&(h=-1);break}case 34:case 39:case 91:v+=El(d);break;case 9:case 10:case 13:case 32:v+=Sh(k);break;case 92:v+=bh(Jo()-1,7);continue;case 47:switch(ar()){case 42:case 47:Sn($h(kh(nt(),Jo()),t,r,c),c);break;default:v+="/"}break;case 123*j:s[p++]=ut(v)*h;case 125*j:case 59:case 0:switch(d){case 0:case 125:C=0;case 59+y:h==-1&&(v=O(v,/\f/g,"")),x>0&&ut(v)-w&&Sn(x>32?cu(v+";",n,r,w-1,c):cu(O(v," ","")+";",n,r,w-2,c),c);break;case 59:v+=";";default:if(Sn(b=su(v,t,r,p,y,o,s,u,g=[],S=[],w,i),i),d===123)if(y===0)Xo(v,t,b,b,g,i,w,s,S);else switch(f===99&&pe(v,3)===110?100:f){case 100:case 108:case 109:case 115:Xo(e,b,b,n&&Sn(su(e,b,b,0,0,o,s,u,o,g=[],w,S),S),o,S,w,s,n?g:S);break;default:Xo(v,b,b,b,[""],S,0,s,S)}}p=y=x=0,j=h=1,u=v="",w=l;break;case 58:w=1+ut(v),x=k;default:if(j<1){if(d==123)--j;else if(d==125&&j++==0&&yh()==125)continue}switch(v+=Qs(d),d*j){case 38:h=y>0?1:(v+="\f",-1);break;case 44:s[p++]=(ut(v)-1)*h,h=1;break;case 64:ar()===45&&(v+=El(nt())),f=ar(),y=w=ut(u=v+=jh(Jo())),d++;break;case 45:k===45&&ut(v)==2&&(j=0)}}return i}function su(e,t,r,n,o,i,l,s,c,p,y,w){for(var f=o-1,x=o===0?i:[""],k=f0(x),j=0,C=0,h=0;j<n;++j)for(var d=0,u=Jr(e,f+1,f=u0(C=l[j])),g=e;d<k;++d)(g=d0(C>0?x[d]+" "+u:O(u,/&\f/g,x[d])))&&(c[h++]=g);return Xi(e,t,r,o===0?Ki:s,c,p,y,w)}function $h(e,t,r,n){return Xi(e,t,r,s0,Qs(vh()),Jr(e,2,-2),0,n)}function cu(e,t,r,n,o){return Xi(e,t,r,Ws,Jr(e,0,n),Jr(e,n+1,-1),n,o)}function h0(e,t,r){switch(mh(e,t)){case 5103:return V+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return V+e+e;case 4789:return Ln+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return V+e+Ln+e+K+e+e;case 5936:switch(pe(e,t+11)){case 114:return V+e+K+O(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return V+e+K+O(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return V+e+K+O(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return V+e+K+e+e;case 6165:return V+e+K+"flex-"+e+e;case 5187:return V+e+O(e,/(\w+).+(:[^]+)/,V+"box-$1$2"+K+"flex-$1$2")+e;case 5443:return V+e+K+"flex-item-"+O(e,/flex-|-self/g,"")+(vt(e,/flex-|baseline/)?"":K+"grid-row-"+O(e,/flex-|-self/g,""))+e;case 4675:return V+e+K+"flex-line-pack"+O(e,/align-content|flex-|-self/g,"")+e;case 5548:return V+e+K+O(e,"shrink","negative")+e;case 5292:return V+e+K+O(e,"basis","preferred-size")+e;case 6060:return V+"box-"+O(e,"-grow","")+V+e+K+O(e,"grow","positive")+e;case 4554:return V+O(e,/([^-])(transform)/g,"$1"+V+"$2")+e;case 6187:return O(O(O(e,/(zoom-|grab)/,V+"$1"),/(image-set)/,V+"$1"),e,"")+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,V+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,V+"box-pack:$3"+K+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+V+e+e;case 4200:if(!vt(e,/flex-|baseline/))return K+"grid-column-align"+Jr(e,t)+e;break;case 2592:case 3360:return K+O(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,vt(n.props,/grid-\w+-end/)})?~Ko(e+(r=r[t].value),"span",0)?e:K+O(e,"-start","")+e+K+"grid-row-span:"+(~Ko(r,"span",0)?vt(r,/\d+/):+vt(r,/\d+/)-+vt(e,/\d+/))+";":K+O(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return vt(n.props,/grid-\w+-start/)})?e:K+O(O(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,V+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ut(e)-1-t>6)switch(pe(e,t+1)){case 109:if(pe(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,"$1"+V+"$2-$3$1"+Ln+(pe(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ko(e,"stretch",0)?h0(O(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,i,l,s,c,p){return K+o+":"+i+p+(l?K+o+"-span:"+(s?c:+c-+i)+p:"")+e});case 4949:if(pe(e,t+6)===121)return O(e,":",":"+V)+e;break;case 6444:switch(pe(e,pe(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+V+(pe(e,14)===45?"inline-":"")+"box$3$1"+V+"$2$3$1"+K+"$2box$3")+e;case 100:return O(e,":",":"+K)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,"scroll-","scroll-snap-")+e}return e}function $i(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function zh(e,t,r,n){switch(e.type){case hh:if(e.children.length)break;case ph:case Ws:return e.return=e.return||e.value;case s0:return"";case c0:return e.return=e.value+"{"+$i(e.children,n)+"}";case Ki:if(!ut(e.value=e.props.join(",")))return""}return ut(r=$i(e.children,n))?e.return=e.value+"{"+r+"}":""}function Ph(e){var t=f0(e);return function(r,n,o,i){for(var l="",s=0;s<t;s++)l+=e[s](r,n,o,i)||"";return l}}function Eh(e){return function(t){t.root||(t=t.return)&&e(t)}}function Bh(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Ws:e.return=h0(e.value,e.length,r);return;case c0:return $i([Lt(e,{value:O(e.value,"@","@"+V)})],n);case Ki:if(e.length)return gh(r=e.props,function(o){switch(vt(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":yr(Lt(e,{props:[O(o,/:(read-\w+)/,":"+Ln+"$1")]})),yr(Lt(e,{props:[o]})),Aa(e,{props:au(r,n)});break;case"::placeholder":yr(Lt(e,{props:[O(o,/:(plac\w+)/,":"+V+"input-$1")]})),yr(Lt(e,{props:[O(o,/:(plac\w+)/,":"+Ln+"$1")]})),yr(Lt(e,{props:[O(o,/:(plac\w+)/,K+"input-$1")]})),yr(Lt(e,{props:[o]})),Aa(e,{props:au(r,n)});break}return""})}}var Lh={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Me={},Zr=typeof process<"u"&&Me!==void 0&&(Me.REACT_APP_SC_ATTR||Me.SC_ATTR)||"data-styled",m0="active",g0="data-styled-version",qi="6.1.16",Ys=`/*!sc*/
`,zi=typeof window<"u"&&"HTMLElement"in window,Nh=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Me!==void 0&&Me.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Me.REACT_APP_SC_DISABLE_SPEEDY!==""?Me.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Me.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Me!==void 0&&Me.SC_DISABLE_SPEEDY!==void 0&&Me.SC_DISABLE_SPEEDY!==""&&Me.SC_DISABLE_SPEEDY!=="false"&&Me.SC_DISABLE_SPEEDY),el=Object.freeze([]),qr=Object.freeze({});function Th(e,t,r){return r===void 0&&(r=qr),e.theme!==r.theme&&e.theme||t||r.theme}var v0=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),_h=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Mh=/(^-|-$)/g;function uu(e){return e.replace(_h,"-").replace(Mh,"")}var Rh=/(a)(d)/gi,jo=52,du=function(e){return String.fromCharCode(e+(e>25?39:97))};function Ua(e){var t,r="";for(t=Math.abs(e);t>jo;t=t/jo|0)r=du(t%jo)+r;return(du(t%jo)+r).replace(Rh,"$1-$2")}var Bl,y0=5381,Rr=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},x0=function(e){return Rr(y0,e)};function w0(e){return Ua(x0(e)>>>0)}function Ih(e){return e.displayName||e.name||"Component"}function Ll(e){return typeof e=="string"&&!0}var S0=typeof Symbol=="function"&&Symbol.for,b0=S0?Symbol.for("react.memo"):60115,Dh=S0?Symbol.for("react.forward_ref"):60112,Oh={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Fh={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},k0={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Ah=((Bl={})[Dh]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Bl[b0]=k0,Bl);function fu(e){return("type"in(t=e)&&t.type.$$typeof)===b0?k0:"$$typeof"in e?Ah[e.$$typeof]:Oh;var t}var Hh=Object.defineProperty,Vh=Object.getOwnPropertyNames,pu=Object.getOwnPropertySymbols,Uh=Object.getOwnPropertyDescriptor,Wh=Object.getPrototypeOf,hu=Object.prototype;function j0(e,t,r){if(typeof t!="string"){if(hu){var n=Wh(t);n&&n!==hu&&j0(e,n,r)}var o=Vh(t);pu&&(o=o.concat(pu(t)));for(var i=fu(e),l=fu(t),s=0;s<o.length;++s){var c=o[s];if(!(c in Fh||r&&r[c]||l&&c in l||i&&c in i)){var p=Uh(t,c);try{Hh(e,c,p)}catch{}}}}return e}function en(e){return typeof e=="function"}function Gs(e){return typeof e=="object"&&"styledComponentId"in e}function or(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Wa(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function Jn(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Qa(e,t,r){if(r===void 0&&(r=!1),!r&&!Jn(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=Qa(e[n],t[n]);else if(Jn(t))for(var n in t)e[n]=Qa(e[n],t[n]);return e}function Ks(e,t){Object.defineProperty(e,"toString",{value:t})}function oo(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Qh=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,i=o;t>=i;)if((i<<=1)<0)throw oo(16,"".concat(t));this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var l=o;l<i;l++)this.groupSizes[l]=0}for(var s=this.indexOfGroup(t+1),c=(l=0,r.length);l<c;l++)this.tag.insertRule(s,r[l])&&(this.groupSizes[t]++,s++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var i=n;i<o;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),i=o+n,l=o;l<i;l++)r+="".concat(this.tag.getRule(l)).concat(Ys);return r},e}(),Zo=new Map,Pi=new Map,qo=1,Co=function(e){if(Zo.has(e))return Zo.get(e);for(;Pi.has(qo);)qo++;var t=qo++;return Zo.set(e,t),Pi.set(t,e),t},Yh=function(e,t){qo=t+1,Zo.set(e,t),Pi.set(t,e)},Gh="style[".concat(Zr,"][").concat(g0,'="').concat(qi,'"]'),Kh=new RegExp("^".concat(Zr,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Jh=function(e,t,r){for(var n,o=r.split(","),i=0,l=o.length;i<l;i++)(n=o[i])&&e.registerName(t,n)},Xh=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Ys),o=[],i=0,l=n.length;i<l;i++){var s=n[i].trim();if(s){var c=s.match(Kh);if(c){var p=0|parseInt(c[1],10),y=c[2];p!==0&&(Yh(y,p),Jh(e,y,c[3]),e.getTag().insertRules(p,o)),o.length=0}else o.push(s)}}},mu=function(e){for(var t=document.querySelectorAll(Gh),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(Zr)!==m0&&(Xh(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Zh(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var C0=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(s){var c=Array.from(s.querySelectorAll("style[".concat(Zr,"]")));return c[c.length-1]}(r),i=o!==void 0?o.nextSibling:null;n.setAttribute(Zr,m0),n.setAttribute(g0,qi);var l=Zh();return l&&n.setAttribute("nonce",l),r.insertBefore(n,i),n},qh=function(){function e(t){this.element=C0(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,i=n.length;o<i;o++){var l=n[o];if(l.ownerNode===r)return l}throw oo(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),em=function(){function e(t){this.element=C0(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),tm=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),gu=zi,rm={isServer:!zi,useCSSOMInjection:!Nh},$0=function(){function e(t,r,n){t===void 0&&(t=qr),r===void 0&&(r={});var o=this;this.options=Pe(Pe({},rm),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&zi&&gu&&(gu=!1,mu(this)),Ks(this,function(){return function(i){for(var l=i.getTag(),s=l.length,c="",p=function(w){var f=function(h){return Pi.get(h)}(w);if(f===void 0)return"continue";var x=i.names.get(f),k=l.getGroup(w);if(x===void 0||!x.size||k.length===0)return"continue";var j="".concat(Zr,".g").concat(w,'[id="').concat(f,'"]'),C="";x!==void 0&&x.forEach(function(h){h.length>0&&(C+="".concat(h,","))}),c+="".concat(k).concat(j,'{content:"').concat(C,'"}').concat(Ys)},y=0;y<s;y++)p(y);return c}(o)})}return e.registerId=function(t){return Co(t)},e.prototype.rehydrate=function(){!this.server&&zi&&mu(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(Pe(Pe({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new tm(o):n?new qh(o):new em(o)}(this.options),new Qh(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(Co(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Co(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Co(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),nm=/&/g,om=/^\s*\/\/.*$/gm;function z0(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=z0(r.children,t)),r})}function im(e){var t,r,n,o=qr,i=o.options,l=i===void 0?qr:i,s=o.plugins,c=s===void 0?el:s,p=function(f,x,k){return k.startsWith(r)&&k.endsWith(r)&&k.replaceAll(r,"").length>0?".".concat(t):f},y=c.slice();y.push(function(f){f.type===Ki&&f.value.includes("&")&&(f.props[0]=f.props[0].replace(nm,r).replace(n,p))}),l.prefix&&y.push(Bh),y.push(zh);var w=function(f,x,k,j){x===void 0&&(x=""),k===void 0&&(k=""),j===void 0&&(j="&"),t=j,r=x,n=new RegExp("\\".concat(r,"\\b"),"g");var C=f.replace(om,""),h=Ch(k||x?"".concat(k," ").concat(x," { ").concat(C," }"):C);l.namespace&&(h=z0(h,l.namespace));var d=[];return $i(h,Ph(y.concat(Eh(function(u){return d.push(u)})))),d};return w.hash=c.length?c.reduce(function(f,x){return x.name||oo(15),Rr(f,x.name)},y0).toString():"",w}var lm=new $0,Ya=im(),P0=Ee.createContext({shouldForwardProp:void 0,styleSheet:lm,stylis:Ya});P0.Consumer;Ee.createContext(void 0);function vu(){return T.useContext(P0)}var E0=function(){function e(t,r){var n=this;this.inject=function(o,i){i===void 0&&(i=Ya);var l=n.name+i.hash;o.hasNameForId(n.id,l)||o.insertRules(n.id,l,i(n.rules,l,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Ks(this,function(){throw oo(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Ya),this.name+t.hash},e}(),am=function(e){return e>="A"&&e<="Z"};function yu(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;am(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var B0=function(e){return e==null||e===!1||e===""},L0=function(e){var t,r,n=[];for(var o in e){var i=e[o];e.hasOwnProperty(o)&&!B0(i)&&(Array.isArray(i)&&i.isCss||en(i)?n.push("".concat(yu(o),":"),i,";"):Jn(i)?n.push.apply(n,Kn(Kn(["".concat(o," {")],L0(i),!1),["}"],!1)):n.push("".concat(yu(o),": ").concat((t=o,(r=i)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in Lh||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function sr(e,t,r,n){if(B0(e))return[];if(Gs(e))return[".".concat(e.styledComponentId)];if(en(e)){if(!en(i=e)||i.prototype&&i.prototype.isReactComponent||!t)return[e];var o=e(t);return sr(o,t,r,n)}var i;return e instanceof E0?r?(e.inject(r,n),[e.getName(n)]):[e]:Jn(e)?L0(e):Array.isArray(e)?Array.prototype.concat.apply(el,e.map(function(l){return sr(l,t,r,n)})):[e.toString()]}function sm(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(en(r)&&!Gs(r))return!1}return!0}var cm=x0(qi),um=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&sm(t),this.componentId=r,this.baseHash=Rr(cm,r),this.baseStyle=n,$0.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=or(o,this.staticRulesId);else{var i=Wa(sr(this.rules,t,r,n)),l=Ua(Rr(this.baseHash,i)>>>0);if(!r.hasNameForId(this.componentId,l)){var s=n(i,".".concat(l),void 0,this.componentId);r.insertRules(this.componentId,l,s)}o=or(o,l),this.staticRulesId=l}else{for(var c=Rr(this.baseHash,n.hash),p="",y=0;y<this.rules.length;y++){var w=this.rules[y];if(typeof w=="string")p+=w;else if(w){var f=Wa(sr(w,t,r,n));c=Rr(c,f+y),p+=f}}if(p){var x=Ua(c>>>0);r.hasNameForId(this.componentId,x)||r.insertRules(this.componentId,x,n(p,".".concat(x),void 0,this.componentId)),o=or(o,x)}}return o},e}(),N0=Ee.createContext(void 0);N0.Consumer;var Nl={};function dm(e,t,r){var n=Gs(e),o=e,i=!Ll(e),l=t.attrs,s=l===void 0?el:l,c=t.componentId,p=c===void 0?function(g,S){var b=typeof g!="string"?"sc":uu(g);Nl[b]=(Nl[b]||0)+1;var v="".concat(b,"-").concat(w0(qi+b+Nl[b]));return S?"".concat(S,"-").concat(v):v}(t.displayName,t.parentComponentId):c,y=t.displayName,w=y===void 0?function(g){return Ll(g)?"styled.".concat(g):"Styled(".concat(Ih(g),")")}(e):y,f=t.displayName&&t.componentId?"".concat(uu(t.displayName),"-").concat(t.componentId):t.componentId||p,x=n&&o.attrs?o.attrs.concat(s).filter(Boolean):s,k=t.shouldForwardProp;if(n&&o.shouldForwardProp){var j=o.shouldForwardProp;if(t.shouldForwardProp){var C=t.shouldForwardProp;k=function(g,S){return j(g,S)&&C(g,S)}}else k=j}var h=new um(r,f,n?o.componentStyle:void 0);function d(g,S){return function(b,v,$){var R=b.attrs,L=b.componentStyle,oe=b.defaultProps,te=b.foldedComponentIds,ue=b.styledComponentId,B=b.target,P=Ee.useContext(N0),M=vu(),H=b.shouldForwardProp||M.shouldForwardProp,E=Th(v,P,oe)||qr,_=function(Pt,_e,mt){for(var an,Zt=Pe(Pe({},_e),{className:void 0,theme:mt}),rl=0;rl<Pt.length;rl+=1){var io=en(an=Pt[rl])?an(Zt):an;for(var Et in io)Zt[Et]=Et==="className"?or(Zt[Et],io[Et]):Et==="style"?Pe(Pe({},Zt[Et]),io[Et]):io[Et]}return _e.className&&(Zt.className=or(Zt.className,_e.className)),Zt}(R,v,E),I=_.as||B,W={};for(var Q in _)_[Q]===void 0||Q[0]==="$"||Q==="as"||Q==="theme"&&_.theme===E||(Q==="forwardedAs"?W.as=_.forwardedAs:H&&!H(Q,I)||(W[Q]=_[Q]));var Xt=function(Pt,_e){var mt=vu(),an=Pt.generateAndInjectStyles(_e,mt.styleSheet,mt.stylis);return an}(L,_),Je=or(te,ue);return Xt&&(Je+=" "+Xt),_.className&&(Je+=" "+_.className),W[Ll(I)&&!v0.has(I)?"class":"className"]=Je,$&&(W.ref=$),T.createElement(I,W)}(u,g,S)}d.displayName=w;var u=Ee.forwardRef(d);return u.attrs=x,u.componentStyle=h,u.displayName=w,u.shouldForwardProp=k,u.foldedComponentIds=n?or(o.foldedComponentIds,o.styledComponentId):"",u.styledComponentId=f,u.target=n?o.target:e,Object.defineProperty(u,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(g){this._foldedDefaultProps=n?function(S){for(var b=[],v=1;v<arguments.length;v++)b[v-1]=arguments[v];for(var $=0,R=b;$<R.length;$++)Qa(S,R[$],!0);return S}({},o.defaultProps,g):g}}),Ks(u,function(){return".".concat(u.styledComponentId)}),i&&j0(u,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),u}function xu(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var wu=function(e){return Object.assign(e,{isCss:!0})};function le(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(en(e)||Jn(e))return wu(sr(xu(el,Kn([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?sr(n):wu(sr(xu(n,t)))}function Ga(e,t,r){if(r===void 0&&(r=qr),!t)throw oo(1,t);var n=function(o){for(var i=[],l=1;l<arguments.length;l++)i[l-1]=arguments[l];return e(t,r,le.apply(void 0,Kn([o],i,!1)))};return n.attrs=function(o){return Ga(e,t,Pe(Pe({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return Ga(e,t,Pe(Pe({},r),o))},n}var T0=function(e){return Ga(dm,e)},m=T0;v0.forEach(function(e){m[e]=T0(e)});function it(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Wa(le.apply(void 0,Kn([e],t,!1))),o=w0(n);return new E0(o,n)}var _0={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Su=Ee.createContext&&Ee.createContext(_0),fm=["attr","size","title"];function pm(e,t){if(e==null)return{};var r=hm(e,t),n,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function hm(e,t){if(e==null)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function Ei(){return Ei=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Ei.apply(this,arguments)}function bu(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Bi(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?bu(Object(r),!0).forEach(function(n){mm(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):bu(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function mm(e,t,r){return t=gm(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function gm(e){var t=vm(e,"string");return typeof t=="symbol"?t:t+""}function vm(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function M0(e){return e&&e.map((t,r)=>Ee.createElement(t.tag,Bi({key:r},t.attr),M0(t.child)))}function D(e){return t=>Ee.createElement(ym,Ei({attr:Bi({},e.attr)},t),M0(e.child))}function ym(e){var t=r=>{var{attr:n,size:o,title:i}=e,l=pm(e,fm),s=o||r.size||"1em",c;return r.className&&(c=r.className),e.className&&(c=(c?c+" ":"")+e.className),Ee.createElement("svg",Ei({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,n,l,{className:c,style:Bi(Bi({color:e.color||r.color},r.style),e.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),i&&Ee.createElement("title",null,i),e.children)};return Su!==void 0?Ee.createElement(Su.Consumer,null,r=>t(r)):t(_0)}function xm(e){return D({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"},child:[]}]})(e)}function wm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"},child:[]}]})(e)}function Sm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"},child:[]}]})(e)}function ft(e){return D({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"},child:[]}]})(e)}function Li(e){return D({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"},child:[]}]})(e)}function bm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 159.5L288 216l-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1L96 248v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z"},child:[]}]})(e)}function Ka(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"},child:[]}]})(e)}function gn(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"},child:[]}]})(e)}function ku(e){return D({attr:{viewBox:"0 0 544 512"},child:[{tag:"path",attr:{d:"M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"},child:[]}]})(e)}function R0(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"},child:[]}]})(e)}function km(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},child:[]}]})(e)}function jm(e){return D({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"},child:[]}]})(e)}function I0(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"},child:[]}]})(e)}function ju(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"},child:[]}]})(e)}function Cm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},child:[]}]})(e)}function $m(e){return D({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},child:[]}]})(e)}function zm(e){return D({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"},child:[]}]})(e)}function Ni(e){return D({attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 80v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8zm144 263.88V440c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-24.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V232c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v24.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07z"},child:[]}]})(e)}function Pm(e){return D({attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M288 256H96v64h192v-64zm89-151L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-200v96c0 8.84-7.16 16-16 16H80c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z"},child:[]}]})(e)}function Em(e){return D({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"},child:[]}]})(e)}function ei(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"},child:[]}]})(e)}function Bm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"},child:[]}]})(e)}function ti(e){return D({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z"},child:[]}]})(e)}function Cu(e){return D({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"},child:[]}]})(e)}function Lm(e){return D({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"},child:[]}]})(e)}function Nm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"},child:[]}]})(e)}function Tm(e){return D({attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"},child:[]}]})(e)}function tl(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(e)}function _m(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"},child:[]}]})(e)}function Mm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"},child:[]}]})(e)}function $o(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"},child:[]}]})(e)}function zo(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"},child:[]}]})(e)}function D0(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"},child:[]}]})(e)}function Rm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z"},child:[]}]})(e)}function Im(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"},child:[]}]})(e)}function Dm(e){return D({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"},child:[]}]})(e)}function Om(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"},child:[]}]})(e)}function Xn(e){return D({attr:{viewBox:"0 0 352 512"},child:[{tag:"path",attr:{d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"},child:[]}]})(e)}function Fm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"},child:[]}]})(e)}function Am(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"},child:[]}]})(e)}function Hm(e){return D({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"},child:[]}]})(e)}function Vm(e){return D({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(e)}function $u(e){return D({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M633.8 458.1L362.3 248.3C412.1 230.7 448 183.8 448 128 448 57.3 390.7 0 320 0c-67.1 0-121.5 51.8-126.9 117.4L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3zM96 422.4V464c0 26.5 21.5 48 48 48h350.2L207.4 290.3C144.2 301.3 96 356 96 422.4z"},child:[]}]})(e)}function cr(e){return D({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(e)}const Um=m.div`
  width: 260px;
  height: 100%;
  background-color: rgba(17, 24, 39, 0.98);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
`,Wm=m.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(to right, rgba(75, 85, 99, 0.1), transparent);

  svg {
    font-size: 1.8rem;
    color: var(--text-primary);
    opacity: 0.9;
  }

  span {
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--text-primary);
  }
`,Qm=m.nav`
  padding: 1rem 0;
  flex: 1;
`,xr=m.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.5rem;
  width: 100%;
  background: ${e=>e.active?"rgba(31, 41, 55, 0.6)":"transparent"};
  border: none;
  border-left: 3px solid ${e=>e.active?"rgba(255, 255, 255, 0.2)":"transparent"};
  color: ${e=>e.active?"var(--text-primary)":"var(--text-secondary)"};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(31, 41, 55, 0.4);
    color: var(--text-primary);

    svg {
      color: var(--text-primary);
      transform: translateY(-1px);
    }
  }

  svg {
    font-size: 1.1rem;
    min-width: 1.1rem;
    color: ${e=>e.active?"var(--text-primary)":"var(--text-secondary)"};
    transition: all 0.2s ease;
  }

  span {
    font-weight: 500;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${e=>e.active?"100%":"0"};
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`,Ym=m.div`
  padding: 0.75rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);

  svg {
    color: var(--text-light);
    opacity: 0.7;
    font-size: 0.9rem;
  }
`,Gm=({currentView:e,setView:t})=>{const{showSocietyMenu:r,showInspectCitizen:n,canBill:o,getLocale:i}=Te();return a.jsxs(Um,{children:[a.jsxs(Wm,{children:[a.jsx(Ni,{}),a.jsx("span",{children:i("billHub","Bills")})]}),a.jsxs(Qm,{children:[a.jsxs(xr,{active:e==="myBills",onClick:()=>t("myBills"),children:[a.jsx(Pm,{}),a.jsx("span",{children:i("myBillsLabel","My Bills")})]}),a.jsxs(xr,{active:e==="billingHistory",onClick:()=>t("billingHistory"),children:[a.jsx(ei,{}),a.jsx("span",{children:i("historyLabel","History")})]}),a.jsxs(xr,{active:e==="billingStats",onClick:()=>t("billingStats"),children:[a.jsx(Ka,{}),a.jsx("span",{children:i("statsLabel","Stats")})]}),r&&a.jsxs(xr,{active:e==="societyBills",onClick:()=>t("societyBills"),children:[a.jsx(ft,{}),a.jsx("span",{children:i("societyLabel","Society")})]}),o&&a.jsxs(xr,{active:e==="billPlayer",onClick:()=>t("billPlayer"),children:[a.jsx(Vm,{}),a.jsx("span",{children:i("billPlayerLabel","Bill Player")})]}),n&&a.jsxs(xr,{active:e==="inspectCitizen",onClick:()=>t("inspectCitizen"),children:[a.jsx(tl,{}),a.jsx("span",{children:i("inspectLabel","Inspect")})]})]}),a.jsxs(Ym,{children:[a.jsx(_m,{}),a.jsx("span",{children:"v1.0.3 • Connected to Server"})]})]})},Km=m.div`
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  border: 1px solid var(--border-color);
  cursor: pointer;
  
  ${({$status:e})=>e==="paid"&&`
    border-left: 3px solid var(--success-color);
  `}
  
  ${({$status:e})=>e==="pending"&&`
    border-left: 3px solid var(--warning-color);
  `}
  
  ${({$status:e})=>e==="canceled"&&`
    border-left: 3px solid var(--danger-color);
  `}
  
  ${({$status:e})=>e==="refunded"&&`
    border-left: 3px solid var(--info-color);
  `}
  
  ${({$type:e})=>e==="history"&&`
    border-left: 3px solid var(--accent-color);
  `}
  
  ${({$type:e})=>e==="society"&&`
    border-left: 3px solid var(--warning-color);
  `}
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow);
  }
`,Jm=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border-color);
`,Xm=m.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
`,Zm=m.div`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  ${({$status:e})=>{switch(e){case"paid":return`
          background-color: rgba(5, 150, 105, 0.15);
          color: var(--success-color);
        `;case"pending":return`
          background-color: rgba(217, 119, 6, 0.15);
          color: var(--warning-color);
        `;case"canceled":return`
          background-color: rgba(220, 38, 38, 0.15);
          color: var(--danger-color);
        `;case"refunded":return`
          background-color: rgba(59, 130, 246, 0.15);
          color: var(--info-color);
        `;default:return`
          background-color: rgba(217, 119, 6, 0.15);
          color: var(--warning-color);
        `}}}
  
  &::before {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({$status:e})=>{switch(e){case"paid":return"var(--success-color)";case"pending":return"var(--warning-color)";case"canceled":return"var(--danger-color)";case"refunded":return"var(--info-color)";default:return"var(--warning-color)"}}};
  }
`,qm=m.div`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 3rem;
  background-color: rgba(100, 116, 139, 0.15);
  color: var(--text-secondary);
`,e2=m.div`
  padding: 1rem;
  background-color: var(--card-bg);
`,t2=m.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
`,Tl=m.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  
  svg {
    color: var(--text-light);
    min-width: 1rem;
  }
`,r2=m.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.1);
`,n2=m.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({$status:e})=>{switch(e){case"paid":return"var(--success-color)";case"pending":return"var(--accent-color)";case"canceled":return"var(--danger-color)";case"refunded":return"var(--info-color)";default:return"var(--accent-color)"}}};
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  svg {
    font-size: 1rem;
  }
`,Js=({bill:e,onClick:t,type:r="default"})=>{const{getLocale:n}=Te(),i=(l=>l.status?l.status:l.refunded?"refunded":l.canceled?"canceled":l.paid?"paid":"pending")(e);return a.jsxs(Km,{$type:r,$status:i,onClick:t,children:[a.jsxs(Jm,{children:[a.jsxs(Xm,{children:[n("currencySymbol","$"),typeof e.amount=="string"?parseFloat(e.amount).toFixed(2):typeof e.amount=="number"?e.amount.toFixed(2):"0.00"]}),r==="default"&&a.jsxs(Zm,{$status:i,children:[i==="paid"&&n("paidStatus","Paid"),i==="pending"&&n("pendingStatus","Pending"),i==="canceled"&&n("canceledStatus","Canceled"),i==="refunded"&&n("refundedStatus","Refunded")]}),r!=="default"&&a.jsx(qm,{children:e.date})]}),a.jsxs(e2,{children:[a.jsx(t2,{children:e.reason}),a.jsxs(Tl,{children:[a.jsx(Sm,{}),a.jsxs("span",{children:[n("fromLabel","From:")," ",e.billedBy.job]})]}),a.jsxs(Tl,{children:[a.jsx(cr,{}),a.jsxs("span",{children:[n("byLabel","By:")," ",e.billedBy.name]})]}),a.jsxs(Tl,{children:[a.jsx(Li,{}),a.jsxs("span",{children:[e.date," | ",e.time]})]})]}),a.jsx(r2,{children:a.jsxs(n2,{$status:i,children:[i==="paid"&&a.jsx(R0,{}),i==="pending"&&a.jsx(Bm,{}),i==="canceled"&&a.jsx(Om,{}),i==="refunded"&&a.jsx(Fm,{}),i==="paid"?n("viewReceipt","View Receipt"):i==="canceled"?n("viewCanceledBill","View Canceled Bill"):i==="refunded"?n("viewRefundedBill","View Refunded Bill"):n("viewDetails","View Details")]})})]})},o2=m.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: ${({$compact:e})=>e?"4px":"6px"};
  padding: ${({$compact:e})=>e?"0.25rem 0.5rem":"0.4rem 0.6rem"};
  margin-bottom: ${({$compact:e})=>e?"0.5rem":"1rem"};
  width: 100%;
  max-width: 500px;
  transition: all 0.15s ease;
`,i2=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  margin-right: 0.4rem;
  font-size: ${({$compact:e})=>e?"0.75rem":"0.85rem"};
  opacity: 0.7;
`,l2=m.input`
  flex: 1;
  border: none;
  background: none;
  font-size: ${({$compact:e})=>e?"0.8rem":"0.85rem"};
  padding: ${({$compact:e})=>e?"0.15rem 0":"0.2rem 0"};
  
`,a2=m.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
  padding: ${({$compact:e})=>e?"0.15rem":"0.2rem"};
  margin-left: 0.3rem;
  font-size: ${({$compact:e})=>e?"0.7rem":"0.8rem"};
  opacity: 0.7;
  border-radius: 50%;
  
  &:hover {
    color: var(--text-primary);
    opacity: 1;
  }
`,tn=({value:e,onChange:t,onClear:r,placeholder:n="Search...",compact:o=!1,...i})=>a.jsxs(o2,{$compact:o,children:[a.jsx(i2,{$compact:o,children:a.jsx(tl,{})}),a.jsx(l2,{type:"text",value:e,onChange:t,placeholder:n,$compact:o,...i}),e&&r&&a.jsx(a2,{onClick:r,type:"button",$compact:o,children:a.jsx(Xn,{})})]}),bt=({icon:e,title:t,description:r,className:n,actionButton:o,transparent:i=!1})=>a.jsxs(s2,{className:n,children:[a.jsxs(c2,{children:[a.jsx(d2,{children:e}),a.jsx(f2,{children:t}),r&&a.jsx(p2,{children:r}),o&&a.jsx(h2,{children:o})]}),!i&&a.jsx(u2,{})]}),s2=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  position: relative;
  min-height: 300px;
  width: 100%;
  margin: 1rem auto;
  border-radius: 12px;
  overflow: hidden;
`,c2=m.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  max-width: 500px;
`,u2=m.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 32, 44, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--shadow);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(75, 85, 99, 0.15) 0%,
      transparent 70%
    );
    z-index: -1;
  }
`,d2=m.div`
  font-size: 3rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 2px solid var(--accent-color);
    animation: pulse 3s infinite ease-in-out;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.15); opacity: 0.5; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  svg {
    height: 2.5rem;
    width: 2.5rem;
    color: var(--text-secondary);
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4));
  }
`,f2=m.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,p2=m.p`
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 30rem;
  line-height: 1.7;
  opacity: 0.9;
`,h2=m.div`
  margin-top: 2rem;
`,m2=e=>{switch(e){case"primary":return le`
        background-color: var(--primary-color);
        color: white;
        &:hover:not(:disabled) {
          background-color: var(--primary-hover);
        }
      `;case"secondary":return le`
        background-color: var(--secondary-color);
        color: white;
        &:hover:not(:disabled) {
          background-color: var(--secondary-hover);
        }
      `;case"success":return le`
        background-color: var(--success-color);
        color: white;
        &:hover:not(:disabled) {
          filter: brightness(90%);
        }
      `;case"warning":return le`
        background-color: var(--warning-color);
        color: white;
        &:hover:not(:disabled) {
          filter: brightness(90%);
        }
      `;case"danger":return le`
        background-color: var(--danger-color);
        color: white;
        &:hover:not(:disabled) {
          filter: brightness(90%);
        }
      `;case"ghost":return le`
        background-color: transparent;
        color: var(--text-primary);
        &:hover:not(:disabled) {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `;default:return""}},g2=e=>{switch(e){case"small":return le`
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
      `;case"medium":return le`
        padding: 0.6rem 1.2rem;
        font-size: 0.95rem;
      `;case"large":return le`
        padding: 0.8rem 1.6rem;
        font-size: 1.1rem;
      `;default:return""}},v2=m.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${e=>e.$fullWidth?"100%":"auto"};

  ${e=>m2(e.$variant)}
  ${e=>g2(e.$size)}

  ${e=>e.$iconPosition==="right"&&le`
      flex-direction: row-reverse;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }
`,Ja=({variant:e="primary",size:t="medium",icon:r,iconPosition:n="left",fullWidth:o=!1,children:i,...l})=>a.jsxs(v2,{$variant:e,$size:t,$fullWidth:o,$hasIcon:!!r,$iconPosition:n,...l,children:[r&&r,i]}),y2=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,x2=m.div`
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,w2=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
`,S2=m.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
`,b2=m.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-primary);
  }
`,k2=m.div`
  padding: 1.5rem;
`,wr=m.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Sr=m.span`
  font-weight: 500;
  color: var(--text-secondary);
  width: 120px;
  flex-shrink: 0;
`,br=m.span`
  color: var(--text-primary);
  flex: 1;
  
  ${({$isPaid:e})=>e!==void 0&&`
    color: ${e?"var(--success-color)":"var(--warning-color)"};
    font-weight: 600;
  `}
`,j2=m.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.02);
`,C2=({billId:e,onClose:t})=>{const{myBills:r,payBill:n,getLocale:o}=Te(),i=r.find(s=>s.id===e);if(!i)return null;const l=()=>{n(e),t()};return a.jsx(y2,{onClick:t,children:a.jsxs(x2,{onClick:s=>s.stopPropagation(),children:[a.jsxs(w2,{children:[a.jsx(S2,{children:o("billDetailsHeading","Bill Details")}),a.jsx(b2,{onClick:t,children:a.jsx(Xn,{})})]}),a.jsxs(k2,{children:[a.jsxs(wr,{children:[a.jsx(Sr,{children:o("amountLabel","Amount:")}),a.jsxs(br,{children:[o("currencySymbol","$"),typeof i.amount=="string"?parseFloat(i.amount).toFixed(2):typeof i.amount=="number"?i.amount.toFixed(2):"0.00"]})]}),a.jsxs(wr,{children:[a.jsx(Sr,{children:o("reasonLabel","Reason:")}),a.jsx(br,{children:i.reason})]}),a.jsxs(wr,{children:[a.jsx(Sr,{children:o("sentByLabel","Sent by:")}),a.jsx(br,{children:i.billedBy.job})]}),a.jsxs(wr,{children:[a.jsx(Sr,{children:o("billedByLabel","Billed by:")}),a.jsx(br,{children:i.billedBy.name})]}),a.jsxs(wr,{children:[a.jsx(Sr,{children:o("dateLabel","Date:")}),a.jsxs(br,{children:[i.date," | ",i.time]})]}),a.jsxs(wr,{children:[a.jsx(Sr,{children:o("statusLabel","Status:")}),a.jsx(br,{$isPaid:i.status==="paid"||i.paid,children:i.status==="canceled"?o("canceledStatus","Canceled"):i.status==="refunded"?o("refundedStatus","Refunded"):i.status==="paid"||i.paid?o("paidStatus","Paid"):o("pendingStatus","Pending")})]})]}),a.jsxs(j2,{children:[!i.paid&&i.status!=="canceled"&&i.status!=="refunded"&&a.jsx(Ja,{variant:"success",icon:a.jsx(km,{}),onClick:l,children:o("markAsPaidButton","Mark as Paid")}),a.jsx(Ja,{variant:"ghost",icon:a.jsx(Xn,{}),onClick:t,children:o("closeButton","Close")})]})]})})},$2=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  
  /* Fix scrolling container */
  & > *:not(:last-child) {
    flex-shrink: 0;
  }
`,z2=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`,P2=m.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
`,E2=m.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  padding: 0.5rem;
  
  /* Better scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,B2=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 100%;
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  
  /* Ensure grid items don't exceed container width */
  & > * {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5rem;
  }
`,L2=({hideHeader:e=!1})=>{const{myBills:t,getLocale:r,selectBill:n}=Te(),[o,i]=T.useState(""),[l,s]=T.useState(!1),[c,p]=T.useState(null),y=t.filter(x=>{const k=o.toLowerCase();return x.reason.toLowerCase().includes(k)||x.billedBy.name.toLowerCase().includes(k)||x.billedBy.job.toLowerCase().includes(k)||x.amount.toString().includes(k)||x.date.toLowerCase().includes(k)}),w=x=>{const k=t.find(j=>j.id===x);k&&(n(k),p(x),s(!0))},f=()=>{s(!1),p(null)};return a.jsxs($2,{children:[!e&&a.jsxs(z2,{children:[a.jsx(P2,{children:r("myBillsHeading","My Bills")}),a.jsx(tn,{value:o,onChange:x=>i(x.target.value),onClear:()=>i(""),placeholder:r("searchBills","Search bills...")})]}),a.jsx(E2,{children:t.length===0?a.jsx(bt,{icon:a.jsx(Em,{}),title:r("noBillsAvailable","No Bills Available"),description:r("noBillsAvailableDescription","You currently don't have any bills. Check back later!")}):a.jsx(B2,{children:y.map(x=>a.jsx(Js,{bill:x,onClick:()=>w(x.id)},x.id))})}),l&&c&&a.jsx(C2,{billId:c,onClose:f})]})},N2=it`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`,T2=it`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`,_2=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${e=>e.$isClosing?T2:N2} 0.3s ease;
  pointer-events: ${e=>e.$isClosing?"none":"all"};
`,M2=m.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 6px;
  width: 450px;
  max-width: 95%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color, #374151);
`,R2=m.div`
  background-color: var(--primary-color, #2d3748);
  padding: 0.85rem;
  text-align: center;
  position: relative;
  border-bottom: 1px solid var(--border-color, #374151);
`,I2=m.h2`
  color: var(--text-primary);
  margin: 0 0 0.25rem;
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1rem;
    color: var(--primary-color);
  }
`,D2=m.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-color, #4a5568);
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--secondary-hover, #2d3748);
  }
  
  svg {
    font-size: 0.8rem;
  }
`,O2=m.div`
  opacity: 0.7;
  color: var(--text-secondary);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    font-size: 0.75rem;
  }
`,F2=m.div`
  padding: 1rem;
`,A2=m.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`,H2=m.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  background-color: ${e=>{switch(e.$status){case"paid":return"rgba(46, 204, 113, 0.15)";case"pending":return"rgba(241, 196, 15, 0.15)";case"canceled":return"rgba(231, 76, 60, 0.15)";case"refunded":return"rgba(52, 152, 219, 0.15)";default:return"rgba(255, 255, 255, 0.1)"}}};
  
  color: ${e=>{switch(e.$status){case"paid":return"var(--success-color)";case"pending":return"var(--warning-color)";case"canceled":return"var(--danger-color)";case"refunded":return"var(--info-color)";default:return"var(--text-primary)"}}};
  
  border: 1px solid ${e=>{switch(e.$status){case"paid":return"rgba(46, 204, 113, 0.3)";case"pending":return"rgba(241, 196, 15, 0.3)";case"canceled":return"rgba(231, 76, 60, 0.3)";case"refunded":return"rgba(52, 152, 219, 0.3)";default:return"rgba(255, 255, 255, 0.1)"}}};
`,V2=m.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-color, #374151);
`,_l=m.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ml=m.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: var(--secondary-color, #4a5568);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: var(--text-secondary);
  flex-shrink: 0;
  
  svg {
    font-size: 0.8rem;
  }
`,Rl=m.div`
  flex: 1;
`,Il=m.div`
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 1px;
`,Dl=m.div`
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
`,U2=m.div`
  margin-bottom: 0.75rem;
`,W2=m.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    font-size: 0.75rem;
  }
`,Q2=m.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 4px;
  padding: 0.75rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  border: 1px solid var(--border-color, #374151);
`,Y2=m.div`
  background-color: var(--secondary-color, #4a5568);
  border-radius: 4px;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border-color, #374151);
`,G2=m.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }
`,K2=m.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${e=>e.$status==="canceled"?"var(--danger-color)":"var(--primary-color)"};
  ${e=>e.$status==="canceled"&&"text-decoration: line-through;"}
`,J2=m.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`,Ol=m.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0.6rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: ${e=>{switch(e.$variant){case"primary":return"var(--primary-color)";case"warning":return"#e67e22";case"danger":return"#e74c3c";default:return"var(--primary-color)"}}};
  
  color: white;
  
  &:hover {
    filter: brightness(1.15);
  }
  
  svg {
    font-size: 0.85rem;
  }
`,X2=m.div`
  text-align: center;
  margin-top: 0.25rem;
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-style: italic;
`,Xs=({bill:e,isClosing:t,onClose:r,onRefund:n,onCancel:o,onViewPlayer:i,showActions:l=!0})=>{const{getLocale:s}=Te(),p=(f=>f.status?f.status:f.refunded?"refunded":f.canceled?"canceled":f.paid?"paid":"pending")(e),y=f=>{const x=typeof f=="string"?parseFloat(f):f;return isNaN(x)?`${s("currencySymbol","$")}0.00`:`${s("currencySymbol","$")}${x.toFixed(2)}`},w=()=>a.jsxs(M2,{onClick:f=>f.stopPropagation(),children:[a.jsxs(R2,{children:[a.jsxs(I2,{children:[a.jsx(Ni,{}),s("receiptTitle","Bill Details")]}),a.jsxs(O2,{children:[a.jsx(Li,{})," ",e.date," ",a.jsx(I0,{})," ",e.time]}),a.jsx(D2,{onClick:f=>{f.stopPropagation(),r()},children:a.jsx(Xn,{})})]}),a.jsxs(F2,{children:[a.jsx(A2,{children:a.jsxs(H2,{$status:p,children:[p==="paid"&&s("paidStatus","Paid"),p==="pending"&&s("pendingStatus","Pending"),p==="canceled"&&s("canceledStatus","Canceled"),p==="refunded"&&s("refundedStatus","Refunded")]})}),e.canceled_by&&p==="canceled"&&a.jsxs(X2,{children:[s("canceledByLabel","Canceled by"),": ",e.canceled_by]}),a.jsxs(V2,{children:[a.jsxs(_l,{children:[a.jsx(Ml,{children:a.jsx(ft,{})}),a.jsxs(Rl,{children:[a.jsx(Il,{children:s("fromLabel","From")}),a.jsx(Dl,{children:e.billedBy.job})]})]}),a.jsxs(_l,{children:[a.jsx(Ml,{children:a.jsx(cr,{})}),a.jsxs(Rl,{children:[a.jsx(Il,{children:s("byLabel","By")}),a.jsx(Dl,{children:e.billedBy.name})]})]}),e.receiver&&a.jsxs(_l,{children:[a.jsx(Ml,{children:a.jsx(cr,{})}),a.jsxs(Rl,{children:[a.jsx(Il,{children:s("toLabel","To")}),a.jsx(Dl,{children:e.receiver})]})]})]}),a.jsxs(U2,{children:[a.jsxs(W2,{children:[a.jsx(Im,{})," ",s("reason","Reason")]}),a.jsx(Q2,{children:e.reason})]}),a.jsxs(Y2,{children:[a.jsxs(G2,{children:[a.jsx(ti,{}),s("totalAmount","Total")]}),a.jsx(K2,{$status:p,children:y(e.amount)})]}),l&&a.jsxs(J2,{children:[p==="paid"&&n&&a.jsxs(Ol,{$variant:"warning",onClick:f=>{f.stopPropagation(),n(e.id)},children:[a.jsx(Am,{}),s("refundLabel","Refund")]}),p==="pending"&&o&&a.jsxs(Ol,{$variant:"danger",onClick:f=>{f.stopPropagation(),o(e.id)},children:[a.jsx(wm,{}),s("cancelLabel","Cancel")]}),e.receiver_cid&&i&&a.jsxs(Ol,{$variant:"primary",onClick:f=>{f.stopPropagation(),i(e)},children:[a.jsx(cr,{}),s("viewPlayerButton","View Player")]})]})]})]});return a.jsx(_2,{$isClosing:t,onClick:f=>{f.preventDefault(),f.stopPropagation(),r()},children:w()})},Z2=m.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  
  /* Fix scrolling container */
  & > *:not(:last-child) {
    flex-shrink: 0;
  }
`,q2=m.div`
  margin-bottom: 1.5rem;
`,eg=m.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`,tg=m.div`
  margin-bottom: 0.75rem;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div {
    border: none;
  }
`,rg=m.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  /* Better scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,ng=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  /* Ensure grid items don't exceed container width */
  & > * {
    width: 100%;
    max-width: 100%;
  }
`,zu=m(bt)`
  margin-top: -20px;
`,og=({hideHeader:e=!1})=>{const{billingHistory:t,isLoading:r,getLocale:n}=Te(),[o,i]=T.useState(""),[l,s]=T.useState(null),[c,p]=T.useState(!1),y=t.filter(x=>{const k=o.toLowerCase();return x.reason.toLowerCase().includes(k)||x.billedBy.name.toLowerCase().includes(k)||x.amount.toString().includes(k)}),w=x=>{s(x)},f=()=>{p(!0),setTimeout(()=>{s(null),p(!1)},300)};return a.jsxs(Z2,{children:[!e&&a.jsx(q2,{children:a.jsxs(eg,{children:[a.jsx(ei,{}),n("billHistoryTitle","Bill History")]})}),a.jsx(tg,{children:a.jsx(tn,{value:o,onChange:x=>i(x.target.value),onClear:()=>i(""),placeholder:n("searchBills","Search bill history...")})}),a.jsx(rg,{children:r?a.jsx(zu,{icon:a.jsx(ei,{}),title:n("loading","Loading...")}):y.length===0?a.jsx(zu,{icon:a.jsx(ei,{}),title:n("noBillHistoryFound","No bill history found"),description:n("noBillHistoryFoundDesc","You don't have any bill history yet")}):a.jsx(ng,{children:y.map(x=>a.jsx(Js,{bill:x,type:"history",onClick:()=>w(x)},x.id))})}),l&&a.jsx(Xs,{bill:l,isClosing:c,onClose:f,showActions:!1})]})},Fl=m.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  
  /* Fix scrolling container */
  & > *:not(:last-child) {
    flex-shrink: 0;
  }
`,ig=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div > div {
    border: none;
  }
`,lg=m.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
`,ag=m.div`
  margin-bottom: 0.75rem;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div {
    border: none;
  }
`,sg=m.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
  
  /* Better scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,cg=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  /* Ensure grid items don't exceed container width */
  & > * {
    width: 100%;
    max-width: 100%;
  }
`,ug=m(bt)`
  margin-top: -20px;
`,dg=({hideHeader:e=!1})=>{const{societyBills:t,getLocale:r,fetchPlayerBills:n}=Te(),[o,i]=T.useState(""),[l,s]=T.useState(null),[c,p]=T.useState(!1),[y,w]=T.useState(!1);if(T.useEffect(()=>{w(!1)},[]),!t)return a.jsx(Fl,{children:a.jsx(bt,{icon:a.jsx(ft,{}),title:"Error Loading Bills",description:"Unable to load society bills. Please try again later."})});let f=[];try{f=t.filter(d=>{if(!d)return!1;try{const u=o.toLowerCase(),g=d.reason&&typeof d.reason=="string"?d.reason.toLowerCase().includes(u):!1,S=d.billedBy&&d.billedBy.name&&typeof d.billedBy.name=="string"?d.billedBy.name.toLowerCase().includes(u):!1,b=d.amount!==void 0?d.amount.toString().includes(u):!1,v=d.date&&typeof d.date=="string"?d.date.toLowerCase().includes(u):!1;return g||S||b||v}catch(u){return console.error("Error filtering bill:",u),!1}})}catch(d){console.error("Error in SocietyBills component:",d),w(!0)}const x=d=>{s(d)},k=()=>{p(!0),setTimeout(()=>{s(null),p(!1)},300)},j=d=>{d.receiver_cid&&n(d.receiver_cid),k()},C=d=>{const u=window.GetParentResourceName?window.GetParentResourceName():"peleg-billing";fetch(`https://${u}/peleg-billing:callback:refundBill`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({billId:d})}).then(g=>g.json()).then(g=>{g==="ok"&&k()})},h=d=>{const u=window.GetParentResourceName?window.GetParentResourceName():"peleg-billing";fetch(`https://${u}/peleg-billing:callback:cancelBill`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({billId:d})}).then(g=>g.json()).then(g=>{g==="ok"&&k()})};return y?a.jsx(Fl,{children:a.jsx(bt,{icon:a.jsx(ft,{}),title:"Error Loading Bills",description:"An error occurred while loading society bills. Please try again later."})}):a.jsxs(Fl,{children:[!e&&a.jsxs(ig,{children:[a.jsx(lg,{children:r("societyBillsHeading","Organization Finances")}),a.jsx(tn,{value:o,onChange:d=>i(d.target.value),onClear:()=>i(""),placeholder:r("searchSocietyBills","Search society bills...")})]}),e&&a.jsx(ag,{children:a.jsx(tn,{value:o,onChange:d=>i(d.target.value),onClear:()=>i(""),placeholder:r("searchSocietyBills","Search society bills...")})}),a.jsx(sg,{children:!t||t.length===0?a.jsx(ug,{icon:a.jsx(ft,{}),title:r("noSocietyBills","No Society Bills"),description:r("noSocietyBillsDescription","There are currently no society bills available. Check again later!")}):a.jsx(cg,{children:f.map(d=>a.jsx(Js,{bill:d,type:"society",onClick:()=>x(d)},d.id))})}),l&&a.jsx(Xs,{bill:l,isClosing:c,onClose:k,onRefund:C,onCancel:h,onViewPlayer:j})]})},fg=e=>{switch(e){case"small":return le`
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
      `;case"medium":return le`
        padding: 0.6rem 1rem;
        font-size: 0.95rem;
      `;case"large":return le`
        padding: 0.8rem 1.2rem;
        font-size: 1.1rem;
      `;default:return""}},pg=m.div`
  display: flex;
  flex-direction: column;
  width: ${e=>e.$fullWidth?"100%":"auto"};
  margin-bottom: 1rem;
`,hg=m.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
`,mg=m.div`
  position: relative;
  display: flex;
  align-items: center;
`,gg=m.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid ${e=>e.$hasError?"var(--danger-color)":"var(--border-color)"};
  background-color: var(--card-bg);
  color: var(--text-primary);
  ${e=>fg(e.$size)}
  padding-left: ${e=>e.$hasIcon&&e.$iconPosition==="left"?"2.5rem":""};
  padding-right: ${e=>e.$hasIcon&&e.$iconPosition==="right"?"2.5rem":""};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    background-color: var(--background-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`,vg=m.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${e=>e.$position==="left"?"left: 0.8rem;":"right: 0.8rem;"}
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
`,yg=m.p`
  margin-top: 0.4rem;
  color: var(--danger-color);
  font-size: 0.8rem;
`,Pu=({label:e,error:t,icon:r,iconPosition:n="left",size:o="medium",fullWidth:i=!1,...l})=>a.jsxs(pg,{$fullWidth:i,children:[e&&a.jsx(hg,{children:e}),a.jsxs(mg,{children:[r&&a.jsx(vg,{$position:n,children:r}),a.jsx(gg,{$size:o,$hasError:!!t,$hasIcon:!!r,$iconPosition:n,...l})]}),t&&a.jsx(yg,{children:t})]}),xg=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
  position: relative;
  
  .min-h-auto {
    min-height: 585px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .billing-empty-state {
    min-height: 585px;
  }
`,wg=m.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%; 
  max-height: 775px;
  gap: 0.75rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`,Sg=m.div`
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 775px;
`,Eu=m.div`
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Bu=m.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  svg {
    color: var(--primary-color);
  }
`,bg=m.div`
  padding: 0.6rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-color);
  
  & > div {
    margin-bottom: 0;
    border: none;
  }
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
`,kg=m.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  overflow-y: auto;
  padding: 0.75rem 0.5rem;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }
`,jg=m.div`
  background: ${({$isSelected:e})=>e?"linear-gradient(135deg, var(--primary-color), var(--primary-hover))":"rgba(255, 255, 255, 0.02)"};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({$isSelected:e})=>e?"0 2px 4px rgba(0, 0, 0, 0.2)":"none"};
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({$isSelected:e})=>e?"var(--accent-color)":"transparent"};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    background: ${({$isSelected:e})=>e?"linear-gradient(135deg, var(--primary-color), var(--primary-hover))":"rgba(255, 255, 255, 0.04)"};
    border-color: ${({$isSelected:e})=>e?"var(--accent-color)":"rgba(255, 255, 255, 0.1)"};
  }
`,Cg=m.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 0.5rem;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  
  svg {
    width: 16px;
    height: 16px;
  }
`,$g=m.div`
  flex: 1;
  min-width: 0;
`,zg=m.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({$isSelected:e})=>e?"white":"var(--text-primary)"};
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Pg=m.div`
  font-size: 0.85rem;
  color: ${({$isSelected:e})=>e?"rgba(255, 255, 255, 0.8)":"var(--text-secondary)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`,Eg=m.div`
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  max-height: 775px;
`,Bg=m.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,Lg=m.div`
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`,Ng=m.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: -5px;
  border-top: 1px solid var(--border-color);
  border-radius: 0 0 8px 8px;
`,Tg=m.div`
  text-align: center;
  margin-bottom: 0.75rem;
`,_g=m.h4`
  font-size: 0.95rem;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  
  svg {
    color: var(--primary-color);
  }
`,Mg=m.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`,Rg=m.div`
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 18px,
    rgba(255, 255, 255, 0.02) 18px,
    rgba(255, 255, 255, 0.02) 19px
  );
  flex: 1;
  border-top: 1px dashed var(--border-color);
  border-bottom: 1px dashed var(--border-color);
  padding: 0.75rem 0;
  margin-bottom: 0.75rem;
`,Al=m.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.65rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Hl=m.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`,Vl=m.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  text-align: right;
  white-space: normal;
  word-break: break-all;
`,Ig=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`,Dg=m.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
`,Og=m.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`,Lu=m.div`
  margin-bottom: 1.25rem;
`,Nu=m.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`,Fg=m.div`
  position: relative;
`,Ag=m.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-weight: 500;
  user-select: none;
  pointer-events: none;
`,Hg=m.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -14px;
  margin-bottom: 0.75rem;
`,Vg=m(D0)`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`,Ug=m.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-color);
`,Wg=m.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`,Qg=m.div`
  flex: 1;
`,Yg=m.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
`,Gg=m.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: normal;
  word-break: break-all;
`,Kg=it`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`,Jg=it`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`,Xg=m.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${Kg} 0.3s ease-out;
  border-radius: 12px;
  backdrop-filter: none;
`,Zg=m.div`
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--accent-color);
  max-width: 80%;
`,qg=m(R0)`
  font-size: 2.5rem;
  color: var(--success-color, #4CAF50);
  margin-bottom: 0.75rem;
  animation: ${Jg} 0.5s ease-out;
`,e4=m.h3`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`,t4=m.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0;
`,r4=()=>{const{nearbyPlayers:e,isLoading:t,getLocale:r,billPlayer:n}=Te(),[o,i]=T.useState(""),[l,s]=T.useState(null),[c,p]=T.useState(""),[y,w]=T.useState(""),[f,x]=T.useState(!1),k=new Date().toLocaleDateString();T.useEffect(()=>{if(f){const g=setTimeout(()=>{x(!1)},3e3);return()=>clearTimeout(g)}},[f]);const j=e.filter(g=>{const S=o.toLowerCase();return g.name.toLowerCase().includes(S)||g.cid.toLowerCase().includes(S)}),C=g=>{s(g)},h=()=>{l&&c&&y&&(n(l.cid,c,parseFloat(y)),x(!0),p(""),w(""),s(null))},d=()=>t?a.jsx(bt,{icon:a.jsx(Vg,{}),title:r("loadingNearbyPlayers","Loading nearby players..."),className:"min-h-auto",transparent:!0}):e.length===0?a.jsx(bt,{icon:a.jsx($u,{}),title:r("noNearbyPlayersFound","No nearby players"),description:r("noPlayersDescription","No players were found nearby. Get closer to players to bill them."),className:"min-h-auto",transparent:!0}):a.jsxs(a.Fragment,{children:[a.jsx(bg,{children:a.jsx(tn,{value:o,onChange:g=>i(g.target.value),onClear:()=>i(""),placeholder:r("searchPlayersPlaceholder","Search players...")})}),a.jsx(kg,{children:j.length===0&&o.length>0?a.jsxs("div",{style:{padding:"2rem",textAlign:"center",color:"var(--text-secondary)"},children:[a.jsx($u,{style:{fontSize:"2rem",marginBottom:"1rem",opacity:.7}}),a.jsx("h3",{style:{marginBottom:"0.5rem",color:"var(--text-primary)"},children:r("noMatchingPlayersFound","No matching players")}),a.jsx("p",{children:r("noMatchingPlayersDescription","No players match your search criteria. Try a different search term.")})]}):j.map(g=>a.jsxs(jg,{$isSelected:(l==null?void 0:l.cid)===g.cid,onClick:()=>C(g),children:[a.jsx(Cg,{children:a.jsx(cr,{})}),a.jsxs($g,{children:[a.jsx(zg,{$isSelected:(l==null?void 0:l.cid)===g.cid,children:g.name}),a.jsxs(Pg,{$isSelected:(l==null?void 0:l.cid)===g.cid,children:["#",g.cid.slice(0,10)]})]})]},g.cid))})]}),u=()=>{if(!l)return a.jsx(bt,{icon:a.jsx(Cu,{}),title:r("noBillingForm","Select a player"),description:r("selectPlayerPrompt","Select a player from the left panel to create a bill."),className:"min-h-auto billing-empty-state",transparent:!0});const g=y?parseFloat(y).toFixed(2):"0.00";return a.jsx(Bg,{children:a.jsxs(Lg,{children:[a.jsxs(Ug,{children:[a.jsx(Wg,{children:a.jsx(cr,{})}),a.jsxs(Qg,{children:[a.jsx(Yg,{children:l.name}),a.jsxs(Gg,{children:["#",l.cid.slice(0,10)]})]})]}),a.jsxs(Lu,{children:[a.jsx(Nu,{children:r("reasonForBill","Reason for Bill")}),a.jsx(Pu,{type:"text",value:c,onChange:S=>p(S.target.value),placeholder:r("enterReasonPlaceholder","Enter reason for the bill...")})]}),a.jsxs(Lu,{children:[a.jsx(Nu,{children:r("amountLabel","Amount")}),a.jsxs(Fg,{children:[a.jsx(Ag,{children:r("currencySymbol","$")}),a.jsx(Pu,{type:"text",value:y,onChange:S=>{const b=/^[0-9]*\.?[0-9]*$/;(S.target.value===""||b.test(S.target.value))&&w(S.target.value)},placeholder:r("enterAmountPlaceholder","0.00"),style:{paddingLeft:"2rem"}})]})]}),a.jsx(Hg,{children:a.jsx(Ja,{onClick:h,disabled:!c||!y,icon:a.jsx(Nm,{}),variant:"primary",children:r("sendBill","Send Bill")})}),a.jsxs(Ng,{children:[a.jsxs(Tg,{children:[a.jsxs(_g,{children:[a.jsx(Tm,{}),r("receiptTitle","Receipt")]}),a.jsx(Mg,{children:k})]}),a.jsxs(Rg,{children:[a.jsxs(Al,{children:[a.jsx(Hl,{children:r("recipient","Recipient:")}),a.jsx(Vl,{children:l.name})]}),a.jsxs(Al,{children:[a.jsx(Hl,{children:r("citizenId","Citizen ID:")}),a.jsxs(Vl,{children:["#",l.cid.slice(0,10)]})]}),a.jsxs(Al,{children:[a.jsx(Hl,{children:r("reason","Reason:")}),a.jsx(Vl,{children:c||"-"})]})]}),a.jsxs(Ig,{children:[a.jsx(Dg,{children:r("totalDue","Total Due:")}),a.jsxs(Og,{children:[r("currencySymbol","$"),g]})]})]})]})})};return a.jsx(xg,{children:a.jsxs(wg,{children:[a.jsxs(Sg,{children:[a.jsx(Eu,{children:a.jsxs(Bu,{children:[a.jsx(cr,{}),r("selectRecipient","Select Recipient")]})}),d()]}),a.jsxs(Eg,{children:[a.jsx(Eu,{children:a.jsxs(Bu,{children:[a.jsx(Cu,{}),r("createBill","Create Bill")]})}),u(),f&&a.jsx(Xg,{children:a.jsxs(Zg,{children:[a.jsx(qg,{}),a.jsx(e4,{children:r("billSentSuccessTitle","Bill Sent Successfully")}),a.jsx(t4,{children:r("billSentSuccessDescription","The bill has been sent to the player successfully.")})]})})]})]})})},n4=e=>{switch(e){case"default":return le`
        background-color: var(--card-bg);
        border: none;
        box-shadow: var(--shadow-sm);
      `;case"outlined":return le`
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        box-shadow: none;
      `;case"elevated":return le`
        background-color: var(--card-bg);
        border: none;
        box-shadow: var(--shadow);
      `;default:return""}},o4=m.div`
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  ${e=>n4(e.$variant)}
  padding: ${e=>e.$padding};
  
  ${e=>e.$hoverable&&le`
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
      }
    `}

  ${e=>e.$isClickable&&le`
      cursor: pointer;
    `}
`,i4=m.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`,l4=({variant:e="default",title:t,children:r,className:n,onClick:o,hoverable:i=!1,padding:l="1rem",...s})=>a.jsxs(o4,{$variant:e,$hoverable:i,$padding:l,$isClickable:!!o,className:n,onClick:o,...s,children:[t&&a.jsx(i4,{children:t}),r]}),a4=m.div`
  display: flex;
  flex-direction: column;
  position: relative;
`,s4=m.div`
  margin-bottom: 1.5rem;
  max-width: 600px;
  
  input, input:focus, input:focus-visible {
    border: none;
    outline: none;
    box-shadow: none;
  }
  
  & > div {
    border: none;
  }
`,c4=m.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  max-height: 600px;
  overflow-y: auto;
  padding: 0.2rem;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
`,Zn=m(l4)`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    border-color: var(--primary-color);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`,u4=m.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: all 0.15s ease;
  
  ${Zn}:hover & {
    transform: scale(1.03);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  ${Zn}:active & {
    transform: scale(0.97);
  }
`,d4=m.div`
  flex: 1;
`,f4=m.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
`,p4=m.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`,h4=m.div`
  color: var(--text-secondary);
  margin-left: 1rem;
  background: rgba(255, 255, 255, 0.05);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  
  svg {
    font-size: 1rem;
  }
  
  ${Zn}:hover & {
    background: var(--primary-color);
    color: white;
    transform: translateX(2px);
  }
  
  ${Zn}:active & {
    transform: translateX(1px) scale(0.97);
  }
`,m4=m.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: var(--text-secondary);
`,g4=m(D0)`
  font-size: 2.5rem;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  color: var(--primary-color);
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Tu=m(bt)`
  margin-top: -20px;
`,v4=m.div`
  padding: 1rem;
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 8px;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: rgb(220, 38, 38);
    font-size: 1.25rem;
  }
`,y4=()=>{const[e,t]=T.useState(""),[r,n]=T.useState(!1),[o,i]=T.useState(!1),{players:l=[],fetchOnlinePlayers:s,fetchPlayerBills:c,getLocale:p}=Te();T.useEffect(()=>(e.length>=2&&l&&l.length>0&&n(!1),()=>{n(!1),i(!1)}),[l,e]);const y=()=>{if(!e||e.length<2)return[];const j=e.toLowerCase().trim();return l.filter(C=>{if(!C)return!1;const h=((C.name||"")+"").toLowerCase(),d=((C.cid||C.id||"")+"").toLowerCase();return h.indexOf(j)!==-1||d.indexOf(j)!==-1})},w=j=>{const C=j.target.value||"";if(t(C),C.length<2){n(!1);return}if(C.length>=2){n(!0),i(!1);try{s(C),setTimeout(()=>{n(!1)},1e3)}catch(h){console.error("Error fetching players:",h),i(!0),n(!1)}}},f=()=>{t(""),n(!1),i(!1)},x=j=>{if(j)try{setTimeout(()=>{c(j)},100)}catch(C){console.error("Error handling player click:",C),i(!0),n(!1)}},k=y();return a.jsxs(a4,{children:[a.jsx(s4,{children:a.jsx(tn,{value:e,onChange:w,onClear:f,placeholder:p("searchByNameOrCid","Search by name or CID...")})}),o&&a.jsxs(v4,{children:[a.jsx(Lm,{}),a.jsx("span",{children:p("networkError","Network error. Showing limited results instead.")})]}),r?a.jsxs(m4,{children:[a.jsx(g4,{}),a.jsx("p",{children:p("loadingPlayers","Loading players...")})]}):e.length<2?a.jsx(Tu,{icon:a.jsx(tl,{}),title:p("searchToInspect","Search to Inspect Citizens"),description:p("startSearchingDesc","Enter a name or CID to search for citizens to inspect their bills.")}):k.length===0?a.jsx(Tu,{icon:a.jsx($m,{}),title:p("noResultsFound","No Results Found"),description:p("trySearchingDifferentName","Try searching for a different name or CID.")}):a.jsx(c4,{children:k.map(j=>a.jsxs(Zn,{onClick:()=>x(j.cid||j.id||""),hoverable:!0,children:[a.jsx(u4,{children:a.jsx(Hm,{})}),a.jsxs(d4,{children:[a.jsx(f4,{children:j.name||"Unknown"}),a.jsxs(p4,{children:["CID: ",(j.cid||j.id||"Unknown").slice(0,10)]})]}),a.jsx(h4,{children:a.jsx(xm,{})})]},j.cid||j.id||Math.random().toString()))})]})},x4=m.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
`,w4=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`,S4=m.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
  }
`,b4=m.div`
  display: flex;
  background-color: var(--card-bg, #1a202c);
  border-radius: 6px;
  padding: 0.25rem;
  border: 1px solid var(--border-color, #374151);
`,_u=m.button`
  padding: 0.5rem 1rem;
  background-color: ${e=>e.$active?"var(--primary-color)":"transparent"};
  color: ${e=>e.$active?"white":"var(--text-secondary)"};
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${e=>e.$active?"var(--primary-color)":"rgba(255, 255, 255, 0.05)"};
  }
  
  & + & {
    margin-left: 0.25rem;
  }
`,k4=m.div`
  display: flex;
  border-bottom: 1px solid var(--border-color, #374151);
  margin-bottom: 1rem;
`,Ul=m.button`
  padding: 0.75rem 1.25rem;
  background-color: transparent;
  color: ${e=>e.$active?"var(--primary-color)":"var(--text-secondary)"};
  border: none;
  border-bottom: 2px solid ${e=>e.$active?"var(--primary-color)":"transparent"};
  font-size: 0.85rem;
  font-weight: ${e=>e.$active?"600":"500"};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${e=>e.$active?"var(--primary-color)":"var(--text-primary)"};
  }
  
  svg {
    font-size: 0.9rem;
  }
`,j4=m.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  max-width: 100%;
`,Wl=m.div`
  display: ${e=>e.$active?"flex":"none"};
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
`,C4=m.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
`,Po=m.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-color, #374151);
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: var(--primary-color);
  }
`,Eo=m.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 0.75rem;
    color: var(--text-primary);
  }
`,Bo=m.div`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`,Lo=m.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: ${e=>e.$positive?"var(--success-color)":"var(--danger-color)"};
  
  svg {
    margin-right: 0.25rem;
    font-size: 0.65rem;
  }
`,Mu=m.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
  margin-bottom: 1rem;
  flex: 1;
`,No=m.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-color, #374151);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`,To=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`,kr=m.h3`
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    font-size: 0.85rem;
  }
`,_o=m.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`,Ru=m.div`
  background-color: var(--card-bg, #1a202c);
  border-radius: 8px;
  border: 1px solid var(--border-color, #374151);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: var(--primary-color);
  }
`,Iu=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border-color, #374151);
`,Du=m.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`,Ou=m.div`
  width: 10%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 25px;
  
  &::before {
    content: '';
    width: 70%;
    height: ${e=>e.$height}%;
    min-height: 4px;
    background: ${e=>`linear-gradient(180deg, ${e.$color}, ${e.$color}60)`};
    border-radius: 4px 4px 0 0;
    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }
  
  &::after {
    content: attr(data-month);
    position: absolute;
    bottom: 5px;
    font-size: 0.65rem;
    color: var(--text-secondary);
    transform: translateX(-50%);
    white-space: nowrap;
  }
  
  &:hover::before {
    background: ${e=>`linear-gradient(180deg, ${e.$color}, ${e.$color}80)`};
    box-shadow: 0 0 15px ${e=>`${e.$color}40`};
  }
  
  &:hover::after {
    color: var(--text-primary);
  }
  
  &:hover .tooltip {
    opacity: 1;
    transform: translateY(-5px);
  }
`,Fu=m.div`
  position: absolute;
  top: -40px;
  opacity: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  pointer-events: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  transform: translateY(0);
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`,Au=m.div`
  width: 180px;
  height: 180px;
  margin: 0 auto;
  border-radius: 50%;
  background: ${e=>e.$data};
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  /* Donut hole */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background-color: var(--card-bg, #1a202c);
    border-radius: 50%;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`,Hu=m.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .total {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .label {
    font-size: 0.65rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }
`,Mo=m.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0 0.5rem;
  justify-content: center;
`,at=m.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 1;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: var(--text-primary);
  }
`,st=m.div`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: ${e=>e.$color};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`,Vu=m.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  border-radius: 6px;
  z-index: 5;
  
  svg {
    color: var(--text-secondary);
    font-size: 1.5rem;
    margin-bottom: 8px;
    opacity: 0.5;
  }
  
  span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`,$4=m.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`,z4=m.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-color: var(--primary-color);
    transform: translateX(4px);
  }
  
  .rank {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e=>{const t=["var(--primary-color)","#3b82f6","#ec4899","#8b5cf6","#f97316"];return t[e.$rank-1]||t[0]}};
    color: white;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 6px;
    flex-shrink: 0;
  }
  
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    .name {
      font-weight: 500;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      svg {
        color: var(--primary-color);
        opacity: 0.7;
      }
    }
    
    .stats {
      font-size: 0.75rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 1rem;
      
      span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        
        svg {
          font-size: 0.7rem;
        }
      }
    }
  }
  
  .amount {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      opacity: 0.7;
    }
  }
`,P4=m.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`,E4=m.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-color: var(--primary-color);
    transform: translateX(4px);
  }
  
  .business {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      color: var(--primary-color);
      font-size: 0.9rem;
    }
    
    .name {
      font-weight: 500;
      color: var(--text-primary);
    }
  }
  
  .date {
    font-size: 0.8rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      opacity: 0.7;
    }
  }
  
  .status {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    background: ${e=>{switch(e.$status){case"paid":return"rgba(16, 185, 129, 0.1)";case"pending":return"rgba(245, 158, 11, 0.1)";case"canceled":return"rgba(239, 68, 68, 0.1)";case"refunded":return"rgba(99, 102, 241, 0.1)";default:return"rgba(255, 255, 255, 0.1)"}}};
    color: ${e=>{switch(e.$status){case"paid":return"var(--success-color)";case"pending":return"var(--warning-color)";case"canceled":return"var(--danger-color)";case"refunded":return"#6366f1";default:return"var(--text-secondary)"}}};
  }
  
  .amount {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      opacity: 0.7;
    }
  }
`,B4=m.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: calc(100% - 1rem);
`,Uu=async(e,t)=>{const r={method:"post",headers:{"Content-Type":"application/json; charset=UTF-8"},body:JSON.stringify(t)},n="peleg-billing";try{return await(await fetch(`https://${n}/${e}`,r)).json()}catch(o){throw Error(`Failed to fetch NUI callback ${e}! (${o})`)}},L4=({hideHeader:e=!1})=>{const{myBills:t,societyBills:r,billingHistory:n,getLocale:o,showSocietyMenu:i,billingStats:l={}}=Te(),[s,c]=T.useState("personal"),[p,y]=T.useState("overview"),w=T.useCallback(C=>{c(C),Uu("peleg-billing:callback:getBillingStats",{societyMode:C==="society"}).catch(h=>{console.error("Error fetching billing stats:",h)})},[]);T.useEffect(()=>{(async()=>{try{await Uu("peleg-billing:callback:getBillingStats",{societyMode:s==="society"})}catch(h){console.error("Error fetching initial billing stats:",h)}})()},[s]);const f=T.useMemo(()=>{if(l&&(typeof l.totalPaid=="number"||typeof l.totalPending=="number")){const P=Array.isArray(l.topJobs)?l.topJobs.map(E=>[E.job,{count:E.count,amount:E.amount}]):[],M={},H=new Date;for(let E=0;E<6;E++){const _=new Date(H.getFullYear(),H.getMonth()-E,1),I=`${_.getFullYear()}-${(_.getMonth()+1).toString().padStart(2,"0")}`;M[I]=0}return l.monthlyData&&Object.entries(l.monthlyData).forEach(([E,_])=>{M[E]!==void 0&&(M[E]=Number(_)||0)}),{totalPaid:l.totalPaid||0,totalPending:l.totalPending||0,totalCanceled:l.totalCanceled||0,totalRefunded:l.totalRefunded||0,paidCount:l.paidCount||0,pendingCount:l.pendingCount||0,canceledCount:l.canceledCount||0,refundedCount:l.refundedCount||0,topJobs:P,byMonth:M,recentTransactions:l.recentTransactions||[]}}const h=s==="personal"?[...t,...n]:r,d=h.filter(P=>P.paid).reduce((P,M)=>P+Number(M.amount),0),u=h.filter(P=>!P.paid&&!P.canceled&&!P.refunded).reduce((P,M)=>P+Number(M.amount),0),g=h.filter(P=>P.canceled).reduce((P,M)=>P+Number(M.amount),0),S=h.filter(P=>P.refunded).reduce((P,M)=>P+Number(M.amount),0),b=h.filter(P=>P.paid).length,v=h.filter(P=>!P.paid&&!P.canceled&&!P.refunded).length,$=h.filter(P=>P.canceled).length,R=h.filter(P=>P.refunded).length,L=h.reduce((P,M)=>{const H=M.billedBy.job;return P[H]||(P[H]={count:0,amount:0}),P[H].count+=1,P[H].amount+=Number(M.amount),P},{}),oe=Object.entries(L).sort((P,M)=>M[1].amount-P[1].amount).slice(0,5),te={},ue=new Date;for(let P=0;P<6;P++){const M=new Date(ue.getFullYear(),ue.getMonth()-P,1),H=`${M.getFullYear()}-${(M.getMonth()+1).toString().padStart(2,"0")}`;te[H]=0}h.forEach(P=>{if(P.paid){const M=P.date.split("-");if(M.length===3){const H=`${M[0]}-${M[1]}`;te[H]!==void 0&&(te[H]+=Number(P.amount))}}});const B=[...h].sort((P,M)=>{const H=new Date(`${P.date} ${P.time}`);return new Date(`${M.date} ${M.time}`).getTime()-H.getTime()}).slice(0,5);return{totalPaid:d,totalPending:u,totalCanceled:g,totalRefunded:S,paidCount:b,pendingCount:v,canceledCount:$,refundedCount:R,topJobs:oe,byMonth:te,recentTransactions:B}},[t,n,r,s,l]),x=C=>`${o("currencySymbol","$")}${C.toFixed(2)}`,k=C=>C.refunded?o("refundedStatus","Refunded"):C.canceled?o("canceledStatus","Canceled"):C.paid?o("paidStatus","Paid"):o("pendingStatus","Pending"),j=()=>{const C=f.paidCount+f.pendingCount+f.canceledCount+f.refundedCount;if(C===0)return"conic-gradient(#333 0% 100%)";let h=0,d=f.paidCount/C*100,u=d,g=u+f.pendingCount/C*100,S=g,b=S+f.canceledCount/C*100;return`conic-gradient(
      var(--primary-color) ${h}% ${d}%,
      var(--success-color) ${u}% ${g}%,
      var(--danger-color) ${S}% ${b}%,
      var(--warning-color) ${b}% 100%
    )`};return a.jsxs(x4,{children:[!e&&a.jsxs(w4,{children:[a.jsxs(S4,{children:[a.jsx(Ka,{}),s==="personal"?o("personalStatsTitle","My Billing Statistics"):o("societyStatsTitle","Society Billing Statistics")]}),i&&a.jsxs(b4,{children:[a.jsx(_u,{$active:s==="personal",onClick:()=>w("personal"),children:o("personalStats","Personal")}),a.jsx(_u,{$active:s==="society",onClick:()=>w("society"),children:o("societyStats","Society")})]})]}),a.jsxs(k4,{children:[a.jsxs(Ul,{$active:p==="overview",onClick:()=>y("overview"),children:[a.jsx(Ka,{})," ",o("overviewTabLabel","Overview")]}),a.jsxs(Ul,{$active:p==="charts",onClick:()=>y("charts"),children:[a.jsx(bm,{})," ",o("chartsTabLabel","Charts")]}),a.jsxs(Ul,{$active:p==="tables",onClick:()=>y("tables"),children:[a.jsx(Rm,{})," ",o("tablesTabLabel","Top Items")]})]}),a.jsxs(j4,{children:[a.jsxs(Wl,{$active:p==="overview",children:[a.jsxs(C4,{children:[a.jsxs(Po,{children:[a.jsxs(Eo,{children:[a.jsx(ti,{}),s==="personal"?o("totalPaidLabel","Total Paid"):o("totalRevenueLabel","Total Revenue")]}),a.jsx(Bo,{children:x(f.totalPaid)}),a.jsxs(Lo,{$positive:!0,children:[a.jsx(zo,{})," ",`${f.paidCount} ${o("billsPaidLabel","bills paid")}`]})]}),a.jsxs(Po,{children:[a.jsxs(Eo,{children:[a.jsx(ju,{}),o("pendingLabel","Pending")]}),a.jsx(Bo,{children:x(f.totalPending)}),a.jsxs(Lo,{$positive:f.pendingCount===0,children:[f.pendingCount===0?a.jsx($o,{}):a.jsx(zo,{}),`${f.pendingCount} ${o("billsPendingLabel","bills pending")}`]})]}),a.jsxs(Po,{children:[a.jsxs(Eo,{children:[a.jsx(Li,{}),o("canceledLabel","Canceled")]}),a.jsx(Bo,{children:x(f.totalCanceled)}),a.jsxs(Lo,{$positive:f.canceledCount===0,children:[f.canceledCount===0?a.jsx($o,{}):a.jsx(zo,{}),`${f.canceledCount} ${o("billsCanceledLabel","bills canceled")}`]})]}),a.jsxs(Po,{children:[a.jsxs(Eo,{children:[a.jsx(ft,{}),s==="personal"?o("mostBilledByLabel","Most Billed By"):o("topCustomerLabel","Top Customer")]}),a.jsx(Bo,{children:f.topJobs.length>0?f.topJobs[0][0]:o("noneLabel","None")}),a.jsx(Lo,{$positive:!0,children:f.topJobs.length>0?a.jsxs(a.Fragment,{children:[a.jsx(zo,{})," ",x(f.topJobs[0][1].amount)]}):a.jsxs(a.Fragment,{children:[a.jsx($o,{})," ",o("noTransactionsLabel","No transactions")]})})]})]}),a.jsxs(Mu,{children:[a.jsxs(No,{children:[a.jsx(To,{children:a.jsxs(kr,{children:[a.jsx(gn,{})," ",o("monthlySummaryLabel","Monthly Summary")]})}),a.jsx(_o,{children:Object.entries(f.byMonth||{}).length>0&&Object.values(f.byMonth||{}).some(C=>Number(C)>0)?a.jsx(Du,{children:Object.entries(f.byMonth||{}).reverse().map(([C,h],d)=>{const g=Object.values(f.byMonth||{}).map(P=>Number(P)).filter(P=>P>0),S=g.length>0?Math.max(...g):1,b=Number(h)||0,v=S<=0?0:b/S*90,$=b>0?Math.max(5,v):0,R=C.split("-"),L=parseInt(R[1])-1,te=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][L]||"",ue=["var(--primary-color)","#3b82f6","#ec4899","#8b5cf6","#f97316","#10b981"],B=ue[d%ue.length];return a.jsx(Ou,{$height:$,$color:b>0?B:"transparent","data-month":te,children:a.jsxs(Fu,{className:"tooltip",children:[te,": ",x(b)]})},C)})}):a.jsxs(Vu,{children:[a.jsx(gn,{}),a.jsx("span",{children:o("noChartDataLabel","No data available")})]})}),a.jsx(Mo,{children:Object.entries(f.byMonth||{}).reverse().map(([C])=>{const h=C.split("-")[1],u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(h)-1];return a.jsxs(at,{children:[a.jsx(st,{$color:"var(--primary-color)"}),u]},C)})})]}),a.jsxs(No,{children:[a.jsx(To,{children:a.jsxs(kr,{children:[a.jsx(ku,{})," ",o("statusDistributionLabel","Status Distribution")]})}),a.jsx(_o,{children:a.jsx(Au,{$data:j(),children:a.jsxs(Hu,{children:[a.jsx("span",{className:"total",children:f.paidCount+f.pendingCount+f.canceledCount+f.refundedCount}),a.jsx("span",{className:"label",children:o("totalBillsLabel","Total Bills")})]})})}),a.jsxs(Mo,{children:[a.jsxs(at,{children:[a.jsx(st,{$color:"var(--primary-color)"}),o("paidLabel","Paid")," (",f.paidCount,")"]}),a.jsxs(at,{children:[a.jsx(st,{$color:"var(--danger-color)"}),o("canceledLabel","Canceled")," (",f.canceledCount,")"]}),a.jsxs(at,{children:[a.jsx(st,{$color:"var(--success-color)"}),o("pendingLabel","Pending")," (",f.pendingCount,")"]}),a.jsxs(at,{children:[a.jsx(st,{$color:"var(--warning-color)"}),o("refundedLabel","Refunded")," (",f.refundedCount,")"]})]})]})]})]}),a.jsx(Wl,{$active:p==="charts",children:a.jsxs(Mu,{style:{height:"calc(100% - 1rem)"},children:[a.jsxs(No,{children:[a.jsx(To,{children:a.jsxs(kr,{children:[a.jsx(gn,{})," ",o("monthlySummaryLabel","Monthly Summary")]})}),a.jsx(_o,{children:Object.entries(f.byMonth||{}).length>0&&Object.values(f.byMonth||{}).some(C=>Number(C)>0)?a.jsx(Du,{children:Object.entries(f.byMonth||{}).reverse().map(([C,h],d)=>{const g=Object.values(f.byMonth||{}).map(P=>Number(P)).filter(P=>P>0),S=g.length>0?Math.max(...g):1,b=Number(h)||0,v=S<=0?0:b/S*90,$=b>0?Math.max(5,v):0,R=C.split("-"),L=parseInt(R[1])-1,te=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][L]||"",ue=["var(--primary-color)","#3b82f6","#ec4899","#8b5cf6","#f97316","#10b981"],B=ue[d%ue.length];return a.jsx(Ou,{$height:$,$color:b>0?B:"transparent","data-month":te,children:a.jsxs(Fu,{className:"tooltip",children:[te,": ",x(b)]})},C)})}):a.jsxs(Vu,{children:[a.jsx(gn,{}),a.jsx("span",{children:o("noChartDataLabel","No data available")})]})}),a.jsx(Mo,{children:Object.entries(f.byMonth||{}).reverse().map(([C])=>{const h=C.split("-")[1],u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(h)-1];return a.jsxs(at,{children:[a.jsx(st,{$color:"var(--primary-color)"}),u]},C)})})]}),a.jsxs(No,{children:[a.jsx(To,{children:a.jsxs(kr,{children:[a.jsx(ku,{})," ",o("statusDistributionLabel","Status Distribution")]})}),a.jsx(_o,{children:a.jsx(Au,{$data:j(),children:a.jsxs(Hu,{children:[a.jsx("span",{className:"total",children:f.paidCount+f.pendingCount+f.canceledCount+f.refundedCount}),a.jsx("span",{className:"label",children:o("totalBillsLabel","Total Bills")})]})})}),a.jsxs(Mo,{children:[a.jsxs(at,{children:[a.jsx(st,{$color:"var(--primary-color)"}),o("paidLabel","Paid")," (",f.paidCount,")"]}),a.jsxs(at,{children:[a.jsx(st,{$color:"var(--danger-color)"}),o("canceledLabel","Canceled")," (",f.canceledCount,")"]}),a.jsxs(at,{children:[a.jsx(st,{$color:"var(--success-color)"}),o("pendingLabel","Pending")," (",f.pendingCount,")"]}),a.jsxs(at,{children:[a.jsx(st,{$color:"var(--warning-color)"}),o("refundedLabel","Refunded")," (",f.refundedCount,")"]})]})]})]})}),a.jsx(Wl,{$active:p==="tables",children:a.jsxs(B4,{children:[a.jsxs(Ru,{children:[a.jsx(Iu,{children:a.jsxs(kr,{children:[a.jsx($o,{})," ",o("topBusinessesTitle","Top Businesses")]})}),a.jsx($4,{children:f.topJobs.length>0?f.topJobs.map(([C,h],d)=>a.jsxs(z4,{$rank:d+1,children:[a.jsx("div",{className:"rank",children:d+1}),a.jsxs("div",{className:"info",children:[a.jsxs("div",{className:"name",children:[a.jsx(ft,{})," ",C]}),a.jsxs("div",{className:"stats",children:[a.jsxs("span",{children:[a.jsx(Dm,{})," ",h.count," ",h.count===1?"bill":"bills"]}),a.jsxs("span",{children:[a.jsx(gn,{})," ",Math.round(h.amount/f.topJobs[0][1].amount*100),"% of total"]})]})]}),a.jsxs("div",{className:"amount",children:[a.jsx(ti,{}),x(h.amount)]})]},C)):a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"var(--text-secondary)"},children:[a.jsx(ft,{style:{fontSize:"1.5rem",opacity:.3,marginBottom:"10px"}}),a.jsx("span",{children:o("noDataAvailableLabel","No data available")})]})})]}),a.jsxs(Ru,{children:[a.jsx(Iu,{children:a.jsxs(kr,{children:[a.jsx(ju,{})," ",o("recentTransactionsTitle","Recent Transactions")]})}),a.jsx(P4,{children:Array.isArray(f.recentTransactions)&&f.recentTransactions.length>0?f.recentTransactions.map(C=>a.jsxs(E4,{$status:C.refunded?"refunded":C.canceled?"canceled":C.paid?"paid":"pending",children:[a.jsxs("div",{className:"business",children:[a.jsx("div",{className:"icon",children:a.jsx(ft,{})}),a.jsx("div",{className:"name",children:C.billedBy.job})]}),a.jsxs("div",{className:"date",children:[a.jsx(Li,{}),C.date]}),a.jsx("div",{className:"status",children:k(C)}),a.jsxs("div",{className:"amount",children:[a.jsx(ti,{}),C.refunded||C.canceled?"-":"",x(Number(C.amount))]})]},C.id)):a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"var(--text-secondary)"},children:[a.jsx(I0,{style:{fontSize:"1.5rem",opacity:.3,marginBottom:"10px"}}),a.jsx("span",{children:o("noRecentTransactionsLabel","No recent transactions")})]})})]})]})})]})]})},N4=m.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  overflow: hidden;
  position: relative;
`,T4=m.div`
  flex: 1;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(26, 32, 44, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  /* Better scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`,_4=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`,M4=m.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    margin-left: 0.75rem;
  }
`,R4=m.div`
  display: flex;
  gap: 0.75rem;
`,I4=m.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  }
  
  svg {
    font-size: 1rem;
  }
`,D4=m.div`
  position: relative;
  flex: 1;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,O4=m.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-left: 3px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  font-size: 0.8rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(3px);
  animation: slideIn 0.3s ease forwards;
  
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  svg {
    color: var(--text-primary);
  }
`,F4=()=>{const[e,t]=T.useState("myBills"),{fetchNearbyPlayers:r,fetchOnlinePlayers:n,closeUI:o,developmentMode:i}=Te(),[l,s]=T.useState(!0);Ee.useEffect(()=>{setTimeout(()=>{s(!1)},5e3)},[]);const c=y=>{t(y),y==="billPlayer"?r():y==="inspectCitizen"&&n("")},p=()=>{switch(e){case"myBills":return"My Bills";case"billingHistory":return"Bill History";case"billingStats":return"Billing Statistics";case"societyBills":return"Society Bills";case"billPlayer":return"Bill Player";case"inspectCitizen":return"Inspect Citizen";default:return"Bills"}};return a.jsxs(N4,{children:[a.jsx(Gm,{currentView:e,setView:c}),a.jsxs(T4,{children:[a.jsxs(_4,{children:[a.jsx(M4,{children:p()}),a.jsx(R4,{children:a.jsx(I4,{onClick:o,title:"Close",children:a.jsx(Mm,{})})})]}),a.jsxs(D4,{children:[i&&l&&a.jsxs(O4,{children:[a.jsx(Cm,{}),a.jsx("span",{children:"Using dummy data for demonstration"})]}),a.jsxs("div",{style:{height:"100%",width:"100%",position:"relative"},children:[e==="myBills"&&a.jsx(L2,{hideHeader:!0}),e==="billingHistory"&&a.jsx(og,{hideHeader:!0}),e==="billingStats"&&a.jsx(L4,{hideHeader:!0}),e==="societyBills"&&a.jsx(dg,{hideHeader:!0}),e==="billPlayer"&&a.jsx(r4,{hideHeader:!0}),e==="inspectCitizen"&&a.jsx(y4,{})]})]})]})]})},A4=it`
  from { opacity: 0; }
  to { opacity: 1; }
`,H4=it`
  from { opacity: 1; }
  to { opacity: 0; }
`,V4=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  user-select: none;
  animation: ${A4} 0.2s ease-out;

  &.closing {
    animation: ${H4} 0.2s ease-out forwards;
  }
`,U4=m.div`
  width: 1200px;
  height: 700px;
  max-width: 95vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
  padding: 1.25rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`,W4=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
`,Q4=m.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
  }
`,Y4=m.div`
  background-color: var(--secondary-color, #4a5568);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border-color, #374151);
  max-width: fit-content;
`,G4=m.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color, #2d3748);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
`,K4=m.div`
  font-size: 1rem;
  font-weight: 600;
`,J4=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
`,X4=m.div`
  position: relative;
  width: 300px;
  
  input {
    width: 100%;
    padding: 0.55rem 1rem 0.55rem 2.25rem;
    background-color: var(--card-bg, #1a202c);
    border: 1px solid var(--border-color, #374151);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 0.85rem;
    transition: all 0.2s ease;
    line-height: 1.2;
    margin-bottom: 0;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      background-color: var(--card-hover, #2d3748);
    }
    
    &::placeholder {
      color: var(--text-secondary);
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
    font-size: 0.85rem;
  }
`,Z4=m.div`
  display: flex;
  background-color: var(--card-bg, #1a202c);
  border-radius: 4px;
  padding: 0.2rem;
  border: 1px solid var(--border-color, #374151);
`,Ro=m.button`
  padding: 0.4rem 0.75rem;
  border: none;
  background-color: ${e=>e.$active?"var(--primary-color)":"transparent"};
  color: ${e=>e.$active?"white":"var(--text-secondary)"};
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${e=>e.$active?"var(--primary-color)":"rgba(255, 255, 255, 0.1)"};
  }
  
  & + & {
    margin-left: 0.2rem;
  }
`,q4=m.div`
  position: relative;
  width: 180px;
`,ev=m.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  svg {
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`,tv=m.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  overflow: hidden;
  transition: all 0.2s ease;
  opacity: ${e=>e.$isOpen?1:0};
  transform: ${e=>e.$isOpen?"translateY(0)":"translateY(-10px)"};
  pointer-events: ${e=>e.$isOpen?"all":"none"};
`,rv=m.button`
  width: 100%;
  padding: 0.6rem 0.75rem;
  text-align: left;
  background-color: ${e=>e.$isSelected?"var(--secondary-color, #4a5568)":"transparent"};
    border: none;
  color: ${e=>(e.$isSelected,"var(--text-primary)")};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: var(--card-hover, #2d3748);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color, #374151);
  }
`,nv=m.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-top: 2rem;
  color: var(--text-secondary);
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: 1rem;
    text-align: center;
  }
`,ov=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: var(--card-bg, #1a202c);
  border: 1px solid var(--border-color, #374151);
  overflow: hidden;
  min-height: 0;
  position: relative;
`,iv=m.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr 1fr 0.5fr;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: var(--secondary-color, #4a5568);
  border-bottom: 1px solid var(--border-color, #374151);
  z-index: 1;
`,lv=m.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding: 0.25rem 0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-bg, #1a202c);
    border-radius: 0 0 6px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--secondary-color, #4a5568);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-hover, #2d3748);
  }
`,He=m.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 2px;
`,av=m.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 0.8fr 1fr 0.5fr;
  padding: 1rem 1.5rem;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color, #374151);
  position: relative;
  z-index: 1;
  
  &:hover {
    background-color: var(--card-hover, #2d3748);
    cursor: pointer;
    box-shadow: none;
    transform: none;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,sv=m.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  
  background-color: ${e=>{switch(e.$status){case"paid":return"rgba(46, 204, 113, 0.15)";case"pending":return"rgba(241, 196, 15, 0.15)";case"canceled":return"rgba(231, 76, 60, 0.15)";case"refunded":return"rgba(52, 152, 219, 0.15)";default:return"rgba(255, 255, 255, 0.1)"}}};
  
  color: ${e=>{switch(e.$status){case"paid":return"var(--success-color)";case"pending":return"var(--warning-color)";case"canceled":return"var(--danger-color)";case"refunded":return"var(--info-color)";default:return"var(--text-primary)"}}};
  
  border: 1px solid ${e=>{switch(e.$status){case"paid":return"rgba(46, 204, 113, 0.3)";case"pending":return"rgba(241, 196, 15, 0.3)";case"canceled":return"rgba(231, 76, 60, 0.3)";case"refunded":return"rgba(52, 152, 219, 0.3)";default:return"rgba(255, 255, 255, 0.1)"}}};
`,cv=m.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  
  svg {
    color: var(--text-secondary);
  }
`,uv=m.div`
  font-weight: 600;
  color: ${e=>e.$status==="canceled"?"var(--danger-color)":"var(--primary-color)"};
  ${e=>e.$status==="canceled"&&"text-decoration: line-through;"}
`,dv=m.div`
  display: flex;
  flex-direction: column;
  
  span:first-child {
    font-weight: 500;
  }
  
  span:last-child {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }
`,fv=m.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 1rem;
  }
`,pv=()=>{const{selectedPlayer:e,selectedPlayerBills:t,showSelectedPlayerMenu:r,getLocale:n,closePlayerBills:o}=Te(),[i,l]=T.useState(""),[s,c]=T.useState(!1),[p,y]=T.useState([]),[w,f]=T.useState("date"),[x,k]=T.useState("all"),[j,C]=T.useState(null),[h,d]=T.useState(!1),u=T.useRef(null);T.useEffect(()=>{r||(l(""),c(!1),y([]),f("date"),k("all"))},[r]),T.useEffect(()=>{t&&y(t.map(B=>({...B,canceled:B.canceled||B.status==="canceled",refunded:B.refunded||B.status==="refunded",status:B.status||(B.paid?"paid":B.canceled?"canceled":B.refunded?"refunded":"pending")})))},[t]);const g=T.useCallback(()=>{try{c(!0),setTimeout(()=>{o()},300)}catch(B){console.error("Error closing player bills:",B)}},[o]);T.useEffect(()=>{const B=P=>{P.key==="Escape"&&r&&g()};return window.addEventListener("keydown",B),()=>window.removeEventListener("keydown",B)},[r,g]);const S=B=>{const P=window.GetParentResourceName?window.GetParentResourceName():"peleg-billing";fetch(`https://${P}/peleg-billing:callback:refundBill`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({billId:B})}).then(M=>M.json()).then(M=>{if(M==="ok"){const H=e?e.name:"You";y(E=>E.map(_=>_.id===B?{..._,refunded:!0,paid:!1,status:"refunded",canceled_by:H}:_)),setTimeout(()=>{e&&e.cid&&fetch(`https://${P}/peleg-billing:callback:fetchPlayerBills`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cid:e.cid})})},500)}})},b=B=>{const P=window.GetParentResourceName?window.GetParentResourceName():"peleg-billing";fetch(`https://${P}/peleg-billing:callback:cancelBill`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({billId:B})}).then(M=>M.json()).then(M=>{if(M==="ok"){const H=e?e.name:"You";y(E=>E.map(_=>_.id===B?{..._,canceled:!0,status:"canceled",canceled_by:H}:_)),setTimeout(()=>{e&&e.cid&&fetch(`https://${P}/peleg-billing:callback:fetchPlayerBills`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cid:e.cid})})},500)}})},v=B=>{C(B)},$=B=>{B&&(B.preventDefault(),B.stopPropagation()),C(null)},R=B=>B.status?B.status:B.refunded?"refunded":B.canceled?"canceled":B.paid?"paid":"pending",L=B=>{const P=typeof B=="string"?parseFloat(B):B;return isNaN(P)?`${n("currencySymbol","$")}0.00`:`${n("currencySymbol","$")}${P.toFixed(2)}`},oe=T.useMemo(()=>{if(!p)return[];let B=[...p];if(x!=="all"&&(B=B.filter(P=>{const M=R(P);return x==="unpaid"?M==="pending":x==="paid"?M==="paid":x==="canceled"?M==="canceled"||M==="refunded":!0})),i){const P=i.toLowerCase();B=B.filter(M=>M.reason.toLowerCase().includes(P)||M.billedBy.job.toLowerCase().includes(P)||M.billedBy.name.toLowerCase().includes(P))}return B.sort((P,M)=>{if(w==="amount"){const H=typeof P.amount=="string"?parseFloat(P.amount):P.amount;return(typeof M.amount=="string"?parseFloat(M.amount):M.amount)-H}else if(w==="status"){const H=R(P),E=R(M);return H.localeCompare(E)}else return new Date(M.date).getTime()-new Date(P.date).getTime()}),B},[p,x,i,w]);T.useEffect(()=>{const B=P=>{u.current&&!u.current.contains(P.target)&&d(!1)};return document.addEventListener("mousedown",B),()=>{document.removeEventListener("mousedown",B)}},[]);const te=[{value:"date",label:n("sortByDate","Sort by Date")},{value:"amount",label:n("sortByAmount","Sort by Amount")},{value:"status",label:n("sortByStatus","Sort by Status")}],ue=te.find(B=>B.value===w)||te[0];return!r||!e?null:a.jsx(V4,{onClick:B=>{B.stopPropagation(),g()},className:s?"closing":"",children:a.jsxs(U4,{onClick:B=>B.stopPropagation(),className:s?"closing":"",children:[a.jsxs(W4,{children:[a.jsxs(Q4,{children:[a.jsx(Ni,{}),n("playerBillsTitle","Player Bills")]}),e&&a.jsxs(Y4,{children:[a.jsx(G4,{children:e.name.charAt(0).toUpperCase()}),a.jsx(K4,{children:e.name})]}),a.jsx(fv,{onClick:g,children:a.jsx(Xn,{})})]}),a.jsxs(J4,{children:[a.jsxs(X4,{children:[a.jsx(tl,{}),a.jsx("input",{type:"text",placeholder:n("searchBillsPlaceholder","Search bills..."),value:i,onChange:B=>l(B.target.value)})]}),a.jsxs(Z4,{children:[a.jsx(Ro,{$active:x==="all",onClick:()=>k("all"),children:n("allFilter","All")}),a.jsx(Ro,{$active:x==="unpaid",onClick:()=>k("unpaid"),children:n("unpaidFilter","Unpaid")}),a.jsx(Ro,{$active:x==="paid",onClick:()=>k("paid"),children:n("paidFilter","Paid")}),a.jsx(Ro,{$active:x==="canceled",onClick:()=>k("canceled"),children:n("canceledFilter","Canceled")})]}),a.jsxs(q4,{ref:u,children:[a.jsxs(ev,{onClick:()=>d(!h),"aria-expanded":h,children:[ue.label,a.jsx(jm,{})]}),a.jsx(tv,{$isOpen:h,children:te.map(B=>a.jsx(rv,{$isSelected:B.value===w,onClick:()=>{f(B.value),d(!1)},children:B.label},B.value))})]})]}),oe.length>0?a.jsxs(ov,{children:[a.jsxs(iv,{children:[a.jsx(He,{children:n("dateLabel","Date")}),a.jsx(He,{children:n("fromLabel","From")}),a.jsx(He,{children:n("billedByLabel","Billed By")}),a.jsx(He,{children:n("amountLabel","Amount")}),a.jsx(He,{children:n("statusLabel","Status")}),a.jsx(He,{})]}),a.jsx(lv,{children:oe.map(B=>{const P=R(B);return a.jsxs(av,{onClick:()=>v(B),children:[a.jsx(He,{children:a.jsxs(dv,{children:[a.jsx("span",{children:B.date}),a.jsx("span",{children:B.time})]})}),a.jsx(He,{children:a.jsxs(cv,{children:[a.jsx(ft,{}),B.billedBy.job]})}),a.jsx(He,{children:B.billedBy.name}),a.jsx(He,{children:a.jsx(uv,{$status:P,children:L(B.amount)})}),a.jsx(He,{children:a.jsxs(sv,{$status:P,children:[P==="paid"&&n("paidStatus","Paid"),P==="pending"&&n("pendingStatus","Pending"),P==="canceled"&&n("canceledStatus","Canceled"),P==="refunded"&&n("refundedStatus","Refunded")]})}),a.jsx(He,{children:a.jsx(zm,{color:"var(--primary-color)"})})]},B.id)})})]}):a.jsxs(nv,{children:[a.jsx(Ni,{}),a.jsx("p",{children:n("noBillsFound","No bills found")})]}),j&&a.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:100,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.5)"},onClick:B=>{B.stopPropagation(),$()},children:a.jsx("div",{onClick:B=>B.stopPropagation(),style:{width:"auto",height:"auto"},children:a.jsx(Xs,{bill:j,isClosing:!1,onClose:$,onRefund:S,onCancel:b})})})]})})},hv=()=>{const e=T.useRef(!0),{showQuickBill:t,closeQuickBill:r,fetchNearbyPlayers:n,nearbyPlayers:o,quickBillPlayer:i,getLocale:l,isLoading:s}=Te(),[c,p]=T.useState(""),[y,w]=T.useState(""),[f,x]=T.useState(null),[k,j]=T.useState(!1),[C,h]=T.useState(null);if(T.useEffect(()=>()=>{e.current=!1},[]),T.useEffect(()=>{if(t){p(""),w(""),x(null),j(!1),h(null);try{n()}catch(v){console.error("Error fetching nearby players:",v)}}},[t,n]),T.useEffect(()=>{const v=$=>{$.key==="Escape"&&t&&($.preventDefault(),r())};return window.addEventListener("keydown",v),()=>window.removeEventListener("keydown",v)},[t,r]),T.useEffect(()=>{const v=$=>{$.data&&$.data.type==="forceCloseQuickBill"&&e.current&&j(!1)};return window.addEventListener("message",v),()=>window.removeEventListener("message",v)},[]),!t)return null;const d=v=>{const $=v.target.value;w($),C&&h(null)},u=v=>{const $=v.target.value;/^(\d*\.?\d{0,2})?$/.test($)&&(p($),C&&h(null))},g=v=>{k||(x(v),C&&h(null))},S=async()=>{if(!f){h("Please select a player"),j(!1);return}if(!y.trim()){h("Please enter a reason"),j(!1);return}if(!c||parseFloat(c)<=0){h("Please enter a valid amount"),j(!1);return}if(!(k||s)){j(!0),h(null);try{const v=o.find($=>$.id===f);if(!v||!v.cid){h("Selected player not found or has invalid ID"),j(!1);return}i(v.cid,y.trim(),parseFloat(c))}catch(v){console.error("Error submitting bill:",v),e.current&&(h("An error occurred"),j(!1))}}},b=l("currencySymbol","$");return a.jsx(mv,{onClick:v=>v.stopPropagation(),children:a.jsxs(gv,{children:[a.jsxs(vv,{children:[a.jsx(yv,{children:l("quickBillTitle","Quick Bill")}),a.jsx(xv,{onClick:()=>!k&&r(),children:"×"})]}),a.jsxs(wv,{children:[C&&a.jsx(Pv,{children:C}),a.jsxs(Sv,{children:[a.jsx(Ql,{children:l("selectPlayer","Select Player")}),a.jsx(bv,{children:s?a.jsx(Cv,{children:"Loading players..."}):o.length===0?a.jsx(jv,{children:l("noNearbyPlayers","No players nearby")}):o.map(v=>a.jsx(kv,{$selected:f===v.id,$disabled:k,onClick:()=>g(v.id),children:v.name},v.id))})]}),a.jsxs(Wu,{children:[a.jsx(Ql,{children:l("reason","Reason")}),a.jsx(Qu,{type:"text",value:y,onChange:d,placeholder:l("reasonPlaceholder","Enter reason"),disabled:k,maxLength:50})]}),a.jsxs(Wu,{children:[a.jsx(Ql,{children:l("amount","Amount")}),a.jsx(Qu,{type:"text",value:c,onChange:u,placeholder:`${b}0.00`,disabled:k,maxLength:10})]})]}),a.jsx($v,{children:a.jsx(zv,{onClick:S,disabled:!f||!y||!c||k||s,children:k||s?l("processing","Processing..."):l("sendBill","Send Bill")})})]})})},mv=m.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`,gv=m.div`
  width: 400px;
  max-width: 90%;
  background-color: #1f2937;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`,vv=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #111827;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`,yv=m.h2`
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: 600;
`,xv=m.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 24px;
  cursor: pointer;
`,wv=m.div`
  padding: 16px;
`,Sv=m.div`
  margin-bottom: 16px;
`,Ql=m.label`
  display: block;
  margin-bottom: 8px;
  color: #d1d5db;
  font-size: 14px;
`,bv=m.div`
  max-height: 150px;
  overflow-y: auto;
  background-color: #111827;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`,kv=m.div`
  padding: 8px 12px;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  color: ${e=>e.$selected?"white":"#9ca3af"};
  background-color: ${e=>e.$selected?"#374151":"transparent"};
  opacity: ${e=>e.$disabled?.6:1};
  
  &:hover {
    background-color: ${e=>e.$disabled?e.$selected?"#374151":"transparent":e.$selected?"#374151":"#1e293b"};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`,jv=m.div`
  padding: 12px;
  text-align: center;
  color: #9ca3af;
`,Cv=m.div`
  padding: 12px;
  text-align: center;
  color: #9ca3af;
`,Wu=m.div`
  margin-bottom: 16px;
`,Qu=m.input`
  width: 100%;
  padding: 10px;
  background-color: #111827;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`,$v=m.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`,zv=m.button`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #4b5563;
    cursor: not-allowed;
    opacity: 0.6;
  }
`,Pv=m.div`
  margin-bottom: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 4px;
  color: #ef4444;
  font-size: 14px;
`,Ev=()=>a.jsx(fh,{children:a.jsx(Bv,{})}),Bv=()=>{const{showMenu:e,showQuickBill:t,isClosing:r}=Te();return T.useEffect(()=>{const n=o=>{o.key};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e,t]),!e&&!t&&!r?null:a.jsxs(a.Fragment,{children:[e&&a.jsxs(Mv,{$visible:e,$isClosing:r,children:[a.jsx(Rv,{}),a.jsxs(Iv,{$isClosing:r,children:[a.jsx(Dv,{}),a.jsx(F4,{}),a.jsx(Yu,{position:"top-left"}),a.jsx(Yu,{position:"bottom-right"})]})]}),a.jsx(pv,{}),a.jsx(hv,{})]})},Lv=it`
  from { opacity: 0; }
  to { opacity: 1; }
`,Nv=it`
  from { opacity: 1; }
  to { opacity: 0; }
`,Tv=it`
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
`,_v=it`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.97); }
`,Mv=m.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({$visible:e})=>e?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({$isClosing:e})=>e?Nv:Lv} 0.3s ease forwards;
  user-select: none;
  opacity: ${({$visible:e})=>e?1:0};
  pointer-events: ${({$visible:e})=>e?"auto":"none"};
  visibility: ${({$visible:e})=>e?"visible":"hidden"};
`,Rv=m.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`,Iv=m.div`
  width: 80%;
  height: 80%;
  max-width: 1200px;
  max-height: 800px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  animation: ${({$isClosing:e})=>e?_v:Tv} 0.3s ease forwards;
  background-color: rgba(17, 24, 39, 0.95);
`,Dv=m.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: -250px;
  right: -250px;
  background: radial-gradient(
    circle,
    rgba(75, 85, 99, 0.1) 0%,
    rgba(75, 85, 99, 0.03) 30%,
    transparent 70%
  );
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
`,Ov=it`
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
`,Yu=m.div`
  position: absolute;
  width: 80px;
  height: 80px;
  ${({position:e})=>e==="top-left"?"top: 0; left: 0;":"bottom: 0; right: 0;"}
  pointer-events: none;
  z-index: 1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: rgba(156, 163, 175, 0.3);
    opacity: 0.3;
    animation: ${Ov} 4s infinite ease-in-out;
  }
  
  &::before {
    ${({position:e})=>e==="top-left"?"top: 0; left: 0; width: 3px; height: 40px;":"bottom: 0; right: 0; width: 3px; height: 40px;"}
  }
  
  &::after {
    ${({position:e})=>e==="top-left"?"top: 0; left: 0; height: 3px; width: 40px;":"bottom: 0; right: 0; height: 3px; width: 40px;"}
  }
`;Yl.createRoot(document.getElementById("app")).render(a.jsx(Ee.StrictMode,{children:a.jsx(Ev,{})}));
