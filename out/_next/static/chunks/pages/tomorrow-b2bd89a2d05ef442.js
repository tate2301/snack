(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[753],{8134:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tomorrow",function(){return s(3210)}])},4970:function(e,t,s){"use strict";s.d(t,{Z:function(){return V}});var l=s(5893),n=s(1389),i=s(7294),a=s(5820),r=s(4876),c=s(8680),d=s(364),o=s(445),u=s(512),x=s(8100),h=s(4345),m=s(9373),f=s(1808),p=s(4092),g=s(2175),j=s(1415),y=s(6419);let b=e=>(0,l.jsx)(y.fC,{children:e.children});b.Content=e=>(0,l.jsx)(y.h_,{children:(0,l.jsxs)(y.VY,{className:"rounded-xl p-4 w-[260px] bg-white shadow-xl border border-surface-2 -translate-x-4",sideOffset:4,children:[!e.noClose&&(0,l.jsx)(b.Close,{}),e.children,(0,l.jsx)(y.Eh,{className:"fill-white"})]})}),b.Trigger=e=>(0,l.jsx)(y.xz,{asChild:!0,children:e.children}),b.Close=()=>(0,l.jsx)("div",{className:"flex w-full mb-4 justify-end",children:(0,l.jsx)(y.x8,{className:"rounded-full inline-flex items-center justify-center top-1 right-1 outline-none cursor-default","aria-label":"Close",children:(0,l.jsx)(j.Z,{className:"w-6 h-6"})})});var Z=s(1446),v=s(1038),N=s(4201),w=s(1886),M=s(6843),C=s(9160),k=s(2530),D=s(8366),z=s(9983),E=s(9005),_=s(4135),S=s(7090),T=s(8699),F=s(3703),P=s(584),I=s(1052),A=e=>{let[t,s]=(0,i.useState)(e);(0,h.TL)(),(0,h.CG)(I.Gk);let[l,n]=(0,i.useState)((0,N.Z)(t,"MMMM yyyy")),a=(0,T.Z)(l,"MMMM yyyy",new Date),r=(0,i.useMemo)(()=>(0,E.Z)({start:(0,P.Z)((0,F.Z)(a)),end:(0,S.Z)((0,_.Z)(a))}),[a]),c=(0,i.useMemo)(()=>(0,E.Z)({start:(0,P.Z)(t),end:(0,S.Z)(t)}),[t]),d=e=>{s(e)};return{selectDate:d,selectedDate:t,week:c,month:r,nextDate:()=>{d((0,z.Z)(t,{days:1}))},prevDate:()=>{d((0,z.Z)(t,{days:-1}))},nextWeek:()=>{d((0,z.Z)(t,{weeks:1}))},prevWeek:()=>{d((0,z.Z)(t,{weeks:-1}))},nextMonth:()=>{let e=(0,z.Z)(a,{months:1});n((0,N.Z)(e,"MMMM yyyy"))},prevMonth:()=>{let e=(0,z.Z)(a,{months:-1});n((0,N.Z)(e,"MMMM yyyy"))},firstDayOfCurrentMonth:a}};let G=["","col-start-2","col-start-3","col-start-4","col-start-5","col-start-6"];function O(e){var t;let s=null!==(t=e.value)&&void 0!==t?t:(0,D.Z)();console.log({today:s});let{prevMonth:n,nextMonth:i,month:a,firstDayOfCurrentMonth:r,selectedDate:c}=A(s),d=t=>{e.onChange(t)};return(0,l.jsxs)("div",{className:"flex-none hidden w-full md:block",children:[(0,l.jsxs)("div",{className:"flex items-baseline justify-between px-2 text-center text-zinc-900",children:[(0,l.jsx)("p",{className:"font-semibold uppercase text-zinc-900",children:(0,N.Z)(r,"MMMM yyyy")}),(0,l.jsxs)("div",{className:"flex gap-4",children:[(0,l.jsxs)("button",{type:"button",onClick:n,className:"-m-1.5 flex flex-none items-center justify-center p-1.5 text-zinc-400 hover:bg-white hover:shadow rounded-lg bg-surface-1 border border-surface-4",children:[(0,l.jsx)("span",{className:"sr-only",children:"Previous month"}),(0,l.jsx)(Z.Z,{className:"w-5 h-5","aria-hidden":"true"})]}),(0,l.jsxs)("button",{type:"button",onClick:i,className:"-m-1.5 flex flex-none items-center justify-center p-1.5 text-zinc-400 hover:bg-white hover:shadow rounded-lg bg-surface-1 border border-surface-4",children:[(0,l.jsx)("span",{className:"sr-only",children:"Next month"}),(0,l.jsx)(v.Z,{className:"w-5 h-5","aria-hidden":"true"})]})]})]}),(0,l.jsxs)("div",{className:"grid grid-cols-7 mt-6 text-xs leading-6 text-center uppercase text-zinc-500",children:[(0,l.jsx)("div",{children:"S"}),(0,l.jsx)("div",{children:"M"}),(0,l.jsx)("div",{children:"T"}),(0,l.jsx)("div",{children:"W"}),(0,l.jsx)("div",{children:"T"}),(0,l.jsx)("div",{children:"F"}),(0,l.jsx)("div",{children:"S"})]}),(0,l.jsx)("div",{className:"grid grid-cols-7 gap-px mt-2 text-sm uppercase rounded-lg isolate",children:a.map((e,t)=>(0,l.jsx)("button",{type:"button",onClick:()=>d(e),className:(0,u.Z)("py-1.5 hover:bg-zinc-100 focus:z-10 rounded-xl flex items-center justify-center flex-col gap-1 transition-all",((0,M.Z)(e,c)||(0,k.Z)(e))&&"font-semibold",!(0,M.Z)(e,c)&&(0,C.Z)(e,r)&&!(0,k.Z)(e)&&"text-zinc-800",!(0,M.Z)(e,c)&&!(0,C.Z)(e,s)&&!(0,k.Z)(e)&&"text-zinc-400",(0,k.Z)(e)&&!(0,M.Z)(e,c)&&"text-purple-600",0===t&&"rounded-tl-lg",6===t&&"rounded-tr-lg",t===a.length-7&&"rounded-bl-lg",t===a.length-1&&"rounded-br-lg",0===t&&G[(0,w.Z)(e)],(0,M.Z)(e,c)&&"!text-white bg-zinc-950 hover:bg-zinc-800",(0,C.Z)(e,r)?"text-zinc-900":""),children:(0,l.jsx)("time",{dateTime:e.getDate().toString(),className:(0,u.Z)("mx-auto flex h-7 w-7 items-center justify-center rounded-full"),children:(0,N.Z)(e,"d")})},e.toString()))})]})}let R=e=>{let[,t]=(0,i.useState)(0),s=(0,i.useRef)(null),n=(0,i.useRef)(null),a=(0,h.TL)(),r=(0,g.TA)({initialValues:{title:"",deadline:void 0},onSubmit:e=>{c(e)}}),c=t=>{if(!t.title)return;let s={id:(0,f.D)(),title:t.title,description:"",complete:!1,priority:m.X.High,status:m.S.InProgress,createdAt:new Date,lastUpdated:new Date,tags:[],subtasks:[],deadline:t.deadline};a((0,p.gI)(s)),r.resetForm(),e.setIsFocused(!1)},o=(0,i.useCallback)(t=>{"Enter"!==t.key||t.shiftKey||(t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0,t.stopImmediatePropagation(),r.submitForm().then(e.toggle))},[n.current,r,c]);return(0,l.jsxs)("form",{className:"w-full",ref:s,onSubmit:r.handleSubmit,children:[(0,l.jsxs)("div",{className:"flex-1 flex items-start w-full mb-1",children:[(0,l.jsx)("input",{type:"checkbox",disabled:!0,className:"!bg-surface-6 flex-shrink-0"}),(0,l.jsx)(x.Z,{placeholder:"Create a new task",className:"outline-none ring-0 flex-1 text-surface-12 w-full font-medium",name:"title",autoFocus:!0,listeners:{keydown:o},onChange:r.handleChange,value:r.values.title})]}),(0,l.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,l.jsx)(W,{selectDate:e=>r.setFieldValue("deadline",e),selectedDate:r.values.deadline}),!1,(0,l.jsxs)("button",{type:"submit",className:"p-2 px-4 rounded-xl bg-primary-10 text-white",children:[(0,l.jsx)("p",{className:"p-1 rounded-full bg-white",children:(0,l.jsx)(d.Z,{className:"w-4 h-4 text-primary-11 stroke-2"})}),"Add task"]})]})]})};var V=()=>{let[e,t,s]=(0,n.Z)(!1);return(0,l.jsx)("div",{className:"group",children:(0,l.jsxs)(a.M,{children:[!e&&(0,l.jsxs)(r.E.button,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},type:"button",onClick:t,className:(0,u.Z)("relative flex items-center font-normal bg-surface-6 rounded-xl w-full p-4 hover:bg-surface-7"),children:[(0,l.jsx)(c.Z,{className:"h-5 w-5","aria-hidden":"true"}),(0,l.jsx)("span",{className:"text-surface-11",children:"Create a new task"})]}),e&&(0,l.jsx)(r.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex flex-col gap-2 items-start bg-white p-4 rounded-xl shadow",children:(0,l.jsx)(R,{toggle:t,setIsFocused:s})})]})})};function W(e){var t;return(0,l.jsxs)(b,{children:[(0,l.jsx)(b.Trigger,{children:(0,l.jsxs)("button",{type:"button",className:(0,u.Z)("p-2 rounded-xl items-center",e.selectedDate?"bg-primary-4 text-primary-11":"bg-surface-2 hover:bg-danger-3 hover:text-danger-11 text-surface-10"),children:[(0,l.jsx)(o.Z,{className:"h-6 w-6"}),e.selectedDate?(0,N.Z)(e.selectedDate,"EEE dd yyyy"):"Deadline"]})}),(0,l.jsx)(b.Content,{noClose:!0,children:(0,l.jsx)(O,{value:null!==(t=e.selectedDate)&&void 0!==t?t:(0,D.Z)(),onChange:e.selectDate})})]})}},3210:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return h}});var l=s(5893),n=s(537),i=s(4876),a=s(5820),r=s(5964),c=s(4970),d=s(4345),o=s(9373),u=s(4092),x=s(1163);function h(){let e=(0,x.useRouter)(),{active:t}=e.query,s=(0,d.CG)(e=>(0,u.xz)(e,o.S.Complete)),h=e=>1e3*e;return(0,l.jsx)(n.Z,{children:(0,l.jsx)("main",{className:"h-full flex gap-4 items-start",children:(0,l.jsxs)("div",{className:"flex-1",children:[(0,l.jsx)("div",{className:"flex gap-4 items-center mb-8",children:(0,l.jsx)("h1",{className:"text-3xl font-semibold text-surface-12",children:"Tomorrow"})}),(0,l.jsx)(c.Z,{}),(0,l.jsx)(i.E.div,{className:"flex flex-col gap-2 mt-4",children:(0,l.jsx)(a.M,{initial:!1,children:s.map(e=>(0,l.jsx)(i.E.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto",transition:{type:"spring",bounce:.3,opactiy:{delay:h(.02)}}},exit:{opacity:0,height:0},transition:{type:"spring",bounce:0,duration:h(.15),opactiy:{duration:h(.03)}},children:(0,l.jsx)(r.Z,{...e},e.id)}))})})]})})})}}},function(e){e.O(0,[128,541,80,903,774,888,179],function(){return e(e.s=8134)}),_N_E=e.O()}]);