var _max_multiple = 1.05;//放大倍数
var _min_multiple = 1.05;//缩小倍数
var _magnifying_multiple = 2;//放大镜的放大倍数
var _offset_tag = 0.5;//偏移因子
var _min_width=50;//图片放缩到最小宽度
var _min_height=50;//图片放缩到最小高度
var _magnifying_size = 300;//放大镜边框的宽高
var _magnifying_opacity = "0.95";//放大镜的透明度
var _heightDyWidth = "false";
var _versions="openImge3.0";//版本号
var _open_file_list = new Array();//全局容器
function _imgsOpenFile(obj) {
	_createAmask(obj);
}
/**
 * 创建个遮罩
 */
function _createAmask(obj) {
	var _body = $(document.body);
	_body.prop("class","amsk");
	var _amsk = $("<div></div>");
	_amsk.prop("class","amsk");
	var height = $(document).height()*0.977; 
	_amsk.css("height",height);
	_createImgs(_amsk,height,obj);
	_body.append(_amsk);
	
}
/**
 * 创建图片
 * @param _amsk
 */
function _createImgs(_amsk,height,obj) {
	var _imgs = $("<div></div>");
	_imgs.prop("align","center");
	_imgs.prop("class","imgs");
	_imgs.css("height",(height-30)+"px");
	//---------------get----set----met-------------------------
	
	_amsk.append(_imgs);
    _createOnlyimgs(_amsk,_imgs,obj);	
}
/**
 * 创建图片
 */
function _createOnlyimgs(_amsk,_imgs,_obj) {
	var _imge = $("<img></img>");
	_imge.prop("src",_obj.src);
	_imgs.append(_imge);
	$(_imge).mousedown(function(event){
		  event.preventDefault();
	});
	_createButtons(_imge,_imgs,_amsk);
	$(_imgs).blur(function(){
		_deleteListener();//加载监听事件
	});
}
/**
 * 创建按钮组
 */
