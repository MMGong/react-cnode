(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{247:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return w});t(60);var a,c=t(25),r=t.n(c),s=t(6),o=t.n(s),i=t(5),l=t.n(i),u=t(18),p=t.n(u),g=t(17),m=t.n(g),k=t(16),v=t.n(k),d=t(0),f=t.n(d),h=t(59),w=(t(234),Object(h.b)("loginStore")(a=Object(h.c)(a=function(e){function n(){var e,t;o()(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(t=p()(this,(e=m()(n)).call.apply(e,[this].concat(c)))).state={accessToken:""},t.tokenHandler=function(e){t.setState({accessToken:e.target.value})},t.login=r()(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.props.loginStore.checkAccessToken(t.state.accessToken);case 2:n=e.sent,console.log(n);case 4:case"end":return e.stop()}},e,this)})),t}return v()(n,e),l()(n,[{key:"render",value:function(){var e=this.state.accessToken;return f.a.createElement("section",{className:"login flex flex-v"},f.a.createElement("div",{className:"login__wrapper"},f.a.createElement("div",{className:"login__content"},f.a.createElement("div",{className:"login__title"},"\u767b\u5f55"),f.a.createElement("input",{className:"login__input",type:"text",value:e,placeholder:"\u8bf7\u8f93\u5165access token",onChange:this.tokenHandler}),f.a.createElement("div",{className:"login__btn",onClick:this.login},"\u767b \u5f55"))))}}]),n}(d.Component))||a)||a)}}]);