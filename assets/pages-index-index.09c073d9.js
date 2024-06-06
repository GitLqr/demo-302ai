import{r as t,u as e,c as s,w as i,v as o,o as a,a as n,b as r,d as l,n as c,e as h,i as u,f as d,g as p,h as m,j as f,k as g,l as y,m as k,p as b,q as w,s as C,t as v,x as T,y as $,F as x,z as _,A,B as S,C as R,D as P,E as I,G as B,H as E,I as D,J as F}from"./index-9c1dc495.js";function j(e,s,i={}){return function(e,s,i,o){return new Promise(((a,n)=>{t({url:e,data:M(s),header:o,method:i,success:({data:t,statusCode:e,header:s})=>{200===e?a(t):n("request err, statusCode is "+e)},fail:t=>{n(t)}})}))}(e,s,"GET",i)}function M(t){if("object"==typeof t)for(let e of Object.keys(t))if(null!=t[e]&&null!=t[e]||delete t[e],t[e]instanceof Array){const s=[],i=t[e];for(let t of i){const e=M(t);e&&s.push(e)}t[e]=s}return t}const O={Authorization:"Bearer sk-lYksXcSpPbeArbV9oUKPZsp6q9gnvyf0d1Ra7fRV49i5zMjf"};class z{constructor(t,e){this.options=t,this.animation=s({...t}),this.currentStepAnimates={},this.next=0,this.$=e}_nvuePushAnimates(t,e){let s=this.currentStepAnimates[this.next],i={};if(i=s||{styles:{},config:{}},X.includes(t)){i.styles.transform||(i.styles.transform="");let s="";"rotate"===t&&(s="deg"),i.styles.transform+=`${t}(${e+s}) `}else i.styles[t]=`${e}`;this.currentStepAnimates[this.next]=i}_animateRun(t={},e={}){let s=this.$.$refs.ani.ref;if(s)return new Promise(((i,o)=>{nvueAnimation.transition(s,{styles:t,...e},(t=>{i()}))}))}_nvueNextAnimate(t,e=0,s){let i=t[e];if(i){let{styles:o,config:a}=i;this._animateRun(o,a).then((()=>{e+=1,this._nvueNextAnimate(t,e,s)}))}else this.currentStepAnimates={},"function"==typeof s&&s(),this.isEnd=!0}step(t={}){return this.animation.step(t),this}run(t){this.$.animationData=this.animation.export(),this.$.timer=setTimeout((()=>{"function"==typeof t&&t()}),this.$.durationTime)}}const X=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"];function Y(t,e){if(e)return clearTimeout(e.timer),new z(t,e)}X.concat(["opacity","backgroundColor"],["width","height","left","right","top","bottom"]).forEach((t=>{z.prototype[t]=function(...e){return this.animation[t](...e),this}}));const H=(t,e)=>{const s=t.__vccOpts||t;for(const[i,o]of e)s[i]=o;return s};const L=H({name:"uniTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default:()=>"fade"},duration:{type:Number,default:300},styles:{type:Object,default:()=>({})},customClass:{type:String,default:""},onceRender:{type:Boolean,default:!1}},data:()=>({isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}),watch:{show:{handler(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject(){let t={...this.styles,"transition-duration":this.duration/1e3+"s"},e="";for(let s in t){e+=this.toLine(s)+":"+t[s]+";"}return e},transformStyles(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init(t={}){t.duration&&(this.durationTime=t.duration),this.animation=Y(Object.assign(this.config,t),this)},onClick(){this.$emit("click",{detail:this.isShow})},step(t,e={}){if(this.animation){for(let e in t)try{"object"==typeof t[e]?this.animation[e](...t[e]):this.animation[e](t[e])}catch(s){console.error(`方法 ${e} 不存在`)}return this.animation.step(e),this}},run(t){this.animation&&this.animation.run(t)},open(){clearTimeout(this.timer),this.transform="",this.isShow=!0;let{opacity:t,transform:e}=this.styleInit(!1);void 0!==t&&(this.opacity=t),this.transform=e,this.$nextTick((()=>{this.timer=setTimeout((()=>{this.animation=Y(this.config,this),this.tranfromInit(!1).step(),this.animation.run(),this.$emit("change",{detail:this.isShow})}),20)}))},close(t){this.animation&&this.tranfromInit(!0).step().run((()=>{this.isShow=!1,this.animationData=null,this.animation=null;let{opacity:t,transform:e}=this.styleInit(!1);this.opacity=t||1,this.transform=e,this.$emit("change",{detail:this.isShow})}))},styleInit(t){let e={transform:""},s=(t,s)=>{"fade"===s?e.opacity=this.animationType(t)[s]:e.transform+=this.animationType(t)[s]+" "};return"string"==typeof this.modeClass?s(t,this.modeClass):this.modeClass.forEach((e=>{s(t,e)})),e},tranfromInit(t){let e=(t,e)=>{let s=null;"fade"===e?s=t?0:1:(s=t?"-100%":"0","zoom-in"===e&&(s=t?.8:1),"zoom-out"===e&&(s=t?1.2:1),"slide-right"===e&&(s=t?"100%":"0"),"slide-bottom"===e&&(s=t?"100%":"0")),this.animation[this.animationMode()[e]](s)};return"string"==typeof this.modeClass?e(t,this.modeClass):this.modeClass.forEach((s=>{e(t,s)})),this.animation},animationType:t=>({fade:t?1:0,"slide-top":`translateY(${t?"0":"-100%"})`,"slide-right":`translateX(${t?"0":"100%"})`,"slide-bottom":`translateY(${t?"0":"100%"})`,"slide-left":`translateX(${t?"0":"-100%"})`,"zoom-in":`scaleX(${t?1:.8}) scaleY(${t?1:.8})`,"zoom-out":`scaleX(${t?1:1.2}) scaleY(${t?1:1.2})`}),animationMode:()=>({fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}),toLine:t=>t.replace(/([A-Z])/g,"-$1").toLowerCase()}},[["render",function(t,e,s,d,p,m){const f=u;return i((a(),n(f,{ref:"ani",animation:p.animationData,class:c(s.customClass),style:h(m.transformStyles),onClick:m.onClick},{default:r((()=>[l(t.$slots,"default")])),_:3},8,["animation","class","style","onClick"])),[[o,p.isShow]])}]]);const U=H({name:"uniPopup",components:{keypress:{name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const t={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]};document.addEventListener("keyup",(e=>{if(this.disable)return;const s=Object.keys(t).find((s=>{const i=e.key,o=t[s];return o===i||Array.isArray(o)&&o.includes(i)}));s&&setTimeout((()=>{this.$emit(s,{})}),0)}))},render:()=>{}}},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},isMaskClick:{type:Boolean,default:null},maskClick:{type:Boolean,default:null},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0},maskBackgroundColor:{type:String,default:"rgba(0, 0, 0, 0.4)"},borderRadius:{type:String}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0},isMaskClick:{handler:function(t){this.mkclick=t},immediate:!0},showPopup(t){document.getElementsByTagName("body")[0].style.overflow=t?"hidden":"visible"}},data(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{backgroundColor:"transparent",borderRadius:this.borderRadius||"0",position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:"top"}},computed:{getStyles(){let t={backgroundColor:this.bg};return this.borderRadius,t=Object.assign(t,{borderRadius:this.borderRadius}),t},isDesktop(){return this.popupWidth>=500&&this.popupHeight>=500},bg(){return""===this.backgroundColor||"none"===this.backgroundColor?"transparent":this.backgroundColor}},mounted(){(()=>{const{windowWidth:t,windowHeight:e,windowTop:s,safeArea:i,screenHeight:o,safeAreaInsets:a}=y();this.popupWidth=t,this.popupHeight=e+(s||0),i&&this.safeArea?this.safeAreaInsets=a.bottom:this.safeAreaInsets=0})()},unmounted(){this.setH5Visible()},activated(){this.setH5Visible(!this.showPopup)},deactivated(){this.setH5Visible(!0)},created(){null===this.isMaskClick&&null===this.maskClick?this.mkclick=!0:this.mkclick=null!==this.isMaskClick?this.isMaskClick:this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1,this.maskClass.backgroundColor=this.maskBackgroundColor},methods:{setH5Visible(t=!0){document.getElementsByTagName("body")[0].style.overflow=t?"visible":"hidden"},closeMask(){this.maskShow=!1},disableMask(){this.mkclick=!1},clear(t){t.stopPropagation(),this.clearPropagation=!0},open(t){if(this.showPopup)return;t&&-1!==["top","center","bottom","left","right","message","dialog","share"].indexOf(t)||(t=this.type),this.config[t]?(this[this.config[t]](),this.$emit("change",{show:!0,type:t})):console.error("缺少类型：",t)},close(t){this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout((()=>{this.showPopup=!1}),300)},touchstart(){this.clearPropagation=!1},onTap(){this.clearPropagation?this.clearPropagation=!1:(this.$emit("maskClick"),this.mkclick&&this.close())},top(t){this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0,this.$nextTick((()=>{this.messageChild&&"message"===this.type&&this.messageChild.timerClose()})))},bottom(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets+"px",backgroundColor:this.bg,borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0)},center(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center",borderRadius:this.borderRadius||"0"},t||(this.showPopup=!0,this.showTrans=!0)},left(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0",display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)},right(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,borderRadius:this.borderRadius||"0",display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)}}},[["render",function(t,e,s,i,o,y){const k=d(p("uni-transition"),L),b=u,w=m("keypress");return o.showPopup?(a(),n(b,{key:0,class:c(["uni-popup",[o.popupstyle,y.isDesktop?"fixforpc-z-index":""]])},{default:r((()=>[f(b,{onTouchstart:y.touchstart},{default:r((()=>[o.maskShow?(a(),n(k,{key:"1",name:"mask","mode-class":"fade",styles:o.maskClass,duration:o.duration,show:o.showTrans,onClick:y.onTap},null,8,["styles","duration","show","onClick"])):g("",!0),f(k,{key:"2","mode-class":o.ani,name:"content",styles:o.transClass,duration:o.duration,show:o.showTrans,onClick:y.onTap},{default:r((()=>[f(b,{class:c(["uni-popup__wrapper",[o.popupstyle]]),style:h(y.getStyles),onClick:y.clear},{default:r((()=>[l(t.$slots,"default",{},void 0,!0)])),_:3},8,["style","class","onClick"])])),_:3},8,["mode-class","styles","duration","show","onClick"])])),_:3},8,["onTouchstart"]),o.maskShow?(a(),n(w,{key:0,onEsc:y.onTap},null,8,["onEsc"])):g("",!0)])),_:3},8,["class"])):g("",!0)}],["__scopeId","data-v-6bb7f93f"]]),N="imgCanvas",V=H(k({__name:"photo-dialog",setup(t,{expose:e}){const s=b(),i=I(),o=w(400),l=w(500),c=b(["#FF0000","#438EDB","#FFFFFF"]),m=b(),g=b(c.value[0]);function y(t){console.error(t.detail.errMsg)}function k(){A({canvasId:N,success:t=>{var e=t.tempFilePath.split(","),s=atob(e[1]);let i=new ArrayBuffer(s.length),o=new Uint8Array(i);for(let c=0;c<s.length;c++)o[c]=s.charCodeAt(c);var a=new Blob([i],{type:"application/octet-stream"}),n=URL.createObjectURL(a),r=document.createElement("a");r.href=n,r.download=(new Date).valueOf()+".png";var l=document.createEvent("MouseEvents");l.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),r.dispatchEvent(l),URL.revokeObjectURL(n)},fail:t=>{S({title:"save fail",icon:"none"})}})}function B(){m.value=void 0,s.value.close()}return C([m,g],(()=>{m.value&&g.value&&setTimeout((()=>{!function(){const t=g.value;console.log(`loadImgCanvas(), bgColor = ${t}, canvasSize = (${o}, ${l})`);const e=P(N,i);e.setFillStyle(t),e.fillRect(0,0,o,l),e.drawImage(m.value,0,0,o,l),e.draw()}()}),500)})),e({show:function(t){s.value.open(),m.value=t},dismiss:B}),(t,e)=>{const i=R,m=u,b=d(p("uni-popup"),U);return a(),n(b,{ref_key:"popup",ref:s,type:"dialog",onMaskClick:B},{default:r((()=>[f(m,{class:"photo-dialog"},{default:r((()=>[f(i,{style:h({width:`${v(o)}px`,height:`${v(l)}px`}),"canvas-id":N,id:N,onError:y},null,8,["style"]),f(m,{class:"color-list"},{default:r((()=>[(a(!0),T(x,null,$(c.value,(t=>(a(),n(m,{class:"color-item",style:h({backgroundColor:`${t}`}),onClick:e=>{return s=t,void(g.value=s);var s}},null,8,["style","onClick"])))),256))])),_:1}),f(m,{class:"save-btn",onClick:k},{default:r((()=>[_("保存")])),_:1})])),_:1})])),_:1},512)}}}),[["__scopeId","data-v-7f50d5f0"]]),Z=H(k({__name:"index",setup(t){const s=b(),i=b();function o(){B({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:t=>{t.tempFiles instanceof Array?s.value=t.tempFiles[0]:s.value=t.tempFiles},fail:t=>{console.log(t),S({title:"pick img fail",icon:"error",mask:!0})}})}async function l(){if(!s.value)return S({title:"please pick img first",icon:"none"});try{E({title:"loading"});let a=await function(t){const s=t.path;return new Promise(((t,i)=>{e({url:"https://api.302.ai/302/submit/removebg",fileType:"image",filePath:s,header:O,name:"image",formData:{},success:e=>{const s=e.statusCode;s>=200&&s<400?t(JSON.parse(e.data)):i(`upload fail, statusCode = ${s}`)},fail:t=>i(t)})}))}(s.value);console.log("removeBg res: ",a),"starting"==a.status&&(console.log("removeBg timeout, startFetchTimer"),a=await function(t){const e=5e3,s=20;let i=0;return new Promise(((o,a)=>{const n=setInterval((async()=>{try{const e=await function(t){return j(`https://api.302.ai/302/task/${t}/fetch`,{},O)}(t);console.log(`fetch success, fetchCount = ${i}, res = `,e),c(e)||i>=s?(clearInterval(n),o(e)):i++}catch(e){console.log(`fetch error, fetchCount = ${i}, error = `,e),clearInterval(n),a(e)}}),e)}))}(a.id),console.log("fetch res: ",a)),D(),c(a)?(t=a.output,console.log(`showResImg, resImg = ${t}`),null==(o=i.value)||o.show(t)):S({title:"removeBg fail",icon:"error"})}catch(a){console.log(a),D(),S({title:"error happen..",icon:"error"})}var t,o}function c(t){return null!=t&&"succeeded"==t.status}return(t,e)=>{const c=u,h=F;return a(),n(c,{class:"index-container"},{default:r((()=>[f(c,{class:"img-box",onClick:o},{default:r((()=>[s.value?g("",!0):(a(),n(c,{key:0,class:"add"},{default:r((()=>[_("+")])),_:1})),s.value?(a(),n(h,{key:1,class:"img",src:s.value.path,mode:"aspectFit"},null,8,["src"])):g("",!0)])),_:1}),f(c,{class:"gen-btn",onClick:l},{default:r((()=>[_("生成证件照")])),_:1}),f(V,{ref_key:"photoDialog",ref:i},null,512)])),_:1})}}}),[["__scopeId","data-v-3fd4de56"]]);export{Z as default};
