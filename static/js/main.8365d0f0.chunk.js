(this.webpackJsonpsuperchat=this.webpackJsonpsuperchat||[]).push([[0],{101:function(t,a,r){"use strict";r.r(a);var e=r(1),o=r.n(e),s=r(57),i=r.n(s),n=(r(76),r(44)),c=r.n(n),g=r(58),l=r(20),x=(r(78),r(24)),A=(r(103),r(79),r(102),r(60)),W=r(61),p=r(109),V=r(108),d={fonts:{body:"system-ui, sans-serif",heading:'"Avenir Next", sans-serif',monospace:"Menlo, monospace"},colors:{text:"#000",text2:"#fff",text3:"red",text4:"blue",background:"gold",inputBackground:"#fff",primary:"#33e",sent:"teal",received:"#000",messageText:"#fff"},images:{avatar:{width:48,height:48,borderRadius:99999},background:{width:"100%",height:"100%",backgroundRepeat:"repeat"}}},h=r(67),m=r(62),b=r(69),Y=r(64),C=r.n(Y),j=r(68),u={backgroundImage:"linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)",cursor:"pointer",margin:"10px",padding:"15px 45px",textAlign:"center",textTransform:"uppercase",transition:"0.5s",backgroundSize:"200% auto",color:"white",boxShadow:"0 0 20px #eee",borderRadius:"10px","&:hover, &:focus":{backgroundPosition:"right center",color:"#fff",textDecoration:"none"}},F=r(4);x.a.initializeApp({apiKey:"AIzaSyDwZnASFQ0a8BJeCiILgeKY0q-HoZgEKp8",authDomain:"eazzychat.firebaseapp.com",projectId:"eazzychat",storageBucket:"eazzychat.appspot.com",messagingSenderId:"142556453725",appId:"1:142556453725:web:8ea88bffb217e620e226b4"});var q=x.a.auth(),B=x.a.firestore();x.a.analytics();function w(){return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(V.b,{className:"sign-in",onClick:function(){var t=new x.a.auth.GoogleAuthProvider;q.signInWithPopup(t)},sx:u,children:"Sign in with Google"}),Object(F.jsx)(h.a,{children:Object(F.jsx)(V.g,{sx:{color:"text2",fontWeight:"600",textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",marginTop:20,marginBottom:20},children:"Welcome to my personal chat. Happy chat"})}),Object(F.jsx)(V.d,{sx:{textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",color:"text2",marginTop:80,marginBottom:20,fontSize:"40px"},children:Object(F.jsx)(m.a,{children:"This is my personal chat made with React.js and several of it's libraries. Feel free to sign in and type in whatever You want. This app is evolving so next time around it will most likely look and work different. Also the code and file structure will be improved. Right now this chat is free for anyone to test, however maximum number of comments is currently set to 50...have fun!"})})]})}function K(){return q.currentUser&&Object(F.jsx)(V.b,{className:"sign-out",onClick:function(){return q.signOut()},sx:u,children:"Sign Out"})}function L(){var t=Object(e.useRef)(),a=B.collection("messages"),r=a.orderBy("createdAt").limit(200),o=Object(W.a)(r,{idField:"id"}),s=Object(l.a)(o,1)[0],i=Object(e.useState)(""),n=Object(l.a)(i,2),A=n[0],p=n[1],d=function(){var r=Object(g.a)(c.a.mark((function r(e){var o,s,i;return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.preventDefault(),o=q.currentUser,s=o.uid,i=o.photoURL,!(A.length>2||A.length>=500)){r.next=6;break}return r.next=5,a.add({text:A,createdAt:x.a.firestore.FieldValue.serverTimestamp(),uid:s,photoURL:i});case 5:p("");case 6:t.current.scrollIntoView({behavior:"smooth"});case 8:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}();return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsxs)(V.c,{id:"main",sx:{alignItems:"center",justifyContent:"center",flexDirection:"column",paddingTop:"2",opacity:"0.85"},children:[s&&s.map((function(t){return Object(F.jsx)(G,{message:t},t.id)})),Object(F.jsx)("span",{ref:t})]}),Object(F.jsx)("form",{className:"form",onSubmit:d,children:Object(F.jsxs)(V.c,{sx:{justifyContent:"center",alignItems:"center",width:"100%",height:100,marginTop:"3",position:"fixed",left:0,bottom:0},children:[Object(F.jsx)(V.f,{defaultValue:A,onChange:function(t){return p(t.target.value)},placeholder:"your message...",sx:{backgroundColor:"inputBackground",margin:"20px",marginTop:"30px",borderRadius:"10px",marginLeft:77,"@media (max-width: 500px)":{width:"70vw",marginLeft:50,marginRight:50,height:50,marginBottom:26}}}),Object(F.jsx)(V.c,{sx:{},children:Object(F.jsx)(V.b,{type:"submit",disabled:!A,sx:{backgroundImage:"linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)",cursor:"pointer",margin:"10px",padding:"15px 45px",textAlign:"center",textTransform:"uppercase",transition:"0.5s",backgroundSize:"200% auto",color:"white",boxShadow:"0 0 20px #eee",borderRadius:"10px","&:hover, &:focus":{backgroundPosition:"right center",color:"#fff",textDecoration:"none"},paddingRight:60,marginRight:67,"@media (max-width: 500px)":{position:"absolute",marginRight:4,right:-25,bottom:12,padding:15,height:50}},children:"\ud83d\udd4a\ufe0f"})})]})}),Object(F.jsx)(C.a,{text:"^",distance:0,breakpoint:0,style:{backgroundImage:"linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)",cursor:"pointer",margin:"10px",border:"none",textAlign:"center",textTransform:"uppercase",transition:"0.5s",backgroundSize:"200% auto",color:"white",boxShadow:"0 0 20px #eee",borderRadius:"10px","&:hover, &:focus":{backgroundPosition:"right center",color:"#fff",textDecoration:"none"},position:"fixed",bottom:12,left:0,zIndex:"15",height:50},className:"scroll-your-role",speed:1e3,target:75,icon:Object(F.jsx)(j.a,{})})]})}function G(t){var a=t.message,r=a.text,e=a.uid,o=a.photoURL,s=e===q.currentUser.uid?"sent":"received";return Object(F.jsx)(F.Fragment,{children:Object(F.jsxs)(V.c,{sx:{borderRadius:"10px",backgroundColor:"".concat(s),color:"messageText",width:"80vw",wordBreak:"break-word",position:"relative",margin:"30px",padding:"2",marginBottom:"70px"},children:[Object(F.jsx)(V.e,{src:o||"https://api.adorable.io/avatars/23/abott@adorable.png",sx:{borderRadius:"50%",width:"40px",height:"40px",position:"absolute",left:"-25px",top:"-20px"}}),Object(F.jsx)(V.g,{children:r})]})})}var Q=function(){var t=Object(A.a)(q),a=Object(l.a)(t,1)[0];return Object(F.jsx)(p.a,{theme:d,children:Object(F.jsxs)(V.a,{sx:{minHeight:"100vh",background:"url(".concat("data:image/png;base64,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",")")},className:"App",children:[Object(F.jsx)(b.a,{mask:"url(#mask)",fill:"#1277b0",children:Object(F.jsxs)("defs",{children:[Object(F.jsxs)("linearGradient",{id:"gradient",gradientTransform:"rotate(90)",children:[Object(F.jsx)("stop",{offset:"0",stopColor:"white"}),Object(F.jsx)("stop",{offset:"0.5",stopColor:"black"})]}),Object(F.jsx)("mask",{id:"mask",children:Object(F.jsx)("rect",{x:"0",y:"0",width:"2000",height:"200",fill:"url(#gradient)"})})]})}),Object(F.jsxs)("header",{children:[Object(F.jsxs)(V.c,{sx:{textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",color:"text2",marginTop:20,marginBottom:20,fontSize:"50px",flexDirection:"row",alignItems:"center",justifyContent:"center"},children:[Object(F.jsx)(V.g,{children:"The"}),Object(F.jsx)(V.g,{sx:{color:"text3"},children:"Eazzy"}),Object(F.jsx)(V.g,{sx:{color:"text4"},children:"Chat"})]}),Object(F.jsx)(K,{})]}),Object(F.jsx)("section",{children:a?Object(F.jsx)(L,{}):Object(F.jsx)(w,{})})]})})},f=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,110)).then((function(a){var r=a.getCLS,e=a.getFID,o=a.getFCP,s=a.getLCP,i=a.getTTFB;r(t),e(t),o(t),s(t),i(t)}))};i.a.render(Object(F.jsx)(o.a.StrictMode,{children:Object(F.jsx)(Q,{})}),document.getElementById("root")),f()},76:function(t,a,r){},78:function(t,a,r){},83:function(t,a){},85:function(t,a){}},[[101,1,2]]]);
//# sourceMappingURL=main.8365d0f0.chunk.js.map