function _createButtons(_imge,_imgs,_amsk) {
	var _rotate_num_90 = 0;//初始化90度旋转次数
	var _rotate_num_180 = 0;//初始化180度旋转次数
	
	/**
	 * 如果imge是空，
	 * 则判断是否已复制或者已移动如果移动了，
	 * 就拷贝移动后的图片
	 */
	var _setImge = function() {
		if(_imge==null&&_imge_copy!=null) {
			_imge = new Image();//拷贝原图片
			var _imge_height_copy = $(_imge_copy).height();
			var _imge_width_copy  = $(_imge_copy).width();
		    $(_imge).prop("src",$(_imge_copy).attr("src"));//加载原图
		    $(_imge).css("height",_imge_height_copy);
		    $(_imge).css("width",_imge_width_copy);
			$(_imge).css("margin","auto");
			$(_imgs).append(_imge);
			$(_imge_copy).remove();
			_imge_copy=null;
			if(_div_magnifying!=null) {
				$(_div_magnifying).remove();
			}
		}
	}
	/**
	 * 放大
	 * @returns
	 */
	var _makeMax = function() {
		_setImge();
		var _width = Number($(_imge).width()*_max_multiple);
		var _height = Number($(_imge).height()*_max_multiple);
		if("MSIE"==findBrowserType()||"Edge"==findBrowserType()||"Firefox"==findBrowserType()) {
			if((haveVesion()=="IE10")||(haveVesion()=="IE9")||(haveVesion()=="IE11")) {
				$(_imge).width(_width);
				$(_imge).height(_height);
			} else {
				var offset = ((_width*_width-_height*_height)/(_width*_width+_height*_height))*_offset_tag;//偏移量
				if(_heightDyWidth=="false") {		
					//奇葩的ie8
					if(_width<_height) {
						_height=_height-offset;
						$(_imge).width(_height+"px");$(_imge).height(_width+"px");
					} else {
						_width=_width-offset;
						$(_imge).width(_width+"px");$(_imge).height(_height+"px");
					}
				} else {
					//奇葩的ie8
					if(_width<_height) {
						_width=_width-offset;
						$(_imge).width(_width+"px");$(_imge).height(_height+"px");
					} else {
						_height=_height-offset;
						$(_imge).width(_height+"px");$(_imge).height(_width+"px");
					}
				}
				var _width_amsk = Number($(_amsk).width());
				var _height_amsk = Number($(_amsk).height());
				//--------------------------------------------
				var _top = Number(_height_amsk-_height)/2;
				var _left = Number(_width_amsk-_width)/2;
				var _bottom = Number(_height_amsk-_height)/2;
				var _right = Number(_width_amsk-_width)/2;
				//--------------------------------------------
				$(_imge).css("margin-top",_top+"px");
				$(_imge).css("margin-right",_right+"px");
				$(_imge).css("margin-bottom",_bottom+"px");
				$(_imge).css("margin-left",_left+"px");
			}
		} else {
			$(_imge).width(_width);
			$(_imge).height(_height);
		}
		$(_imge).click();
	}
	/**
	 * 缩小
	 */
	var _makeMin = function() {	
		_setImge();
		var _min = function (_width,_height) {
			if("MSIE"==findBrowserType()||"Edge"==findBrowserType()||"Firefox"==findBrowserType()) {
				if((haveVesion()=="IE10")||(haveVesion()=="IE9")||(haveVesion()=="IE11")) {
					$(_imge).width(_width);
					$(_imge).height(_height);
					$(_imge).click();
				} else {
                    //--------------------------------------------
					var offset = ((_width*_width-_height*_height)/(_width*_width+_height*_height))*_offset_tag;//偏移量
					
					if(_heightDyWidth=="false") {		
						//奇葩的ie8
						if(_width<_height) {
							_height=_height-offset;;
							$(_imge).width(_height+"px");$(_imge).height(_width+"px");
						} else {
							_width=_width-offset;
							$(_imge).width(_width+"px");$(_imge).height(_height+"px");
						}
					} else {
						//奇葩的ie8
						if(_width<_height) {
							_width=_width-offset;
							$(_imge).width(_width+"px");$(_imge).height(_height+"px");
						} else {
							_height=_height-offset;
							$(_imge).width(_height+"px");$(_imge).height(_width+"px");
						}
					}
					var _width_amsk = Number($(_amsk).width());
					var _height_amsk = Number($(_amsk).height());
					//--------------------------------------------
					var _top = Number(_height_amsk-_height)/2;
					var _left = Number(_width_amsk-_width)/2;
					var _bottom = Number(_height_amsk-_height)/2;
					var _right = Number(_width_amsk-_width)/2;
					//--------------------------------------------
					$(_imge).css("margin-top",_top+"px");
					$(_imge).css("margin-right",_right+"px");
					$(_imge).css("margin-bottom",_bottom+"px");
					$(_imge).css("margin-left",_left+"px");
					$(_imge).click();
				}
			} else {
				$(_imge).width(_width);
				$(_imge).height(_height);
				$(_imge).click();
			}
		}	
		$(_imge).css("margin","auto");
		var _width = Number($(_imge).width()/_min_multiple);
		var _height = Number($(_imge).height()/_min_multiple);
		if(_width<=_min_width||_height<=_min_height) {
			_min(_width,_height);
			_deleteListener();//删除鼠标滚轮监听
			alert("对不起！已经缩小到最小大小，\r\n无法在继续缩小！");
		}  else {
			_min(_width,_height);
		}
	}
	/**
	 * 水平翻转
	 */
	var _makeFlipHorizontal = function() {
		_setImge();
		_rotate_num_180++;
		var _make_right_num = _rotate_num_90+_rotate_num_180*2;
		_rotate(_make_right_num,"horizontal");
	}
	/**
	 *左90°旋转
	 */
	var _makeRight = function (_imge) {
		_setImge();
		_rotate_num_90++;
		var _make_right_num = _rotate_num_90+_rotate_num_180*2;
        _rotate(_make_right_num,"right");
	}

	/**
	 * 旋转
	 */
	function _rotate(_make_right_num,type) {
		if(_make_right_num%2==1) {
			_offset_tag = -0.5;
		} else {
			_offset_tag = 0.5;
		}
		if("MSIE"==findBrowserType()||"Edge"==findBrowserType()) {
			if((haveVesion()=="IE10")||(haveVesion()=="IE9")||(haveVesion()=="IE11")) {
				$(_imge).css("transform","rotate("+(_make_right_num%4)*90+"deg)");
			}
			else {
				var _width = Number($(_imge).width());
				var _height = Number($(_imge).height());
				var _width_amsk = Number($(_amsk).width());
				var _height_amsk = Number($(_amsk).height());
				if(type=="right") {
					if(_heightDyWidth=="false") {
						var _top = Number(_height_amsk-_height)/2-(_width-_height)/2;
						var _left = Number(_width_amsk-_width)/2+(_width-_height)/2;
						var _right = Number(_width_amsk-_width)/2+(_width-_height)/2;
						var _bottom = Number(_height_amsk-_height)/2-(_width-_height)/2;
						//alert(_height_amsk+"********"+_top+"**********"+_bottom+"************"+Number(_top+_bottom)+"************"+Number(_height_amsk-Number(_top+_bottom)));
						_filter(_imge,_top,_right,_bottom,_left,_make_right_num,
								_width,_height);
					} else {
						var _top = Number(_height_amsk-_height)/2+(_height-_width)/2;
						var _left = Number(_width_amsk-_width)/2-(_height-_width)/2;
						var _right = Number(_width_amsk-_width)/2-(_height-_width)/2;
						var _bottom = Number(_height_amsk-_height)/2+(_height-_width)/2;
						//alert(_height_amsk+"********"+_top+"**********"+_bottom+"************"+Number(_top+_bottom)+"************"+Number(_height_amsk-Number(_top+_bottom)));
						_filter(_imge,_top,_right,_bottom,_left,_make_right_num,
								_width,_height);	
					}

				} else {
					var _top = Number(_height_amsk-_height)/2;
					var _left = Number(_width_amsk-_width)/2;
					var _bottom = Number(_height_amsk-_height)/2;
					var _right = Number(_width_amsk-_width)/2;
					_filter(_imge,_top,_right,_bottom,_left,_make_right_num,
							_width,_height);
				}
			}
		} else {
			$(_imge).css("-moz-transform","rotate("+_make_right_num*90+"deg)");
			$(_imge).css("-webkit-transform","rotate("+_make_right_num*90+"deg)");
			$(_imge).css("filter","DXImageTransform.Microsoft.BasicImage(rotation="+_make_right_num%4+")");
		}
	}
	var _div_magnifying = null;
	var _max_y=0,_max_x=0;
	/**
	 * 局部放大
	 */
	var _magnifying = function() {
		 _setImge();
		 //+++++++++++++++++++++++++++++++++++++++++++++++++图片放大过程开始++++++++++++++++++++++++++++++++++++++
	     var _imge_lage = new Image();
	     $(_imge_lage).prop("src",$(_imge).attr("src"));//加载原图
	     $(_imge_lage).css("height",$(_imge).css("height"));
	     $(_imge_lage).css("width",$(_imge).css("width"));
		 var _width = Number($(_imge_lage).width()*_magnifying_multiple);
		 var _height = Number($(_imge_lage).height()*_magnifying_multiple); 
		 if("MSIE"==findBrowserType()||"Edge"==findBrowserType()||"Firefox"==findBrowserType()) {
			if((haveVesion()=="IE10")||(haveVesion()=="IE9")||(haveVesion()=="IE11")) {
				$(_imge_lage).width(_width);
				$(_imge_lage).height(_height);
			} else {
				var offset = ((_width*_width-_height*_height)/(_width*_width+_height*_height))*_offset_tag;//偏移量
				if(_heightDyWidth=="false") {		
					//奇葩的ie8
					if(_width<_height) {
						_height=_height-offset;
						$(_imge_lage).width(_height+"px");
						$(_imge_lage).height(_width+"px");
					} else {
						_width=_width-offset;
						$(_imge_lage).width(_width+"px");
						$(_imge_lage).height(_height+"px");
					}
				} else {
					//奇葩的ie8
					if(_width<_height) {
						_width=_width-offset;
						$(_imge_lage).width(_width+"px");
						$(_imge_lage).height(_height+"px");
					} else {
						_height=_height-offset;
						$(_imge_lage).width(_height+"px");
						$(_imge_lage).height(_width+"px");
					}
				}
				var _width_amsk = Number($(_amsk).width());
				var _height_amsk = Number($(_amsk).height());
				//--------------------------------------------
				var _top = Number(_height_amsk-_height)/2;
				var _left = Number(_width_amsk-_width)/2;
				var _bottom = Number(_height_amsk-_height)/2;
				var _right = Number(_width_amsk-_width)/2;
				//--------------------------------------------
				$(_imge_lage).css("margin-top",_top+"px");
				$(_imge_lage).css("margin-right",_right+"px");
				$(_imge_lage).css("margin-bottom",_bottom+"px");
				$(_imge_lage).css("margin-left",_left+"px");
			}
		 } else {
			 $(_imge_lage).width(_width);
			 $(_imge_lage).height(_height);
		 }
		 _imgs.append(_imge_lage);
		 var _y = Number($(_imge).offset().top); 
		 var _x = Number($(_imge).offset().left); 
		 $(_imge_lage).remove();
		 
		 var _right_click_ready = false;//是否已经右击鼠标
		//+++++++++++++++++++++++++++++++++++++++++++++++++放大镜程序开始++++++++++++++++++++++++++++++++++++++
		$(_imge).on("mousemove",function(event){
			 event = event || window.event; 
		     var x = event.pageX;   
             var y = event.pageY;    
			//+++++++++++++++++++++++++++++++++++++++++++++++++图片放大过程结束++++++++++++++++++++++++++++++++++++++
             function _magnifying(x,y) {    			 
            	 x=x-_magnifying_size/2;
            	 y=y-_magnifying_size/2;
    			 if(_div_magnifying!=null) {
    				 _div_magnifying.remove();
    				 _div_magnifying=null;
    			 }
    			 _div_magnifying = $("<div></div>");
    			 _div_magnifying.css("height",_magnifying_size+"px");
    			 _div_magnifying.css("width",_magnifying_size+"px");
    			 _div_magnifying.css("overflow","hidden");
    			 _div_magnifying.css("background-color","green");
				 _div_magnifying.css("opacity",_magnifying_opacity);
				 _div_magnifying.css("filter","alpha(opacity="+_magnifying_opacity*100+")"); 
				 _div_magnifying.css("cursor","pointer");
    			 $(_div_magnifying).on("mousemove",function(event){
    				 if(x!=-_magnifying_size/2&&y!=-_magnifying_size/2){
    					 var yy = event.pageY;
    					 var xx = event.pageX;
    					 if(yy!=0&&xx!=0) {
            	             _magnifying(xx,yy);
    					 }
    				 }
    			 });
    			 //在放大镜内右击鼠标
    			 $(_div_magnifying).on("contextmenu",function(event){
    				 if(x!=-_magnifying_size/2&&y!=-_magnifying_size/2){
    					 $(_div_magnifying).remove();
    					 _right_click_ready = true;
    					 return false;
    				 }
    			 });
    			 //_div_magnifying.append(_imge_lage);
    			 if(x!=undefined&&y!=undefined) {
    				 var  _imge_top = $(_imge).offset().top;
    				 var  _imge_height = $(_imge).height();
        			 var  _imge_left = $(_imge).offset().left;
        			 var  _imge_width = $(_imge).width();
        			 //console.log("top:"+_imge_top+"height:"+_imge_height+"left"+_imge_left+"width:"+_imge_width);  
        			 if((y>=_imge_top-_magnifying_size/2
        					 &&y<=_imge_top+_imge_height-_magnifying_size/2)
        					 &&(x>=_imge_left-_magnifying_size/2)
        					 &&(x<=_imge_left+_imge_width-_magnifying_size/2)
        					 ) {
        				 //-----------------
        				 _div_magnifying.append(_imge_lage);
        				 _imgs.append(_div_magnifying);	
       				     _div_magnifying.offset({top: y,left:x});
       				     //设置
        				 $(_imge_lage).offset({top: Number(_magnifying_multiple*_y-y-_magnifying_size/2),
        					 left:Number(_magnifying_multiple*_x-x-_magnifying_size/2)});
        			 }
    			 }	 
             }
             //如果已经右击则无需在显示放大镜
             if(!_right_click_ready) {
                 _magnifying(x,y);
             }
		});
	}
	var _imge_copy = null;
	/**
	 * 拖拽
	 */
	var _drag = function(){
		$(_imge).on("mousedown",function(event){
			event.preventDefault();
			_dragRunner(_imge,null);
		});
		$(_imge).on("mouseup",function(){
			$(_imge).off("mousemove");
		})
		function _dragRunner(obj,_div_magnifying) {
			$(obj).on("mousemove",function(event){
				event = event || window.event; 
			    var x = event.pageX;   
	            var y = event.pageY;  
		   	    _imge_copy = new Image();//拷贝原图片
				var _imge_height = $(obj).height();
				var _imge_width  = $(obj).width();
			    $(_imge_copy).prop("src",$(obj).attr("src"));//加载原图
			    $(_imge_copy).css("height",_imge_height);
			    $(_imge_copy).css("width",_imge_width);
		        if(_div_magnifying!=null) {
		        	$(_div_magnifying).remove();
		        	_div_magnifying = null;
		        }
	   			_div_magnifying = $("<div></div>");
	   			_div_magnifying.css("overflow","hidden");
	   			_div_magnifying.css("background-color","green");
	   			//----------------------------------------------
	   			_div_magnifying.css("opacity",_magnifying_opacity);
	   			_div_magnifying.css("filter","alpha(opacity="+_magnifying_opacity*100+")"); 
	   			_div_magnifying.css("cursor","pointer");
				//----------------------------------------------
				_div_magnifying.css("height",_imge_height+"px");
				_div_magnifying.css("width",_imge_width+"px");
				_div_magnifying.css("cursor","pointer");
				_div_magnifying.append(_imge_copy);
				$(_imge).remove();
				$(_imge_copy).click();
	            _imgs.append(_div_magnifying);
	            $(_imge_copy).on("mouseup",function(){
	            	$(_imge_copy).off("mousemove");
	            	$(_div_magnifying).css("opacity",1);
	            	$(_div_magnifying).css("filter","alpha(opacity="+1*100+")"); 
				    $(_imge_copy).on("mousedown",function(event){
				    	event.preventDefault();
				        _dragRunner(_imge_copy,_div_magnifying);
			        });
					$(_imge_copy).on("contextmenu",function(event){
						$(_imge_copy).off("mousemove");
						$(_div_magnifying).css("opacity",1);
						$(_div_magnifying).css("filter","alpha(opacity="+1*100+")"); 
			   			return false;
				    });
				});
	            $(_div_magnifying).offset({top:y-_imge_height/2,left:x-_imge_width/2});  
	            _dragRunner(_imge_copy,_div_magnifying);
			});
		} 
	}
	
	
	var _z__drag_copy_index = 1000;
	/**
	 * 拖拽复制
	 */
	var  _drag_copy = function () {
		var _copy_flag = false;
		$(_imge).on("mousedown",function(event){
			event.preventDefault();
            if(!_copy_flag) {
    			_dragRunner(_imge,null);
    			_copy_flag = true;
            }
		});
		$(_imge).on("mouseup",function(){
			$(_imge).off("mousemove");
		})
		function _dragRunner(obj,_div_magnifying_copy) {
			$(obj).on("mousemove",function(event){
				event = event || window.event; 
			    var x = event.pageX;   
	            var y = event.pageY;  
		   	    var _imge_drag_copy = new Image();//拷贝原图片
				var _imge_height = $(obj).height();
				var _imge_width  = $(obj).width();
			    $(_imge_drag_copy).prop("src",$(obj).attr("src"));//加载原图
			    $(_imge_drag_copy).css("height",_imge_height);
			    $(_imge_drag_copy).css("width",_imge_width);
		        if(_div_magnifying_copy!=null) {
		        	$(_div_magnifying_copy).remove();
		        	_div_magnifying_copy = null;
		        }
		        _div_magnifying_copy = $("<div></div>");
		        _div_magnifying_copy.css("overflow","hidden");
		        _div_magnifying_copy.css("background-color","green");
	   			//----------------------------------------------
		        _div_magnifying_copy.css("opacity",_magnifying_opacity);
		        _div_magnifying_copy.css("filter","alpha(opacity="+_magnifying_opacity*100+")"); 
		        _div_magnifying_copy.css("cursor","pointer");
				//----------------------------------------------
		        _div_magnifying_copy.css("height",_imge_height+"px");
		        _div_magnifying_copy.css("width",_imge_width+"px");
		        _div_magnifying_copy.css("cursor","pointer");
		        _div_magnifying_copy.css("z-index",_z__drag_copy_index);//为了复制出来的在原图片前面
		        _div_magnifying_copy.append(_imge_drag_copy);
	            _imgs.append(_div_magnifying_copy);
				$(_imge).remove();//必须删除后再添加上，
				//原因是为了完全抛弃浏览器默认的拖动原图片的效果
				$(_imgs).append(_imge);
            	$(_imge).on("mousedown",function(event){// 当鼠标按下则触发移动
            		event.preventDefault();
				})
				var _copy_flag=false;
				$(_imge).on("mousedown",function(){
		            if(!_copy_flag) {
		            	_z__drag_copy_index++;
		    			_dragRunner(_imge,null);
		    			_copy_flag = true;
		            }
				});
				$(_imge_drag_copy).on("mouseup",function(){
					_z__drag_copy_index++;
	            	$(_div_magnifying_copy).css("opacity",1);
	            	$(_div_magnifying_copy).css("filter","alpha(opacity="+1*100+")"); 
	            	$(_imge_drag_copy).off("mousemove");//当鼠标抬起来的时候关闭复制图片的mousemove事件
	            	$(_div_magnifying_copy).off("mousemove");//当鼠标抬起来的时候关闭复制图片外包div的mousemove事件
	            	var _obj = new Object();
	            	_obj.div = _div_magnifying_copy;
	            	_obj.top = y-_imge_height/2;
	            	_obj.left = x-_imge_width/2;
	            	_open_file_list.push(_obj);
	            	$(_imge_drag_copy).on("mousedown",function(event){// 当鼠标按下则触发移动
	            		event.preventDefault();
	            		_dragRunner(_imge_drag_copy,_div_magnifying_copy);
					})
				});
				$(_imge_drag_copy).on("contextmenu",function(){
					_z__drag_copy_index++;
	            	$(_div_magnifying_copy).remove();
	            	_div_magnifying_copy=null;
	            	$(_imge_drag_copy).remove();
	            	_imge_drag_copy=null;
					for(var i=0;i<_open_file_list.length;i++) {
	            		$(_open_file_list[i]["div"]).offset({top:_open_file_list[i]["top"],left:_open_file_list[i]["left"]}); ;
			        }
	            	return false;
				})
				//图片会发送跳跃重构每个图片的位置，这样图片不会发跳动
				for(var i=0;i<_open_file_list.length;i++) {
            		$(_open_file_list[i]["div"]).offset({top:_open_file_list[i]["top"],left:_open_file_list[i]["left"]}); ;
		        }
	            $(_div_magnifying_copy).offset({top:y-_imge_height/2,left:x-_imge_width/2});  
	            _dragRunner(_imge_drag_copy,_div_magnifying_copy);
			});
		} 
	}
	
	$(_imge).click();
	$(_imge).on("click",function(){
		_addListener(_imge,_makeMax,_makeMin);//加载监听事件
	});
	
	var _buttonDiv = $("<div></div>");
	_buttonDiv.prop("class","amsk_buttons");
	_buttonDiv.prop("align","center");
	_createOnlyButton(_buttonDiv,_magnifying,_buttonImg("img/_magnifying.png"),"放大镜");//添加放大按钮
	_createOnlyButton(_buttonDiv,_drag,_buttonImg("img/_drag.png"),"拖拽");//添加缩小按钮
	_createOnlyButton(_buttonDiv,_drag_copy,_buttonImg("img/_drag.png"),"复制");//添加缩小按钮
	_createOnlyButton(_buttonDiv,_makeMax,_buttonImg("img/_makeMax.png"),"放大");//添加放大按钮
	_createOnlyButton(_buttonDiv,_makeMin,_buttonImg("img/_makeMin.png"),"缩小");//添加缩小按钮
	_createOnlyButton(_buttonDiv,_makeFlipHorizontal,_buttonImg("img/_makeFlipHorizontal.png"),"旋转180°");//添加旋转180度按钮
	_createOnlyButton(_buttonDiv,_makeRight,_buttonImg("img/_makeRight.png"),"旋转90°");//添加旋转90度按钮
	_amsk.append(_buttonDiv);
	
	//设置高度大于宽度的标志
	setTimeout(function(){
		var _width = Number($(_imge).width());
		var _height = Number($(_imge).height());
		if(_height>_width) {
			_heightDyWidth = "true";
		} else {
			_heightDyWidth = "false";
		}
	},200);
}

