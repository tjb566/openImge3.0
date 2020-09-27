<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<script type="text/javascript" src="<%=basePath%>openImge3.0/open_imge.js"></script> 
<script type="text/javascript" src="<%=basePath%>openImge3.0/js/jquery.min.js"></script> 
<link href="<%=basePath%>openImge3.0/open_file.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(function() {
	var obj = new Object();
	obj.src = "<%=basePath%>openImge3.0/timg.jpg";
	_imgsOpenFile(obj);
})
</script>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>打开文件</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
  <body>
  </body>
</html>
