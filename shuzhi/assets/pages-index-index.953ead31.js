import{r as e,c as t,o as s,a as o,b as n,d as l,w as r,i as a,e as c,f as u}from"./index-7d6188e5.js";import{_ as i,c as d,a as p}from"./control.bf160a60.js";const f={name:"index",components:{can:d},setup:()=>({str:e("000022241111311121121121121121121111000132112112112112112112112112111300#")}),onNavigationBarButtonTap(){this.$router.go(0)}};setTimeout((function(){let e=t("mycan"),s=document.querySelector(".p1");new p(e,document,s,(function(e,t,s){for(let n=0;n<15;n++){let t=s.querySelector("#c"+String(n+1)),o="";for(let s=0;s<e[n].length;s++)o+=e[n][s],o+=" ";t.innerText=o}for(let n=15;n<30;n++){let t=s.querySelector("#s"+String(n-15+1)+" p"),o="";for(let s=0;s<e[n].length;s++)o+=e[n][s],o+=" ";t.innerText=o,t.style.top=141-o.length/2*17.5+"px"}let o=new Array(30);for(let n=0;n<15;n++){o[n]=[];for(let e=0,s=0;e<15&&s<=15&&(!0!==t[n][e]||15!==s&&!1!==t[n][s]||(o[n].push(s-e),e=s,15!=e))&&!(0==t[n][e]&&(e++,e>=15));s++);}for(let n=0;n<15;n++){o[n+15]=[];for(let e=0,s=0;e<15&&s<=15&&(1!=t[e][n]||15!=s&&0!=t[s][n]||(o[n+15].push(s-e),e=s,15!=e))&&!(0==t[e][n]&&(e++,e>=15));s++);}e.toString()===o.toString()&&(s.querySelector(".success").style.display="block",setTimeout((()=>{s.querySelector(".success").style.display="none"}),1e3))}))}),100);const m=i(f,[["render",function(e,t,i,d,p,f){const m=u("can"),y=a,g=c;return s(),o("div",{class:"box"},[n("div",{class:"p1"},[l(y,{class:"content"},{default:r((()=>[l(m)])),_:1})]),n("div",{class:"ok1"},"填写完成"),n("div",{class:"success"},"成功"),l(g,{class:"inp1",modelValue:d.str,"onUpdate:modelValue":t[0]||(t[0]=e=>d.str=e)},null,8,["modelValue"])])}],["__scopeId","data-v-7ac475cd"]]);export{m as default};