/**
 * 设置过滤器
 */
function _filter(_imge,_top,_right,_bottom,_left,_make_right_num,width,height) {
	$(_imge).css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation="+_make_right_num%4+")");
	$(_imge).css("-webkit-transform-origin","center bottom");
	$(_imge).css("transform-origin","center bottom");
	_margin(_imge,_top,_right,_bottom,_left,width,height);
}
/**
 * 设置margin设置外边框
 */
function _margin(_imge,_top,_right,_bottom,_left,width,height) {
	$(_imge).css("margin-top",_top+"px");
	$(_imge).css("margin-right",_right+"px");
	$(_imge).css("margin-bottom",_bottom+"px");
	$(_imge).css("margin-left",_left+"px");
	 //--------------------------------------------
	var offset = ((width*width-height*height)/(width*width+height*height))*_offset_tag;//偏移量
	if(_heightDyWidth=="false") {
		if(width<height) {
			height=height-offset;
			$(_imge).width(height+"px");$(_imge).height(width+"px");
		} else {
			width=width-offset;
			$(_imge).width(width+"px");$(_imge).height(height+"px");
		}
	} else {
		if(width<height) {
			width=width-offset;
			$(_imge).width(width+"px");
			$(_imge).height(height+"px");
		} else {
			height=height-offset;
			$(_imge).width(height+"px");
			$(_imge).height(width+"px");
		}
	}
	$(_imge).click();
}
/**
 * 按钮图片
 * @param imgPath
 * @returns
 */
