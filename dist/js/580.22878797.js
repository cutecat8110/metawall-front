"use strict";(self["webpackChunkmetawall"]=self["webpackChunkmetawall"]||[]).push([[580],{1580:function(e,s,a){a.r(s),a.d(s,{default:function(){return L}});var l=a(3396);const r=e=>((0,l.dD)("data-v-11b170e9"),e=e(),(0,l.Cn)(),e),t={class:"sign-in-view"},o={class:"middle"},i={class:"container border"},n=["src"],d={class:"auth-content"},u=r((()=>(0,l._)("h2",{class:"cursor-none"},"MetaWall",-1))),m=r((()=>(0,l._)("h3",null,"到元宇宙展開全新社交圈",-1))),c={class:"input-group"},p={for:"email",class:"input-wrapper"},h=r((()=>(0,l._)("div",{class:"tooltip"},[(0,l._)("div",{class:"title"},"SAMPLE"),(0,l._)("div",null,"帳 - test1@example.com"),(0,l._)("div",null,"密 - Test123456")],-1))),w={for:"password",class:"input-wrapper"},_=r((()=>(0,l._)("div",{class:"tooltip"},[(0,l._)("div",{class:"title"},"SAMPLE"),(0,l._)("div",null,"帳 - test1@example.com"),(0,l._)("div",null,"密 - Test123456")],-1))),b={key:0,class:"error-message"},v=["disabled"],g=(0,l.Uk)("註冊帳號");function k(e,s,a,r,k,f){const V=(0,l.up)("VField"),I=(0,l.up)("error-message"),L=(0,l.up)("VForm"),W=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",t,[(0,l._)("div",o,[(0,l._)("div",i,[(0,l._)("img",{onLoad:s[0]||(s[0]=(...s)=>e.successLoadImg&&e.successLoadImg(...s)),class:"cursor-none hide",src:k.bg,alt:""},null,40,n),(0,l._)("div",d,[u,m,(0,l.Wm)(L,{onSubmit:f.signIn},{default:(0,l.w5)((({errors:e})=>[(0,l._)("div",c,[(0,l._)("label",p,[(0,l.Wm)(V,{id:"email",name:"Email",type:"email",modelValue:k.user.email,"onUpdate:modelValue":s[1]||(s[1]=e=>k.user.email=e),placeholder:"Email",autocomplete:"new-password",rules:{required:!0,email:!0},class:"border"},null,8,["modelValue"]),h,(0,l.Wm)(I,{name:"Email"})]),(0,l._)("label",w,[(0,l.Wm)(V,{id:"password",name:"Password",type:"password",modelValue:k.user.password,"onUpdate:modelValue":s[2]||(s[2]=e=>k.user.password=e),placeholder:"Password",autocomplete:"new-password",rules:"required",class:"border"},null,8,["modelValue"]),_,(0,l.Wm)(I,{name:"Password"})])]),k.err?((0,l.wg)(),(0,l.iD)("div",b,"帳號或密碼錯誤，請重新輸入！")):(0,l.kq)("",!0),(0,l._)("button",{type:"submit",class:"btn border submit",disabled:k.err},"登入",8,v)])),_:1},8,["onSubmit"]),(0,l.Wm)(W,{to:{name:"sign_up"},class:"btn link"},{default:(0,l.w5)((()=>[g])),_:1})])])])])}var f={name:"SignInView",data(){return{user:{email:"",password:""},err:!1,bg:"https://i.imgur.com/PmHlItb.png"}},watch:{user:{handler(){this.err&&(this.err=!1)},deep:!0}},methods:{signIn(){this.$store.commit("Load",!0);const e="https://metawall-backend-c89d.onrender.com/user/sign_in";this.$http.post(e,this.user).then((e=>{const s=`Bearer ${e.data.user.token}`;localStorage.setItem("authorization",s),this.$router.push({name:"posts_wall"})})).catch((()=>{this.err=!0})).then((()=>{this.$store.commit("Load",!1)}))}}},V=a(89);const I=(0,V.Z)(f,[["render",k],["__scopeId","data-v-11b170e9"]]);var L=I}}]);
//# sourceMappingURL=580.22878797.js.map