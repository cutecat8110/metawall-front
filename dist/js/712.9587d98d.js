"use strict";(self["webpackChunkmetawall"]=self["webpackChunkmetawall"]||[]).push([[712],{1192:function(t,e,s){s.d(e,{Z:function(){return p}});var o=s(3396),a=s(7139);const r=t=>((0,o.dD)("data-v-2e84f518"),t=t(),(0,o.Cn)(),t),i={class:"title"},l={class:"border bg-white"},c=r((()=>(0,o._)("div",{class:"mat border bg-white"},null,-1)));function n(t,e,s,r,n,d){return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("h1",l,(0,a.zw)(s.title),1),c])}var d={name:"TitleCMPT",props:["title"]},u=s(89);const h=(0,u.Z)(d,[["render",n],["__scopeId","data-v-2e84f518"]]);var p=h},9712:function(t,e,s){s.r(e),s.d(e,{default:function(){return w}});var o=s(3396),a=s(7139);const r={class:"follow-list"},i=["src"],l={class:"created"},c={class:"day"};function n(t,e,s,n,d,u){const h=(0,o.up)("Title"),p=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",r,[(0,o.Wm)(h,{title:"追蹤名單"}),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.list,(s=>((0,o.wg)(),(0,o.iD)("div",{key:s.user._id,class:"card border bg-white shadow radius"},[(0,o.Wm)(p,{to:{path:`/profile/${s.user._id}`},class:"user-photo border circle btn"},{default:(0,o.w5)((()=>[(0,o._)("img",{onLoad:e[0]||(e[0]=(...e)=>t.successLoadImg&&t.successLoadImg(...e)),src:s.user.photo||d.photo,alt:"",class:"hide"},null,40,i)])),_:2},1032,["to"]),(0,o.Wm)(p,{to:{path:`/profile/${s.user._id}`},class:"fw-bold btn"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,a.zw)(s.user.name),1)])),_:2},1032,["to"]),(0,o._)("span",l," 追蹤時間："+(0,a.zw)(t.$filters.date(s.createdAt)),1),(0,o._)("span",c,"您已追蹤 "+(0,a.zw)(t.$filters.now(s.createdAt))+"! ",1)])))),128))])}var d=s(1192),u={name:"FollowListView",components:{Title:d.Z},data(){return{list:[],photo:"https://i.imgur.com/IZLtAAb.jpg"}},created(){this.getList()},methods:{getList(){this.$store.commit("Load",!0);const t="https://agile-anchorage-83053.herokuapp.com/user/profile",{headers:e}=this.$store.state;this.$http.get(t,e).then((t=>{const{user:e}=t.data;this.list=e.following})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))}}},h=s(89);const p=(0,h.Z)(u,[["render",n],["__scopeId","data-v-21712652"]]);var w=p}}]);
//# sourceMappingURL=712.9587d98d.js.map