var _buttonImg=function(imgPath) {
	var _buttion_img = $("<img src=\""+_versions+"/"+imgPath+"\"/>");
	_buttion_img.prop("class","button_img");
	return _buttion_img;
}
/**
 * 创建一个按钮
 * @param _buttonDiv
 * @param fun
 * @param button_name
 */
function _createOnlyButton(_buttonDiv,fun,buttonImg,buttonName) {
	var _button = $("<a href=\"javascript:void(0);\" ></a>");
	_button.prop("class","button");
	_button.append(buttonImg);
	var _span = $("<span></span>");
	_span.append(buttonName);
	_button.append(_span);
	_button.click(function(){
		fun();
	});
	_buttonDiv.append(_button);
}
/**
 * 加载滚轮监听事件
 */
function _addListener(img,_makeMax,_makeMin) {
	var scrollFunc = function(e){
	    e = e || window.event;
	    //IE/Opera/Chrome
	    if(e.wheelDelta){
	        if(parseInt(e.wheelDelta)>0){
	        	_makeMin(img);
	        }else{
	        	_makeMax(img);
	        }
	    }else if(e.detail){//Firefox
	        if(parseInt(e.detail)>0){
	        	_makeMax(img);
	        }else{
	        	_makeMin(img);
	        }
	    }
	}
	//Firefox
	if("MSIE"!=findBrowserType()&&"Chrome"!=findBrowserType()) {
		if(document.addEventListener){
		    document.addEventListener('DOMMouseScroll',scrollFunc,false);
		}
		//IE及其他浏览器
		window.onmousewheel = document.onmousewheel=scrollFunc;
	} else {
		//IE及其他浏览器
		window.onmousewheel = document.onmousewheel=scrollFunc;
	}
}
/**
 * 删除监听事件
 */
