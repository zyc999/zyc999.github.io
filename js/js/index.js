$(function(){
//	导航 动态获取数据
	$.get('http://127.0.0.1:3000/api/getindexmenu',function(data){
		//console.log(data.result[0].img);
		//console.log(data.result);	
		data.result.forEach(function(v,i){
			$($('.nav .nav-logo a')[i]).html(v.img);
			$($('.nav .nav-logo a')[i]).next().html(v.name);	
		})		
	});
	$('.nav li.more').click(function(){
		$('.nav .nav-click').toggleClass('nav-show');
	});
//	超值折扣推荐 动态获取数据
	$.get('http://127.0.0.1:3000/api/getmoneyctrl',function(data){
		//console.log(data.result);
		data.result.forEach(function(v,i){
			$($('.product .item-l')[i]).html(v.productImgSm);
			$($('.product .item-r .pro-name1')[i]).html(v.productName);
			$($('.product .item-r .pro-name .red')[i]).html(v.productPinkage+'包邮');
			$($('.product .item-r .pro-from .grey')[i]).html(v.productFrom+'|'+v.productTime);
			$($('.product .item-r .pro-from i')[i]).html(v.productComCount);
		});
	})
})
