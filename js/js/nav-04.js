/**
 * Created by VAIO on 2017/5/7.
 */
$(function(){
	tap_nav();	
	productList(0);
})

//动态生成tap标签栏
function tap_nav(){
	$.get('http://127.0.0.1:3000/api/getbaicaijiatitle',function(data){
		//console.log(data.result);
		var i,width=0,
			v = data.result,
			len = v.length;
		for(i=0;i<len;i++){
			var str = '<li class="item" titleid="'+v[i].titleId+'"><a href="javascript:void(0);">'+v[i].title+'</a></li>'
			$('ul.tab-nav').append(str);
		}
		for(i=0;i<len;i++){
			width+= $('.tab-nav li:eq('+i+')').width();
		}
		$('.tab-nav li:eq(0)').addClass('active');
		//动态设置tab ul的宽度
		$('ul.tab-nav').width(width);

		//实现tap标签栏左滑动
		itcast.iScroll({
			swipeDom:$('.tab').get(0),
			swipeType:'x',
			swipeDistance:30
		})

		//tap标签栏 点击切换
		tab_click();
	})
}

//tap标签栏 点击切换
function tab_click(){
	$('.tab-nav').on('click','li',function(){
		this.classList.add('active');
		$(this).siblings().removeClass('active');

		/*var w = $(this).prev().width();
		console.log(w);
		$('.tab-nav').get(0).style.transform = 'translateX(-'+w+'px)';*/
		$('.pro-list').empty();
		productList($(this).attr('titleid'));
		
		$('h2').html($(this).find('a').html()+'-淘宝内部券');

	});
}

//动态生成商品list
function productList(n){
	$.get('http://127.0.0.1:3000/api/getbaicaijiaproduct?titleid='+n,function(data){
		//m
		var v = data.result,
			len = v.length,i;
		//c
		//v
		for(i=0;i<len;i++){
			var str = '<li>'+
			'<div class="pro-item clearfix">'+
				'<div class="pro-pic fl">'+v[i].productImg+'</div>'+
				'<div class="pro-info">'+
					'<p class="pro-name">'+v[i].productName+'</p>'+
					'<p class="pro-price">'+v[i].productPrice+'</p>'+
					'<p class="pro-sale">'+v[i].productCoupon+'</p>'+
					v[i].productCouponRemain+v[i].productHref+
				'</div>'+
			'</div>'+
		'</li>'
			$('.pro-list').append(str);
		}
	})
}
