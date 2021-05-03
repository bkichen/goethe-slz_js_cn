$.getJSON(domainurl + "/ajax/DataService.aspx?type=getCurrentUser&time=" + new Date().getTime() + "&jsoncallback=?", function (data) {
    if (data.msg == "你还没有登录") {
        //未登录
        $(".logbox2").show();
        $(".logbox").hide();
        $(".loginSearches").hide();
    }
    else {
        $(".logbox").find("span").html(data.msg);
        $(".logbox2").hide();
        $(".logbox").show();
    }
});
function loginout() {
    location.href = domainurl + '/logout.aspx?lasturl=' + encodeURIComponent(location.href);
}

function loginEnter(event) {
    var keycode = event.keyCode || event.which;
    if (keycode == 13) {
        Login();
        return false;
    }
    else {
        return true;
    }
}
function ReadCookie(name) {
    var mycookie = document.cookie;
    var start1 = mycookie.indexOf(name + "=");
    if (start1 == -1)
        return "";
    else {
        start = mycookie.indexOf("=", start1) + 1;
        var end = mycookie.indexOf(";", start);
        if (end == -1) {
            end = mycookie.length;
        }
        var value = unescape(mycookie.substring(start, end));
        return value;
    }
}

function FidPas() {
    if ($("#txtemailregister").val() == "") {
        $("#txtemailregister").siblings("span").html($("#txtemailregister").attr("HintInfo"));
        return false;
    } else {
        $("#txtemailregister").siblings("span").html("");
    }
    if ($("#txtcoderegister").val() != ReadCookie("ValidateNum")) {
        $("#txtcoderegister").siblings("span").html($("#txtcoderegister").attr("HintInfo"));
        return false;
    } else {
        $("#txtcoderegister").siblings("span").html("");
    }
    //判断邮箱是否存在
    var submitData = {
        email: encodeURIComponent($("#txtemailregister").val()),
        type: "FindPassWord"
    };
    $.get(domainurl + "/ajax/ajax_register.aspx?time=" + new Date().getTime(), submitData,
            function (data) {
				//console.log('---:' + data);
				//console.log(data.success);
                if (data.success == "1") {
                    $("#txtemailregister").siblings("span").html("");
                    $("#txtcoderegister").siblings("span").html("");
                    alert(data.msg);
                }
                else {
					console.log(data.msg);
					$("#txtemailregister").siblings("span").html(data.msg);
                    //if (data.msg == "email error") {
                    //    $("#txtemailregister").siblings("span").html("不存在此邮箱");
                    //    return false;
                    //}
                }
            },
            "json")
}


function Login() {

    if ($("#txtUserNamezc").val() == "" || $("#txtUserNamezc").val() == "用户名") {
        $("#txtUserNamezc").siblings("span").html($("#txtUserNamezc").attr("HintInfo"));
        return false;
    } else {
        $("#txtUserNamezc").siblings("span").html("");
    }
    if ($("#txtPass").val() == "") {
        $("#txtPass").siblings("span").html($("#txtPass").attr("HintInfo"));
        return false;
    } else {
        $("#txtPass").siblings("span").html("");
    }
    var islogin = "false";
    if ($(".spcheck ").hasClass("checkCur")) {
        islogin = "true";
    }
    //判断用户是否存在
    var submitData = {
        username: encodeURIComponent($("#txtUserNamezc").val()),
        pass: encodeURIComponent($("#txtPass").val()),
        islogin: islogin,
        type: "LoginVerify"
    };
    $.get(domainurl + "/ajax/ajax_register.aspx?time=" + new Date().getTime(), submitData,
            function (data) {
                if (data.success == true) {
                    $("#txtUserNamezc").siblings("span").html("");
                    $("#txtPass").siblings("span").html("");
                    if (location.href.indexOf("register") != -1) {
                        location.href = domainurl + "/index.aspx";
                    }
                    else {
                        if ($("#hdlasturl").length>0 && $("#hdlasturl").val() != "") {
                            window.location.href = decodeURIComponent($("#hdlasturl").val());
                        } else {
                            parent.location.reload();
                        }
                    }
                }
                else {
                    if (data.msg == "username error") {
                        $("#txtUserNamezc").siblings("span").html("用户名输入有误");
                        return false;
                    }
                    else if (data.msg == "pass error") {
                        $("#txtPass").siblings("span").html("密码输入有误");
                        return false;
                    }
                }
            },
            "json")

}



function RefreshValidCode() {
    document.getElementById("imgcode").src = domainurl + "/include/ValidateCode.aspx?time=" + new Date().getTime();
}