function _deleteListener() {
	//Firefox
	if("MSIE"!=findBrowserType()||"Chrome"!=findBrowserType()) {
		if(document.addEventListener){
		    document.addEventListener('DOMMouseScroll',null,false);
		}
		//IE及其他浏览器
		window.onmousewheel = document.onmousewheel=null;
	} else {
		//IE及其他浏览器
		window.onmousewheel = document.onmousewheel=null;
	}
}
/**
 * 获取浏览器类型
 * @returns {String}
 */
function findBrowserType() { 
   if(navigator.userAgent.indexOf("MSIE")>0) { 
        return "MSIE"; 
   } 
   else if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){ 
        return "Firefox"; 
   } 
   else if(isMozilla=navigator.userAgent.indexOf("Opera")>0){ //这个也被判断为chrome
        return "Opera"; 
   } 
   else if(isFirefox=navigator.userAgent.indexOf("Chrome")>0){ 
        return "Chrome"; 
   } 
   else if(isSafari=navigator.userAgent.indexOf("Safari")>0) { 
        return "Safari"; 
   }  
   else if(isCamino=navigator.userAgent.indexOf("Camino")>0){ 
        return "Camino"; 
   } 
   else if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){ 
        return "Gecko"; 
   }
   else if(navigator.userAgent.indexOf("rv:11.0")>-1){ 
       return "Edge"; 
  }
} 
/**
 * 判断ie版本
 */
function haveVesion(){
	var trim_Version=null;
	var b_version=navigator.appVersion;
	var isIE10 = /MSIE\s+10.0/i.test(navigator.userAgent)&&(function() {"use strict";return this === undefined;}());
	if(isIE10){
		trim_Version = "IE10";
	} else if(navigator.appName == "Microsoft Internet Explorer" && b_version.match(/9./i)=="9."){ 
		trim_Version = "IE9";
	} else if(navigator.appName == "Microsoft Internet Explorer" && b_version.match(/8./i)=="8."){ 
		trim_Version = "IE8";
	} else if(navigator.appName == "Netscape" && b_version.indexOf("rv:11.0")>-1){ 
		trim_Version = "IE11";
	}
	return trim_Version;
}