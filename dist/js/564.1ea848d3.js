"use strict";(self["webpackChunkmetawall"]=self["webpackChunkmetawall"]||[]).push([[564],{2564:function(e,t,s){s.r(t),s.d(t,{default:function(){return S}});var r=s(3396);const o={class:"posts-wall"},n={class:"container"};function a(e,t,s,a,i,c){const l=(0,r.up)("Header"),d=(0,r.up)("router-view"),m=(0,r.up)("AsideNav");return(0,r.wg)(),(0,r.iD)("div",o,[(0,r.Wm)(l),(0,r._)("main",n,[(0,r._)("article",null,[(0,r.Wm)(d)]),(0,r._)("aside",null,[(0,r.Wm)(m)])])])}const i=e=>((0,r.dD)("data-v-7eee827c"),e=e(),(0,r.Cn)(),e),c={class:"container"},l=(0,r.Uk)("MetaWall"),d={ref:"memberWrapper",class:"member-wrapper"},m={class:"user-photo border circle"},b=["src"],u=i((()=>(0,r._)("span",{class:"member-text"},"Member",-1))),p={key:0,ref:"memberDropdown",class:"border bg-white dropdown-wrapper"},h={class:"border bg-white dropdown"},f=i((()=>(0,r._)("li",{class:"btn"},"我的貼文牆",-1))),v=i((()=>(0,r._)("li",{class:"btn"},"修改個人資料",-1)));function w(e,t,s,o,n,a){const i=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("header",null,[(0,r._)("div",c,[(0,r.Wm)(i,{to:"/",class:"btn logo"},{default:(0,r.w5)((()=>[l])),_:1}),(0,r._)("div",d,[(0,r._)("button",{type:"button",class:"member-btn btn",onClick:t[1]||(t[1]=e=>a.toggle())},[(0,r._)("div",m,[(0,r._)("img",{onLoad:t[0]||(t[0]=(...t)=>e.successLoadImg&&e.successLoadImg(...t)),src:a.src,alt:"",class:"hide"},null,40,b)]),u]),n.select?((0,r.wg)(),(0,r.iD)("div",p,[(0,r._)("ul",h,[f,v,(0,r._)("li",{class:"btn",onClick:t[2]||(t[2]=e=>a.signOut()),onKeyup:t[3]||(t[3]=e=>a.signOut())},"登出",32)])],512)):(0,r.kq)("",!0)],512)])])}var g={name:"HeaderCom",data(){return{select:!1}},mounted(){document.addEventListener("click",this.memberDropdownClick),window.addEventListener("resize",this.memberDropdownOffset)},updated(){this.$refs.memberDropdown&&this.memberDropdownOffset()},beforeUnmount(){document.removeEventListener("click",this.memberDropdownClick),window.removeEventListener("resize",this.memberDropdownOffset)},computed:{src(){const{photo:e}=this.$store.state.user;return e}},methods:{toggle(){this.select=!this.select},memberDropdownClick(e){if(this.$refs.memberDropdown){const t=this.$refs.memberWrapper.contains(e.target);t||(this.select=!1)}},memberDropdownOffset(){if(this.$refs.memberDropdown){const e=getComputedStyle(document.documentElement).fontSize.replace(/[^0-9]+(.[0-9]{2})?$/gi,""),t=document.body.clientWidth,s=this.$refs.memberDropdown.getBoundingClientRect().width,r=this.$refs.memberWrapper.getBoundingClientRect().x;if(t-e<r+s){const o=t-s-r-e+5;this.$refs.memberDropdown.style.transform=`translate(${o}px,100%)`}}},signOut(){localStorage.removeItem("authorization"),this.$router.push({name:"sign_in"})}}},_=s(89);const k=(0,_.Z)(g,[["render",w],["__scopeId","data-v-7eee827c"]]);var D=k,$=s(7139);const C={class:"aside-nav border bg-white"},L=(0,r.Uk)("張貼動態"),W={class:"btn"},I={class:"btn-icon user-photo border circle"},x=["src"],O={class:"btn-text"},y=(0,r.uE)('<li class="btn" data-v-b5bb7f64><div class="btn-icon border circle" data-v-b5bb7f64><span class="material-icons" data-v-b5bb7f64> notifications_none </span></div><span class="btn-text" data-v-b5bb7f64>追蹤名單</span></li><li class="btn" data-v-b5bb7f64><div class="btn-icon border circle" data-v-b5bb7f64><span class="material-icons" data-v-b5bb7f64> thumb_up_off_alt </span></div><span class="btn-text" data-v-b5bb7f64>我按讚的文章</span></li>',2);function E(e,t,s,o,n,a){const i=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",C,[(0,r.Wm)(i,{to:"/post",class:"btn post radius"},{default:(0,r.w5)((()=>[L])),_:1}),(0,r._)("ul",null,[(0,r._)("li",W,[(0,r._)("div",I,[(0,r._)("img",{onLoad:t[0]||(t[0]=(...t)=>e.successLoadImg&&e.successLoadImg(...t)),src:a.user.photo,alt:"",class:"hide"},null,40,x)]),(0,r._)("span",O,(0,$.zw)(a.user.name),1)]),y])])}var z={name:"AsideNavCom",computed:{user(){const{user:e}=this.$store.state;return e}}};const A=(0,_.Z)(z,[["render",E],["__scopeId","data-v-b5bb7f64"]]);var H=A,Z={name:"HomeView",components:{Header:D,AsideNav:H},created(){this.$store.commit("Load",!0);const e="https://agile-anchorage-83053.herokuapp.com/user/profile",{headers:t}=this.$store.state;this.$http.get(e,t).then((e=>{const{user:t}=e.data;delete t.followers,delete t.following,delete t.sex,""===t.photo&&(t.photo="https://i.imgur.com/IZLtAAb.jpg"),this.$store.commit("user",t)})).then((()=>{this.$store.commit("Load",!1)}))}};const N=(0,_.Z)(Z,[["render",a],["__scopeId","data-v-4810cc84"]]);var S=N}}]);
//# sourceMappingURL=564.1ea848d3.js.map