!function($){
window.finger=function(){
var tips={
	"done":"您的好友已经抢到<br/>WE大会视频直播码！",
	"timeout":"亲，您的活动邀请已失效，</br>赶快联系好友重新发送吧！",
	"timeout-my":"亲，您的活动邀请已失效，</br>点击下面的按钮重新发送吧！",
	"matched":"亲，您已经帮您的的好友获得了</br>WE大会直播码了！",
	"matched-other":"您的好友已经抢到<br/>WE大会视频直播码！"
}

function preventDefault(e){
    e.preventDefault();
    return false;
}
window.showTips=function(index){
	

	var index=index;
	if(!ISSENDER){
		index=index+3;
	}
	$(".we-pop").addClass("tips-hide");
	$("#tips"+index).removeClass("tips-hide");
}
var fingerprint=$(".we-gamebox .fingerprint");
var status=0;

 $(document).on("touchstart",".btn-fingerprint-left",function(){
 	$(".pages").on("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(2).addClass("on");
 	}else{
 		fingerprint.eq(0).addClass("on");
 	}
 	status=status+1;
 	if(status>=3){
 		status=3;
 	}
 	check(status);
 });
 $(document).on("touchend",".btn-fingerprint-left",function(){
 	// $(".pages").off("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(2).removeClass("on");
 	}else{
 		fingerprint.eq(0).removeClass("on");
 	}
 	status=status-1;
 	check(status);
 	
 });
 $(document).on("touchstart",".btn-fingerprint-right",function(){
 	$(".pages").on("touchmove",preventDefault);
 	if(ISSENDER){
 		fingerprint.eq(3).addClass("on");
 	}else{
 		fingerprint.eq(1).addClass("on");
 	}
 	status=status+2;
 	if(status>=3){
 		status=3;
 	}
 	
 	check(status);
 });
 $(document).on("touchend",".btn-fingerprint-right",function(){
 	
 	if(ISSENDER){
 		fingerprint.eq(3).removeClass("on");
 	}else{
 		fingerprint.eq(1).removeClass("on");
 	}
 	status=status-2;
 	check(status);
 	
 });
 // var isTrigger=false;
 // var timeRemain=60;
 // var isFirst=true;
var global={
	isTrigger:false,
	timeRemain:300,
	isFirst:true,
	interval:null,
	isDone:false
}

 var Timer={
 	isStart:false,
 	start:function(timeRemain){
 		
 		if(Timer.isStart==false){
 			Timer.isStart=true;
	 		global.interval=setInterval(function(){
	 			var data={
		 			isSender:ISSENDER,
		 			status:status,
		 			key:KEY,
		 			timer:global.timeRemain
		 		}


		 		if(global.isTrigger){

		 			if(global.timeRemain-1<=0){
		 				global.timeRemain=0;
		 				done({status:"timeout"});
		 				clearInterval(global.interval);
		 				// alert("超时");

		 				
		 			}else{
		 				global.timeRemain--;
		 			}

		 			$(".count-down").html(global.timeRemain);
		 		}
		 		postData(data,global.isFirst);
	
	 		},1000)
 		}
 	}
 }
 // $.fn.cookie("code","AC013900AIDM",500);

$(".m-weixinShareLayer").tap(function(){
	$(this).hide();
});
 function check(status){
 	
 	if(global.isTrigger==false&&ISSENDER&&status!=0){

 		var data={
 			isSender:ISSENDER,
 			status:status,
 			key:KEY,
 			timer:global.timeRemain
 		}
 		
 		// postData(data,global.isFirst);
 		global.isFirst=false;
 		// Timer.start(global.timeRemain);
 	}
 	
 	if(status==0){
 		$(".pages").off("touchmove",preventDefault);
 		showTips(1);
 	}else if(status==1||status==2){
 		showTips(2)
 	}else if(status==3){
 		showTips(3)
 	}
 }

 window.toGame=function(){
 	var index=$(".pages .page").index($(".page-game"));
    window.slideTo(index); 
    $(".share-content").hide();
    $(".game-content").css({"display":"block"});
    setTimeout(function(){
    	showTips(1);
    },2000)
    
 	var data={
 			isSender:ISSENDER,
 			status:status,
 			key:KEY,
 			timer:global.timeRemain
 		}
 		// window.stopDirec=0;
 		$(".u-guideTop").show();
 		postData(data,global.isFirst);
 		global.isFirst=false;
 		Timer.start(global.timeRemain);
 }

 // $.fn.cookie("code","302390320",500);
 // $.fn.cookie('code', null);
 $(".we-code span").html("正在获取，请稍候...");
if(!ISSENDER){
 	Timer.start(global.timeRemain);
 	global.isTrigger=true;
 	setTimeout(function(){
 		showTips(1);
 	},3000)
 	
 }else{

 	if($.fn.cookie("code")){
 	
 		$(".share-content").hide();
 		$(".game-content").hide();
 		$("#sender-success").addClass("success-show");
 		$(".we-code span").html($.fn.cookie("code"));
		$('#activation').attr('href',"http://daxue.qq.com/content/we2014/"+$.fn.cookie("code"));
 		// window.toGame();
 		window.stopDirec=0;
 		$(".u-guideTop").show();
        
 	}
 }
 function postData(data,isfirst){
 	$.post(APP+'?m=home&c=data', data, (function(isfirst){
	  return function(result){
	  	// console.log(result)
	  	var result=JSON.parse(result);
	  	ISSENDER?setStatus(result.to):setStatus(result.from);
	  	if(result.status=="success"){
	  		clearInterval(global.interval);
	  		
	  		setTimeout(function(){
	  			done(result);
	  		},500)
 			
	  		return true;
	  	}else if(result.status=="matched"){
	  		done(result);
	  		clearInterval(global.interval);
	  		// alert("已经匹配过");
	  		return false;
	  	}else if(result.status=="timeout"){
	  		done(result);
	  		clearInterval(global.interval);
	  		// alert("已经超时");
	  		return false;
	  	}
	  	if(!isfirst){
	  		global.isTrigger=true;
	  	}

	  	if(result.status=="noyet"){
	  		
	  		global.isTrigger=false;
	  	}else if(isfirst&&!ISSENDER){

	  		global.timeRemain=result['timer'];
	  		
	  	}
	  	
	  	
	  };
	})(isfirst));
 }
function setStatus(status){
	if(ISSENDER){
  		fingerprint.eq(0).removeClass("on")
  		fingerprint.eq(1).removeClass("on")
  		if(status==1){
  			fingerprint.eq(0).addClass("on")
  		}else if(status==2){
  			fingerprint.eq(1).addClass("on")
  		}else if(status==3){
  			fingerprint.eq(0).addClass("on")
  			fingerprint.eq(1).addClass("on")
  		}
  	}else{
  		fingerprint.eq(2).removeClass("on")
  		fingerprint.eq(3).removeClass("on")
  		if(status==1){
  			fingerprint.eq(2).addClass("on")
  		}else if(status==2){
  			fingerprint.eq(3).addClass("on")
  		}else if(status==3){
  			fingerprint.eq(2).addClass("on")
  			fingerprint.eq(3).addClass("on")
  		}
  	}
}
function done(result){
	
	if(!global.isDone){
		global.isDone=true;
		
		if(result.status=="timeout"){
			$("#tips-result").html(tips['timeout']);
		}else if(result.status=="matched"&&status!=3){
			$("#tips-result").html(tips['matched-other']);
		}else if(result.status=="matched"){
			$("#tips-result").html(tips['matched']);
		}else{
			$("#tips-result").html(tips['matched']);
		}
		$(".game-content").addClass("game-hide");

		setTimeout(function(){
			$(".game-content").hide();
		},800);
		
		if(ISSENDER){
			
			if(result.status=="timeout"){
				
				$("#tips-result").html(tips['timeout-my']);
				$("#btn-getcode").html("重新获得直播码");
				setTimeout(function(){
					$("#helper-success").addClass("success-show");
				},800);
				

			}else{
				
				// $(".we-code span").html(result.code);
				// $('#activation').attr('href',"http://daxue.qq.com/content/we2014/"+result.code);
				// $.fn.cookie("code",result.code,500);
				// setTimeout(function(){
				// 	$("#sender-success").addClass("success-show");
				// },800);

				$('#activation').attr('href',"http://daxue.qq.com/content/we2014/"+result.code);
				
				setTimeout(function(){
					$("#sender-success").addClass("success-show");
				},800);
				// alert(result.code)
				if(!result.code){
					global.isDone=false;
					$(".we-code span").html("正在获取，请稍候...");
					var data={
			 			isSender:ISSENDER,
			 			status:"reget",
			 			key:KEY,
			 			timer:global.timeRemain
			 		}
			 		// alert(1)
					postData(data,false);
					// alert(2)
				}else{
					$(".we-code span").html(result.code);
					$.fn.cookie("code",result.code,500);
				}
			}

			window.stopDirec=0;
			
		}else{
			setTimeout(function(){
				$("#helper-success").addClass("success-show");
			},800);
		}
		
	}
}
}
}(Zepto)