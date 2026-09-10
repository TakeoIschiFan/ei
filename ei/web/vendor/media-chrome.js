/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/media-chrome@4.19.2/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const h={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},L={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Na={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},vr=Object.entries(Na),n=vr.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),_o={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Ve=vr.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{..._o}),fo=Object.entries(Ve).reduce((t,[e,i])=>{const a=n[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"}),_r=Object.entries(n).reduce((t,[e,i])=>{const a=Ve[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),se={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},Ge={DISABLED:"disabled",HIDDEN:"hidden",SHOWING:"showing"},go={HAVE_NOTHING:0,HAVE_METADATA:1,HAVE_CURRENT_DATA:2,HAVE_FUTURE_DATA:3,HAVE_ENOUGH_DATA:4},ui={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},X={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},me={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},bo={HIGH:"high",MEDIUM:"medium",LOW:"low",OFF:"off"},fr={INLINE:"inline",FULLSCREEN:"fullscreen",PICTURE_IN_PICTURE:"picture-in-picture"};var Ao=Object.freeze({__proto__:null,AttributeToStateChangeEventMap:_r,AvailabilityStates:X,MediaStateChangeEvents:Ve,MediaStateReceiverAttributes:L,MediaUIAttributes:n,MediaUIEvents:h,MediaUIProps:Na,PointerTypes:ui,ReadyStates:go,StateChangeEventToAttributeMap:fo,StreamTypes:me,TextTrackKinds:se,TextTrackModes:Ge,VolumeLevels:bo,WebkitPresentationModes:fr});function To(t){return t?.map(Io).join(" ")}function Io(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(s=>s!=null).join(":")}}function So(t){return t?.map(yo).join(" ")}function yo(t){if(t){const{id:e,kind:i,language:a,label:s}=t;return[e,i,a,s].filter(r=>r!=null).join(":")}}function $a(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}const gr=t=>new Promise(e=>setTimeout(e,t)),Mo={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var br;const Pt={en:Mo};let st=((br=globalThis.navigator)==null?void 0:br.language)||"en";const ko=t=>{st=t},Lo=t=>{var e,i,a;const[s]=st.split("-");return((e=Pt[st])==null?void 0:e[t])||((i=Pt[s])==null?void 0:i[t])||((a=Pt.en)==null?void 0:a[t])||t},wo=()=>{const[t]=st.split("-");return Pt[st]?st:Pt[t]?t:"en"},p=(t,e={})=>Lo(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),Ar=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Ro=(t,e)=>{const i=p(t===1?Ar[e].singular:Ar[e].plural);return`${t} ${i}`},rt=t=>{if(!$a(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),r=[a.getHours(),a.getMinutes(),a.getSeconds()].map((o,d)=>o&&Ro(o,d)).filter(o=>o).join(", ");return i?p("{time} remaining",{time:r}):r};function ke(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),s=Math.floor(t/60%60),r=Math.floor(t/3600);const o=Math.floor(e/60%60),d=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(r=s=a="0"),r=r>0||d>0?r+":":"",s=((r||o>=10)&&s<10?"0"+s:s)+":",a=a<10?"0"+a:a,(i?"-":"")+r+s+a}const Tr=Object.freeze({length:0,start(t){const e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){const e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});function Do(t=Tr){return Array.from(t).map((e,i)=>[Number(t.start(i).toFixed(3)),Number(t.end(i).toFixed(3))].join(":")).join(" ")}var Co=Object.freeze({__proto__:null,emptyTimeRanges:Tr,formatAsTimePhrase:rt,formatTime:ke,serializeTimeRanges:Do});class Ir{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class Sr extends Ir{}class yr extends Sr{constructor(){super(...arguments),this.role=null}}class Oo{observe(){}unobserve(){}disconnect(){}}const Mr={createElement:function(){return new Ut.HTMLElement},createElementNS:function(){return new Ut.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Ut={ResizeObserver:Oo,document:Mr,Node:Sr,Element:yr,HTMLElement:class extends yr{constructor(){super(...arguments),this.innerHTML=""}get content(){return new Ut.DocumentFragment}},DocumentFragment:class extends Ir{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{parseFromString(e,i){return{body:{textContent:e}}}}},kr="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",Lr=Object.keys(Ut).every(t=>t in globalThis),l=kr&&!Lr?Ut:globalThis,z=kr&&!Lr?Mr:globalThis.document,wr=new WeakMap,Ha=t=>{let e=wr.get(t);return e||wr.set(t,e=new Set),e},Rr=new l.ResizeObserver(t=>{for(const e of t)for(const i of Ha(e.target))i(e)});function Dr(t,e){Ha(t).add(e),Rr.observe(t)}function Cr(t,e){const i=Ha(t);i.delete(e),i.size||Rr.unobserve(t)}function re(t){const e={};for(const i of t)e[i.name]=i.value;return e}function Po(t){var e;return(e=Uo(t))!=null?e:xt(t,"media-controller")}function Uo(t){var e;const{MEDIA_CONTROLLER:i}=L,a=t.getAttribute(i);if(a)return(e=No(t))==null?void 0:e.getElementById(a)}const Or=(t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},xo=(t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Pr=(t,e)=>xo(t,e)[0],nt=(t,e)=>!t||!e?!1:t?.contains(e)?!0:nt(t,e.getRootNode().host),xt=(t,e)=>{if(!t)return null;const i=t.closest(e);return i||xt(t.getRootNode().host,e)};function Ur(t=document){var e;const i=t?.activeElement;return i?(e=Ur(i.shadowRoot))!=null?e:i:null}function No(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function xr(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let s=t;for(;s&&e>0;){const r=getComputedStyle(s);if(i&&r.opacity==="0"||a&&r.visibility==="hidden"||r.display==="none")return!1;s=s.parentElement,e--}return!0}function $o(t,e,i,a){const s=a.x-i.x,r=a.y-i.y,o=s*s+r*r;if(o===0)return 0;const d=((t-i.x)*s+(e-i.y)*r)/o;return Math.max(0,Math.min(1,d))}function H(t,e){const i=Ho(t,a=>a===e);return i||Nr(t,e)}function Ho(t,e){var i,a;let s;for(s of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let r;try{r=(a=s.sheet)==null?void 0:a.cssRules}catch{continue}for(const o of r??[])if(e(o.selectorText))return o}}function Nr(t,e){var i,a;const s=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],r=s?.[s.length-1];if(!r?.sheet)return console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}};const o=r?.sheet.insertRule(`${e}{}`,r.sheet.cssRules.length);return(a=r.sheet.cssRules)==null?void 0:a[o]}function O(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}function W(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}O(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function y(t,e){return t.hasAttribute(e)}function M(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}y(t,e)!=i&&t.toggleAttribute(e,i)}function U(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function P(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;U(t,e,void 0)!==a&&t.setAttribute(e,a)}var $r=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ne=(t,e,i)=>($r(t,e,"read from private field"),i?i.call(t):e.get(t)),Fo=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},hi=(t,e,i,a)=>($r(t,e,"write to private field"),e.set(t,i),i),q;function Bo(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}class mi extends l.HTMLElement{constructor(){if(super(),Fo(this,q,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[L.MEDIA_CONTROLLER,n.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===L.MEDIA_CONTROLLER&&(i&&((r=(s=ne(this,q))==null?void 0:s.unassociateElement)==null||r.call(s,this),hi(this,q,null)),a&&this.isConnected&&(hi(this,q,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=ne(this,q))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),hi(this,q,Wo(this)),this.getAttribute(L.MEDIA_CONTROLLER)&&((i=(e=ne(this,q))==null?void 0:e.associateElement)==null||i.call(e,this)),ne(this,q)&&(ne(this,q).addEventListener("pointerdown",this),ne(this,q).addEventListener("click",this),ne(this,q).hasAttribute("tabindex")||(ne(this,q).tabIndex=0))}disconnectedCallback(){var e,i,a,s;this.getAttribute(L.MEDIA_CONTROLLER)&&((i=(e=ne(this,q))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=ne(this,q))==null||a.removeEventListener("pointerdown",this),(s=ne(this,q))==null||s.removeEventListener("click",this),hi(this,q,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:r,clientY:o}=e,{left:d,top:c,width:I,height:T}=this.getBoundingClientRect(),b=r-d,_=o-c;if(b<0||_<0||b>I||_>T||I===0&&T===0)return;const m=this._pointerType||"mouse";if(this._pointerType=void 0,m===ui.TOUCH){this.handleTap(e);return}else if(m===ui.MOUSE||m===ui.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return y(this,n.MEDIA_PAUSED)}set mediaPaused(e){M(this,n.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?h.MEDIA_PLAY_REQUEST:h.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new l.CustomEvent(i,{composed:!0,bubbles:!0}))}}q=new WeakMap,mi.shadowRootOptions={mode:"open"},mi.getTemplateHTML=Bo;function Wo(t){var e;const i=t.getAttribute(L.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):xt(t,"media-controller")}l.customElements.get("media-gesture-receiver")||l.customElements.define("media-gesture-receiver",mi);var Fa=mi,Ba=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},x=(t,e,i)=>(Ba(t,e,"read from private field"),i?i.call(t):e.get(t)),Z=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},oe=(t,e,i,a)=>(Ba(t,e,"write to private field"),e.set(t,i),i),le=(t,e,i)=>(Ba(t,e,"access private method"),i),Nt,pi,ot,lt,dt,Wa,ct,Ei,Va,Hr,Ga,Fr,$t,vi,_i,Ka,ut,Ht,Ce,fi;const f={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function Vo(t){return`
    <style>
      
      :host([${n.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${f.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${f.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${f.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${f.AUDIO}])[${f.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${f.AUDIO}])[${f.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${f.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${f.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${f.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${f.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${f.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${f.USER_INACTIVE}]:not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_AIRPLAYING}]):not([${n.MEDIA_IS_CASTING}]):not([${f.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${f.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${f.USER_INACTIVE}]:not([${f.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${f.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${f.USER_INACTIVE}][${f.AUTOHIDE_OVER_CONTROLS}]:not([${f.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${f.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${f.AUDIO}])[${n.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${Fa.shadowRootOptions.mode}">
          ${Fa.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}const Go=Object.values(n),Ko="sm:384 md:576 lg:768 xl:960";function qo(t){Br(t.target,t.contentRect.width)}function Br(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(f.BREAKPOINTS))!=null?i:Ko,s=Yo(a),r=Qo(s,e);let o=!1;if(Object.keys(s).forEach(d=>{if(r.includes(d)){t.hasAttribute(`breakpoint${d}`)||(t.setAttribute(`breakpoint${d}`,""),o=!0);return}t.hasAttribute(`breakpoint${d}`)&&(t.removeAttribute(`breakpoint${d}`),o=!0)}),o){const d=new CustomEvent(Ve.BREAKPOINTS_CHANGE,{detail:r});t.dispatchEvent(d)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Ve.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Yo(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function Qo(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}class Ft extends l.HTMLElement{constructor(){if(super(),Z(this,Va),Z(this,Ga),Z(this,$t),Z(this,_i),Z(this,ut),Z(this,Nt,void 0),Z(this,pi,0),Z(this,ot,null),Z(this,lt,null),Z(this,dt,void 0),this.breakpointsComputed=!1,Z(this,Wa,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const s=a.removedNodes;for(const r of s){if(r.slot!="media"||a.target!=this)continue;let o=a.previousSibling&&a.previousSibling.previousElementSibling;if(!o||!i)this.mediaUnsetCallback(r);else{let d=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(d=!1);d&&this.mediaUnsetCallback(r)}}if(i)for(const r of a.addedNodes)r===i&&this.handleMediaUpdated(i)}}),Z(this,ct,!1),Z(this,Ei,e=>{x(this,ct)||(setTimeout(()=>{qo(e),oe(this,ct,!1)},0),oe(this,ct,!0))}),Z(this,Ce,void 0),Z(this,fi,()=>{if(!x(this,Ce).assignedElements({flatten:!0}).length){x(this,ot)&&this.mediaUnsetCallback(x(this,ot));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}oe(this,Nt,new MutationObserver(x(this,Wa)))}static get observedAttributes(){return[f.AUTOHIDE,f.GESTURES_DISABLED].concat(Go).filter(e=>![n.MEDIA_RENDITION_LIST,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_CHAPTERS_CUES,n.MEDIA_WIDTH,n.MEDIA_HEIGHT,n.MEDIA_ERROR,n.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==f.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(oe(this,ot,e),e.localName.includes("-")&&await l.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;x(this,Nt).observe(this,{childList:!0,subtree:!0}),Dr(this,x(this,Ei));const i=this.getAttribute(f.AUDIO)!=null,a=p(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(f.USER_INACTIVE,""),Br(this,this.getBoundingClientRect().width);const s=this.querySelector(":scope > slot[slot=media]");s&&(oe(this,Ce,s),x(this,Ce).addEventListener("slotchange",x(this,fi))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=l.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;Cr(this,x(this,Ei)),clearTimeout(x(this,lt)),x(this,Nt).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=l.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),x(this,Ce)&&(x(this,Ce).removeEventListener("slotchange",x(this,fi)),oe(this,Ce,null)),oe(this,ct,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){oe(this,ot,null)}handleEvent(e){switch(e.type){case"pointerdown":oe(this,pi,e.timeStamp);break;case"pointermove":le(this,Va,Hr).call(this,e);break;case"pointerup":le(this,Ga,Fr).call(this,e);break;case"mouseleave":le(this,$t,vi).call(this);break;case"mouseup":this.removeAttribute(f.KEYBOARD_CONTROL);break;case"keyup":le(this,ut,Ht).call(this),this.setAttribute(f.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);oe(this,dt,isNaN(i)?0:i)}get autohide(){return(x(this,dt)===void 0?2:x(this,dt)).toString()}get breakpoints(){return U(this,f.BREAKPOINTS)}set breakpoints(e){P(this,f.BREAKPOINTS,e)}get audio(){return y(this,f.AUDIO)}set audio(e){M(this,f.AUDIO,e)}get gesturesDisabled(){return y(this,f.GESTURES_DISABLED)}set gesturesDisabled(e){M(this,f.GESTURES_DISABLED,e)}get keyboardControl(){return y(this,f.KEYBOARD_CONTROL)}set keyboardControl(e){M(this,f.KEYBOARD_CONTROL,e)}get noAutohide(){return y(this,f.NO_AUTOHIDE)}set noAutohide(e){M(this,f.NO_AUTOHIDE,e)}get autohideOverControls(){return y(this,f.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){M(this,f.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return y(this,f.USER_INACTIVE)}set userInteractive(e){M(this,f.USER_INACTIVE,e)}}Nt=new WeakMap,pi=new WeakMap,ot=new WeakMap,lt=new WeakMap,dt=new WeakMap,Wa=new WeakMap,ct=new WeakMap,Ei=new WeakMap,Va=new WeakSet,Hr=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-x(this,pi)<250)return;le(this,_i,Ka).call(this),clearTimeout(x(this,lt));const e=this.hasAttribute(f.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&le(this,ut,Ht).call(this)},Ga=new WeakSet,Fr=function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(f.USER_INACTIVE);[this,this.media].includes(t.target)&&e?le(this,$t,vi).call(this):le(this,ut,Ht).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&le(this,ut,Ht).call(this)},$t=new WeakSet,vi=function(){if(x(this,dt)<0||this.hasAttribute(f.USER_INACTIVE))return;this.setAttribute(f.USER_INACTIVE,"");const t=new l.CustomEvent(Ve.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)},_i=new WeakSet,Ka=function(){if(!this.hasAttribute(f.USER_INACTIVE))return;this.removeAttribute(f.USER_INACTIVE);const t=new l.CustomEvent(Ve.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)},ut=new WeakSet,Ht=function(){le(this,_i,Ka).call(this),clearTimeout(x(this,lt));const t=parseInt(this.autohide);t<0||oe(this,lt,setTimeout(()=>{le(this,$t,vi).call(this)},t*1e3))},Ce=new WeakMap,fi=new WeakMap,Ft.shadowRootOptions={mode:"open"},Ft.getTemplateHTML=Vo,l.customElements.get("media-container")||l.customElements.define("media-container",Ft);var zo=Ft,Wr=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},V=(t,e,i)=>(Wr(t,e,"read from private field"),i?i.call(t):e.get(t)),Bt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},gi=(t,e,i,a)=>(Wr(t,e,"write to private field"),e.set(t,i),i),ht,mt,bi,Ke,Le,Oe;class Vr{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Bt(this,Le),Bt(this,ht,void 0),Bt(this,mt,void 0),Bt(this,bi,void 0),Bt(this,Ke,new Set),gi(this,ht,e),gi(this,mt,i),gi(this,bi,new Set(a))}[Symbol.iterator](){return V(this,Le,Oe).values()}get length(){return V(this,Le,Oe).size}get value(){var e;return(e=[...V(this,Le,Oe)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(gi(this,Ke,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...V(this,Le,Oe)][e]}values(){return V(this,Le,Oe).values()}forEach(e,i){V(this,Le,Oe).forEach(e,i)}add(...e){var i,a;e.forEach(s=>V(this,Ke).add(s)),!(this.value===""&&!((i=V(this,ht))!=null&&i.hasAttribute(`${V(this,mt)}`)))&&((a=V(this,ht))==null||a.setAttribute(`${V(this,mt)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>V(this,Ke).delete(a)),(i=V(this,ht))==null||i.setAttribute(`${V(this,mt)}`,`${this.value}`)}contains(e){return V(this,Le,Oe).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}ht=new WeakMap,mt=new WeakMap,bi=new WeakMap,Ke=new WeakMap,Le=new WeakSet,Oe=function(){return V(this,Ke).size?V(this,Ke):V(this,bi)};const Zo=(t="")=>t.split(/\s+/),Gr=(t="")=>{const[e,i,a]=t.split(":"),s=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?se.CAPTIONS:se.SUBTITLES,language:i,label:s}},Kr=(t="",e={})=>Zo(t).map(i=>{const a=Gr(i);return{...e,...a}}),qr=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Gr(e):e):typeof t=="string"?Kr(t):[t]:[],Xo=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,qa=(t=[])=>Array.prototype.map.call(t,Xo).join(" "),Jo=(t,e)=>i=>i[t]===e,Yr=t=>{const e=Object.entries(t).map(([i,a])=>Jo(i,a));return i=>e.every(a=>a(i))},Wt=(t,e=[],i=[])=>{const a=qr(i).map(Yr),s=r=>a.some(o=>o(r));Array.from(e).filter(s).forEach(r=>{r.mode=t})},Ai=(t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Yr(e);return Array.from(t.textTracks).filter(i)},jo=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(n.MEDIA_SUBTITLES_SHOWING)},el=t=>{var e;const{media:i,fullscreenElement:a}=t;try{const s=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(s){const r=(e=a[s])==null?void 0:e.call(a);if(r instanceof Promise)return r.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(s){console.error(s)}},Qr="exitFullscreen"in z?"exitFullscreen":"webkitExitFullscreen"in z?"webkitExitFullscreen":"webkitCancelFullScreen"in z?"webkitCancelFullScreen":void 0,tl=t=>{var e;const{documentElement:i}=t;if(Qr){const a=(e=i?.[Qr])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},Vt="fullscreenElement"in z?"fullscreenElement":"webkitFullscreenElement"in z?"webkitFullscreenElement":void 0,il=t=>{const{documentElement:e,media:i}=t,a=e?.[Vt];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===fr.FULLSCREEN?i:a},al=t=>{var e;const{media:i,documentElement:a,fullscreenElement:s=i}=t;if(!i||!a)return!1;const r=il(t);if(!r)return!1;if(r===s||r===i)return!0;if(r.localName.includes("-")){let o=r.shadowRoot;if(!(Vt in o))return nt(r,s);for(;o?.[Vt];){if(o[Vt]===s)return!0;o=(e=o[Vt])==null?void 0:e.shadowRoot}}return!1},sl="fullscreenEnabled"in z?"fullscreenEnabled":"webkitFullscreenEnabled"in z?"webkitFullscreenEnabled":void 0,rl=t=>{const{documentElement:e,media:i}=t;return!!e?.[sl]||i&&"webkitSupportsFullscreen"in i};let Ti;const Ya=()=>{var t,e;return Ti||(Ti=(e=(t=z)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Ti)},nl=async(t=Ya())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([ol(t,i.signal),ll(t,e)]);return i.abort(),a},ol=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),ll=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await gr(10)}return t.volume!==e},dl=/.*Version\/.*Safari\/.*/.test(l.navigator.userAgent),zr=(t=Ya())=>l.matchMedia("(display-mode: standalone)").matches&&dl?!1:typeof t?.requestPictureInPicture=="function",Zr=(t=Ya())=>rl({documentElement:z,media:t}),cl=Zr(),ul=zr(),hl=!!l.WebKitPlaybackTargetAvailabilityEvent,ml=!!l.chrome,Ii=t=>Ai(t.media,e=>[se.SUBTITLES,se.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),Xr=t=>Ai(t.media,e=>e.mode===Ge.SHOWING&&[se.SUBTITLES,se.CAPTIONS].includes(e.kind)),Jr=(t,e)=>{const i=Ii(t),a=Xr(t),s=!!a.length;if(i.length){if(e===!1||s&&e!==!0)Wt(Ge.DISABLED,i,a);else if(e===!0||!s&&e!==!1){let r=i[0];const{options:o}=t;if(!o?.noSubtitlesLangPref){const T=l.localStorage.getItem("media-chrome-pref-subtitles-lang"),b=T?[T,...l.navigator.languages]:l.navigator.languages,_=i.filter(m=>b.some(g=>m.language.toLowerCase().startsWith(g.split("-")[0]))).sort((m,g)=>{const v=b.findIndex(A=>m.language.toLowerCase().startsWith(A.split("-")[0])),S=b.findIndex(A=>g.language.toLowerCase().startsWith(A.split("-")[0]));return v-S});_[0]&&(r=_[0])}const{language:d,label:c,kind:I}=r;Wt(Ge.DISABLED,i,a),Wt(Ge.SHOWING,i,[{language:d,label:c,kind:I}])}}},Qa=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?pl(t,e):Object.entries(t).every(([i,a])=>i in e&&Qa(a,e[i])),pl=(t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((s,r)=>Qa(s,e[r])):!0},El=Object.values(me);let Si;const vl=nl().then(t=>(Si=t,Si)),_l=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof l.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=l.customElements.get(i);a&&e instanceof a||(await l.customElements.whenDefined(i),l.customElements.upgrade(e))}))},fl=new l.DOMParser,gl=t=>t&&(fl.parseFromString(t,"text/html").body.textContent||t),Gt={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:s}=t;if(e?.type!=="playing")return(a=(i=s?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const s=l.localStorage.getItem("media-chrome-pref-muted")!==null,r=i.hasAttribute("muted");if(a){s&&l.localStorage.removeItem("media-chrome-pref-muted");return}if(r&&!s)return;l.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(s){console.debug("Error setting muted pref",s)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const s=l.localStorage.getItem("media-chrome-pref-muted")==="true";Gt.mediaMuted.set(s,e),t(s)}catch(s){console.debug("Error getting muted pref",s)}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?l.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&l.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(s){console.debug("Error setting volume pref",s)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const s=l.localStorage.getItem("media-chrome-pref-volume");if(s==null)return;Gt.mediaVolume.set(+s,e),t(+s)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!$a(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),s=i.seekable.end(i.seekable.length-1);if(!(!a&&!s))return[Number(a.toFixed(3)),Number(s.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((s,r)=>[Number(a.start(r).toFixed(3)),Number(a.end(r).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[me.LIVE,me.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:s}=e;if(El.includes(s))return s===me.UNKNOWN?a:s;const r=e.duration;return r===1/0?me.LIVE:Number.isFinite(r)?me.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Gt.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===me.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Gt.mediaStreamType.get(t)===me.LIVE))return!1;const s=e.seekable;if(!s)return!0;if(!s.length)return!1;const r=s.end(s.length-1)-i;return e.currentTime>=r},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Ii(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return Xr(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:s,options:r}=e;if(!s)return;const o=d=>{var c;!r.defaultSubtitles||d&&![se.CAPTIONS,se.SUBTITLES].includes((c=d?.track)==null?void 0:c.kind)||Jr(e,!0)};return s.addEventListener("loadstart",o),(i=s.textTracks)==null||i.addEventListener("addtrack",o),(a=s.textTracks)==null||a.addEventListener("removetrack",o),()=>{var d,c;s.removeEventListener("loadstart",o),(d=s.textTracks)==null||d.removeEventListener("addtrack",o),(c=s.textTracks)==null||c.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=Ai(i,{kind:se.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:s,startTime:r,endTime:o})=>({text:gl(s),startTime:r,endTime:o}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const s=a.querySelector('track[kind="chapters"][default][src]'),r=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return s?.addEventListener("load",t),r?.addEventListener("load",t),()=>{s?.removeEventListener("load",t),r?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:s}=t;if(!a||!s||!s.pictureInPictureElement)return!1;if(s.pictureInPictureElement===a)return!0;if(s.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?nt(a,s.pictureInPictureElement):!1;if(s.pictureInPictureElement.localName.includes("-")){let r=s.pictureInPictureElement.shadowRoot;for(;r?.pictureInPictureElement;){if(r.pictureInPictureElement===a)return!0;r=(i=r.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!z.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(s=>{if(s.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const r=()=>{i.removeEventListener("loadedmetadata",o),i.preload="none"},o=()=>{i.requestPictureInPicture().catch(a),r()};i.addEventListener("loadedmetadata",o),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),r()},1e3)}else throw s}else throw s})}else z.pictureInPictureElement&&z.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:s}=t;return(a=(i=s?.videoRenditions)==null?void 0:i[(e=s.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,s=Array.prototype.findIndex.call(i.videoRenditions,r=>r.id==a);i.videoRenditions.selectedIndex!=s&&(i.videoRenditions.selectedIndex=s)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(s=>s.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const s of i.audioTracks)s.enabled=a==s.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return al(t)},set(t,e,i){var a,s;t?(el(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((s=e.media)==null||s.focus())):tl(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:i.remote.state==="connected"},set(t,e){var i,a;const{media:s}=e;if(s&&!(t&&((i=s.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=s.remote)==null?void 0:a.state)!=="connected")){if(typeof s.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}s.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&l.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!cl||!Zr(e))return X.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!ul||!zr(e))return X.UNSUPPORTED;if(e?.disablePictureInPicture)return X.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(Si===!1||e?.volume==null)return X.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Si==null&&vl.then(e=>t(e?void 0:X.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!ml||!((i=a?.remote)!=null&&i.state))return X.UNSUPPORTED;if(!(e==null||e==="available"))return X.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a?.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!hl)return X.UNSUPPORTED;if(e?.availability==="not-available")return X.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(r=>{t({availability:r?"available":"not-available"})}).catch(r=>{r.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var r;(r=a?.remote)==null||r.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return X.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return X.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return X.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return X.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},bl={[h.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,s,r;const{media:o}=e,d=i??void 0;let c,I;if(o&&d!=null){const[m]=Ai(o,{kind:se.METADATA,label:"thumbnails"}),g=Array.prototype.find.call((a=m?.cues)!=null?a:[],(v,S,A)=>S===0?v.endTime>d:S===A.length-1?v.startTime<=d:v.startTime<=d&&v.endTime>d);if(g){const v=/'^(?:[a-z]+:)?\/\//i.test(g.text)||(s=o?.querySelector('track[label="thumbnails"]'))==null?void 0:s.src,S=new URL(g.text,v);I=new URLSearchParams(S.hash).get("#xywh").split(",").map(Q=>+Q),c=S.href}}const T=t.mediaDuration.get(e);let _=(r=t.mediaChaptersCues.get(e).find((m,g,v)=>g===v.length-1&&T===m.endTime?m.startTime<=d&&m.endTime>=d:m.startTime<=d&&m.endTime>d))==null?void 0:r.text;return i!=null&&_==null&&(_=""),{mediaPreviewTime:d,mediaPreviewImage:c,mediaPreviewCoords:I,mediaPreviewChapter:_}},[h.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[h.MEDIA_PLAY_REQUEST](t,e){var i,a,s,r;const o="mediaPaused",c=t.mediaStreamType.get(e)===me.LIVE,I=!((i=e.options)!=null&&i.noAutoSeekToLive),T=t.mediaTargetLiveWindow.get(e)>0;if(c&&I&&!T){const b=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(b){const _=(r=(s=e.options)==null?void 0:s.seekToLiveOffset)!=null?r:0,m=b-_;t.mediaCurrentTime.set(m,e)}}t[o].set(!1,e)},[h.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",s=i;t[a].set(s,e)},[h.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[h.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[h.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",s=!!i;return t[a].set(s,e),{mediaLoop:s}},[h.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",s=i;s&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(s,e)},[h.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",s=i;t[a].set(s,e)},[h.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,s;const r="mediaCurrentTime",o=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(o)))return;const d=(s=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?s:0,c=o-d;t[r].set(c,e)},[h.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:s}=e,r=Ii(e),o=qr(i),d=(a=o[0])==null?void 0:a.language;d&&!s.noSubtitlesLangPref&&l.localStorage.setItem("media-chrome-pref-subtitles-lang",d),Wt(Ge.SHOWING,r,o)},[h.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=Ii(e),s=i??[];Wt(Ge.DISABLED,a,s)},[h.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){Jr(e,i)},[h.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",s=i;t[a].set(s,e)},[h.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",s=i;t[a].set(s,e)},[h.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[h.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[h.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[h.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[h.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[h.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[h.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},Al=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Gt,requestMap:s=bl,options:r={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{const d=[],c={options:{...r}};let I=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const T=v=>{v!=null&&(Qa(v,I)||(I=Object.freeze({...I,...v}),d.forEach(S=>S(I))))},b=()=>{const v=Object.entries(a).reduce((S,[A,{get:Q}])=>(S[A]=Q(c),S),{});T(v)},_={};let m;const g=async(v,S)=>{var A,Q,Rt,Dt,tt,ye,Me,Ct,We,Gs,Ks,qs,Ys,Qs,zs,Zs;const lo=!!m;if(m={...c,...m??{},...v},lo)return;await _l(...Object.values(v));const it=d.length>0&&S===0&&o,Xs=c.media!==m.media,Js=((A=c.media)==null?void 0:A.textTracks)!==((Q=m.media)==null?void 0:Q.textTracks),js=((Rt=c.media)==null?void 0:Rt.videoRenditions)!==((Dt=m.media)==null?void 0:Dt.videoRenditions),er=((tt=c.media)==null?void 0:tt.audioTracks)!==((ye=m.media)==null?void 0:ye.audioTracks),tr=((Me=c.media)==null?void 0:Me.remote)!==((Ct=m.media)==null?void 0:Ct.remote),ir=c.documentElement!==m.documentElement,ar=!!c.media&&(Xs||it),sr=!!((We=c.media)!=null&&We.textTracks)&&(Js||it),rr=!!((Gs=c.media)!=null&&Gs.videoRenditions)&&(js||it),nr=!!((Ks=c.media)!=null&&Ks.audioTracks)&&(er||it),or=!!((qs=c.media)!=null&&qs.remote)&&(tr||it),lr=!!c.documentElement&&(ir||it),xa=ar||sr||rr||nr||or||lr,at=d.length===0&&S===1&&o,dr=!!m.media&&(Xs||at),cr=!!((Ys=m.media)!=null&&Ys.textTracks)&&(Js||at),ur=!!((Qs=m.media)!=null&&Qs.videoRenditions)&&(js||at),hr=!!((zs=m.media)!=null&&zs.audioTracks)&&(er||at),mr=!!((Zs=m.media)!=null&&Zs.remote)&&(tr||at),pr=!!m.documentElement&&(ir||at),Er=dr||cr||ur||hr||mr||pr;if(!(xa||Er)){Object.entries(m).forEach(([w,Ot])=>{c[w]=Ot}),b(),m=void 0;return}Object.entries(a).forEach(([w,{get:Ot,mediaEvents:co=[],textTracksEvents:uo=[],videoRenditionsEvents:ho=[],audioTracksEvents:mo=[],remoteEvents:po=[],rootEvents:Eo=[],stateOwnersUpdateHandlers:vo=[]}])=>{_[w]||(_[w]={});const J=D=>{const N=Ot(c,D);T({[w]:N})};let B;B=_[w].mediaEvents,co.forEach(D=>{B&&ar&&(c.media.removeEventListener(D,B),_[w].mediaEvents=void 0),dr&&(m.media.addEventListener(D,J),_[w].mediaEvents=J)}),B=_[w].textTracksEvents,uo.forEach(D=>{var N,ae;B&&sr&&((N=c.media.textTracks)==null||N.removeEventListener(D,B),_[w].textTracksEvents=void 0),cr&&((ae=m.media.textTracks)==null||ae.addEventListener(D,J),_[w].textTracksEvents=J)}),B=_[w].videoRenditionsEvents,ho.forEach(D=>{var N,ae;B&&rr&&((N=c.media.videoRenditions)==null||N.removeEventListener(D,B),_[w].videoRenditionsEvents=void 0),ur&&((ae=m.media.videoRenditions)==null||ae.addEventListener(D,J),_[w].videoRenditionsEvents=J)}),B=_[w].audioTracksEvents,mo.forEach(D=>{var N,ae;B&&nr&&((N=c.media.audioTracks)==null||N.removeEventListener(D,B),_[w].audioTracksEvents=void 0),hr&&((ae=m.media.audioTracks)==null||ae.addEventListener(D,J),_[w].audioTracksEvents=J)}),B=_[w].remoteEvents,po.forEach(D=>{var N,ae;B&&or&&((N=c.media.remote)==null||N.removeEventListener(D,B),_[w].remoteEvents=void 0),mr&&((ae=m.media.remote)==null||ae.addEventListener(D,J),_[w].remoteEvents=J)}),B=_[w].rootEvents,Eo.forEach(D=>{B&&lr&&(c.documentElement.removeEventListener(D,B),_[w].rootEvents=void 0),pr&&(m.documentElement.addEventListener(D,J),_[w].rootEvents=J)});const ci=_[w].stateOwnersUpdateHandlers;if(ci&&xa&&(Array.isArray(ci)?ci:[ci]).forEach(N=>{typeof N=="function"&&N()}),Er){const D=vo.map(N=>N(J,m)).filter(N=>typeof N=="function");_[w].stateOwnersUpdateHandlers=D.length===1?D[0]:D}else xa&&(_[w].stateOwnersUpdateHandlers=void 0)}),Object.entries(m).forEach(([w,Ot])=>{c[w]=Ot}),b(),m=void 0};return g({media:t,fullscreenElement:e,documentElement:i,options:r}),{dispatch(v){const{type:S,detail:A}=v;if(s[S]&&I.mediaErrorCode==null){T(s[S](a,c,v));return}S==="mediaelementchangerequest"?g({media:A}):S==="fullscreenelementchangerequest"?g({fullscreenElement:A}):S==="documentelementchangerequest"?g({documentElement:A}):S==="optionschangerequest"&&(Object.entries(A??{}).forEach(([Q,Rt])=>{c.options[Q]=Rt}),b())},getState(){return I},subscribe(v){return g({},d.length+1),d.push(v),v(I),()=>{const S=d.indexOf(v);S>=0&&(g({},d.length-1),d.splice(S,1))}}}};var za=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},E=(t,e,i)=>(za(t,e,"read from private field"),i?i.call(t):e.get(t)),ee=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},de=(t,e,i,a)=>(za(t,e,"write to private field"),e.set(t,i),i),Kt=(t,e,i)=>(za(t,e,"access private method"),i),we,qt,k,pe,Yt,Ee,yi,Qt,Mi,Za,qe,ki,Xa,Ja,jr;const en=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],tn=10,an=.025,sn=.25,Tl=.25,Il=2,u={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class rn extends Ft{constructor(){super(),ee(this,Mi),ee(this,ki),ee(this,Ja),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,ee(this,we,new Vr(this,u.HOTKEYS)),ee(this,qt,void 0),ee(this,k,void 0),ee(this,pe,null),ee(this,Yt,void 0),ee(this,Ee,void 0),ee(this,yi,i=>{var a;(a=E(this,k))==null||a.dispatch(i)}),ee(this,Qt,void 0),ee(this,qe,i=>{const{key:a,shiftKey:s}=i;if(!(s&&(a==="/"||a==="?")||en.includes(a))){this.removeEventListener("keyup",E(this,qe));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};de(this,Yt,i=>{Object.entries(i).forEach(([a,s])=>{if(a in e&&e[a]===s)return;this.propagateMediaState(a,s);const r=a.toLowerCase(),o=new l.CustomEvent(_r[r],{composed:!0,detail:s});this.dispatchEvent(o)}),e=i})}static get observedAttributes(){return super.observedAttributes.concat(u.NO_HOTKEYS,u.HOTKEYS,u.DEFAULT_STREAM_TYPE,u.DEFAULT_SUBTITLES,u.DEFAULT_DURATION,u.NO_MUTED_PREF,u.NO_VOLUME_PREF,u.LANG,u.LOOP,u.LIVE_EDGE_OFFSET,u.SEEK_TO_LIVE_OFFSET,u.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return E(this,k)}set mediaStore(e){var i,a;if(E(this,k)&&((i=E(this,Ee))==null||i.call(this),de(this,Ee,void 0)),de(this,k,e),!E(this,k)&&!this.hasAttribute(u.NO_DEFAULT_STORE)){Kt(this,Mi,Za).call(this);return}de(this,Ee,(a=E(this,k))==null?void 0:a.subscribe(E(this,Yt)))}get fullscreenElement(){var e;return(e=E(this,qt))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(u.FULLSCREEN_ELEMENT)&&this.removeAttribute(u.FULLSCREEN_ELEMENT),de(this,qt,e),(i=E(this,k))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return y(this,u.DEFAULT_SUBTITLES)}set defaultSubtitles(e){M(this,u.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return U(this,u.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){P(this,u.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return O(this,u.DEFAULT_DURATION)}set defaultDuration(e){W(this,u.DEFAULT_DURATION,e)}get noHotkeys(){return y(this,u.NO_HOTKEYS)}set noHotkeys(e){M(this,u.NO_HOTKEYS,e)}get keysUsed(){return U(this,u.KEYS_USED)}set keysUsed(e){P(this,u.KEYS_USED,e)}get liveEdgeOffset(){return O(this,u.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){W(this,u.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return y(this,u.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){M(this,u.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return y(this,u.NO_VOLUME_PREF)}set noVolumePref(e){M(this,u.NO_VOLUME_PREF,e)}get noMutedPref(){return y(this,u.NO_MUTED_PREF)}set noMutedPref(e){M(this,u.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return y(this,u.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){M(this,u.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return y(this,u.NO_DEFAULT_STORE)}set noDefaultStore(e){M(this,u.NO_DEFAULT_STORE,e)}get resolvedLang(){return wo()}attributeChangedCallback(e,i,a){var s,r,o,d,c,I,T,b,_,m,g,v;if(super.attributeChangedCallback(e,i,a),e===u.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(u.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===u.HOTKEYS)E(this,we).value=a;else if(e===u.DEFAULT_SUBTITLES&&a!==i)(s=E(this,k))==null||s.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(u.DEFAULT_SUBTITLES)}});else if(e===u.DEFAULT_STREAM_TYPE)(o=E(this,k))==null||o.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(r=this.getAttribute(u.DEFAULT_STREAM_TYPE))!=null?r:void 0}});else if(e===u.LIVE_EDGE_OFFSET&&a!==i)(d=E(this,k))==null||d.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0}});else if(e===u.SEEK_TO_LIVE_OFFSET&&a!==i)(c=E(this,k))==null||c.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0}});else if(e===u.NO_AUTO_SEEK_TO_LIVE)(I=E(this,k))==null||I.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(u.NO_AUTO_SEEK_TO_LIVE)}});else if(e===u.FULLSCREEN_ELEMENT){const S=a?(T=this.getRootNode())==null?void 0:T.getElementById(a):void 0;de(this,qt,S),(b=E(this,k))==null||b.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===u.LANG&&a!==i?(ko(a),(_=E(this,k))==null||_.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===u.LOOP&&a!==i?(m=E(this,k))==null||m.dispatch({type:h.MEDIA_LOOP_REQUEST,detail:a!=null}):e===u.NO_VOLUME_PREF&&a!==i?(g=E(this,k))==null||g.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(u.NO_VOLUME_PREF)}}):e===u.NO_MUTED_PREF&&a!==i&&((v=E(this,k))==null||v.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(u.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;this.associateElement(this),!E(this,k)&&!this.hasAttribute(u.NO_DEFAULT_STORE)&&Kt(this,Mi,Za).call(this),(e=E(this,k))==null||e.dispatch({type:"documentelementchangerequest",detail:z}),(i=E(this,k))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),E(this,k)&&!E(this,Ee)&&de(this,Ee,(a=E(this,k))==null?void 0:a.subscribe(E(this,Yt))),E(this,Qt)!==void 0&&E(this,k)&&this.media&&setTimeout(()=>{var s,r,o;(r=(s=this.media)==null?void 0:s.textTracks)!=null&&r.length&&((o=E(this,k))==null||o.dispatch({type:h.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:E(this,Qt)}))},0),this.hasAttribute(u.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,s,r,o;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),E(this,k)){const d=E(this,k).getState();de(this,Qt,!!((i=d.mediaSubtitlesShowing)!=null&&i.length)),(a=E(this,k))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(s=E(this,k))==null||s.dispatch({type:"documentelementchangerequest",detail:void 0}),(r=E(this,k))==null||r.dispatch({type:h.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}E(this,Ee)&&((o=E(this,Ee))==null||o.call(this),de(this,Ee,void 0)),this.unassociateElement(this),E(this,pe)&&(E(this,pe).remove(),de(this,pe,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=E(this,k))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=E(this,k))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){dn(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),s=this.unregisterMediaStateReceiver.bind(this),r=wl(e,a,s);Object.values(h).forEach(o=>{e.addEventListener(o,E(this,yi))}),i.set(e,r)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(h).forEach(s=>{e.removeEventListener(s,E(this,yi))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),E(this,k)&&Object.entries(E(this,k).getState()).forEach(([s,r])=>{dn([e],s,r)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Kt(this,ki,Xa))}disableHotkeys(){this.removeEventListener("keydown",Kt(this,ki,Xa)),this.removeEventListener("keyup",E(this,qe))}get hotkeys(){return E(this,we)}set hotkeys(e){P(this,u.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,s,r,o,d,c,I,T;const b=e.target;if(((s=(a=(i=b.getAttribute(u.KEYS_USED))==null?void 0:i.split(" "))!=null?a:b?.keysUsed)!=null?s:[]).map(A=>A==="Space"?" ":A).filter(Boolean).includes(e.key))return;let m,g,v;if(!(E(this,we).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&E(this,we).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&E(this,we).contains("noshift+/")))switch(e.key){case" ":case"k":m=E(this,k).getState().mediaPaused?h.MEDIA_PLAY_REQUEST:h.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new l.CustomEvent(m,{composed:!0,bubbles:!0}));break;case"m":m=this.mediaStore.getState().mediaVolumeLevel==="off"?h.MEDIA_UNMUTE_REQUEST:h.MEDIA_MUTE_REQUEST,this.dispatchEvent(new l.CustomEvent(m,{composed:!0,bubbles:!0}));break;case"f":m=this.mediaStore.getState().mediaIsFullscreen?h.MEDIA_EXIT_FULLSCREEN_REQUEST:h.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new l.CustomEvent(m,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new l.CustomEvent(h.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const A=this.hasAttribute(u.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(u.KEYBOARD_BACKWARD_SEEK_OFFSET):tn;g=Math.max(((r=this.mediaStore.getState().mediaCurrentTime)!=null?r:0)-A,0),v=new l.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:g}),this.dispatchEvent(v);break}case"ArrowRight":case"l":{const A=this.hasAttribute(u.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(u.KEYBOARD_FORWARD_SEEK_OFFSET):tn;g=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)+A,0),v=new l.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:g}),this.dispatchEvent(v);break}case"ArrowUp":{const A=this.hasAttribute(u.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(u.KEYBOARD_UP_VOLUME_STEP):an;g=Math.min(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)+A,1),v=new l.CustomEvent(h.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:g}),this.dispatchEvent(v);break}case"ArrowDown":{const A=this.hasAttribute(u.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(u.KEYBOARD_DOWN_VOLUME_STEP):an;g=Math.max(((c=this.mediaStore.getState().mediaVolume)!=null?c:1)-A,0),v=new l.CustomEvent(h.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:g}),this.dispatchEvent(v);break}case"<":{const A=(I=this.mediaStore.getState().mediaPlaybackRate)!=null?I:1;g=Math.max(A-sn,Tl).toFixed(2),v=new l.CustomEvent(h.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:g}),this.dispatchEvent(v);break}case">":{const A=(T=this.mediaStore.getState().mediaPlaybackRate)!=null?T:1;g=Math.min(A+sn,Il).toFixed(2),v=new l.CustomEvent(h.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:g}),this.dispatchEvent(v);break}case"/":case"?":{e.shiftKey&&Kt(this,Ja,jr).call(this);break}case"p":{m=this.mediaStore.getState().mediaIsPip?h.MEDIA_EXIT_PIP_REQUEST:h.MEDIA_ENTER_PIP_REQUEST,v=new l.CustomEvent(m,{composed:!0,bubbles:!0}),this.dispatchEvent(v);break}}}}we=new WeakMap,qt=new WeakMap,k=new WeakMap,pe=new WeakMap,Yt=new WeakMap,Ee=new WeakMap,yi=new WeakMap,Qt=new WeakMap,Mi=new WeakSet,Za=function(){var t;this.mediaStore=Al({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(u.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(u.DEFAULT_DURATION)?+this.getAttribute(u.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(u.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(u.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(u.SEEK_TO_LIVE_OFFSET):this.hasAttribute(u.LIVE_EDGE_OFFSET)?+this.getAttribute(u.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(u.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(u.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(u.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(u.NO_SUBTITLES_LANG_PREF)}})},qe=new WeakMap,ki=new WeakSet,Xa=function(t){var e;const{metaKey:i,altKey:a,key:s,shiftKey:r}=t,o=r&&(s==="/"||s==="?");if(o&&((e=E(this,pe))!=null&&e.open)){this.removeEventListener("keyup",E(this,qe));return}if(i||a||!o&&!en.includes(s)){this.removeEventListener("keyup",E(this,qe));return}const d=t.target,c=d instanceof HTMLElement&&(d.tagName.toLowerCase()==="media-volume-range"||d.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s)&&!(E(this,we).contains(`no${s.toLowerCase()}`)||s===" "&&E(this,we).contains("nospace"))&&!c&&t.preventDefault(),this.addEventListener("keyup",E(this,qe),{once:!0})},Ja=new WeakSet,jr=function(){E(this,pe)||(de(this,pe,z.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(E(this,pe))),E(this,pe).open=!0};const Sl=Object.values(n),yl=Object.values(Na),nn=t=>{var e,i,a,s;let{observedAttributes:r}=t.constructor;!r&&((e=t.nodeName)!=null&&e.includes("-"))&&(l.customElements.upgrade(t),{observedAttributes:r}=t.constructor);const o=(s=(a=(i=t?.getAttribute)==null?void 0:i.call(t,L.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:s.call(a,/\s+/);return Array.isArray(r||o)?(r||o).filter(d=>Sl.includes(d)):[]},Ml=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&l.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof l.customElements.get(t.nodeName.toLowerCase()))&&l.customElements.upgrade(t),yl.some(a=>a in t)},ja=t=>Ml(t)||!!nn(t).length,on=t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},ln={[n.MEDIA_SUBTITLES_LIST]:qa,[n.MEDIA_SUBTITLES_SHOWING]:qa,[n.MEDIA_SEEKABLE]:on,[n.MEDIA_BUFFERED]:t=>t?.map(on).join(" "),[n.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[n.MEDIA_RENDITION_LIST]:To,[n.MEDIA_AUDIO_TRACK_LIST]:So},kl=async(t,e,i)=>{var a,s;if(t.isConnected||await gr(0),typeof i=="boolean"||i==null)return M(t,e,i);if(typeof i=="number")return W(t,e,i);if(typeof i=="string")return P(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const r=(s=(a=ln[e])==null?void 0:a.call(ln,i))!=null?s:i;return t.setAttribute(e,r)},Ll=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},Ye=(t,e)=>{if(Ll(t))return;const i=(s,r)=>{var o,d;ja(s)&&r(s);const{children:c=[]}=s??{},I=(d=(o=s?.shadowRoot)==null?void 0:o.children)!=null?d:[];[...c,...I].forEach(b=>Ye(b,r))},a=t?.nodeName.toLowerCase();if(a.includes("-")&&!ja(t)){l.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},dn=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const s=nn(a),r=e.toLowerCase();s.includes(r)&&kl(a,r,i)})},wl=(t,e,i)=>{Ye(t,e);const a=T=>{var b;const _=(b=T?.composedPath()[0])!=null?b:T.target;e(_)},s=T=>{var b;const _=(b=T?.composedPath()[0])!=null?b:T.target;i(_)};t.addEventListener(h.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(h.UNREGISTER_MEDIA_STATE_RECEIVER,s);const r=T=>{T.forEach(b=>{const{addedNodes:_=[],removedNodes:m=[],type:g,target:v,attributeName:S}=b;g==="childList"?(Array.prototype.forEach.call(_,A=>Ye(A,e)),Array.prototype.forEach.call(m,A=>Ye(A,i))):g==="attributes"&&S===L.MEDIA_CHROME_ATTRIBUTES&&(ja(v)?e(v):i(v))})};let o=[];const d=T=>{const b=T.target;b.name!=="media"&&(o.forEach(_=>Ye(_,i)),o=[...b.assignedElements({flatten:!0})],o.forEach(_=>Ye(_,e)))};t.addEventListener("slotchange",d);const c=new MutationObserver(r);return c.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{Ye(t,i),t.removeEventListener("slotchange",d),c.disconnect(),t.removeEventListener(h.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(h.UNREGISTER_MEDIA_STATE_RECEIVER,s)}};l.customElements.get("media-controller")||l.customElements.define("media-controller",rn);var Rl=rn;const pt={PLACEMENT:"placement",BOUNDS:"bounds"};function Dl(t){return`
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
  `}class Li extends l.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!xr(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),s=(e=xt(this,"#"+this.bounds))!=null?e:Po(this);if(!s)return;const{x:r,width:o}=s.getBoundingClientRect(),{x:d,width:c}=this.getBoundingClientRect(),I=d+c,T=r+o,b=a.getPropertyValue("--media-tooltip-offset-x"),_=b?parseFloat(b.replace("px","")):0,m=a.getPropertyValue("--media-tooltip-container-margin"),g=m?parseFloat(m.replace("px","")):0,v=d-r+_-g,S=I-T+_+g;if(v<0){this.style.setProperty("--media-tooltip-offset-x",`${v}px`);return}if(S>0){this.style.setProperty("--media-tooltip-offset-x",`${S}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[pt.PLACEMENT,pt.BOUNDS]}get placement(){return U(this,pt.PLACEMENT)}set placement(e){P(this,pt.PLACEMENT,e)}get bounds(){return U(this,pt.BOUNDS)}set bounds(e){P(this,pt.BOUNDS,e)}}Li.shadowRootOptions={mode:"open"},Li.getTemplateHTML=Dl,l.customElements.get("media-tooltip")||l.customElements.define("media-tooltip",Li);var es=Li,ts=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$=(t,e,i)=>(ts(t,e,"read from private field"),i?i.call(t):e.get(t)),Et=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wi=(t,e,i,a)=>(ts(t,e,"write to private field"),e.set(t,i),i),Cl=(t,e,i)=>(ts(t,e,"access private method"),i),ve,vt,Pe,_t,Ri,is,cn;const Ue={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function Ol(t,e={}){return`
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

    ${this.getSlotTemplateHTML(t,e)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${es.shadowRootOptions.mode}">
          ${es.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}function Pl(t,e){return`
    <slot></slot>
  `}function Ul(){return""}class G extends l.HTMLElement{constructor(){if(super(),Et(this,is),Et(this,ve,void 0),this.preventClick=!1,this.tooltipEl=null,Et(this,vt,e=>{this.preventClick||this.handleClick(e),setTimeout($(this,Pe),0)}),Et(this,Pe,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),Et(this,_t,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",$(this,_t));return}this.preventClick||this.handleClick(e)}),Et(this,Ri,e=>{const{metaKey:i,altKey:a,key:s}=e;if(i||a||!this.keysUsed.includes(s)){this.removeEventListener("keyup",$(this,_t));return}this.addEventListener("keyup",$(this,_t),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",Ue.TOOLTIP_PLACEMENT,L.MEDIA_CONTROLLER,n.MEDIA_LANG]}enable(){this.addEventListener("click",$(this,vt)),this.addEventListener("keydown",$(this,Ri)),this.tabIndex=0}disable(){this.removeEventListener("click",$(this,vt)),this.removeEventListener("keydown",$(this,Ri)),this.removeEventListener("keyup",$(this,_t)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===L.MEDIA_CONTROLLER?(i&&((r=(s=$(this,ve))==null?void 0:s.unassociateElement)==null||r.call(s,this),wi(this,ve,null)),a&&this.isConnected&&(wi(this,ve,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=$(this,ve))==null?void 0:d.associateElement)==null||c.call(d,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===Ue.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===n.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),$(this,Pe).call(this)}connectedCallback(){var e,i,a;const{style:s}=H(this.shadowRoot,":host");s.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const r=this.getAttribute(L.MEDIA_CONTROLLER);r&&(wi(this,ve,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=$(this,ve))==null?void 0:i.associateElement)==null||a.call(i,this)),l.customElements.whenDefined("media-tooltip").then(()=>Cl(this,is,cn).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=$(this,ve))==null?void 0:e.unassociateElement)==null||i.call(e,this),wi(this,ve,null),this.removeEventListener("mouseenter",$(this,Pe)),this.removeEventListener("focus",$(this,Pe)),this.removeEventListener("click",$(this,vt))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return U(this,Ue.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){P(this,Ue.TOOLTIP_PLACEMENT,e)}get mediaController(){return U(this,L.MEDIA_CONTROLLER)}set mediaController(e){P(this,L.MEDIA_CONTROLLER,e)}get disabled(){return y(this,Ue.DISABLED)}set disabled(e){M(this,Ue.DISABLED,e)}get noTooltip(){return y(this,Ue.NO_TOOLTIP)}set noTooltip(e){M(this,Ue.NO_TOOLTIP,e)}handleClick(e){}}ve=new WeakMap,vt=new WeakMap,Pe=new WeakMap,_t=new WeakMap,Ri=new WeakMap,is=new WeakSet,cn=function(){this.addEventListener("mouseenter",$(this,Pe)),this.addEventListener("focus",$(this,Pe)),this.addEventListener("click",$(this,vt));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)},G.shadowRootOptions={mode:"open"},G.getTemplateHTML=Ol,G.getSlotTemplateHTML=Pl,G.getTooltipContentHTML=Ul,l.customElements.get("media-chrome-button")||l.customElements.define("media-chrome-button",G);var xl=G;const un=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function Nl(t){return`
    <style>
      :host([${n.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${n.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${un}</slot>
      <slot name="exit">${un}</slot>
    </slot>
  `}function $l(){return`
    <slot name="tooltip-enter">${p("start airplay")}</slot>
    <slot name="tooltip-exit">${p("stop airplay")}</slot>
  `}const hn=t=>{const e=t.mediaIsAirplaying?p("stop airplay"):p("start airplay");t.setAttribute("aria-label",e)};class Di extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_AIRPLAYING,n.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),hn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_AIRPLAYING&&hn(this)}get mediaIsAirplaying(){return y(this,n.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){M(this,n.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return U(this,n.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){P(this,n.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new l.CustomEvent(h.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}Di.getSlotTemplateHTML=Nl,Di.getTooltipContentHTML=$l,l.customElements.get("media-airplay-button")||l.customElements.define("media-airplay-button",Di);var Hl=Di;const Fl=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Bl=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function Wl(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${Fl}</slot>
      <slot name="off">${Bl}</slot>
    </slot>
  `}function Vl(){return`
    <slot name="tooltip-enable">${p("Enable captions")}</slot>
    <slot name="tooltip-disable">${p("Disable captions")}</slot>
  `}const mn=t=>{t.setAttribute("aria-checked",jo(t).toString())};class Ci extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",p("closed captions")),mn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&mn(this)}get mediaSubtitlesList(){return pn(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){En(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return pn(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){En(this,n.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new l.CustomEvent(h.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}Ci.getSlotTemplateHTML=Wl,Ci.getTooltipContentHTML=Vl;const pn=(t,e)=>{const i=t.getAttribute(e);return i?Kr(i):[]},En=(t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=qa(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};l.customElements.get("media-captions-button")||l.customElements.define("media-captions-button",Ci);var Gl=Ci;const Kl='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',ql='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function Yl(t){return`
    <style>
      :host([${n.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${n.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Kl}</slot>
      <slot name="exit">${ql}</slot>
    </slot>
  `}function Ql(){return`
    <slot name="tooltip-enter">${p("Start casting")}</slot>
    <slot name="tooltip-exit">${p("Stop casting")}</slot>
  `}const vn=t=>{const e=t.mediaIsCasting?p("stop casting"):p("start casting");t.setAttribute("aria-label",e)};class Oi extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_CASTING,n.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),vn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_CASTING&&vn(this)}get mediaIsCasting(){return y(this,n.MEDIA_IS_CASTING)}set mediaIsCasting(e){M(this,n.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return U(this,n.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){P(this,n.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?h.MEDIA_EXIT_CAST_REQUEST:h.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}}Oi.getSlotTemplateHTML=Yl,Oi.getTooltipContentHTML=Ql,l.customElements.get("media-cast-button")||l.customElements.define("media-cast-button",Oi);var zl=Oi,as=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Qe=(t,e,i)=>(as(t,e,"read from private field"),e.get(t)),Re=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ss=(t,e,i,a)=>(as(t,e,"write to private field"),e.set(t,i),i),ze=(t,e,i)=>(as(t,e,"access private method"),i),Pi,zt,Ze,Ui,rs,ns,_n,os,fn,ls,gn,ds,bn,cs,An;function Zl(t){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(t)}
  `}function Xl(t){return`
    <slot id="content"></slot>
  `}const Zt={OPEN:"open",ANCHOR:"anchor"};class Xe extends l.HTMLElement{constructor(){super(),Re(this,Ui),Re(this,ns),Re(this,os),Re(this,ls),Re(this,ds),Re(this,cs),Re(this,Pi,!1),Re(this,zt,null),Re(this,Ze,null)}static get observedAttributes(){return[Zt.OPEN,Zt.ANCHOR]}get open(){return y(this,Zt.OPEN)}set open(e){M(this,Zt.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":ze(this,ls,gn).call(this,e);break;case"focusout":ze(this,ds,bn).call(this,e);break;case"keydown":ze(this,cs,An).call(this,e);break}}connectedCallback(){ze(this,Ui,rs).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){ze(this,Ui,rs).call(this),e===Zt.OPEN&&a!==i&&(this.open?ze(this,ns,_n).call(this):ze(this,os,fn).call(this))}focus(){ss(this,zt,Ur());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}}Pi=new WeakMap,zt=new WeakMap,Ze=new WeakMap,Ui=new WeakSet,rs=function(){if(!Qe(this,Pi)&&(ss(this,Pi,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=H(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},ns=new WeakSet,_n=function(){var t;(t=Qe(this,Ze))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},os=new WeakSet,fn=function(){var t;(t=Qe(this,Ze))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},ls=new WeakSet,gn=function(t){ss(this,Ze,t.relatedTarget),nt(this,t.relatedTarget)||(this.open=!this.open)},ds=new WeakSet,bn=function(t){var e;nt(this,t.relatedTarget)||((e=Qe(this,zt))==null||e.focus(),Qe(this,Ze)&&Qe(this,Ze)!==t.relatedTarget&&this.open&&(this.open=!1))},cs=new WeakSet,An=function(t){var e,i,a,s,r;const{key:o,ctrlKey:d,altKey:c,metaKey:I}=t;d||c||I||this.keysUsed.includes(o)&&(t.preventDefault(),t.stopPropagation(),o==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(s=(a=this.nextElementSibling)==null?void 0:a.focus)==null||s.call(a),this.blur()):o==="Escape"&&((r=Qe(this,zt))==null||r.focus(),this.open=!1))},Xe.shadowRootOptions={mode:"open"},Xe.getTemplateHTML=Zl,Xe.getSlotTemplateHTML=Xl,l.customElements.get("media-chrome-dialog")||l.customElements.define("media-chrome-dialog",Xe);var Jl=Xe,us=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},C=(t,e,i)=>(us(t,e,"read from private field"),i?i.call(t):e.get(t)),Y=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},xe=(t,e,i,a)=>(us(t,e,"write to private field"),e.set(t,i),i),ce=(t,e,i)=>(us(t,e,"access private method"),i),_e,xi,Ni,$i,ue,Hi,Fi,Bi,Wi,hs,Tn,Vi,ms,Gi,ps,Ki,Es,vs,In,_s,Sn,fs,yn,gs,Mn;function jl(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, 0);
        height: var(--media-time-range-hover-height, max(100% , 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, 0);
          height: var(--media-time-range-hover-height, max(100%, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(t)}
    </div>
    <div id="rightgap"></div>
  `}function ed(t){return""}class Je extends l.HTMLElement{constructor(){if(super(),Y(this,hs),Y(this,Vi),Y(this,Gi),Y(this,Ki),Y(this,vs),Y(this,_s),Y(this,fs),Y(this,gs),Y(this,_e,void 0),Y(this,xi,void 0),Y(this,Ni,void 0),Y(this,$i,void 0),Y(this,ue,{}),Y(this,Hi,[]),Y(this,Fi,()=>{if(this.range.matches(":focus-visible")){const{style:e}=H(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),Y(this,Bi,()=>{const{style:e}=H(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),Y(this,Wi,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),xe(this,Ni,this.shadowRoot.querySelector("#startpoint")),xe(this,$i,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",L.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===L.MEDIA_CONTROLLER?(i&&((r=(s=C(this,_e))==null?void 0:s.unassociateElement)==null||r.call(s,this),xe(this,_e,null)),a&&this.isConnected&&(xe(this,_e,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=C(this,_e))==null?void 0:d.associateElement)==null||c.call(d,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),ce(this,Vi,ms).call(this)):(this.range.setAttribute(e,a),ce(this,Gi,ps).call(this)))}connectedCallback(){var e,i,a;const{style:s}=H(this.shadowRoot,":host");s.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),C(this,ue).pointer=H(this.shadowRoot,"#pointer"),C(this,ue).progress=H(this.shadowRoot,"#progress"),C(this,ue).thumb=H(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),C(this,ue).activeSegment=H(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const r=this.getAttribute(L.MEDIA_CONTROLLER);r&&(xe(this,_e,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=C(this,_e))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",C(this,Fi)),this.shadowRoot.addEventListener("focusout",C(this,Bi)),ce(this,Vi,ms).call(this),Dr(this.container,C(this,Wi))}disconnectedCallback(){var e,i;ce(this,Gi,ps).call(this),(i=(e=C(this,_e))==null?void 0:e.unassociateElement)==null||i.call(e,this),xe(this,_e,null),this.shadowRoot.removeEventListener("focusin",C(this,Fi)),this.shadowRoot.removeEventListener("focusout",C(this,Bi)),Cr(this.container,C(this,Wi))}updatePointerBar(e){var i;(i=C(this,ue).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=C(this,ue).progress)==null||e.style.setProperty("width",`${a}%`),(i=C(this,ue).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(r=>[r.start,r.end]),+this.range.max])];xe(this,Hi,[...a]);const s=a.pop();for(const[r,o]of a.entries()){const[d,c]=[r===0,r===a.length-1],I=d?"calc(var(--segments-gap) / -1)":`${o*100}%`,b=`calc(${((c?s:a[r+1])-o)*100}%${d||c?"":" - var(--segments-gap)"})`,_=z.createElementNS("http://www.w3.org/2000/svg","rect"),m=Nr(this.shadowRoot,`#segments-clipping rect:nth-child(${r+1})`);m.style.setProperty("x",I),m.style.setProperty("width",b),i.append(_)}}getPointerRatio(e){return $o(e.clientX,e.clientY,C(this,Ni).getBoundingClientRect(),C(this,$i).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":ce(this,gs,Mn).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":ce(this,vs,In).call(this,e);break;case"pointerdown":ce(this,Ki,Es).call(this,e);break;case"pointerup":ce(this,_s,Sn).call(this);break;case"pointerleave":ce(this,fs,yn).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}_e=new WeakMap,xi=new WeakMap,Ni=new WeakMap,$i=new WeakMap,ue=new WeakMap,Hi=new WeakMap,Fi=new WeakMap,Bi=new WeakMap,Wi=new WeakMap,hs=new WeakSet,Tn=function(t){const e=C(this,ue).activeSegment;if(!e)return;const i=this.getPointerRatio(t),s=`#segments-clipping rect:nth-child(${C(this,Hi).findIndex((r,o,d)=>{const c=d[o+1];return c!=null&&i>=r&&i<=c})+1})`;(e.selectorText!=s||!e.style.transform)&&(e.selectorText=s,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},Vi=new WeakSet,ms=function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},Gi=new WeakSet,ps=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=l.window)==null||t.removeEventListener("pointerup",this),(e=l.window)==null||e.removeEventListener("pointermove",this)},Ki=new WeakSet,Es=function(t){var e;xe(this,xi,t.composedPath().includes(this.range)),(e=l.window)==null||e.addEventListener("pointerup",this,{once:!0})},vs=new WeakSet,In=function(t){var e;t.pointerType!=="mouse"&&ce(this,Ki,Es).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=l.window)==null||e.addEventListener("pointermove",this)},_s=new WeakSet,Sn=function(){var t;(t=l.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},fs=new WeakSet,yn=function(){var t,e;this.removeEventListener("pointerleave",this),(t=l.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=C(this,ue).activeSegment)==null||e.style.removeProperty("transform")},gs=new WeakSet,Mn=function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),ce(this,hs,Tn).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!C(this,xi))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},Je.shadowRootOptions={mode:"open"},Je.getTemplateHTML=jl,Je.getContainerTemplateHTML=ed,l.customElements.get("media-chrome-range")||l.customElements.define("media-chrome-range",Je);var td=Je,kn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},qi=(t,e,i)=>(kn(t,e,"read from private field"),i?i.call(t):e.get(t)),id=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Yi=(t,e,i,a)=>(kn(t,e,"write to private field"),e.set(t,i),i),fe;function ad(t){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}class Qi extends l.HTMLElement{constructor(){if(super(),id(this,fe,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[L.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===L.MEDIA_CONTROLLER&&(i&&((r=(s=qi(this,fe))==null?void 0:s.unassociateElement)==null||r.call(s,this),Yi(this,fe,null)),a&&this.isConnected&&(Yi(this,fe,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=qi(this,fe))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;const s=this.getAttribute(L.MEDIA_CONTROLLER);s&&(Yi(this,fe,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=qi(this,fe))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=qi(this,fe))==null?void 0:e.unassociateElement)==null||i.call(e,this),Yi(this,fe,null)}}fe=new WeakMap,Qi.shadowRootOptions={mode:"open"},Qi.getTemplateHTML=ad,l.customElements.get("media-control-bar")||l.customElements.define("media-control-bar",Qi);var sd=Qi,Ln=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},zi=(t,e,i)=>(Ln(t,e,"read from private field"),i?i.call(t):e.get(t)),rd=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Zi=(t,e,i,a)=>(Ln(t,e,"write to private field"),e.set(t,i),i),ge;function nd(t,e={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}function od(t,e){return`
    <slot></slot>
  `}class De extends l.HTMLElement{constructor(){if(super(),rd(this,ge,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[L.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===L.MEDIA_CONTROLLER&&(i&&((r=(s=zi(this,ge))==null?void 0:s.unassociateElement)==null||r.call(s,this),Zi(this,ge,null)),a&&this.isConnected&&(Zi(this,ge,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=zi(this,ge))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;const{style:s}=H(this.shadowRoot,":host");s.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const r=this.getAttribute(L.MEDIA_CONTROLLER);r&&(Zi(this,ge,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=zi(this,ge))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=zi(this,ge))==null?void 0:e.unassociateElement)==null||i.call(e,this),Zi(this,ge,null)}}ge=new WeakMap,De.shadowRootOptions={mode:"open"},De.getTemplateHTML=nd,De.getSlotTemplateHTML=od,l.customElements.get("media-text-display")||l.customElements.define("media-text-display",De);var ld=De,wn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Rn=(t,e,i)=>(wn(t,e,"read from private field"),i?i.call(t):e.get(t)),dd=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},cd=(t,e,i,a)=>(wn(t,e,"write to private field"),e.set(t,i),i),Xt;function ud(t,e){return`
    <slot>${ke(e.mediaDuration)}</slot>
  `}class bs extends De{constructor(){var e;super(),dd(this,Xt,void 0),cd(this,Xt,this.shadowRoot.querySelector("slot")),Rn(this,Xt).textContent=ke((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===n.MEDIA_DURATION&&(Rn(this,Xt).textContent=ke(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return O(this,n.MEDIA_DURATION)}set mediaDuration(e){W(this,n.MEDIA_DURATION,e)}}Xt=new WeakMap,bs.getSlotTemplateHTML=ud,l.customElements.get("media-duration-display")||l.customElements.define("media-duration-display",bs);var hd=bs;const md={2:p("Network Error"),3:p("Decode Error"),4:p("Source Not Supported"),5:p("Encryption Error")},pd={2:p("A network error caused the media download to fail."),3:p("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:p("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:p("The media is encrypted and there are no keys to decrypt it.")},As=t=>{var e,i;return t.code===1?null:{title:(e=md[t.code])!=null?e:`Error ${t.code}`,message:(i=pd[t.code])!=null?i:t.message}};var Dn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ed=(t,e,i)=>(Dn(t,e,"read from private field"),i?i.call(t):e.get(t)),vd=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_d=(t,e,i,a)=>(Dn(t,e,"write to private field"),e.set(t,i),i),Xi;function fd(t){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${Cn({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function gd(t){return t.code&&As(t)!==null}function Cn(t){var e;const{title:i,message:a}=(e=As(t))!=null?e:{};let s="";return i&&(s+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(s+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),s}const On=[n.MEDIA_ERROR_CODE,n.MEDIA_ERROR_MESSAGE];class Ji extends Xe{constructor(){super(...arguments),vd(this,Xi,null)}static get observedAttributes(){return[...super.observedAttributes,...On]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var s;if(super.attributeChangedCallback(e,i,a),!On.includes(e))return;const r=(s=this.mediaError)!=null?s:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=gd(r),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(r),!this.hasAttribute("aria-label"))){const{title:o}=As(r);o&&this.setAttribute("aria-label",o)}}get mediaError(){return Ed(this,Xi)}set mediaError(e){_d(this,Xi,e)}get mediaErrorCode(){return O(this,"mediaerrorcode")}set mediaErrorCode(e){W(this,"mediaerrorcode",e)}get mediaErrorMessage(){return U(this,"mediaerrormessage")}set mediaErrorMessage(e){P(this,"mediaerrormessage",e)}}Xi=new WeakMap,Ji.getSlotTemplateHTML=fd,Ji.formatErrorMessage=Cn,l.customElements.get("media-error-dialog")||l.customElements.define("media-error-dialog",Ji);var bd=Ji,Ad=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ne=(t,e,i)=>(Ad(t,e,"read from private field"),i?i.call(t):e.get(t)),Pn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ft,gt;function Td(t){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${Id()}
    </slot>
  `}function Id(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["\u2190","j"],description:"Seek back 10s"},{keys:["\u2192","l"],description:"Seek forward 10s"},{keys:["\u2191"],description:"Turn volume up"},{keys:["\u2193"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((r,o)=>o>0?`<span class="key-separator">or</span><span class="key">${r}</span>`:`<span class="key">${r}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}class Ts extends Xe{constructor(){super(...arguments),Pn(this,ft,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const s=e.composedPath(),r=s[0]===this||s.includes(this),o=s.includes(a);r&&!o&&(this.open=!1)}),Pn(this,gt,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",Ne(this,ft)),document.addEventListener("keydown",Ne(this,gt)))}disconnectedCallback(){this.removeEventListener("click",Ne(this,ft)),document.removeEventListener("keydown",Ne(this,gt))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",Ne(this,ft)),document.addEventListener("keydown",Ne(this,gt))):(this.removeEventListener("click",Ne(this,ft)),document.removeEventListener("keydown",Ne(this,gt))))}}ft=new WeakMap,gt=new WeakMap,Ts.getSlotTemplateHTML=Td,l.customElements.get("media-keyboard-shortcuts-dialog")||l.customElements.define("media-keyboard-shortcuts-dialog",Ts);var Sd=Ts,Un=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},yd=(t,e,i)=>(Un(t,e,"read from private field"),e.get(t)),Md=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},kd=(t,e,i,a)=>(Un(t,e,"write to private field"),e.set(t,i),i),ji;const Ld=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,wd=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Rd(t){return`
    <style>
      :host([${n.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${n.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ld}</slot>
      <slot name="exit">${wd}</slot>
    </slot>
  `}function Dd(){return`
    <slot name="tooltip-enter">${p("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${p("Exit fullscreen mode")}</slot>
  `}const xn=t=>{const e=t.mediaIsFullscreen?p("exit fullscreen mode"):p("enter fullscreen mode");t.setAttribute("aria-label",e)};class ea extends G{constructor(){super(...arguments),Md(this,ji,null)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_FULLSCREEN,n.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),xn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_FULLSCREEN&&xn(this)}get mediaFullscreenUnavailable(){return U(this,n.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){P(this,n.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return y(this,n.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){M(this,n.MEDIA_IS_FULLSCREEN,e)}handleClick(e){kd(this,ji,e);const i=yd(this,ji)instanceof PointerEvent,a=this.mediaIsFullscreen?new l.CustomEvent(h.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new l.CustomEvent(h.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}}ji=new WeakMap,ea.getSlotTemplateHTML=Rd,ea.getTooltipContentHTML=Dd,l.customElements.get("media-fullscreen-button")||l.customElements.define("media-fullscreen-button",ea);var Cd=ea;const{MEDIA_TIME_IS_LIVE:ta,MEDIA_PAUSED:Jt}=n,{MEDIA_SEEK_TO_LIVE_REQUEST:Od,MEDIA_PLAY_REQUEST:Pd}=h,Ud='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function xd(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${ta}]:not([${Jt}])) slot[name=indicator] > *,
      :host([${ta}]:not([${Jt}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${ta}]:not([${Jt}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Ud}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${p("live")}</slot>
  `}const Nn=t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=p(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const s=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');s&&(s.textContent=p("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")};class Is extends G{static get observedAttributes(){return[...super.observedAttributes,ta,Jt]}connectedCallback(){super.connectedCallback(),Nn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Nn(this)}get mediaPaused(){return y(this,n.MEDIA_PAUSED)}set mediaPaused(e){M(this,n.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return y(this,n.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){M(this,n.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new l.CustomEvent(Od,{composed:!0,bubbles:!0})),this.hasAttribute(Jt)&&this.dispatchEvent(new l.CustomEvent(Pd,{composed:!0,bubbles:!0})))}}Is.getSlotTemplateHTML=xd,l.customElements.get("media-live-button")||l.customElements.define("media-live-button",Is);var Nd=Is,$n=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},jt=(t,e,i)=>($n(t,e,"read from private field"),i?i.call(t):e.get(t)),Hn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ei=(t,e,i,a)=>($n(t,e,"write to private field"),e.set(t,i),i),be,ia;const aa={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},Fn=500,$d=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function Hd(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${Fn}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${$d}</slot>
    <div id="status" role="status" aria-live="polite">${p("media loading")}</div>
  `}class sa extends l.HTMLElement{constructor(){if(super(),Hn(this,be,void 0),Hn(this,ia,Fn),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[L.MEDIA_CONTROLLER,n.MEDIA_PAUSED,n.MEDIA_LOADING,aa.LOADING_DELAY]}attributeChangedCallback(e,i,a){var s,r,o,d,c;e===aa.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===L.MEDIA_CONTROLLER&&(i&&((r=(s=jt(this,be))==null?void 0:s.unassociateElement)==null||r.call(s,this),ei(this,be,null)),a&&this.isConnected&&(ei(this,be,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=jt(this,be))==null?void 0:d.associateElement)==null||c.call(d,this)))}connectedCallback(){var e,i,a;const s=this.getAttribute(L.MEDIA_CONTROLLER);s&&(ei(this,be,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=jt(this,be))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=jt(this,be))==null?void 0:e.unassociateElement)==null||i.call(e,this),ei(this,be,null)}get loadingDelay(){return jt(this,ia)}set loadingDelay(e){ei(this,ia,e);const{style:i}=H(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return y(this,n.MEDIA_PAUSED)}set mediaPaused(e){M(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return y(this,n.MEDIA_LOADING)}set mediaLoading(e){M(this,n.MEDIA_LOADING,e)}get mediaController(){return U(this,L.MEDIA_CONTROLLER)}set mediaController(e){P(this,L.MEDIA_CONTROLLER,e)}get noAutohide(){return y(this,aa.NO_AUTOHIDE)}set noAutohide(e){M(this,aa.NO_AUTOHIDE,e)}}be=new WeakMap,ia=new WeakMap,sa.shadowRootOptions={mode:"open"},sa.getTemplateHTML=Hd,l.customElements.get("media-loading-indicator")||l.customElements.define("media-loading-indicator",sa);var Fd=sa;const Bd=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Bn=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,Wd=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function Vd(t){return`
    <style>
      :host(:not([${n.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${n.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${n.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${n.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${n.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${n.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${n.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${Bd}</slot>
      <slot name="low">${Bn}</slot>
      <slot name="medium">${Bn}</slot>
      <slot name="high">${Wd}</slot>
    </slot>
  `}function Gd(){return`
    <slot name="tooltip-mute">${p("Mute")}</slot>
    <slot name="tooltip-unmute">${p("Unmute")}</slot>
  `}const Wn=t=>{const e=t.mediaVolumeLevel==="off",i=p(e?"unmute":"mute");t.setAttribute("aria-label",i)};class ra extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),Wn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_VOLUME_LEVEL&&Wn(this)}get mediaVolumeLevel(){return U(this,n.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){P(this,n.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?h.MEDIA_UNMUTE_REQUEST:h.MEDIA_MUTE_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}}ra.getSlotTemplateHTML=Vd,ra.getTooltipContentHTML=Gd,l.customElements.get("media-mute-button")||l.customElements.define("media-mute-button",ra);var Kd=ra;const Vn=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function qd(t){return`
    <style>
      :host([${n.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${n.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${n.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${n.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Vn}</slot>
      <slot name="exit">${Vn}</slot>
    </slot>
  `}function Yd(){return`
    <slot name="tooltip-enter">${p("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${p("Exit picture in picture mode")}</slot>
  `}const Gn=t=>{const e=t.mediaIsPip?p("exit picture in picture mode"):p("enter picture in picture mode");t.setAttribute("aria-label",e)};class na extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_PIP,n.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Gn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_PIP&&Gn(this)}get mediaPipUnavailable(){return U(this,n.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){P(this,n.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return y(this,n.MEDIA_IS_PIP)}set mediaIsPip(e){M(this,n.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?h.MEDIA_EXIT_PIP_REQUEST:h.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}}na.getSlotTemplateHTML=qd,na.getTooltipContentHTML=Yd,l.customElements.get("media-pip-button")||l.customElements.define("media-pip-button",na);var Qd=na,zd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},bt=(t,e,i)=>(zd(t,e,"read from private field"),i?i.call(t):e.get(t)),Zd=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},$e;const Ss={RATES:"rates"},Xd=[1,1.2,1.5,1.7,2],ti=1;function ys(t){return Math.round(t*100)/100}function Jd(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate?ys(+t.mediaplaybackrate):ti}x</slot>
  `}function jd(){return p("Playback rate")}class oa extends G{constructor(){var e;super(),Zd(this,$e,new Vr(this,Ss.RATES,{defaultValue:Xd})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${ys((e=this.mediaPlaybackRate)!=null?e:ti)}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,Ss.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Ss.RATES&&(bt(this,$e).value=a),e===n.MEDIA_PLAYBACK_RATE){const s=a?+a:Number.NaN,r=ys(Number.isNaN(s)?ti:s);this.container.innerHTML=`${r}x`,this.setAttribute("aria-label",p("Playback rate {playbackRate}",{playbackRate:r}))}}get rates(){return bt(this,$e)}set rates(e){e?Array.isArray(e)?bt(this,$e).value=e.join(" "):typeof e=="string"&&(bt(this,$e).value=e):bt(this,$e).value=""}get mediaPlaybackRate(){return O(this,n.MEDIA_PLAYBACK_RATE,ti)}set mediaPlaybackRate(e){W(this,n.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(bt(this,$e).values(),o=>+o).sort((o,d)=>o-d),s=(i=(e=a.find(o=>o>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:ti,r=new l.CustomEvent(h.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:s});this.dispatchEvent(r)}}$e=new WeakMap,oa.getSlotTemplateHTML=Jd,oa.getTooltipContentHTML=jd,l.customElements.get("media-playback-rate-button")||l.customElements.define("media-playback-rate-button",oa);var ec=oa;const tc=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,ic=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function ac(t){return`
    <style>
      :host([${n.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${n.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${n.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${n.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${tc}</slot>
      <slot name="pause">${ic}</slot>
    </slot>
  `}function sc(){return`
    <slot name="tooltip-play">${p("Play")}</slot>
    <slot name="tooltip-pause">${p("Pause")}</slot>
  `}const Kn=t=>{const e=t.mediaPaused?p("play"):p("pause");t.setAttribute("aria-label",e)};class la extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Kn(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_PAUSED||e===n.MEDIA_LANG)&&Kn(this)}get mediaPaused(){return y(this,n.MEDIA_PAUSED)}set mediaPaused(e){M(this,n.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?h.MEDIA_PLAY_REQUEST:h.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new l.CustomEvent(e,{composed:!0,bubbles:!0}))}}la.getSlotTemplateHTML=ac,la.getTooltipContentHTML=sc,l.customElements.get("media-play-button")||l.customElements.define("media-play-button",la);var rc=la;const Ae={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function nc(t){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}const oc=t=>{t.style.removeProperty("background-image")},lc=(t,e)=>{t.style["background-image"]=`url('${e}')`};class da extends l.HTMLElement{static get observedAttributes(){return[Ae.PLACEHOLDER_SRC,Ae.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Ae.SRC&&(a==null?this.image.removeAttribute(Ae.SRC):this.image.setAttribute(Ae.SRC,a)),e===Ae.PLACEHOLDER_SRC&&(a==null?oc(this.image):lc(this.image,a))}get placeholderSrc(){return U(this,Ae.PLACEHOLDER_SRC)}set placeholderSrc(e){P(this,Ae.SRC,e)}get src(){return U(this,Ae.SRC)}set src(e){P(this,Ae.SRC,e)}}da.shadowRootOptions={mode:"open"},da.getTemplateHTML=nc,l.customElements.get("media-poster-image")||l.customElements.define("media-poster-image",da);var dc=da,qn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},cc=(t,e,i)=>(qn(t,e,"read from private field"),i?i.call(t):e.get(t)),uc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},hc=(t,e,i,a)=>(qn(t,e,"write to private field"),e.set(t,i),i),ca;class Yn extends De{constructor(){super(),uc(this,ca,void 0),hc(this,ca,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===n.MEDIA_PREVIEW_CHAPTER||e===n.MEDIA_LANG)&&a!==i&&a!=null)if(cc(this,ca).textContent=a,a!==""){const s=p("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",s)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return U(this,n.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){P(this,n.MEDIA_PREVIEW_CHAPTER,e)}}ca=new WeakMap,l.customElements.get("media-preview-chapter-display")||l.customElements.define("media-preview-chapter-display",Yn);var mc=Yn,Qn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ua=(t,e,i)=>(Qn(t,e,"read from private field"),i?i.call(t):e.get(t)),pc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ha=(t,e,i,a)=>(Qn(t,e,"write to private field"),e.set(t,i),i),Te;function Ec(t){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}class ma extends l.HTMLElement{constructor(){if(super(),pc(this,Te,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=re(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[L.MEDIA_CONTROLLER,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const s=this.getAttribute(L.MEDIA_CONTROLLER);s&&(ha(this,Te,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=ua(this,Te))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=ua(this,Te))==null?void 0:e.unassociateElement)==null||i.call(e,this),ha(this,Te,null)}attributeChangedCallback(e,i,a){var s,r,o,d,c;[n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===L.MEDIA_CONTROLLER&&(i&&((r=(s=ua(this,Te))==null?void 0:s.unassociateElement)==null||r.call(s,this),ha(this,Te,null)),a&&this.isConnected&&(ha(this,Te,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(c=(d=ua(this,Te))==null?void 0:d.associateElement)==null||c.call(d,this)))}get mediaPreviewImage(){return U(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){P(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(n.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(n.MEDIA_PREVIEW_COORDS);return}this.setAttribute(n.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,s,r,o]=e,d=i.split("#")[0],c=getComputedStyle(this),{maxWidth:I,maxHeight:T,minWidth:b,minHeight:_}=c,m=c.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let g,v;if(m==="fill"){const ye=parseInt(I)/r,Me=parseInt(T)/o,Ct=parseInt(b)/r,We=parseInt(_)/o;g=ye<1?ye:Math.max(ye,Ct),v=Me<1?Me:Math.max(Me,We)}else{const ye=Math.min(parseInt(I)/r,parseInt(T)/o),Me=Math.max(parseInt(b)/r,parseInt(_)/o),We=ye<1?ye:Me>1?Me:1;g=We,v=We}const{style:S}=H(this.shadowRoot,":host"),A=H(this.shadowRoot,"img").style,Q=this.shadowRoot.querySelector("img"),Dt=Math.min(g,v)<1?"min":"max";S.setProperty(`${Dt}-width`,"initial","important"),S.setProperty(`${Dt}-height`,"initial","important"),S.width=`${r*g}px`,S.height=`${o*v}px`;const tt=()=>{A.width=`${this.imgWidth*g}px`,A.height=`${this.imgHeight*v}px`,A.display="block"};Q.src!==d&&(Q.onload=()=>{this.imgWidth=Q.naturalWidth,this.imgHeight=Q.naturalHeight,tt(),Q.onload=null},Q.src=d,tt()),tt(),A.transform=`translate(-${a*g}px, -${s*v}px)`}}Te=new WeakMap,ma.shadowRootOptions={mode:"open"},ma.getTemplateHTML=Ec,l.customElements.get("media-preview-thumbnail")||l.customElements.define("media-preview-thumbnail",ma);var Ms=ma,zn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Zn=(t,e,i)=>(zn(t,e,"read from private field"),i?i.call(t):e.get(t)),vc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_c=(t,e,i,a)=>(zn(t,e,"write to private field"),e.set(t,i),i),ii;class Xn extends De{constructor(){super(),vc(this,ii,void 0),_c(this,ii,this.shadowRoot.querySelector("slot")),Zn(this,ii).textContent=ke(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_TIME&&a!=null&&(Zn(this,ii).textContent=ke(parseFloat(a)))}get mediaPreviewTime(){return O(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){W(this,n.MEDIA_PREVIEW_TIME,e)}}ii=new WeakMap,l.customElements.get("media-preview-time-display")||l.customElements.define("media-preview-time-display",Xn);var fc=Xn;const At={SEEK_OFFSET:"seekoffset"},ks=30,gc=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function bc(t,e){return`
    <slot name="icon">${gc(e.seekOffset)}</slot>
  `}const Ac=(t,e)=>{t.setAttribute("aria-label",p("seek back {seekOffset} seconds",{seekOffset:e}))};function Tc(){return p("Seek backward")}const Ic=0;class pa extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,At.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=O(this,At.SEEK_OFFSET,ks)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Ac(this,this.seekOffset),e===At.SEEK_OFFSET&&(this.seekOffset=O(this,At.SEEK_OFFSET,ks))}get seekOffset(){return O(this,At.SEEK_OFFSET,ks)}set seekOffset(e){W(this,At.SEEK_OFFSET,e),this.setAttribute("aria-label",p("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Or(Pr(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return O(this,n.MEDIA_CURRENT_TIME,Ic)}set mediaCurrentTime(e){W(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new l.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}pa.getSlotTemplateHTML=bc,pa.getTooltipContentHTML=Tc,l.customElements.get("media-seek-backward-button")||l.customElements.define("media-seek-backward-button",pa);var Sc=pa;const Tt={SEEK_OFFSET:"seekoffset"},Ls=30,yc=t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function Mc(t,e){return`
    <slot name="icon">${yc(e.seekOffset)}</slot>
  `}const kc=(t,e)=>{t.setAttribute("aria-label",p("seek forward {seekOffset} seconds",{seekOffset:e}))};function Lc(){return p("Seek forward")}const wc=0;class Ea extends G{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,Tt.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=O(this,Tt.SEEK_OFFSET,Ls)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),kc(this,this.seekOffset),e===Tt.SEEK_OFFSET&&(this.seekOffset=O(this,Tt.SEEK_OFFSET,Ls))}get seekOffset(){return O(this,Tt.SEEK_OFFSET,Ls)}set seekOffset(e){W(this,Tt.SEEK_OFFSET,e),this.setAttribute("aria-label",p("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Or(Pr(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return O(this,n.MEDIA_CURRENT_TIME,wc)}set mediaCurrentTime(e){W(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new l.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}Ea.getSlotTemplateHTML=Mc,Ea.getTooltipContentHTML=Lc,l.customElements.get("media-seek-forward-button")||l.customElements.define("media-seek-forward-button",Ea);var Rc=Ea,ws=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},he=(t,e,i)=>(ws(t,e,"read from private field"),i?i.call(t):e.get(t)),je=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Rs=(t,e,i,a)=>(ws(t,e,"write to private field"),e.set(t,i),i),He=(t,e,i)=>(ws(t,e,"access private method"),i),It,Ie,va,Ds,Jn,_a,Cs,ai,fa,ga,Os;const Fe={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},jn=[...Object.values(Fe),n.MEDIA_CURRENT_TIME,n.MEDIA_DURATION,n.MEDIA_SEEKABLE],eo=["Enter"," "],Dc="&nbsp;/&nbsp;",Ps=(t,{timesSep:e=Dc}={})=>{var i,a;const s=(i=t.mediaCurrentTime)!=null?i:0,[,r]=(a=t.mediaSeekable)!=null?a:[];let o=0;Number.isFinite(t.mediaDuration)?o=t.mediaDuration:Number.isFinite(r)&&(o=r);const d=t.remaining?ke(0-(o-s)):ke(s);return t.showDuration?`${d}${e}${ke(o)}`:d},Cc=t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let s=null;if(Number.isFinite(t.mediaDuration)?s=t.mediaDuration:Number.isFinite(a)&&(s=a),i==null||s===null){t.setAttribute("aria-description",p("video not loaded, unknown time."));return}const r=t.remaining?rt(0-(s-i)):rt(i);if(!t.showDuration){t.setAttribute("aria-description",r);return}const o=rt(s),d=p("{currentTime} of {totalTime}",{currentTime:r,totalTime:o});t.setAttribute("aria-description",d)};function Oc(t,e){return`
    <slot>${Ps(e)}</slot>
  `}const Pc=t=>{t.setAttribute("aria-label",p("playback time"))};class Us extends De{constructor(){super(),je(this,Ds),je(this,_a),je(this,ai),je(this,ga),je(this,It,void 0),je(this,Ie,null),je(this,va,e=>{const{metaKey:i,altKey:a,key:s}=e;if(i||a||!eo.includes(s)){this.removeEventListener("keyup",he(this,Ie));return}this.addEventListener("keyup",he(this,Ie))}),Rs(this,It,this.shadowRoot.querySelector("slot")),he(this,It).innerHTML=`${Ps(this)}`}static get observedAttributes(){return[...super.observedAttributes,...jn,"disabled"]}connectedCallback(){const{style:e}=H(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",p("playback time")),He(this,ai,fa).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),He(this,_a,Cs).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){Pc(this),jn.includes(e)?this.update():e==="disabled"&&a!==i?a==null?He(this,ai,fa).call(this):He(this,ga,Os).call(this):e===Fe.NO_TOGGLE&&a!==i&&(this.noToggle?He(this,ga,Os).call(this):He(this,ai,fa).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return y(this,Fe.REMAINING)}set remaining(e){M(this,Fe.REMAINING,e)}get showDuration(){return y(this,Fe.SHOW_DURATION)}set showDuration(e){M(this,Fe.SHOW_DURATION,e)}get noToggle(){return y(this,Fe.NO_TOGGLE)}set noToggle(e){M(this,Fe.NO_TOGGLE,e)}get mediaDuration(){return O(this,n.MEDIA_DURATION)}set mediaDuration(e){W(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return O(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){W(this,n.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}update(){const e=Ps(this);Cc(this),e!==he(this,It).innerHTML&&(he(this,It).innerHTML=e)}}It=new WeakMap,Ie=new WeakMap,va=new WeakMap,Ds=new WeakSet,Jn=function(){he(this,Ie)||(Rs(this,Ie,t=>{const{key:e}=t;if(!eo.includes(e)){this.removeEventListener("keyup",he(this,Ie));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",he(this,va)),this.addEventListener("click",this.toggleTimeDisplay))},_a=new WeakSet,Cs=function(){he(this,Ie)&&(this.removeEventListener("keyup",he(this,Ie)),this.removeEventListener("keydown",he(this,va)),this.removeEventListener("click",this.toggleTimeDisplay),Rs(this,Ie,null))},ai=new WeakSet,fa=function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),He(this,Ds,Jn).call(this))},ga=new WeakSet,Os=function(){this.removeAttribute("role"),this.disable(),He(this,_a,Cs).call(this)},Us.getSlotTemplateHTML=Oc,l.customElements.get("media-time-display")||l.customElements.define("media-time-display",Us);var Uc=Us,to=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},K=(t,e,i)=>(to(t,e,"read from private field"),e.get(t)),Se=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},j=(t,e,i,a)=>(to(t,e,"write to private field"),e.set(t,i),i),xc=(t,e,i,a)=>({set _(s){j(t,e,s)},get _(){return K(t,e)}}),St,ba,yt,si,Aa,Ta,Ia,Mt,et,Sa;class Nc{constructor(e,i,a){Se(this,St,void 0),Se(this,ba,void 0),Se(this,yt,void 0),Se(this,si,void 0),Se(this,Aa,void 0),Se(this,Ta,void 0),Se(this,Ia,void 0),Se(this,Mt,void 0),Se(this,et,0),Se(this,Sa,(s=performance.now())=>{j(this,et,requestAnimationFrame(K(this,Sa))),j(this,si,performance.now()-K(this,yt));const r=1e3/this.fps;if(K(this,si)>r){j(this,yt,s-K(this,si)%r);const o=1e3/((s-K(this,ba))/++xc(this,Aa)._),d=(s-K(this,Ta))/1e3/this.duration;let c=K(this,Ia)+d*this.playbackRate;c-K(this,St).valueAsNumber>0?j(this,Mt,this.playbackRate/this.duration/o):(j(this,Mt,.995*K(this,Mt)),c=K(this,St).valueAsNumber+K(this,Mt)),this.callback(c)}}),j(this,St,e),this.callback=i,this.fps=a}start(){K(this,et)===0&&(j(this,yt,performance.now()),j(this,ba,K(this,yt)),j(this,Aa,0),K(this,Sa).call(this))}stop(){K(this,et)!==0&&(cancelAnimationFrame(K(this,et)),j(this,et,0))}update({start:e,duration:i,playbackRate:a}){const s=e-K(this,St).valueAsNumber,r=Math.abs(i-this.duration);(s>0||s<-.03||r>=.5)&&this.callback(e),j(this,Ia,e),j(this,Ta,performance.now()),this.duration=i,this.playbackRate=a}}St=new WeakMap,ba=new WeakMap,yt=new WeakMap,si=new WeakMap,Aa=new WeakMap,Ta=new WeakMap,Ia=new WeakMap,Mt=new WeakMap,et=new WeakMap,Sa=new WeakMap;var xs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},R=(t,e,i)=>(xs(t,e,"read from private field"),i?i.call(t):e.get(t)),F=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},te=(t,e,i,a)=>(xs(t,e,"write to private field"),e.set(t,i),i),ie=(t,e,i)=>(xs(t,e,"access private method"),i),kt,Be,ya,ri,Ma,ka,ni,oi,Lt,wt,li,Ns,io,$s,La,Hs,wa,Fs,Ra,Bs,Ws,ao,di,Da,Vs,so;const $c=t=>{const e=t.range,i=rt(+ro(t)),a=rt(+t.mediaSeekableEnd),s=i&&a?p("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):p("video not loaded, unknown time.");e.setAttribute("aria-valuetext",s)};function Hc(t){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${n.MEDIA_PREVIEW_IMAGE}], [${n.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${n.MEDIA_PREVIEW_IMAGE}], [${n.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${n.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${n.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${n.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${n.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${n.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${n.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${n.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${n.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${n.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${n.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${n.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${n.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${Ms.shadowRootOptions.mode}">
            ${Ms.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}const Ca=(t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const s=(e-i)/(a-i);return Math.max(0,Math.min(s,1))},ro=(t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i};class Oa extends Je{constructor(){super(),F(this,Ns),F(this,La),F(this,wa),F(this,Ra),F(this,Ws),F(this,di),F(this,Vs),F(this,kt,null),F(this,Be,void 0),F(this,ya,void 0),F(this,ri,void 0),F(this,Ma,void 0),F(this,ka,void 0),F(this,ni,void 0),F(this,oi,void 0),F(this,Lt,void 0),F(this,wt,void 0),F(this,li,()=>{ie(this,Ns,io).call(this)?R(this,Be).start():R(this,Be).stop()}),F(this,$s,a=>{this.dragging||($a(a)&&(this.range.valueAsNumber=a),R(this,wt)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),te(this,ya,this.shadowRoot.querySelectorAll('[part~="box"]')),te(this,Ma,this.shadowRoot.querySelector('[part~="preview-box"]')),te(this,ka,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);te(this,ni,parseInt(i.getPropertyValue("--media-box-padding-left"))),te(this,oi,parseInt(i.getPropertyValue("--media-box-padding-right"))),te(this,Be,new Nc(this.range,R(this,$s),60))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_DURATION,n.MEDIA_SEEKABLE,n.MEDIA_CURRENT_TIME,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_TIME,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_BUFFERED,n.MEDIA_PLAYBACK_RATE,n.MEDIA_LOADING,n.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",p("seek")),R(this,li).call(this),te(this,kt,this.getRootNode()),(e=R(this,kt))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),R(this,Be).stop(),(e=R(this,kt))==null||e.removeEventListener("transitionstart",this),te(this,kt,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===n.MEDIA_CURRENT_TIME||e===n.MEDIA_PAUSED||e===n.MEDIA_ENDED||e===n.MEDIA_LOADING||e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE?(R(this,Be).update({start:Ca(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),R(this,li).call(this),$c(this)):e===n.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=R(this,Lt),this.updateBar()))}get mediaChaptersCues(){return R(this,Lt)}set mediaChaptersCues(e){var i;te(this,Lt,e),this.updateSegments((i=R(this,Lt))==null?void 0:i.map(a=>({start:Ca(this,a.startTime),end:Ca(this,a.endTime)})))}get mediaPaused(){return y(this,n.MEDIA_PAUSED)}set mediaPaused(e){M(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return y(this,n.MEDIA_LOADING)}set mediaLoading(e){M(this,n.MEDIA_LOADING,e)}get mediaDuration(){return O(this,n.MEDIA_DURATION)}set mediaDuration(e){W(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return O(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){W(this,n.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return O(this,n.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){W(this,n.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(n.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(n.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(n.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return U(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){P(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return O(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){W(this,n.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return y(this,n.MEDIA_ENDED)}set mediaEnded(e){M(this,n.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const r=this.mediaCurrentTime,[,o=this.mediaSeekableStart]=(e=i.find(([d,c])=>d<=r&&r<=c))!=null?e:[];a=Ca(this,o)}const{style:s}=H(this.shadowRoot,"#buffered");s.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=H(this.shadowRoot,"#current-rail"),a=H(this.shadowRoot,'[part~="current-box"]'),s=ie(this,La,Hs).call(this,R(this,ka)),r=ie(this,wa,Fs).call(this,s,this.range.valueAsNumber),o=ie(this,Ra,Bs).call(this,s,this.range.valueAsNumber);i.style.transform=`translateX(${r})`,i.style.setProperty("--_range-width",`${s.range.width}`),a.style.setProperty("--_box-shift",`${o}`),a.style.setProperty("--_box-width",`${s.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":ie(this,Vs,so).call(this);break;case"pointermove":ie(this,Ws,ao).call(this,e);break;case"pointerup":R(this,wt)&&te(this,wt,!1);break;case"pointerdown":te(this,wt,!0);break;case"pointerleave":ie(this,di,Da).call(this,null);break;case"transitionstart":nt(e.target,this)&&setTimeout(()=>R(this,li).call(this),0);break}}}kt=new WeakMap,Be=new WeakMap,ya=new WeakMap,ri=new WeakMap,Ma=new WeakMap,ka=new WeakMap,ni=new WeakMap,oi=new WeakMap,Lt=new WeakMap,wt=new WeakMap,li=new WeakMap,Ns=new WeakSet,io=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&xr(this)},$s=new WeakMap,La=new WeakSet,Hs=function(t){var e;const a=((e=this.getAttribute("bounds")?xt(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),s=this.range.getBoundingClientRect(),r=t.offsetWidth,o=-(s.left-a.left-r/2),d=a.right-s.left-r/2;return{box:{width:r,min:o,max:d},bounds:a,range:s}},wa=new WeakSet,Fs=function(t,e){let i=`${e*100}%`;const{width:a,min:s,max:r}=t.box;if(!a)return i;if(Number.isNaN(s)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${s}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(r)){const d=`calc(1 / var(--_range-width) * 100 * ${r}% - var(--media-box-padding-right))`;i=`min(${i}, ${d})`}return i},Ra=new WeakSet,Bs=function(t,e){const{width:i,min:a,max:s}=t.box,r=e*t.range.width;if(r<a+R(this,ni)){const o=t.range.left-t.bounds.left-R(this,ni);return`${r-i/2+o}px`}if(r>s-R(this,oi)){const o=t.bounds.right-t.range.right-R(this,oi);return`${r+i/2-o-t.range.width}px`}return 0},Ws=new WeakSet,ao=function(t){const e=[...R(this,ya)].some(T=>t.composedPath().includes(T));if(!this.dragging&&(e||!t.composedPath().includes(this))){ie(this,di,Da).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=H(this.shadowRoot,"#preview-rail"),s=H(this.shadowRoot,'[part~="preview-box"]'),r=ie(this,La,Hs).call(this,R(this,Ma));let o=(t.clientX-r.range.left)/r.range.width;o=Math.max(0,Math.min(1,o));const d=ie(this,wa,Fs).call(this,r,o),c=ie(this,Ra,Bs).call(this,r,o);a.style.transform=`translateX(${d})`,a.style.setProperty("--_range-width",`${r.range.width}`),s.style.setProperty("--_box-shift",`${c}`),s.style.setProperty("--_box-width",`${r.box.width}px`);const I=Math.round(R(this,ri))-Math.round(o*i);Math.abs(I)<1&&o>.01&&o<.99||(te(this,ri,o*i),ie(this,di,Da).call(this,R(this,ri)))},di=new WeakSet,Da=function(t){this.dispatchEvent(new l.CustomEvent(h.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))},Vs=new WeakSet,so=function(){R(this,Be).stop();const t=ro(this);this.dispatchEvent(new l.CustomEvent(h.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))},Oa.shadowRootOptions={mode:"open"},Oa.getContainerTemplateHTML=Hc,l.customElements.get("media-time-range")||l.customElements.define("media-time-range",Oa);var Fc=Oa,Bc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},no=(t,e,i)=>(Bc(t,e,"read from private field"),i?i.call(t):e.get(t)),Wc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Pa;const Vc=1,Gc=t=>t.mediaMuted?0:t.mediaVolume,Kc=t=>`${Math.round(t*100)}%`;class oo extends Je{constructor(){super(...arguments),Wc(this,Pa,()=>{const e=this.range.value,i=new l.CustomEvent(h.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME,n.MEDIA_MUTED,n.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",p("volume")),this.range.addEventListener("input",no(this,Pa))}disconnectedCallback(){this.range.removeEventListener("input",no(this,Pa)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_VOLUME||e===n.MEDIA_MUTED)&&(this.range.valueAsNumber=Gc(this),this.range.setAttribute("aria-valuetext",Kc(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return O(this,n.MEDIA_VOLUME,Vc)}set mediaVolume(e){W(this,n.MEDIA_VOLUME,e)}get mediaMuted(){return y(this,n.MEDIA_MUTED)}set mediaMuted(e){M(this,n.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return U(this,n.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){P(this,n.MEDIA_VOLUME_UNAVAILABLE,e)}}Pa=new WeakMap,l.customElements.get("media-volume-range")||l.customElements.define("media-volume-range",oo);var qc=oo;function Yc(t){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${n.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function Qc(){return p("Loop")}class Ua extends G{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=p("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return y(this,n.MEDIA_LOOP)}set mediaLoop(e){M(this,n.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new l.CustomEvent(h.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}Ua.getSlotTemplateHTML=Yc,Ua.getTooltipContentHTML=Qc,l.customElements.get("media-loop-button")||l.customElements.define("media-loop-button",Ua);var zc=Ua;export{Hl as MediaAirplayButton,Gl as MediaCaptionsButton,zl as MediaCastButton,xl as MediaChromeButton,Jl as MediaChromeDialog,td as MediaChromeRange,zo as MediaContainer,sd as MediaControlBar,Rl as MediaController,hd as MediaDurationDisplay,bd as MediaErrorDialog,Cd as MediaFullscreenButton,Fa as MediaGestureReceiver,Sd as MediaKeyboardShortcutsDialog,Nd as MediaLiveButton,Fd as MediaLoadingIndicator,zc as MediaLoopButton,Kd as MediaMuteButton,Qd as MediaPipButton,rc as MediaPlayButton,ec as MediaPlaybackRateButton,dc as MediaPosterImage,mc as MediaPreviewChapterDisplay,Ms as MediaPreviewThumbnail,fc as MediaPreviewTimeDisplay,Sc as MediaSeekBackwardButton,Rc as MediaSeekForwardButton,ld as MediaTextDisplay,Uc as MediaTimeDisplay,Fc as MediaTimeRange,es as MediaTooltip,qc as MediaVolumeRange,Ao as constants,p as t,Co as timeUtils};
//# sourceMappingURL=/sm/aafba694e00d779a27bdfe7cd7207613bd5f49979ca917893c089cbc21c1c8bd.map