(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{251:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return E});a(68);var n,r=a(31),c=a.n(r),i=a(5),s=a.n(i),l=a(4),o=a.n(l),u=a(18),d=a.n(u),f=a(17),m=a.n(f),_=a(16),p=a.n(_),v=a(0),h=a.n(v),b=a(67),w=(a(1),a(46)),x=a(13),k=a(32),E=(a(236),Object(b.b)(function(e){return{accessToken:e.loginStore.accessToken}})(n=Object(b.c)(n=function(e){function t(){var e,a;s()(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=d()(this,(e=m()(t)).call.apply(e,[this].concat(r)))).state={tabList:[{id:"ask",desc:"\u95ee\u7b54"},{id:"share",desc:"\u5206\u4eab"},{id:"job",desc:"\u62db\u8058"},{id:"dev",desc:"\u5ba2\u6237\u7aef\u6d4b\u8bd5"}],tab:"",title:"",content:""},a.tabHandler=function(e){a.setState({tab:e.target.value})},a.titleHandler=function(e){a.setState({title:e.target.value})},a.contentHandler=function(e){a.setState({content:e.target.value})},a.confirm=c()(regeneratorRuntime.mark(function e(){var t,n,r,c,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.state,n=t.tab,r=t.title,c=t.content,n){e.next=4;break}return w.a.warn("\u8bf7\u9009\u62e9\u6a21\u5757"),e.abrupt("return");case 4:if(r){e.next=7;break}return w.a.warn("\u8bf7\u8f93\u5165\u6807\u9898"),e.abrupt("return");case 7:if(c){e.next=10;break}return w.a.warn("\u8bf7\u8f93\u5165\u5185\u5bb9"),e.abrupt("return");case 10:return e.next=12,Object(x.a)("createTopic",{accesstoken:a.props.accessToken,title:r,tab:n,content:c});case 12:(i=e.sent)&&i.success&&k.a.push("/");case 14:case"end":return e.stop()}},e)})),a}return p()(t,e),o()(t,[{key:"componentDidMount",value:function(){this.props.accessToken||k.a.push("/login")}},{key:"render",value:function(){var e=this.state,t=e.tabList,a=e.tab,n=e.title,r=e.content;return h.a.createElement("section",{className:"write clearfix"},h.a.createElement("div",{className:"write__cont flex flex-v-c"},h.a.createElement("div",{className:"write__cont__left"},"\u9009\u62e9\u6a21\u5757\uff1a"),h.a.createElement("div",{className:"write__cont__right flex-1"},h.a.createElement("select",{onChange:this.tabHandler,value:a},h.a.createElement("option",{value:0},"\u8bf7\u9009\u62e9"),t.map(function(e){return h.a.createElement("option",{key:e.id,value:e.id},e.desc)})))),h.a.createElement("div",{className:"write__cont flex flex-v-c"},h.a.createElement("div",{className:"write__cont__left"},"\u6807\u9898\uff1a"),h.a.createElement("div",{className:"write__cont__right flex-1"},h.a.createElement("input",{type:"text",placeholder:"\u8bf7\u8f93\u5165\u6807\u9898",onChange:this.titleHandler,value:n}))),h.a.createElement("div",{className:"write__cont flex flex-v-c"},h.a.createElement("div",{className:"write__cont__left"},"\u5185\u5bb9\uff1a"),h.a.createElement("div",{className:"write__cont__right flex-1"},h.a.createElement("textarea",{type:"text",placeholder:"\u8bf7\u8f93\u5165\u5185\u5bb9",onChange:this.contentHandler,value:r}))),h.a.createElement("button",{className:"write__confirm float-right",onClick:this.confirm},"\u63d0\u4ea4"))}}]),t}(v.Component))||n)||n)}}]);