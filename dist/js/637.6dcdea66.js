"use strict";(self["webpackChunkmetawall"]=self["webpackChunkmetawall"]||[]).push([[637],{3763:function(t,e,s){s.d(e,{Z:function(){return L}});var o=s(3396),r=s(7139),a=s(9242);const c=t=>((0,o.dD)("data-v-41d5bcf0"),t=t(),(0,o.Cn)(),t),i={class:"post border bg-white radius shadow"},n={class:"header"},l=["src"],d={class:"info"},h={class:"content"},u={key:0,class:"image-wrapper border radius"},m=["src"],p=c((()=>(0,o._)("span",{class:"material-icons"}," thumb_up_off_alt ",-1))),_={class:"comment-wrapper"},f=["src"],w={class:"comment border"},g={for:"comment"},b={class:"header"},k=["src"],$={class:"info"};function v(t,e,s,c,v,y){const q=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",n,[(0,o.Wm)(q,{to:{path:`/profile/${v.post.user._id}`},class:"user-photo border circle btn"},{default:(0,o.w5)((()=>[(0,o._)("img",{onLoad:e[0]||(e[0]=(...e)=>t.successLoadImg&&t.successLoadImg(...e)),src:y.photo,alt:"",class:"hide"},null,40,l)])),_:1},8,["to"]),(0,o._)("div",d,[(0,o.Wm)(q,{to:{path:`/profile/${v.post.user._id}`},class:"btn fw-bold"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(v.post.user.name),1)])),_:1},8,["to"]),(0,o._)("span",null,(0,r.zw)(t.$filters.date(v.post.createdAt)),1)])]),(0,o._)("p",h,(0,r.zw)(v.post.content),1),v.post.image?((0,o.wg)(),(0,o.iD)("div",u,[(0,o._)("div",{class:"clamp",style:(0,r.j5)(v.paddingBottom)},[(0,o._)("img",{ref:"postsPhoto",onLoad:e[1]||(e[1]=e=>(t.successLoadImg,y.size())),src:v.post.image,alt:"",class:"hide"},null,40,m)],4)])):(0,o.kq)("",!0),(0,o._)("button",{type:"button",class:(0,r.C_)(["likes btn",{selected:y.isSelected}]),onClick:e[2]||(e[2]=t=>y.toggle(y.isSelected))},[p,(0,o.Uk)(" "+(0,r.zw)(0==v.post.likes.length?"成為第一個按讚的朋友":v.post.likes.length),1)],2),(0,o._)("div",_,[(0,o.Wm)(q,{to:{path:`/profile/${y.user._id}`},class:"user-photo border circle btn"},{default:(0,o.w5)((()=>[(0,o._)("img",{onLoad:e[3]||(e[3]=(...e)=>t.successLoadImg&&t.successLoadImg(...e)),src:y.user.photo,alt:"",class:"hide"},null,40,f)])),_:1},8,["to"]),(0,o._)("div",w,[(0,o._)("label",g,[(0,o.wy)((0,o._)("input",{id:"comment",type:"text",placeholder:"留言...","onUpdate:modelValue":e[4]||(e[4]=t=>v.comment=t),onKeyup:e[5]||(e[5]=(0,a.D2)(((...t)=>v.comment&&v.comment(...t)),["enter"]))},null,544),[[a.nr,v.comment]])]),(0,o._)("button",{type:"button",class:"btn",onClick:e[6]||(e[6]=(...t)=>y.send&&y.send(...t))},"留言")])]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(v.post.comments,((s,a)=>((0,o.wg)(),(0,o.iD)("div",{key:a,class:"comments"},[(0,o._)("div",b,[(0,o.Wm)(q,{to:{path:`/profile/${s.user._id}`},class:"user-photo border circle btn"},{default:(0,o.w5)((()=>[(0,o._)("img",{onLoad:e[7]||(e[7]=(...e)=>t.successLoadImg&&t.successLoadImg(...e)),src:""!==s.user.photo?s.user.photo:v.commentPhoto,alt:"",class:"hide"},null,40,k)])),_:2},1032,["to"]),(0,o._)("div",$,[(0,o.Wm)(q,{to:{path:`/profile/${s.user._id}`},class:"btn fw-bold"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(s.user.name),1)])),_:2},1032,["to"]),(0,o._)("span",null,(0,r.zw)(t.$filters.date(s.createdAt)),1)])]),(0,o._)("p",null,(0,r.zw)(s.comment),1)])))),128))])}s(6699);var y={name:"PostsCMPT",props:["tempPost"],data(){return{post:{},comment:"",paddingBottom:{},commentPhoto:"https://i.imgur.com/IZLtAAb.jpg"}},watch:{tempPost:{handler(){this.post=this.tempPost},deep:!0,immediate:!0}},computed:{user(){return this.$store.state.user},photo(){const{photo:t}=this.post.user;return""===t?"https://i.imgur.com/IZLtAAb.jpg":t},isSelected(){const{likes:t}=this.post;return t.includes(this.user._id)}},methods:{isToday(t){return this.moment(t).format("YYYY/MM/DD hh:mm")},toggle(t){this.$store.commit("Load",!0);const e=`https://metawall-backend-c89d.onrender.com/post/${this.post._id}/likes`,{headers:s}=this.$store.state,o=t?this.$http.delete(e,s):this.$http.post(e,null,s);o.then((()=>{this.upload()})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))},send(){if(""!==this.comment){this.$store.commit("Load",!0);const t=`https://metawall-backend-c89d.onrender.com/post/${this.post._id}/comment`,{headers:e}=this.$store.state,s={comment:this.comment};this.$http.post(t,s,e).then((()=>{this.comment="",this.upload()})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))}},upload(){this.$store.commit("Load",!0);const t=`https://metawall-backend-c89d.onrender.com/post/${this.post._id}`,{headers:e}=this.$store.state;this.$http.get(t,e).then((t=>{this.post=t.data.post})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))},size(){if(this.$refs.postsPhoto){const{height:t}=this.$refs.postsPhoto,{width:e}=this.$refs.postsPhoto,s=t/e*100;this.paddingBottom={paddingBottom:s>150?"150%":`${s}%`}}}}},q=s(89);const D=(0,q.Z)(y,[["render",v],["__scopeId","data-v-41d5bcf0"]]);var L=D},5699:function(t,e,s){s.d(e,{Z:function(){return m}});var o=s(3396),r=s(7139);const a=t=>((0,o.dD)("data-v-15837665"),t=t(),(0,o.Cn)(),t),c={class:"border bg-white shadow radius"},i=a((()=>(0,o._)("ul",{class:"ball-group"},[(0,o._)("li",{class:"ball circle"}),(0,o._)("li",{class:"ball circle"}),(0,o._)("li",{class:"ball circle"})],-1))),n={class:"content"};function l(t,e,s,a,l,d){return(0,o.wg)(),(0,o.iD)("div",c,[i,(0,o._)("div",n,(0,r.zw)(d.message),1)])}var d={name:"PostsNoneCMPT",computed:{message(){return this.$route.query.q?`找不到符合「${this.$route.query.q}」的貼文`:"profile"===this.$route.name?"目前尚無貼文":"like_list"===this.$route.name?"目前尚無動態，按讚一則貼文吧！":"follow_list"===this.$route.name?"目前尚無名單，追蹤一位朋友吧！":"目前尚無動態，新增一則貼文吧！"}}},h=s(89);const u=(0,h.Z)(d,[["render",l],["__scopeId","data-v-15837665"]]);var m=u},9351:function(t,e,s){s.d(e,{Z:function(){return y}});var o=s(3396),r=s(7139),a=s(9242);const c=t=>((0,o.dD)("data-v-88e22f8a"),t=t(),(0,o.Cn)(),t),i={class:"subnav"},n={ref:"filterWrapper",class:"filter-wrapper"},l=c((()=>(0,o._)("span",{class:"material-icons"},"expand_more",-1))),d={key:0,ref:"filterDropdown",class:"border bg-white dropdown-wrapper"},h={class:"border bg-white dropdown"},u=(0,o.Uk)(" 最新貼文 "),m={key:0,class:"material-icons"},p=(0,o.Uk)(" 最舊貼文 "),_={key:0,class:"material-icons"},f={class:"border bg-white search"},w={for:"search"},g=c((()=>(0,o._)("span",{class:"material-icons"}," search ",-1)));function b(t,e,s,c,b,k){const $=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",n,[(0,o._)("button",{type:"button",class:"btn border bg-white filter",onClick:e[0]||(e[0]=t=>k.toggle())},[(0,o.Uk)((0,r.zw)(b.asc?"最舊貼文":"最新貼文")+" ",1),l]),b.select?((0,o.wg)(),(0,o.iD)("div",d,[(0,o._)("ul",h,[(0,o._)("li",null,[(0,o.Wm)($,{to:{query:k.query("desc")},class:"btn",onClick:e[1]||(e[1]=t=>k.toggle())},{default:(0,o.w5)((()=>[u,b.asc?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("span",m,"check"))])),_:1},8,["to"])]),(0,o._)("li",null,[(0,o.Wm)($,{to:{query:k.query("asc")},class:"btn",onClick:e[2]||(e[2]=t=>k.toggle())},{default:(0,o.w5)((()=>[p,b.asc?((0,o.wg)(),(0,o.iD)("span",_,"check")):(0,o.kq)("",!0)])),_:1},8,["to"])])])],512)):(0,o.kq)("",!0)],512),(0,o._)("div",f,[(0,o._)("label",w,[(0,o.wy)((0,o._)("input",{id:"search","onUpdate:modelValue":e[3]||(e[3]=t=>b.search=t),type:"text",placeholder:"搜尋貼文",onKeyup:e[4]||(e[4]=(0,a.D2)(((...t)=>k.searchEnter&&k.searchEnter(...t)),["enter"]))},null,544),[[a.nr,b.search]])]),(0,o.Wm)($,{to:{query:k.query()},class:"btn"},{default:(0,o.w5)((()=>[g])),_:1},8,["to"])])])}var k={name:"SubNavCMPT",data(){return{select:!1,posts:{},search:"",asc:!1}},mounted(){document.addEventListener("click",this.filterDropdownClick)},beforeUnmount(){document.removeEventListener("click",this.filterDropdownClick)},watch:{$route(){this.asc="asc"===this.$route.query.timeSort,this.search=this.$route.query.q?this.$route.query.q:""}},methods:{query(t){const e={};return"asc"===t&&(e.timeSort="asc"),""!==this.search&&(e.q=this.search),t||""!==this.search||(e.timeSort=this.$route.query.timeSort),e},toggle(){this.select=!this.select},filterDropdownClick(t){if(this.$refs.filterDropdown){const e=this.$refs.filterWrapper.contains(t.target);e||(this.select=!1)}},searchEnter(){this.$router.push({query:this.query()})}}},$=s(89);const v=(0,$.Z)(k,[["render",b],["__scopeId","data-v-88e22f8a"]]);var y=v}}]);
//# sourceMappingURL=637.6dcdea66.js.map