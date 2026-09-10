/**
 * Bundled by jsDelivr using Rollup v4.62.2 and esbuild v0.28.1.
 * Original file: /npm/custom-media-element@1.4.6/dist/custom-media-element.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const f=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","waitingforkey","resize","enterpictureinpicture","leavepictureinpicture","webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"],h=["autopictureinpicture","disablepictureinpicture","disableremoteplayback","autoplay","controls","controlslist","crossorigin","loop","muted","playsinline","poster","preload","src"];function b(a){return`
    <style>
      :host {
        display: inline-flex;
        line-height: 0;
        flex-direction: column;
        justify-content: end;
      }

      audio {
        width: 100%;
      }
    </style>
    <slot name="media">
      <audio${p(a)}></audio>
    </slot>
    <slot></slot>
  `}function m(a){return`
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, 50% 50%);
      }

      video::-webkit-media-text-track-container {
        transform: var(--media-webkit-text-track-transform);
        transition: var(--media-webkit-text-track-transition);
      }
    </style>
    <slot name="media">
      <video${p(a)}></video>
    </slot>
    <slot></slot>
  `}function c(a,{tag:n,is:o}){const l=globalThis.document?.createElement?.(n,{is:o}),u=l?v(l):[];return class d extends a{static getTemplateHTML=n.endsWith("audio")?b:m;static shadowRootOptions={mode:"open"};static Events=f;static#n=!1;static get observedAttributes(){return d.#c(),[...l?.constructor?.observedAttributes??[],...h]}static#c(){if(this.#n)return;this.#n=!0;const t=new Set(this.observedAttributes);t.delete("muted");for(const i of u)if(!(i in this.prototype))if(typeof l[i]=="function")this.prototype[i]=function(...r){return this.#i(),this.call?this.call(i,...r):this.nativeEl?.[i]?.apply(this.nativeEl,r)};else{const r={get(){this.#i();const e=i.toLowerCase();if(t.has(e)){const s=this.getAttribute(e);return s===null?!1:s===""?!0:s}return this.get?.(i)??this.nativeEl?.[i]}};i!==i.toUpperCase()&&(r.set=function(e){this.#i();const s=i.toLowerCase();if(t.has(s)){e===!0||e===!1||e==null?this.toggleAttribute(s,!!e):this.setAttribute(s,e);return}if(this.set){this.set(i,e);return}this.nativeEl&&(this.nativeEl[i]=e)}),Object.defineProperty(this.prototype,i,r)}}#r=!1;#o=null;#t=new Map;#s;#e;get;set;call;get nativeEl(){return this.#i(),this.#o??this.querySelector(":scope > [slot=media]")??this.querySelector(n)??this.shadowRoot?.querySelector(n)??null}set nativeEl(t){this.#o=t}get defaultMuted(){return this.hasAttribute("muted")}set defaultMuted(t){this.toggleAttribute("muted",t)}get src(){return this.getAttribute("src")}set src(t){this.setAttribute("src",`${t}`)}get preload(){return this.getAttribute("preload")??this.nativeEl?.preload}set preload(t){this.setAttribute("preload",`${t}`)}#i(){this.#r||(this.#r=!0,this.init())}init(){if(!this.shadowRoot){this.attachShadow({mode:"open"});const t=g(this.attributes);o&&(t.is=o),n&&(t.part=n),this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}this.nativeEl.muted=this.hasAttribute("muted");for(const t of u)this.#u(t);this.#a()}#a(){this.#s=new MutationObserver(this.#d.bind(this)),this.#e=()=>this.#l(),this.shadowRoot?.addEventListener("slotchange",this.#e),this.#l();for(const t of this.constructor.Events)this.shadowRoot?.addEventListener(t,this,!0)}handleEvent(t){t.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(t.type,{detail:t.detail}))}#l(){const t=new Map(this.#t);(this.shadowRoot?.querySelector("slot:not([name])")?.assignedElements({flatten:!0}).filter(e=>["track","source"].includes(e.localName))).forEach(e=>{t.delete(e);let s=this.#t.get(e);s||(s=e.cloneNode(),this.#t.set(e,s),this.#s?.observe(e,{attributes:!0})),this.nativeEl?.append(s),this.#h(s)}),t.forEach((e,s)=>{e.remove(),this.#t.delete(s)})}#d(t){for(const i of t)if(i.type==="attributes"){const{target:r,attributeName:e}=i,s=this.#t.get(r);s&&e&&(s.setAttribute(e,r.getAttribute(e)??""),this.#h(s))}}#h(t){t&&t.localName==="track"&&t.default&&(t.kind==="chapters"||t.kind==="metadata")&&t.track.mode==="disabled"&&(t.track.mode="hidden")}#u(t){if(Object.prototype.hasOwnProperty.call(this,t)){const i=this[t];delete this[t],this[t]=i}}attributeChangedCallback(t,i,r){this.#i(),this.#f(t,i,r)}#f(t,i,r){["id","class"].includes(t)||!d.observedAttributes.includes(t)&&this.constructor.observedAttributes.includes(t)||(r===null?this.nativeEl?.removeAttribute(t):this.nativeEl?.getAttribute(t)!==r&&this.nativeEl?.setAttribute(t,r))}connectedCallback(){this.#i(),this.#e||this.#a()}disconnectedCallback(){this.#s?.disconnect(),this.#s=void 0,this.#e&&(this.shadowRoot?.removeEventListener("slotchange",this.#e),this.#e=void 0);for(const t of this.constructor.Events)this.shadowRoot?.removeEventListener(t,this,!0);this.#t.forEach(t=>t.remove()),this.#t.clear(),this.#o=null}}}function v(a){const n=[];for(let o=Object.getPrototypeOf(a);o&&o!==HTMLElement.prototype;o=Object.getPrototypeOf(o)){const l=Object.getOwnPropertyNames(o);n.push(...l)}return n}function p(a){let n="";for(const o in a){if(!h.includes(o))continue;const l=a[o];l===""?n+=` ${o}`:n+=` ${o}="${l}"`}return n}function g(a){const n={};for(const o of a)n[o.name]=o.value;return n}const y=c(globalThis.HTMLElement??class{},{tag:"video"}),E=c(globalThis.HTMLElement??class{},{tag:"audio"});export{h as Attributes,E as CustomAudioElement,c as CustomMediaMixin,y as CustomVideoElement,f as Events};
//# sourceMappingURL=/sm/a8b572f110ec0ae9cd0fe347f1642bec7e61f53a16e71417eeba106e2c723994.map