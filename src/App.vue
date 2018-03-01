<template>
  <div id="app">
    <div class="container">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
html,body,div,span,
applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,blockquote,pre,
a,abbr,acronym,address,big,cite,code,
del,dfn,em,font,img,ins,kbd,q,s,samp,
small,strike,strong,sub,sup,tt,var,
dd,dl,dt,li,ol,ul,
fieldset,form,label,legend,select,
table,caption,tbody,tfoot,thead,tr,th,td,input,button,i,span{
	margin:0;
	padding:0;
	border:0;
	box-sizing: border-box;
}
html,body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size:12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}
input,button,textarea,td,th,select{outline:none;}
table {border-collapse:collapse;border-spacing:0;}
ol,ul{list-style: none;}
a,a:visited,a:active,a:link{text-decoration:none;}
.clearfix:after{
	content:'';
	display:block;
	clear:both;
}
.clearfix{
	zoom:1;
}
#app{
  background-color:#eee;
}
.container{
  margin:0 auto;
  max-width:980px;
  background-color:#fff;
}
</style>
