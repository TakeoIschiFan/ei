/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/media-chrome@4.19.2/dist/menu/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const j={MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest"},H={MEDIA_CONTROLLER:"mediacontroller"},Bn={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},Bi=Object.entries(Bn),o=Bi.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{}),Wn={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Wi=Bi.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{...Wn});Object.entries(Wi).reduce((e,[t,i])=>{const n=o[t];return n&&(e[i]=n),e},{userinactivechange:"userinactive"}),Object.entries(o).reduce((e,[t,i])=>{const n=Wi[t];return n&&(e[i]=n),e},{userinactive:"userinactivechange"});const Ui={SUBTITLES:"subtitles",CAPTIONS:"captions"};class Ki{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class Gi extends Ki{}class qi extends Gi{constructor(){super(...arguments),this.role=null}}class Un{observe(){}unobserve(){}disconnect(){}}const Yi={createElement:function(){return new At.HTMLElement},createElementNS:function(){return new At.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},At={ResizeObserver:Un,document:Yi,Node:Gi,Element:qi,HTMLElement:class extends qi{constructor(){super(...arguments),this.innerHTML=""}get content(){return new At.DocumentFragment}},DocumentFragment:class extends Ki{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(t,i){return{body:{textContent:t}}}}},Zi="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",zi=Object.keys(At).every(e=>e in globalThis),l=Zi&&!zi?At:globalThis,Re=Zi&&!zi?Yi:globalThis.document;function Kn({anchor:e,floating:t,placement:i}){const n=Gn({anchor:e,floating:t}),{x:a,y:s}=Yn(n,i);return{x:a,y:s}}function Gn({anchor:e,floating:t}){return{anchor:qn(e,t.offsetParent),floating:{x:0,y:0,width:t.offsetWidth,height:t.offsetHeight}}}function qn(e,t){var i;const n=e.getBoundingClientRect(),a=(i=t?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:n.x-a.x,y:n.y-a.y,width:n.width,height:n.height}}function Yn({anchor:e,floating:t},i){const n=Zn(i)==="x"?"y":"x",a=n==="y"?"height":"width",s=Vi(i),r=e.x+e.width/2-t.width/2,c=e.y+e.height/2-t.height/2,h=e[a]/2-t[a]/2;let b;switch(s){case"top":b={x:r,y:e.y-t.height};break;case"bottom":b={x:r,y:e.y+e.height};break;case"right":b={x:e.x+e.width,y:c};break;case"left":b={x:e.x-t.width,y:c};break;default:b={x:e.x,y:e.y}}switch(i.split("-")[1]){case"start":b[n]-=h;break;case"end":b[n]+=h;break}return b}function Vi(e){return e.split("-")[0]}function Zn(e){return["top","bottom"].includes(Vi(e))?"y":"x"}const Fi=new WeakMap,$e=e=>{let t=Fi.get(e);return t||Fi.set(e,t=new Set),t},Qi=new l.ResizeObserver(e=>{for(const t of e)for(const i of $e(t.target))i(t)});function Bt(e,t){$e(e).add(t),Qi.observe(e)}function Wt(e,t){const i=$e(e);i.delete(t),i.size||Qi.unobserve(e)}class Oe extends Event{constructor({action:t="auto",relatedTarget:i,...n}){super("invoke",n),this.action=t,this.relatedTarget=i}}class zn extends Event{constructor({newState:t,oldState:i,...n}){super("toggle",n),this.newState=t,this.oldState=i}}function Ut(e){const t={};for(const i of e)t[i.name]=i.value;return t}function E(e){var t;return(t=He(e))!=null?t:Gt(e,"media-controller")}function He(e){var t;const{MEDIA_CONTROLLER:i}=H,n=e.getAttribute(i);if(n)return(t=qt(e))==null?void 0:t.getElementById(n)}const Kt=(e,t)=>!e||!t?!1:e?.contains(t)?!0:Kt(e,t.getRootNode().host),Gt=(e,t)=>{if(!e)return null;const i=e.closest(t);return i||Gt(e.getRootNode().host,t)};function Xi(e=document){var t;const i=e?.activeElement;return i?(t=Xi(i.shadowRoot))!=null?t:i:null}function qt(e){var t;const i=(t=e?.getRootNode)==null?void 0:t.call(e);return i instanceof ShadowRoot||i instanceof Document?i:null}function Vn(e,{depth:t=3,checkOpacity:i=!0,checkVisibilityCSS:n=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:i,checkVisibilityCSS:n});let a=e;for(;a&&t>0;){const s=getComputedStyle(a);if(i&&s.opacity==="0"||n&&s.visibility==="hidden"||s.display==="none")return!1;a=a.parentElement,t--}return!0}function Fn(e,t){const i=Qn(e,n=>n===t);return i||Ji(e,t)}function Qn(e,t){var i,n;let a;for(a of(i=e.querySelectorAll("style:not([media])"))!=null?i:[]){let s;try{s=(n=a.sheet)==null?void 0:n.cssRules}catch{continue}for(const r of s??[])if(t(r.selectorText))return r}}function Ji(e,t){var i,n;const a=(i=e.querySelectorAll("style:not([media])"))!=null?i:[],s=a?.[a.length-1];if(!s?.sheet)return console.warn("Media Chrome: No style sheet found on style tag of",e),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};const r=s?.sheet.insertRule(`${t}{}`,s.sheet.cssRules.length);return(n=s.sheet.cssRules)==null?void 0:n[r]}function Y(e,t,i=Number.NaN){const n=e.getAttribute(t);return n!=null?+n:i}function tt(e,t,i){const n=+i;if(i==null||Number.isNaN(n)){e.hasAttribute(t)&&e.removeAttribute(t);return}Y(e,t,void 0)!==n&&e.setAttribute(t,`${n}`)}function Pe(e,t){return e.hasAttribute(t)}function ji(e,t,i){if(i==null){e.hasAttribute(t)&&e.removeAttribute(t);return}Pe(e,t)!=i&&e.toggleAttribute(t,i)}function C(e,t,i=null){var n;return(n=e.getAttribute(t))!=null?n:i}function P(e,t,i){if(i==null){e.hasAttribute(t)&&e.removeAttribute(t);return}const n=`${i}`;C(e,t,void 0)!==n&&e.setAttribute(t,n)}var Ne=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},d=(e,t,i)=>(Ne(e,t,"read from private field"),i?i.call(e):t.get(e)),u=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},k=(e,t,i,n)=>(Ne(e,t,"write to private field"),t.set(e,i),i),m=(e,t,i)=>(Ne(e,t,"access private method"),i),y,N,x,Yt,Tt,Z,yt,Be,tn,Zt,We,zt,Vt,Ue,Ke,en,Ge,nn,qe,an,et,it,nt,St,Ft,Ye,Ze,sn,ze,on,Ve,rn,Fe,ln,Qe,dn,Xe,cn,It,Qt,Je,hn,Mt,Xt,Jt,je;function at({type:e,text:t,value:i,checked:n}){const a=Re.createElement("media-chrome-menu-item");a.type=e,a.part.add("menu-item"),a.part.add(e),a.value=i,a.checked=n;const s=Re.createElement("span");return s.textContent=t,a.append(s),a}function z(e,t){let i=e.querySelector(`:scope > [slot="${t}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const n=e.shadowRoot.querySelector(`[name="${t}"] > svg`);return n?n.cloneNode(!0):""}function Xn(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;
        
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `}const V={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class _ extends l.HTMLElement{constructor(){if(super(),u(this,Be),u(this,Zt),u(this,Vt),u(this,Ke),u(this,Ge),u(this,qe),u(this,nt),u(this,Ft),u(this,Ze),u(this,ze),u(this,Ve),u(this,Fe),u(this,Qe),u(this,Xe),u(this,It),u(this,Je),u(this,Mt),u(this,Jt),u(this,y,null),u(this,N,null),u(this,x,null),u(this,Yt,new Set),u(this,Tt,void 0),u(this,Z,!1),u(this,yt,null),u(this,zt,()=>{const t=d(this,Yt),i=new Set(this.items);for(const n of t)i.has(n)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:n}));for(const n of i)t.has(n)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:n}));k(this,Yt,i)}),u(this,et,()=>{m(this,nt,St).call(this),m(this,Ft,Ye).call(this,!1)}),u(this,it,()=>{m(this,nt,St).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const t=Ut(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),k(this,Tt,new MutationObserver(d(this,zt)))}static get observedAttributes(){return[V.DISABLED,V.HIDDEN,V.STYLE,V.ANCHOR,H.MEDIA_CONTROLLER]}static formatMenuItemText(t,i){return t}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(t){switch(t.type){case"slotchange":m(this,Be,tn).call(this,t);break;case"invoke":m(this,Ke,en).call(this,t);break;case"click":m(this,Ze,sn).call(this,t);break;case"toggle":m(this,Ve,rn).call(this,t);break;case"focusout":m(this,Qe,dn).call(this,t);break;case"keydown":m(this,Xe,cn).call(this,t);break}}connectedCallback(){var t,i;d(this,Tt).observe(this.defaultSlot,{childList:!0}),k(this,yt,Ji(this.shadowRoot,":host")),m(this,Vt,Ue).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),k(this,y,He(this)),(i=(t=d(this,y))==null?void 0:t.associateElement)==null||i.call(t,this),this.hidden||(Bt(Lt(this),d(this,et)),Bt(this,d(this,it))),m(this,Zt,We).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var t,i;d(this,Tt).disconnect(),Wt(Lt(this),d(this,et)),Wt(this,d(this,it)),this.disable(),(i=(t=d(this,y))==null?void 0:t.unassociateElement)==null||i.call(t,this),k(this,y,null),k(this,N,null),k(this,x,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(t,i,n){var a,s,r,c;t===V.HIDDEN&&n!==i?(d(this,Z)||k(this,Z,!0),this.hidden?m(this,qe,an).call(this):m(this,Ge,nn).call(this),this.dispatchEvent(new zn({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):t===H.MEDIA_CONTROLLER?(i&&((s=(a=d(this,y))==null?void 0:a.unassociateElement)==null||s.call(a,this),k(this,y,null)),n&&this.isConnected&&(k(this,y,He(this)),(c=(r=d(this,y))==null?void 0:r.associateElement)==null||c.call(r,this))):t===V.DISABLED&&n!==i?n==null?this.enable():this.disable():t===V.STYLE&&n!==i&&m(this,Vt,Ue).call(this)}formatMenuItemText(t,i){return this.constructor.formatMenuItemText(t,i)}get anchor(){return this.getAttribute("anchor")}set anchor(t){this.setAttribute("anchor",`${t}`)}get anchorElement(){var t;return this.anchor?(t=qt(this))==null?void 0:t.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Jn)}get radioGroupItems(){return this.items.filter(t=>t.role==="menuitemradio")}get checkedItems(){return this.items.filter(t=>t.checked)}get value(){var t,i;return(i=(t=this.checkedItems[0])==null?void 0:t.value)!=null?i:""}set value(t){const i=this.items.find(n=>n.value===t);i&&m(this,Jt,je).call(this,i)}focus(){if(k(this,N,Xi()),this.items.length){m(this,Mt,Xt).call(this,this.items[0]),this.items[0].focus();return}const t=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');t?.focus()}handleSelect(t){var i;const n=m(this,It,Qt).call(this,t);n&&(m(this,Jt,je).call(this,n,n.type==="checkbox"),d(this,x)&&!this.hidden&&((i=d(this,N))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(t){var i,n;const{key:a}=t,s=this.items,r=(n=(i=m(this,It,Qt).call(this,t))!=null?i:m(this,Je,hn).call(this))!=null?n:s[0],c=s.indexOf(r);let h=Math.max(0,c);a==="ArrowDown"?h++:a==="ArrowUp"?h--:t.key==="Home"?h=0:t.key==="End"&&(h=s.length-1),h<0&&(h=s.length-1),h>s.length-1&&(h=0),m(this,Mt,Xt).call(this,s[h]),s[h].focus()}}y=new WeakMap,N=new WeakMap,x=new WeakMap,Yt=new WeakMap,Tt=new WeakMap,Z=new WeakMap,yt=new WeakMap,Be=new WeakSet,tn=function(e){const t=e.target;for(const i of t.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(t.name)&&m(this,Zt,We).call(this),t.name||d(this,zt).call(this)},Zt=new WeakSet,We=function(){const e=this.shadowRoot.querySelector('slot[name="header"]'),t=this.shadowRoot.querySelector('slot[name="title"]');e.hidden=t.assignedNodes().length===0&&e.assignedNodes().length===0},zt=new WeakMap,Vt=new WeakSet,Ue=function(){var e;const t=this.shadowRoot.querySelector("#layout-row"),i=(e=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:e.trim();t.setAttribute("media",i==="row"?"":"width:0")},Ke=new WeakSet,en=function(e){k(this,x,e.relatedTarget),Kt(this,e.relatedTarget)||(this.hidden=!this.hidden)},Ge=new WeakSet,nn=function(){var e;(e=d(this,x))==null||e.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Bt(Lt(this),d(this,et)),Bt(this,d(this,it))},qe=new WeakSet,an=function(){var e;(e=d(this,x))==null||e.setAttribute("aria-expanded","false"),Wt(Lt(this),d(this,et)),Wt(this,d(this,it))},et=new WeakMap,it=new WeakMap,nt=new WeakSet,St=function(e){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:t,y:i}=Kn({anchor:this.anchorElement,floating:this,placement:"top-start"});e??(e=this.offsetWidth);const a=Lt(this).getBoundingClientRect(),s=a.width-t-e,r=a.height-i-this.offsetHeight,{style:c}=d(this,yt);c.setProperty("position","absolute"),c.setProperty("right",`${Math.max(0,s)}px`),c.setProperty("--_menu-bottom",`${r}px`);const h=getComputedStyle(this),De=c.getPropertyValue("--_menu-bottom")===h.bottom?r:parseFloat(h.bottom),Nt=a.height-De-parseFloat(h.marginBottom);this.style.setProperty("--_menu-max-height",`${Nt}px`)},Ft=new WeakSet,Ye=function(e){const t=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=t?.querySelector('[role="menu"]'),{style:n}=d(this,yt);if(e||n.setProperty("--media-menu-transition-in","none"),i){const a=i.offsetHeight,s=Math.max(i.offsetWidth,t.offsetWidth);this.style.setProperty("min-width",`${s}px`),this.style.setProperty("min-height",`${a}px`),m(this,nt,St).call(this,s)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),m(this,nt,St).call(this);n.removeProperty("--media-menu-transition-in")},Ze=new WeakSet,sn=function(e){var t;if(e.stopPropagation(),e.composedPath().includes(d(this,ze,on))){(t=d(this,N))==null||t.focus(),this.hidden=!0;return}const i=m(this,It,Qt).call(this,e);!i||i.hasAttribute("disabled")||(m(this,Mt,Xt).call(this,i),this.handleSelect(e))},ze=new WeakSet,on=function(){var e;return(e=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:e.find(i=>i.matches('button[part~="back"]'))},Ve=new WeakSet,rn=function(e){if(e.target===this)return;m(this,Fe,ln).call(this);const t=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of t)i.invokeTargetElement!=e.target&&e.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new Oe({relatedTarget:i}));for(const i of t)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);m(this,Ft,Ye).call(this,!0)},Fe=new WeakSet,ln=function(){const t=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!t)},Qe=new WeakSet,dn=function(e){var t;Kt(this,e.relatedTarget)||(d(this,Z)&&((t=d(this,N))==null||t.focus()),d(this,x)&&d(this,x)!==e.relatedTarget&&!this.hidden&&(this.hidden=!0))},Xe=new WeakSet,cn=function(e){var t,i,n,a,s;const{key:r,ctrlKey:c,altKey:h,metaKey:b}=e;if(!(c||h||b)&&this.keysUsed.includes(r))if(e.preventDefault(),e.stopPropagation(),r==="Tab"){if(d(this,Z)){this.hidden=!0;return}e.shiftKey?(i=(t=this.previousElementSibling)==null?void 0:t.focus)==null||i.call(t):(a=(n=this.nextElementSibling)==null?void 0:n.focus)==null||a.call(n),this.blur()}else r==="Escape"?((s=d(this,N))==null||s.focus(),d(this,Z)&&(this.hidden=!0)):r==="Enter"||r===" "?this.handleSelect(e):this.handleMove(e)},It=new WeakSet,Qt=function(e){return e.composedPath().find(t=>["menuitemradio","menuitemcheckbox"].includes(t.role))},Je=new WeakSet,hn=function(){return this.items.find(e=>e.tabIndex===0)},Mt=new WeakSet,Xt=function(e){for(const t of this.items)t.tabIndex=t===e?0:-1},Jt=new WeakSet,je=function(e,t){const i=[...this.checkedItems];e.type==="radio"&&this.radioGroupItems.forEach(n=>n.checked=!1),t?e.checked=!e.checked:e.checked=!0,this.checkedItems.some((n,a)=>n!=i[a])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},_.shadowRootOptions={mode:"open"},_.getTemplateHTML=Xn;function Jn(e){return["menuitem","menuitemradio","menuitemcheckbox"].includes(e?.role)}function Lt(e){var t;return(t=e.getAttribute("bounds")?Gt(e,`#${e.getAttribute("bounds")}`):E(e)||e.parentElement)!=null?t:e}l.customElements.get("media-chrome-menu")||l.customElements.define("media-chrome-menu",_);var ti=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},g=(e,t,i)=>(ti(e,t,"read from private field"),i?i.call(e):t.get(e)),D=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ei=(e,t,i,n)=>(ti(e,t,"write to private field"),t.set(e,i),i),st=(e,t,i)=>(ti(e,t,"access private method"),i),jt,wt,ii,un,te,ni,ai,mn,S,ot,si,ee,oi;function jn(e){return`
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(e)}
    </slot>
    <slot name="submenu"></slot>
  `}function ta(e){return""}const A={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class R extends l.HTMLElement{constructor(){if(super(),D(this,ii),D(this,te),D(this,ai),D(this,ee),D(this,jt,!1),D(this,wt,void 0),D(this,S,()=>{var t,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const n=this.shadowRoot.querySelector('slot[name="description"]'),a=(t=this.submenuElement.checkedItems)==null?void 0:t[0],s=(i=a?.dataset.description)!=null?i:a?.text,r=Re.createElement("span");r.textContent=s??"",n.replaceChildren(r)}),D(this,ot,t=>{const{key:i}=t;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",g(this,ot));return}this.handleClick(t)}),D(this,si,t=>{const{metaKey:i,altKey:n,key:a}=t;if(i||n||!this.keysUsed.includes(a)){this.removeEventListener("keyup",g(this,ot));return}this.addEventListener("keyup",g(this,ot),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const t=Ut(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}}static get observedAttributes(){return[A.TYPE,A.DISABLED,A.CHECKED,A.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Ct(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(t){switch(t.type){case"slotchange":st(this,ii,un).call(this,t);break;case"click":this.handleClick(t);break;case"keydown":g(this,si).call(this,t);break;case"keyup":g(this,ot).call(this,t);break}}attributeChangedCallback(t,i,n){t===A.CHECKED&&Ct(this)&&!g(this,jt)?this.setAttribute("aria-checked",n!=null?"true":"false"):t===A.TYPE&&n!==i?this.role="menuitem"+n:t===A.DISABLED&&n!==i&&(n==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(A.DISABLED)||this.enable(),this.role="menuitem"+this.type,ei(this,wt,ri(this,this.parentNode)),st(this,ee,oi).call(this),this.submenuElement&&st(this,te,ni).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),st(this,ee,oi).call(this),ei(this,wt,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(t){this.setAttribute("invoketarget",`${t}`)}get invokeTargetElement(){var t;return this.invokeTarget?(t=qt(this))==null?void 0:t.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var t;return(t=this.getAttribute(A.TYPE))!=null?t:""}set type(t){this.setAttribute(A.TYPE,`${t}`)}get value(){var t;return(t=this.getAttribute(A.VALUE))!=null?t:this.text}set value(t){this.setAttribute(A.VALUE,t)}get text(){var t;return((t=this.textContent)!=null?t:"").trim()}get checked(){if(Ct(this))return this.getAttribute("aria-checked")==="true"}set checked(t){Ct(this)&&(ei(this,jt,!0),this.setAttribute("aria-checked",t?"true":"false"),t?this.part.add("checked"):this.part.remove("checked"))}handleClick(t){Ct(this)||this.invokeTargetElement&&Kt(this,t.target)&&this.invokeTargetElement.dispatchEvent(new Oe({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}jt=new WeakMap,wt=new WeakMap,ii=new WeakSet,un=function(e){const t=e.target;if(!t?.name)for(const n of t.assignedNodes({flatten:!0}))n instanceof Text&&n.textContent.trim()===""&&n.remove();t.name==="submenu"&&(this.submenuElement?st(this,te,ni).call(this):st(this,ai,mn).call(this))},te=new WeakSet,ni=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",g(this,S)),this.submenuElement.addEventListener("addmenuitem",g(this,S)),this.submenuElement.addEventListener("removemenuitem",g(this,S)),g(this,S).call(this)},ai=new WeakSet,mn=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",g(this,S)),this.submenuElement.removeEventListener("addmenuitem",g(this,S)),this.submenuElement.removeEventListener("removemenuitem",g(this,S)),g(this,S).call(this)},S=new WeakMap,ot=new WeakMap,si=new WeakMap,ee=new WeakSet,oi=function(){var e;const t=(e=g(this,wt))==null?void 0:e.radioGroupItems;if(!t)return;let i=t.filter(n=>n.getAttribute("aria-checked")==="true").pop();i||(i=t[0]);for(const n of t)n.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")},R.shadowRootOptions={mode:"open"},R.getTemplateHTML=jn,R.getSuffixSlotInnerHTML=ta;function Ct(e){return e.type==="radio"||e.type==="checkbox"}function ri(e,t){if(!e)return null;const{host:i}=e.getRootNode();return!t&&i?ri(e,i):t?.items?t:ri(t,t?.parentNode)}l.customElements.get("media-chrome-menu-item")||l.customElements.define("media-chrome-menu-item",R);function ea(e){return`
    ${_.getTemplateHTML(e)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `}class li extends _{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:E(this).querySelector("media-settings-menu-button")}}li.getTemplateHTML=ea,l.customElements.get("media-settings-menu")||l.customElements.define("media-settings-menu",li);function ia(e){return`
    ${R.getTemplateHTML.call(this,e)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}function na(e){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}class xt extends R{}xt.shadowRootOptions={mode:"open"},xt.getTemplateHTML=ia,xt.getSuffixSlotInnerHTML=na,l.customElements.get("media-settings-menu-item")||l.customElements.define("media-settings-menu-item",xt);const rt={PLACEMENT:"placement",BOUNDS:"bounds"};function aa(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}class ie extends l.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var t;if(!Vn(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const n=getComputedStyle(this),a=(t=Gt(this,"#"+this.bounds))!=null?t:E(this);if(!a)return;const{x:s,width:r}=a.getBoundingClientRect(),{x:c,width:h}=this.getBoundingClientRect(),b=c+h,De=s+r,Nt=n.getPropertyValue("--media-tooltip-offset-x"),$i=Nt?parseFloat(Nt.replace("px","")):0,Oi=n.getPropertyValue("--media-tooltip-container-margin"),Hi=Oi?parseFloat(Oi.replace("px","")):0,Pi=c-s+$i-Hi,Ni=b-De+$i+Hi;if(Pi<0){this.style.setProperty("--media-tooltip-offset-x",`${Pi}px`);return}if(Ni>0){this.style.setProperty("--media-tooltip-offset-x",`${Ni}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const t=Ut(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const t=this.placement;delete this.placement,this.placement=t}}static get observedAttributes(){return[rt.PLACEMENT,rt.BOUNDS]}get placement(){return C(this,rt.PLACEMENT)}set placement(t){P(this,rt.PLACEMENT,t)}get bounds(){return C(this,rt.BOUNDS)}set bounds(t){P(this,rt.BOUNDS,t)}}ie.shadowRootOptions={mode:"open"},ie.getTemplateHTML=aa,l.customElements.get("media-tooltip")||l.customElements.define("media-tooltip",ie);var pn=ie,di=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},p=(e,t,i)=>(di(e,t,"read from private field"),i?i.call(e):t.get(e)),lt=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ne=(e,t,i,n)=>(di(e,t,"write to private field"),t.set(e,i),i),sa=(e,t,i)=>(di(e,t,"access private method"),i),I,dt,B,ct,ae,ci,vn;const W={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function oa(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      slot[name="icon"] {
        display: inline-flex;
        align-items: center;
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${pn.shadowRootOptions.mode}">
          ${pn.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function ra(e,t){return`
    <slot></slot>
  `}function la(){return""}class F extends l.HTMLElement{constructor(){if(super(),lt(this,ci),lt(this,I,void 0),this.preventClick=!1,this.tooltipEl=null,lt(this,dt,t=>{this.preventClick||this.handleClick(t),setTimeout(p(this,B),0)}),lt(this,B,()=>{var t,i;(i=(t=this.tooltipEl)==null?void 0:t.updateXOffset)==null||i.call(t)}),lt(this,ct,t=>{const{key:i}=t;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",p(this,ct));return}this.preventClick||this.handleClick(t)}),lt(this,ae,t=>{const{metaKey:i,altKey:n,key:a}=t;if(i||n||!this.keysUsed.includes(a)){this.removeEventListener("keyup",p(this,ct));return}this.addEventListener("keyup",p(this,ct),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const t=Ut(this.attributes),i=this.constructor.getTemplateHTML(t);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",W.TOOLTIP_PLACEMENT,H.MEDIA_CONTROLLER,o.MEDIA_LANG]}enable(){this.addEventListener("click",p(this,dt)),this.addEventListener("keydown",p(this,ae)),this.tabIndex=0}disable(){this.removeEventListener("click",p(this,dt)),this.removeEventListener("keydown",p(this,ae)),this.removeEventListener("keyup",p(this,ct)),this.tabIndex=-1}attributeChangedCallback(t,i,n){var a,s,r,c,h;t===H.MEDIA_CONTROLLER?(i&&((s=(a=p(this,I))==null?void 0:a.unassociateElement)==null||s.call(a,this),ne(this,I,null)),n&&this.isConnected&&(ne(this,I,(r=this.getRootNode())==null?void 0:r.getElementById(n)),(h=(c=p(this,I))==null?void 0:c.associateElement)==null||h.call(c,this))):t==="disabled"&&n!==i?n==null?this.enable():this.disable():t===W.TOOLTIP_PLACEMENT&&this.tooltipEl&&n!==i?this.tooltipEl.placement=n:t===o.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),p(this,B).call(this)}connectedCallback(){var t,i,n;const{style:a}=Fn(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const s=this.getAttribute(H.MEDIA_CONTROLLER);s&&(ne(this,I,(t=this.getRootNode())==null?void 0:t.getElementById(s)),(n=(i=p(this,I))==null?void 0:i.associateElement)==null||n.call(i,this)),l.customElements.whenDefined("media-tooltip").then(()=>sa(this,ci,vn).call(this))}disconnectedCallback(){var t,i;this.disable(),(i=(t=p(this,I))==null?void 0:t.unassociateElement)==null||i.call(t,this),ne(this,I,null),this.removeEventListener("mouseenter",p(this,B)),this.removeEventListener("focus",p(this,B)),this.removeEventListener("click",p(this,dt))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return C(this,W.TOOLTIP_PLACEMENT)}set tooltipPlacement(t){P(this,W.TOOLTIP_PLACEMENT,t)}get mediaController(){return C(this,H.MEDIA_CONTROLLER)}set mediaController(t){P(this,H.MEDIA_CONTROLLER,t)}get disabled(){return Pe(this,W.DISABLED)}set disabled(t){ji(this,W.DISABLED,t)}get noTooltip(){return Pe(this,W.NO_TOOLTIP)}set noTooltip(t){ji(this,W.NO_TOOLTIP,t)}handleClick(t){}}I=new WeakMap,dt=new WeakMap,B=new WeakMap,ct=new WeakMap,ae=new WeakMap,ci=new WeakSet,vn=function(){this.addEventListener("mouseenter",p(this,B)),this.addEventListener("focus",p(this,B)),this.addEventListener("click",p(this,dt));const e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},F.shadowRootOptions={mode:"open"},F.getTemplateHTML=oa,F.getSlotTemplateHTML=ra,F.getTooltipContentHTML=la,l.customElements.get("media-chrome-button")||l.customElements.define("media-chrome-button",F);class Q extends F{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(t){this.setAttribute("invoketarget",`${t}`)}get invokeTargetElement(){var t;return this.invokeTarget?(t=qt(this))==null?void 0:t.querySelector(`#${this.invokeTarget}`):null}handleClick(){var t;(t=this.invokeTargetElement)==null||t.dispatchEvent(new Oe({relatedTarget:this}))}}l.customElements.get("media-chrome-menu-button")||l.customElements.define("media-chrome-menu-button",Q);const da={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var fn;const hi={en:da};let gn=((fn=globalThis.navigator)==null?void 0:fn.language)||"en";const ca=e=>{var t,i,n;const[a]=gn.split("-");return((t=hi[gn])==null?void 0:t[e])||((i=hi[a])==null?void 0:i[e])||((n=hi.en)==null?void 0:n[e])||e},f=(e,t={})=>ca(e).replace(/\{(\w+)\}/g,(i,n)=>n in t?String(t[n]):`{${n}}`);function ha(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `}function ua(){return f("Settings")}class se extends Q{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",f("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:E(this).querySelector("media-settings-menu")}}se.getSlotTemplateHTML=ha,se.getTooltipContentHTML=ua,l.customElements.get("media-settings-menu-button")||l.customElements.define("media-settings-menu-button",se);function ma(e){return e?.split(/\s+/).map(pa)}function pa(e){if(e){const[t,i,n]=e.split(":");return{id:t,width:+i,height:+n}}}function va(e){return e?.split(/\s+/).map(fa)}function fa(e){if(e){const[t,i,n,a]=e.split(":");return{id:t,kind:i,language:n,label:a}}}var ui=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},En=(e,t,i)=>(ui(e,t,"read from private field"),i?i.call(e):t.get(e)),oe=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},mi=(e,t,i,n)=>(ui(e,t,"write to private field"),t.set(e,i),i),re=(e,t,i)=>(ui(e,t,"access private method"),i),Dt,le,de,pi,ce,vi;class bn extends _{constructor(){super(...arguments),oe(this,de),oe(this,ce),oe(this,Dt,[]),oe(this,le,void 0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_AUDIO_TRACK_LIST,o.MEDIA_AUDIO_TRACK_ENABLED,o.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===o.MEDIA_AUDIO_TRACK_ENABLED&&i!==n?this.value=n:t===o.MEDIA_AUDIO_TRACK_LIST&&i!==n&&(mi(this,Dt,va(n??"")),re(this,de,pi).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",re(this,ce,vi))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",re(this,ce,vi))}get anchorElement(){var t;return this.anchor!=="auto"?super.anchorElement:(t=E(this))==null?void 0:t.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return En(this,Dt)}set mediaAudioTrackList(t){mi(this,Dt,t),re(this,de,pi).call(this)}get mediaAudioTrackEnabled(){var t;return(t=C(this,o.MEDIA_AUDIO_TRACK_ENABLED))!=null?t:""}set mediaAudioTrackEnabled(t){P(this,o.MEDIA_AUDIO_TRACK_ENABLED,t)}}Dt=new WeakMap,le=new WeakMap,de=new WeakSet,pi=function(){if(En(this,le)===JSON.stringify(this.mediaAudioTrackList))return;mi(this,le,JSON.stringify(this.mediaAudioTrackList));const e=this.mediaAudioTrackList;this.defaultSlot.textContent="",e.sort((t,i)=>t.id.localeCompare(i.id,void 0,{numeric:!0}));for(const t of e){const i=this.formatMenuItemText(t.label,t),n=at({type:"radio",text:i,value:`${t.id}`,checked:t.enabled});n.prepend(z(this,"checked-indicator")),this.defaultSlot.append(n)}},ce=new WeakSet,vi=function(){if(this.value==null)return;const e=new l.CustomEvent(j.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)},l.customElements.get("media-audio-track-menu")||l.customElements.define("media-audio-track-menu",bn);const ga=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function Ea(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${ga}</slot>
  `}function ba(){return f("Audio")}const _n=e=>{const t=f("Audio");e.setAttribute("aria-label",t)};class he extends Q{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_AUDIO_TRACK_ENABLED,o.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),_n(this)}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===o.MEDIA_LANG&&_n(this)}get invokeTargetElement(){var t;return this.invokeTarget!=null?super.invokeTargetElement:(t=E(this))==null?void 0:t.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var t;return(t=C(this,o.MEDIA_AUDIO_TRACK_ENABLED))!=null?t:""}set mediaAudioTrackEnabled(t){P(this,o.MEDIA_AUDIO_TRACK_ENABLED,t)}}he.getSlotTemplateHTML=Ea,he.getTooltipContentHTML=ba,l.customElements.get("media-audio-track-menu-button")||l.customElements.define("media-audio-track-menu-button",he);const _a=(e="")=>e.split(/\s+/),ka=(e="")=>{const[t,i,n]=e.split(":"),a=n?decodeURIComponent(n):void 0;return{kind:t==="cc"?Ui.CAPTIONS:Ui.SUBTITLES,language:i,label:a}},kn=(e="",t={})=>_a(e).map(i=>{const n=ka(i);return{...t,...n}}),fi=({kind:e,label:t,language:i}={kind:"subtitles"})=>t?`${e==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(t)}`:i,An=(e=[])=>Array.prototype.map.call(e,fi).join(" "),Aa=e=>{var t;return!!((t=e.mediaSubtitlesShowing)!=null&&t.length)||e.hasAttribute(o.MEDIA_SUBTITLES_SHOWING)};var gi=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},Ta=(e,t,i)=>(gi(e,t,"read from private field"),t.get(e)),Ei=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ya=(e,t,i,n)=>(gi(e,t,"write to private field"),t.set(e,i),i),ue=(e,t,i)=>(gi(e,t,"access private method"),i),me,pe,bi,ve,_i;const Sa=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function Ia(e){return`
    ${_.getTemplateHTML(e)}
    <slot name="captions-indicator" hidden>${Sa}</slot>
  `}class ki extends _{constructor(){super(...arguments),Ei(this,pe),Ei(this,ve),Ei(this,me,void 0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===o.MEDIA_SUBTITLES_LIST&&i!==n?ue(this,pe,bi).call(this):t===o.MEDIA_SUBTITLES_SHOWING&&i!==n&&(this.value=n||"",ue(this,pe,bi).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ue(this,ve,_i))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ue(this,ve,_i))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:E(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Tn(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(t){yn(this,o.MEDIA_SUBTITLES_LIST,t)}get mediaSubtitlesShowing(){return Tn(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(t){yn(this,o.MEDIA_SUBTITLES_SHOWING,t)}}me=new WeakMap,pe=new WeakSet,bi=function(){var e;const t=Ta(this,me)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(o.MEDIA_SUBTITLES_SHOWING);if(!t&&!i)return;ya(this,me,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const n=!this.value,a=at({type:"radio",text:this.formatMenuItemText(f("Off")),value:"off",checked:n});a.prepend(z(this,"checked-indicator")),this.defaultSlot.append(a);const s=this.mediaSubtitlesList;for(const r of s){const c=at({type:"radio",text:this.formatMenuItemText(r.label,r),value:fi(r),checked:this.value==fi(r)});c.prepend(z(this,"checked-indicator")),((e=r.kind)!=null?e:"subs")==="captions"&&c.append(z(this,"captions-indicator")),this.defaultSlot.append(c)}},ve=new WeakSet,_i=function(){const e=this.mediaSubtitlesShowing,t=this.getAttribute(o.MEDIA_SUBTITLES_SHOWING),i=this.value!==t;if(e?.length&&i&&this.dispatchEvent(new l.CustomEvent(j.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:e})),!this.value||!i)return;const n=new l.CustomEvent(j.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(n)},ki.getTemplateHTML=Ia;const Tn=(e,t)=>{const i=e.getAttribute(t);return i?kn(i):[]},yn=(e,t,i)=>{if(!i?.length){e.removeAttribute(t);return}const n=An(i);e.getAttribute(t)!==n&&e.setAttribute(t,n)};l.customElements.get("media-captions-menu")||l.customElements.define("media-captions-menu",ki);const Ma=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,La=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function wa(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${Ma}</slot>
      <slot name="off">${La}</slot>
    </slot>
  `}function Ca(){return f("Captions")}const Sn=e=>{e.setAttribute("data-captions-enabled",Aa(e).toString())},In=e=>{e.setAttribute("aria-label",f("closed captions"))};class fe extends Q{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING,o.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),In(this),Sn(this)}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===o.MEDIA_SUBTITLES_SHOWING?Sn(this):t===o.MEDIA_LANG&&In(this)}get invokeTargetElement(){var t;return this.invokeTarget!=null?super.invokeTargetElement:(t=E(this))==null?void 0:t.querySelector("media-captions-menu")}get mediaSubtitlesList(){return Mn(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(t){Ln(this,o.MEDIA_SUBTITLES_LIST,t)}get mediaSubtitlesShowing(){return Mn(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(t){Ln(this,o.MEDIA_SUBTITLES_SHOWING,t)}}fe.getSlotTemplateHTML=wa,fe.getTooltipContentHTML=Ca;const Mn=(e,t)=>{const i=e.getAttribute(t);return i?kn(i):[]},Ln=(e,t,i)=>{if(!i?.length){e.removeAttribute(t);return}const n=An(i);e.getAttribute(t)!==n&&e.setAttribute(t,n)};l.customElements.get("media-captions-menu-button")||l.customElements.define("media-captions-menu-button",fe);var wn=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},v=(e,t,i)=>(wn(e,t,"read from private field"),i?i.call(e):t.get(e)),Rt=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ge=(e,t,i,n)=>(wn(e,t,"write to private field"),t.set(e,i),i),ht,ut,Ee,X,$,U;class Cn{constructor(t,i,{defaultValue:n}={defaultValue:void 0}){Rt(this,$),Rt(this,ht,void 0),Rt(this,ut,void 0),Rt(this,Ee,void 0),Rt(this,X,new Set),ge(this,ht,t),ge(this,ut,i),ge(this,Ee,new Set(n))}[Symbol.iterator](){return v(this,$,U).values()}get length(){return v(this,$,U).size}get value(){var t;return(t=[...v(this,$,U)].join(" "))!=null?t:""}set value(t){var i;t!==this.value&&(ge(this,X,new Set),this.add(...(i=t?.split(" "))!=null?i:[]))}toString(){return this.value}item(t){return[...v(this,$,U)][t]}values(){return v(this,$,U).values()}forEach(t,i){v(this,$,U).forEach(t,i)}add(...t){var i,n;t.forEach(a=>v(this,X).add(a)),!(this.value===""&&!((i=v(this,ht))!=null&&i.hasAttribute(`${v(this,ut)}`)))&&((n=v(this,ht))==null||n.setAttribute(`${v(this,ut)}`,`${this.value}`))}remove(...t){var i;t.forEach(n=>v(this,X).delete(n)),(i=v(this,ht))==null||i.setAttribute(`${v(this,ut)}`,`${this.value}`)}contains(t){return v(this,$,U).has(t)}toggle(t,i){return typeof i<"u"?i?(this.add(t),!0):(this.remove(t),!1):this.contains(t)?(this.remove(t),!1):(this.add(t),!0)}replace(t,i){return this.remove(t),this.add(i),t===i}}ht=new WeakMap,ut=new WeakMap,Ee=new WeakMap,X=new WeakMap,$=new WeakSet,U=function(){return v(this,X).size?v(this,X):v(this,Ee)};var xa=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},mt=(e,t,i)=>(xa(e,t,"read from private field"),i?i.call(e):t.get(e)),Da=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},K;const Ai={RATES:"rates"},xn=[1,1.2,1.5,1.7,2],pt=1;function G(e){return Math.round(e*100)/100}function Ra(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?G(+e.mediaplaybackrate):pt}x</slot>
  `}function $a(){return f("Playback rate")}class Ti extends F{constructor(){var t;super(),Da(this,K,new Cn(this,Ai.RATES,{defaultValue:xn})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${G((t=this.mediaPlaybackRate)!=null?t:pt)}x`}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,Ai.RATES]}attributeChangedCallback(t,i,n){if(super.attributeChangedCallback(t,i,n),t===Ai.RATES&&(mt(this,K).value=n),t===o.MEDIA_PLAYBACK_RATE){const a=n?+n:Number.NaN,s=G(Number.isNaN(a)?pt:a);this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",f("Playback rate {playbackRate}",{playbackRate:s}))}}get rates(){return mt(this,K)}set rates(t){t?Array.isArray(t)?mt(this,K).value=t.join(" "):typeof t=="string"&&(mt(this,K).value=t):mt(this,K).value=""}get mediaPlaybackRate(){return Y(this,o.MEDIA_PLAYBACK_RATE,pt)}set mediaPlaybackRate(t){tt(this,o.MEDIA_PLAYBACK_RATE,t)}handleClick(){var t,i;const n=Array.from(mt(this,K).values(),r=>+r).sort((r,c)=>r-c),a=(i=(t=n.find(r=>r>this.mediaPlaybackRate))!=null?t:n[0])!=null?i:pt,s=new l.CustomEvent(j.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:a});this.dispatchEvent(s)}}K=new WeakMap,Ti.getSlotTemplateHTML=Ra,Ti.getTooltipContentHTML=$a,l.customElements.get("media-playback-rate-button")||l.customElements.define("media-playback-rate-button",Ti);var Dn=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},vt=(e,t,i)=>(Dn(e,t,"read from private field"),i?i.call(e):t.get(e)),yi=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ft=(e,t,i)=>(Dn(e,t,"access private method"),i),q,gt,$t,be,Si;const Ii={RATES:"rates"};class Rn extends _{constructor(){super(),yi(this,gt),yi(this,be),yi(this,q,new Cn(this,Ii.RATES,{defaultValue:xn})),ft(this,gt,$t).call(this)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,Ii.RATES]}attributeChangedCallback(t,i,n){super.attributeChangedCallback(t,i,n),t===o.MEDIA_PLAYBACK_RATE&&i!=n?(this.value=n,ft(this,gt,$t).call(this)):t===Ii.RATES&&i!=n&&(vt(this,q).value=n,ft(this,gt,$t).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ft(this,be,Si))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ft(this,be,Si))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:E(this).querySelector("media-playback-rate-menu-button")}get rates(){return vt(this,q)}set rates(t){t?Array.isArray(t)?vt(this,q).value=t.join(" "):typeof t=="string"&&(vt(this,q).value=t):vt(this,q).value="",ft(this,gt,$t).call(this)}get mediaPlaybackRate(){return Y(this,o.MEDIA_PLAYBACK_RATE,pt)}set mediaPlaybackRate(t){tt(this,o.MEDIA_PLAYBACK_RATE,t)}}q=new WeakMap,gt=new WeakSet,$t=function(){this.defaultSlot.textContent="";const e=G(this.mediaPlaybackRate),t=new Set(Array.from(vt(this,q)).map(n=>G(Number(n))));e>0&&!t.has(e)&&t.add(e);const i=Array.from(t).sort((n,a)=>n-a);for(const n of i){const a=at({type:"radio",text:this.formatMenuItemText(`${n}x`,n),value:n.toString(),checked:e===n});a.prepend(z(this,"checked-indicator")),this.defaultSlot.append(a)}},be=new WeakSet,Si=function(){if(!this.value)return;const e=new l.CustomEvent(j.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)},l.customElements.get("media-playback-rate-menu")||l.customElements.define("media-playback-rate-menu",Rn);const _e=1;function Oa(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }

      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?G(+e.mediaplaybackrate):_e}x</slot>
  `}function Ha(){return f("Playback rate")}class ke extends Q{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE]}constructor(){var t;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${G((t=this.mediaPlaybackRate)!=null?t:_e)}x`}attributeChangedCallback(t,i,n){if(super.attributeChangedCallback(t,i,n),t===o.MEDIA_PLAYBACK_RATE){const a=n?+n:Number.NaN,s=G(Number.isNaN(a)?_e:a);this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",f("Playback rate {playbackRate}",{playbackRate:s}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:E(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return Y(this,o.MEDIA_PLAYBACK_RATE,_e)}set mediaPlaybackRate(t){tt(this,o.MEDIA_PLAYBACK_RATE,t)}}ke.getSlotTemplateHTML=Oa,ke.getTooltipContentHTML=Ha,l.customElements.get("media-playback-rate-menu-button")||l.customElements.define("media-playback-rate-menu-button",ke);var Mi=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},O=(e,t,i)=>(Mi(e,t,"read from private field"),i?i.call(e):t.get(e)),Ae=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},$n=(e,t,i,n)=>(Mi(e,t,"write to private field"),t.set(e,i),i),Et=(e,t,i)=>(Mi(e,t,"access private method"),i),Ot,M,bt,Ht,Te,Li;class On extends _{constructor(){super(...arguments),Ae(this,bt),Ae(this,Te),Ae(this,Ot,[]),Ae(this,M,{})}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_RENDITION_LIST,o.MEDIA_RENDITION_SELECTED,o.MEDIA_RENDITION_UNAVAILABLE,o.MEDIA_HEIGHT,o.MEDIA_WIDTH]}static formatMenuItemText(t,i){return super.formatMenuItemText(t,i)}static formatRendition(t,{showBitrate:i=!1}={}){const n=`${Math.min(t.width,t.height)}p`;if(i&&t.bitrate){const a=t.bitrate/1e6,s=`${a.toFixed(a<1?1:0)} Mbps`;return`${n} (${s})`}return this.formatMenuItemText(n,t)}static compareRendition(t,i){var n,a;return i.height===t.height?((n=i.bitrate)!=null?n:0)-((a=t.bitrate)!=null?a:0):i.height-t.height}attributeChangedCallback(t,i,n){if(super.attributeChangedCallback(t,i,n),i!==n)switch(t){case o.MEDIA_RENDITION_SELECTED:this.value=n??"auto",Et(this,bt,Ht).call(this);break;case o.MEDIA_RENDITION_LIST:$n(this,Ot,ma(n)),Et(this,bt,Ht).call(this);break;case o.MEDIA_HEIGHT:case o.MEDIA_WIDTH:Et(this,bt,Ht).call(this);break}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Et(this,Te,Li))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Et(this,Te,Li))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:E(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return O(this,Ot)}set mediaRenditionList(t){$n(this,Ot,t),Et(this,bt,Ht).call(this)}get mediaRenditionSelected(){return C(this,o.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(t){P(this,o.MEDIA_RENDITION_SELECTED,t)}get mediaHeight(){return Y(this,o.MEDIA_HEIGHT)}set mediaHeight(t){tt(this,o.MEDIA_HEIGHT,t)}get mediaWidth(){return Y(this,o.MEDIA_WIDTH)}set mediaWidth(t){tt(this,o.MEDIA_WIDTH,t)}compareRendition(t,i){return this.constructor.compareRendition(t,i)}formatMenuItemText(t,i){return this.constructor.formatMenuItemText(t,i)}formatRendition(t,i){return this.constructor.formatRendition(t,i)}showRenditionBitrate(t){return this.mediaRenditionList.some(i=>i!==t&&i.height===t.height&&i.bitrate!==t.bitrate)}}Ot=new WeakMap,M=new WeakMap,bt=new WeakSet,Ht=function(){const e=!this.mediaRenditionSelected;if(O(this,M).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&O(this,M).mediaHeight===this.mediaHeight&&O(this,M).mediaWidth===this.mediaWidth&&O(this,M).isAuto===e)return;O(this,M).mediaRenditionList=JSON.stringify(this.mediaRenditionList),O(this,M).mediaHeight=this.mediaHeight,O(this,M).mediaWidth=this.mediaWidth,O(this,M).isAuto=e;const t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),i=t.find(r=>r.id===this.mediaRenditionSelected);for(const r of t)r.selected=r===i;this.defaultSlot.textContent="";for(const r of t){const c=this.formatRendition(r,{showBitrate:this.showRenditionBitrate(r)}),h=at({type:"radio",text:c,value:`${r.id}`,checked:r.selected&&!e});h.prepend(z(this,"checked-indicator")),this.defaultSlot.append(h)}const n=i&&this.showRenditionBitrate(i);let a;e&&(i?a=this.formatMenuItemText(`${f("Auto")} \u2022 ${this.formatRendition(i,{showBitrate:n})}`,i):this.mediaHeight>0&&this.mediaWidth>0&&(a=this.formatMenuItemText(`${f("Auto")} (${Math.min(this.mediaWidth,this.mediaHeight)}p)`))),a||(a=this.formatMenuItemText(f("Auto")));const s=at({type:"radio",text:a,value:"auto",checked:e});s.dataset.description=a,s.prepend(z(this,"checked-indicator")),this.defaultSlot.append(s)},Te=new WeakSet,Li=function(){if(this.value==null)return;const e=new l.CustomEvent(j.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(e)},l.customElements.get("media-rendition-menu")||l.customElements.define("media-rendition-menu",On);const Pa=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function Na(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${Pa}</slot>
  `}function Ba(){return f("Quality")}class ye extends Q{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_RENDITION_SELECTED,o.MEDIA_RENDITION_UNAVAILABLE,o.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",f("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:E(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return C(this,o.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(t){P(this,o.MEDIA_RENDITION_SELECTED,t)}get mediaHeight(){return Y(this,o.MEDIA_HEIGHT)}set mediaHeight(t){tt(this,o.MEDIA_HEIGHT,t)}}ye.getSlotTemplateHTML=Na,ye.getTooltipContentHTML=Ba,l.customElements.get("media-rendition-menu-button")||l.customElements.define("media-rendition-menu-button",ye);var wi=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},L=(e,t,i)=>(wi(e,t,"read from private field"),i?i.call(e):t.get(e)),w=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Hn=(e,t,i,n)=>(wi(e,t,"write to private field"),t.set(e,i),i),T=(e,t,i)=>(wi(e,t,"access private method"),i),_t,Pt,Se,J,kt,Ci,Pn,Ie,xi,Me,Di,Nn,Le,we,Ce;function Wa(e){return`
      ${_.getTemplateHTML(e)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `}class Ri extends _{constructor(){super(),w(this,Pt),w(this,J),w(this,Ci),w(this,Ie),w(this,Di),w(this,_t,!1),w(this,Me,t=>{const i=t.target,n=i?.nodeName==="VIDEO",a=T(this,Ie,xi).call(this,i);(n||a)&&(L(this,_t)?T(this,J,kt).call(this):T(this,Di,Nn).call(this,t))}),w(this,Le,t=>{const i=t.target,n=this.contains(i),a=t.button===2,s=i?.nodeName==="VIDEO",r=T(this,Ie,xi).call(this,i);n||a&&(s||r)||T(this,J,kt).call(this)}),w(this,we,t=>{t.key==="Escape"&&T(this,J,kt).call(this)}),w(this,Ce,t=>{var i,n;const a=t.target;if((i=a.matches)!=null&&i.call(a,'button[invoke="copy"]')){const s=(n=a.closest("media-context-menu-item"))==null?void 0:n.querySelector('input[slot="copy"]');s&&navigator.clipboard.writeText(s.value)}T(this,J,kt).call(this)}),this.setAttribute("noautohide",""),T(this,Pt,Se).call(this)}connectedCallback(){super.connectedCallback(),E(this).addEventListener("contextmenu",L(this,Me)),this.addEventListener("click",L(this,Ce))}disconnectedCallback(){super.disconnectedCallback(),E(this).removeEventListener("contextmenu",L(this,Me)),this.removeEventListener("click",L(this,Ce)),document.removeEventListener("mousedown",L(this,Le)),document.removeEventListener("keydown",L(this,we))}}_t=new WeakMap,Pt=new WeakSet,Se=function(){this.hidden=!L(this,_t)},J=new WeakSet,kt=function(){Hn(this,_t,!1),T(this,Pt,Se).call(this)},Ci=new WeakSet,Pn=function(){document.querySelectorAll("media-context-menu").forEach(t=>{var i;t!==this&&T(i=t,J,kt).call(i)})},Ie=new WeakSet,xi=function(e){return e?e.hasAttribute("slot")&&e.getAttribute("slot")==="media"?!0:e.nodeName.includes("-")&&e.tagName.includes("-")?e.hasAttribute("src")||e.hasAttribute("poster")||e.hasAttribute("preload")||e.hasAttribute("playsinline"):!1:!1},Me=new WeakMap,Di=new WeakSet,Nn=function(e){e.preventDefault(),T(this,Ci,Pn).call(this),Hn(this,_t,!0),this.style.position="fixed",this.style.left=`${e.clientX}px`,this.style.top=`${e.clientY}px`,T(this,Pt,Se).call(this),document.addEventListener("mousedown",L(this,Le),{once:!0}),document.addEventListener("keydown",L(this,we),{once:!0})},Le=new WeakMap,we=new WeakMap,Ce=new WeakMap,Ri.getTemplateHTML=Wa,l.customElements.get("media-context-menu")||l.customElements.define("media-context-menu",Ri);function Ua(e){return`
    ${R.getTemplateHTML.call(this,e)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `}class xe extends R{}xe.shadowRootOptions={mode:"open"},xe.getTemplateHTML=Ua,l.customElements.get("media-context-menu-item")||l.customElements.define("media-context-menu-item",xe);export{bn as MediaAudioTrackMenu,he as MediaAudioTrackMenuButton,ki as MediaCaptionsMenu,fe as MediaCaptionsMenuButton,_ as MediaChromeMenu,Q as MediaChromeMenuButton,R as MediaChromeMenuItem,Ri as MediaContextMenu,xe as MediaContextMenuItem,Rn as MediaPlaybackRateMenu,ke as MediaPlaybackRateMenuButton,On as MediaRenditionMenu,ye as MediaRenditionMenuButton,li as MediaSettingsMenu,se as MediaSettingsMenuButton,xt as MediaSettingsMenuItem};
//# sourceMappingURL=/sm/6100e6b79cce466ee0e0fadc4a00406b4f7d52c9dd09e8bb905b129907aff49b.map