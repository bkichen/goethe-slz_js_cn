// JavaScript Document

//TAB-选项卡切换
$(function(){
	$(".tab .tab_li").hover(function(){
		$(this).parent().find(".tab_li").removeClass("tab_am");
		$(this).addClass("tab_am");
		var cutNum=$(this).parent().find(".tab_li").index(this);
		$(this).parents(".tab").find(".tabCon").hide();
		$(this).parents(".tab").find(".tabCon").eq(cutNum).show();
	})
});
$(function(){
	$(".tab2 .tab_li").hover(function(){
		$(this).parent().find(".tab_li").removeClass("tab_am");
		$(this).addClass("tab_am");
		var cutNum=$(this).parent().find(".tab_li").index(this);
		$(this).parents(".tab2").find(".tabCon").hide();
		$(this).parents(".tab2").find(".tabCon").eq(cutNum).show();
	})
});


$(".selTit").click(function(){
	$(".selCon").removeClass("open");
	if($(this).parents(".selBox").find(".selCon").hasClass("open")){
		$(this).parents(".selBox").find(".selCon").removeClass("open");
	}
	else{
		$(this).parents(".selBox").find(".selCon").addClass("open");
	}
	return false;
});
$(".selCon li").click(function(){
    $(this).parents(".selBox").find(".selTit").text($(this).text());
    if ($(this).attr("cid") != "" && $(this).attr("cid") != undefined) {
        $("#txtYear").val($(this).attr("cid"));
    } else if ($(this).attr("birn") != "" && $(this).attr("birn") != undefined) {
        $("#txtBirN").val($(this).attr("birn"));
    } else if ($(this).attr("biry") != "" && $(this).attr("biry") != undefined) {
        $("#txtBirY").val($(this).attr("biry"));
    } else if ($(this).attr("birr") != "" && $(this).attr("birr") != undefined) {
        $("#txtBirR").val($(this).attr("birr"));
    }
});
$("body").click(function(){
	$(".selCon").removeClass("open");
});
//下拉列表


$(".spcheck").toggle(function(){
	$(this).addClass("checkCur");
	$(this).parents(".applyWithdrawBox").find(".applwForm:last").hide();//退课申请
},function(){
	$(this).removeClass("checkCur");
	$(this).parents(".applyWithdrawBox").find(".applwForm:last").show();//退课申请
});
$(".spradio").click(function(){
	$(this).parents(".radioBox").find("span").removeClass("radioCur");
	$(this).addClass("radioCur");
});
//复选框

$("#spradio").click(function(){$(this).parents("tr").next().show();});
$("#spradio2").click(function(){$(this).parents("tr").next().hide();});
//报名详情

$(".closebtn").click(function(){
	$(".layBg,.layCon").hide();
});
//弹层关闭

$(".openClose").toggle(function(){
	$(this).addClass("cur");
	$(this).parents(".rcutTit").next(".rcutCon").slideUp();
},function(){
	$(this).removeClass("cur");
	$(this).parents(".rcutTit").next(".rcutCon").slideDown();
});
//点击展开关闭

$(".VpicCur .img").hover(function(){
	$(this).addClass("cur");
},function(){
	$(this).removeClass("cur");
});
//视频hover


function slide(id){
	var timer;
	var elem = document.getElementById(id);
	var elem1 = elem.getElementsByTagName('ul')[0];
	var elem2 = document.createElement('ul');
	var div = elem.getElementsByTagName('div')[0];
	this.Scroll = Scroll;
	this.act = act;
	function Scroll() {
			if (elem.scrollLeft >= elem1.offsetWidth) {
					elem.scrollLeft -= elem1.offsetWidth;
			}
			else {
					elem.scrollLeft += 3;
			}
	}
	function act() {
			div.appendChild(elem2);
			if (elem1.offsetWidth >= elem.offsetWidth) {
					elem2.innerHTML = elem1.innerHTML;
					timer = setInterval(this.Scroll, 90);
					elem.onmouseover = function () {
							clearInterval(timer);
					}
					elem.onmouseout = function () {
							timer = setInterval(Scroll, 90);
					}
			}
	}
}
$(".gddiv").each(function () {
		var sli = new slide($(this).attr("id"));
		sli.act();
});
$(".ShomeF .gddiv li").hover(function(){
	$(this).find("span").animate({
		"opacity":"1",
		"filter":"(opacity=100)"
	},400);
	$(this).find("img").animate({
		"opacity":".3",
		"filter":"(opacity=30)"
	},500);
},function(){
	$(this).find("span").animate({
		"opacity":"0",
		"filter":"(opacity=0)"
	},400);
	$(this).find("img").animate({
		"opacity":"1",
		"filter":"(opacity=100)"
	},500)
});
//友情链接


$(".ShE_video .listul li").hover(function(){
	$(this).find("img").animate({
		"opacity":"1",
		"filter":"(opacity=100)"
	},400);
},function(){
	$(this).find("img").animate({
		"opacity":".6",
		"filter":"(opacity=60)"
	},500)
});
//莱茵视角

$(".GuideBox .item").hover(function(){
	$(this).addClass("itemCur");
	$(this).find(".itemBg").animate({
		"opacity":"0",
		"filter":"(opacity=0)"
	},500)
},function(){
	$(this).removeClass("itemCur");
	$(this).find(".itemBg").animate({
		"opacity":"1",
		"filter":"(opacity=100)"
	},500)
});
//引导页动画



$(".bmcbBtn").hover(function(){
	$(this).css({"position":"relative","z-index":"6"});
	$(this).find(".btn_cb").show();
	$(".selBox").css("position","relative");
},function(){
	$(this).css({"position":"relative","z-index":"2"});
	$(this).find(".btn_cb").hide();
	$(".selBox").css("position","relative");
});

/*$(document).ready(function(){
	window.setTimeout(function(){
		$(".bmcbBtn,.selBox").css("position","relative");
	},1000);
});*/

$(".erl_dl .txt p:last").css("margin-bottom","0");//报名详情
$(".rcutCon:last .tablebox").css("padding-bottom","0");//本期招生
$(".suet_reco li:last").css("margin-right","0");//学员个人中心
//$(".Sml_nav2").find("")


$(".backTop .aTop").click(function(event){
	event.preventDefault();
	$("html, body").animate({scrollTop: 0},500);
})




$(function(){setTimeout(onWidthChange,10);}); 
function onWidthChange(){ 
    if( $(window).width() <= 1260 ) { 
       $("body").addClass("bodyW");
    }
		else{
			$("body").removeClass("bodyW");
		}
    setTimeout(onWidthChange,10); 
};














