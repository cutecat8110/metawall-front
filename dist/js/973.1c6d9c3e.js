"use strict";(self["webpackChunkmetawall"]=self["webpackChunkmetawall"]||[]).push([[973],{8973:function(t,s,e){e.r(s),e.d(s,{default:function(){return tt}});var o=e(3396),r=e(7139),a=e(9242);const i=t=>((0,o.dD)("data-v-552a9dd2"),t=t(),(0,o.Cn)(),t),c={class:"posts-wall"},l={class:"subnav"},n={ref:"filterWrapper",class:"filter-wrapper"},d=i((()=>(0,o._)("span",{class:"material-icons"},"expand_more",-1))),h={key:0,ref:"filterDropdown",class:"border bg-white dropdown-wrapper"},p={class:"border bg-white dropdown"},m=(0,o.Uk)(" 最新貼文 "),u={key:0,class:"material-icons"},g=(0,o.Uk)(" 最舊貼文 "),_={key:0,class:"material-icons"},w={class:"border bg-white search"},k={for:"search"},b=i((()=>(0,o._)("span",{class:"material-icons"}," search ",-1)));function f(t,s,e,i,f,$){const v=(0,o.up)("router-link"),y=(0,o.up)("PostsNone"),q=(0,o.up)("Posts");return(0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",l,[(0,o._)("div",n,[(0,o._)("button",{type:"button",class:"btn border bg-white filter",onClick:s[0]||(s[0]=t=>$.toggle())},[(0,o.Uk)((0,r.zw)(f.asc?"最舊貼文":"最新貼文")+" ",1),d]),f.select?((0,o.wg)(),(0,o.iD)("div",h,[(0,o._)("ul",p,[(0,o._)("li",null,[(0,o.Wm)(v,{to:{query:$.query("desc")},class:"btn",onClick:s[1]||(s[1]=t=>$.toggle())},{default:(0,o.w5)((()=>[m,f.asc?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("span",u,"check"))])),_:1},8,["to"])]),(0,o._)("li",null,[(0,o.Wm)(v,{to:{query:$.query("asc")},class:"btn",onClick:s[2]||(s[2]=t=>$.toggle())},{default:(0,o.w5)((()=>[g,f.asc?((0,o.wg)(),(0,o.iD)("span",_,"check")):(0,o.kq)("",!0)])),_:1},8,["to"])])])],512)):(0,o.kq)("",!0)],512),(0,o._)("div",w,[(0,o._)("label",k,[(0,o.wy)((0,o._)("input",{id:"search","onUpdate:modelValue":s[3]||(s[3]=t=>f.search=t),type:"text",placeholder:"搜尋貼文",onKeyup:s[4]||(s[4]=(0,a.D2)(((...t)=>$.searchEnter&&$.searchEnter(...t)),["enter"]))},null,544),[[a.nr,f.search]])]),(0,o.Wm)(v,{to:{query:$.query()},class:"btn"},{default:(0,o.w5)((()=>[b])),_:1},8,["to"])])]),0==f.posts.length?((0,o.wg)(),(0,o.j4)(y,{key:0})):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(f.posts,(t=>((0,o.wg)(),(0,o.j4)(q,{key:t._id,tempPost:t},null,8,["tempPost"])))),128))])}const $=t=>((0,o.dD)("data-v-daed54e4"),t=t(),(0,o.Cn)(),t),v={class:"post border bg-white radius"},y={class:"header"},q={class:"user-photo border circle"},L=["src"],D={class:"info"},P={key:0,class:"image-wrapper border radius"},C=["src"],z=$((()=>(0,o._)("span",{class:"material-icons"}," thumb_up_off_alt ",-1))),I={class:"comment-wrapper"},U={class:"user-photo circle border"},S=["src"],W={class:"comment border"},A={for:"comment"},Y={class:"header"},j={class:"user-photo border circle"},E=["src"],Z={class:"info"};function B(t,s,e,i,c,l){const n=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",v,[(0,o._)("div",y,[(0,o._)("div",q,[(0,o._)("img",{onLoad:s[0]||(s[0]=(...s)=>t.successLoadImg&&t.successLoadImg(...s)),src:l.photo,alt:"",class:"hide"},null,40,L)]),(0,o._)("div",D,[(0,o.Wm)(n,{to:"/",class:"btn"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(c.post.user.name),1)])),_:1}),(0,o._)("span",null,(0,r.zw)(t.$filters.date(c.post.createdAt)),1)])]),(0,o._)("p",null,(0,r.zw)(c.post.content),1),c.post.image?((0,o.wg)(),(0,o.iD)("div",P,[(0,o._)("div",{class:"clamp",style:(0,r.j5)(c.paddingBottom)},[(0,o._)("img",{ref:"postsPhoto",onLoad:s[1]||(s[1]=s=>(t.successLoadImg,l.size())),src:c.post.image,alt:"",class:"hide"},null,40,C)],4)])):(0,o.kq)("",!0),(0,o._)("button",{type:"button",class:(0,r.C_)(["likes btn",{selected:l.isSelected}]),onClick:s[2]||(s[2]=t=>l.toggle(l.isSelected))},[z,(0,o.Uk)(" "+(0,r.zw)(0==c.post.likes.length?"成為第一個按讚的朋友":c.post.likes.length),1)],2),(0,o._)("div",I,[(0,o._)("div",U,[(0,o._)("img",{onLoad:s[3]||(s[3]=(...s)=>t.successLoadImg&&t.successLoadImg(...s)),src:l.user.photo,alt:"",class:"hide"},null,40,S)]),(0,o._)("div",W,[(0,o._)("label",A,[(0,o.wy)((0,o._)("input",{id:"comment",type:"text",placeholder:"留言...","onUpdate:modelValue":s[4]||(s[4]=t=>c.comment=t),onKeyup:s[5]||(s[5]=(0,a.D2)(((...t)=>c.comment&&c.comment(...t)),["enter"]))},null,544),[[a.nr,c.comment]])]),(0,o._)("button",{type:"button",class:"btn",onClick:s[6]||(s[6]=(...t)=>l.send&&l.send(...t))},"留言")])]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(c.post.comments,((e,a)=>((0,o.wg)(),(0,o.iD)("div",{key:a,class:"comments"},[(0,o._)("div",Y,[(0,o._)("div",j,[(0,o._)("img",{onLoad:s[7]||(s[7]=(...s)=>t.successLoadImg&&t.successLoadImg(...s)),src:""!==e.user.photo?e.user.photo:c.commentPhoto,alt:"",class:"hide"},null,40,E)]),(0,o._)("div",Z,[(0,o.Wm)(n,{to:"/",class:"btn"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,r.zw)(e.user.name),1)])),_:2},1024),(0,o._)("span",null,(0,r.zw)(t.$filters.date(e.createdAt)),1)])]),(0,o._)("p",null,(0,r.zw)(e.comment),1)])))),128))])}e(6699);var K={name:"PostsCom",props:["tempPost"],data(){return{post:{},comment:"",paddingBottom:{},commentPhoto:"https://i.imgur.com/IZLtAAb.jpg"}},watch:{tempPost:{handler(){this.post=this.tempPost},deep:!0,immediate:!0}},computed:{user(){return this.$store.state.user},photo(){const{photo:t}=this.post.user;return""===t?"https://i.imgur.com/IZLtAAb.jpg":t},isSelected(){const{likes:t}=this.post;return t.includes(this.user._id)}},methods:{isToday(t){return this.moment(t).format("YYYY/MM/DD hh:mm")},toggle(t){this.$store.commit("Load",!0);const s=`https://agile-anchorage-83053.herokuapp.com/post/${this.post._id}/likes`,{headers:e}=this.$store.state,o=t?this.$http.delete(s,e):this.$http.post(s,null,e);o.then((()=>{this.upload()})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))},send(){if(""!==this.comment){this.$store.commit("Load",!0);const t=`https://agile-anchorage-83053.herokuapp.com/post/${this.post._id}/comment`,{headers:s}=this.$store.state,e={comment:this.comment};this.$http.post(t,e,s).then((()=>{this.comment="",this.upload()})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))}},upload(){this.$store.commit("Load",!0);const t=`https://agile-anchorage-83053.herokuapp.com/post/${this.post._id}`,{headers:s}=this.$store.state;this.$http.get(t,s).then((t=>{this.post=t.data.post})).catch((t=>{console.error(t)})).then((()=>{this.$store.commit("Load",!1)}))},size(){if(this.$refs.postsPhoto){const{height:t}=this.$refs.postsPhoto,{width:s}=this.$refs.postsPhoto,e=t/s*100;this.paddingBottom={paddingBottom:e>150?"150%":`${e}%`}}}}},x=e(89);const N=(0,x.Z)(K,[["render",B],["__scopeId","data-v-daed54e4"]]);var V=N;const H=t=>((0,o.dD)("data-v-5d805009"),t=t(),(0,o.Cn)(),t),M={class:"border bg-white posts-none radius"},T=H((()=>(0,o._)("ul",{class:"ball-group"},[(0,o._)("li",{class:"ball circle"}),(0,o._)("li",{class:"ball circle"}),(0,o._)("li",{class:"ball circle"})],-1))),F={class:"content"};function G(t,s,e,a,i,c){return(0,o.wg)(),(0,o.iD)("div",M,[T,(0,o._)("div",F,(0,r.zw)(c.message),1)])}var J={name:"PostsNoneCom",computed:{message(){return this.$route.query.q?`找不到符合「${this.$route.query.q}」的貼文`:"目前尚無動態，新增一則貼文吧！"}}};const O=(0,x.Z)(J,[["render",G],["__scopeId","data-v-5d805009"]]);var Q=O,R={name:"PostsWallView",components:{Posts:V,PostsNone:Q},data(){return{select:!1,posts:{},search:"",asc:!1}},mounted(){this.getPosts(),document.addEventListener("click",this.filterDropdownClick)},beforeUnmount(){document.removeEventListener("click",this.filterDropdownClick)},watch:{$route(){"posts_wall"===this.$route.name&&this.getPosts()}},methods:{getPosts(){this.$store.commit("Load",!0);const t=`https://agile-anchorage-83053.herokuapp.com/posts${this.$route.fullPath}`,s={headers:{authorization:localStorage.getItem("authorization")}};this.$http.get(t,s).then((t=>{this.asc="asc"===this.$route.query.timeSort,this.search=this.$route.query.q?this.$route.query.q:"",this.posts=t.data.posts,this.$store.commit("Load",!1)}))},query(t){const s={};return"asc"===t&&(s.timeSort="asc"),""!==this.search&&(s.q=this.search),t||""!==this.search||(s.timeSort=this.$route.query.timeSort),s},toggle(){this.select=!this.select},filterDropdownClick(t){if(this.$refs.filterDropdown){const s=this.$refs.filterWrapper.contains(t.target);s||(this.select=!1)}},searchEnter(){this.$router.push({query:this.query()})}}};const X=(0,x.Z)(R,[["render",f],["__scopeId","data-v-552a9dd2"]]);var tt=X}}]);
//# sourceMappingURL=973.1c6d9c3e.js.map