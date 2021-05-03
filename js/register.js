// 英文 数字 符号为一个字节 汉字为两个
function len(s) {
    var l = 0;
    var a = s.split("");
    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
    }
    return l;
}



function ClearNull(obj) {
    var str = obj;
    return str.replace(/(^\s*)|(\s*&)/g, "");
}
var regMail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
var regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

$(".ipt").blur(function () {
    if ($(this).val() == "" && $(this).attr('id')!='txtSchoolName') {
        $(this).parents("td").next().css("color", "red");
    }
    else {
        if ($(this).attr("HintType") == "ConfirmPass") {
            if ($(this).val() != $(this).parents("tr").prev().find(".ipt").val()) {
                $(this).parents("td").next().css("color", "red");
            }
            else {
                $(this).parents("td").next().css("color", "#828282");
            }
        }
        else if ($(this).attr("HintType") == "Mobile") {
            if (!regMobile.test(ClearNull($(this).val()))) {
                $(this).parents("td").next().find("span").css("color", "red");
            }
            else {
                $(this).parents("td").next().find("span").css("color", "#828282");
            }
        }
        else if ($(this).attr("HintType") == "Email") {
            if (!regMail.test(ClearNull($(this).val()))) {
                $(this).parents("td").next().css("color", "red");
            }
            else {
                $(this).parents("td").next().css("color", "#828282");
            }
        } else {
            $(this).parents("td").next().css("color", "#828282");
        }
    }
});

function schookfunblur() {
    if ($("#txtSchoolName").val() == "") { $("#txtCompany").parents("tr").show(); } else {
        $("#txtCompany").parents("tr").hide();
    }
}
function schookfunfocu() {
        $("#txtCompany").parents("tr").hide();
}


function compafunblur() {
    if ($("#txtCompany").val() == "") {
        $("#txtSchoolName").parents("tr").show();
        $(".grenll").parents("tr").show();
        $("#txtMajor").parents("tr").show();
    } else {
        $("#txtSchoolName").parents("tr").hide();
        $(".grenll").parents("tr").hide();
        $("#txtMajor").parents("tr").hide();
    }
}

function compafunfocu() {
        $("#txtSchoolName").parents("tr").hide();
        $(".grenll").parents("tr").hide();
        $("#txtMajor").parents("tr").hide();
}

var wait = 60; //时间
function SendCode(obj) {

    if (ClearNull($("#txcode").val()) == "") {
        $("#txcode").parents("td").next().find("span").css("color", "red");
        alert("请先填写图形验证码");
        return false;
    } 


    if (ClearNull($("#txtMobile").val()) == "") {
        $("#txtMobile").parents("td").next().find("span").css("color", "red");
        return false;
    } else {
        $("#txtMobile").parents("td").next().find("span").css("color", "#828282");
        $.ajax({
            type: 'POST',
            url: '../ajax/ajax_register.aspx',
            data: { type: "SendCode", mobile: $("#txtMobile").val(),yzmcode: $("#txcode").val() },
            dataType: 'json',
            async: false, //同步
            timeout: 5000,
            error: function () {
                alert('请求出错');
                return false;
            },
            success: function (json) {
                if (json.success == true) {
                    //var random = json.code;
                    time(obj, $(obj).parents("td").next().find("a"));
                }
                else {
       //time(obj, $(obj).parents("td").next().find("a"));
                    alert(json.mrg);
                    return false;
                }
            }
        });
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

function time(o, p) {//o为按钮的对象，p为可选，这里是60秒过后，提示文字的改变
    if (wait == 0) {
        $(o).removeAttr("disabled");
        $(o).html("点击发送验证码"); //改变按钮中value的值
        $(o).attr("style", "color:#85b92e;border: 1px solid #85b92e;");
        $(p).html("如果您在1分钟内没有收到验证码，请检查您填写的手机号码是否正确或重新发送");
        $(p).addClass("lh20px");
        wait = 60;
    } else {
        $(o).attr("disabled", true); //倒计时过程中禁止点击按钮
        $(o).html(wait + "秒后重新获取验证码"); //改变按钮中value的值
        $(o).attr("style", "color:#b3b3b3;border: 1px solid #b3b3b3;");
        $(p).removeClass("lh20px");
        wait--;
        setTimeout(function () {
            time(o, p); //循环调用
        }, 1000)
    }
}



//注册
$(".marlf3").click(function () {
    $(".erl_lay").hide();
    if ($("#txtUserName").val() == "") {
       
        $("#txtUserName").parents("td").next().css("color", "red");
        $("#txtUserName").focus();
        return false;
    
    }
    else {

        if (!regMail.test($("#txtUserName").val()) && !regMobile.test($("#txtUserName").val())) {
            $("#txtUserName").parents("td").next().css("color", "red");
            $("#txtUserName").focus();
            return false;
        }

        //判断用户是否存在
        var submitData = {
            username: encodeURIComponent($("#txtUserName").val()),
            type: "CheckUserName"
        };
        $.get("ajax/ajax_register.aspx?time=" + new Date().getTime(), submitData,
            function (data) {
                if (data.success == true) {
                    $("#txtUserName").parents("td").next().css("color", "#828282");

                    if ($("#txtPassword").val() == "") {
                        $("#txtPassword").focus();
                        $("#txtPassword").parents("td").next().css("color", "red");
                        return false;
                    }
                    else {
                        if (len($("#txtPassword").val()) < 8 || len($("#txtPassword").val()) > 20) {
                            $("#txtPassword").focus();
                            $("#txtPassword").parents("td").next().css("color", "red");
                            return false;
                        }
                        else {
                            $("#txtPassword").parents("td").next().css("color", "#828282");
                        }
                    }
                    if ($("#txtConfirmPass").val() == "") {
                        $("#txtConfirmPass").focus();
                        $("#txtConfirmPass").parents("td").next().css("color", "red");
                        return false;
                    }
                    else {
                        if ($("#txtConfirmPass").val() != $("#txtPassword").val()) {
                            $("#txtConfirmPass").focus();
                            $("#txtConfirmPass").parents("td").next().css("color", "red");
                            return false;
                        }
                        else {
                            $("#txtConfirmPass").parents("td").next().css("color", "#828282");
                        }
                    }
                    if ($("#txtRealname").val() == "") {
                        $("#txtRealname").focus();
                        $("#txtRealname").parents("td").next().css("color", "red");
                        return false;
                    }
                    else {
                        $("#txtRealname").parents("td").next().css("color", "#828282");
                    }
					/*
                    if ($("#txtBirN").val() == "" || $("#txtBirY").val() == "" || $("#txtBirR").val() == "") {
                        $("#txtBirN").focus();
                        $(".s2txt").parents("td").next().css("color", "red");
                        return false;
                    }
                    else {
                        $(".s2txt").parents("td").next().css("color", "#828282");
                    }
					*/


                    if ($("#txtEmail").val() == "") {
                        $("#txtEmail").focus();
                        $("#txtEmail").parents("td").next().css("color", "red");
                        return false;
                    }
                    else {
                        if (!regMail.test(ClearNull($("#txtEmail").val()))) {
                            $("#txtEmail").focus();
                            $("#txtEmail").parents("td").next().css("color", "red").html("请填写正确的邮箱");
                            return false;
                        }
                        else {
                            //判断邮箱是否存在
                            var submitData = {
                                email: encodeURIComponent($("#txtEmail").val()),
                                type: "CheckEmail"
                            };
                            $.get("ajax/ajax_register.aspx?time=" + new Date().getTime(), submitData,
                    function (data) {
                        if (data.success == true) {
                            $("#txtEmail").parents("td").next().css("color", "#828282").html("用于密码找回");
							/*
                            if ($("#txtSchoolName").val() == "" && $("#txtCompany").val() == "") {
                               
                                    $("#txtSchoolName").focus();
                                    $("#txtSchoolName").parents("td").next().css("color", "red").html("请至少填写学校全称和工作单位中的一项");
                                    $("#txtCompany").parents("td").next().css("color", "red").html("请至少填写学校全称和工作单位中的一项");
                                    return false;
                                
                            }
							*/
                            //if ($("#txtCompany").val() == "") {
                            //    if ($("#txtSchoolName").val() == "") {
                            //        $("#txtSchoolName").focus();
                            //        $("#txtSchoolName").parents("td").next().css("color", "red");
                            //        return false;
                            //    }
                            //    else {
                            //        $("#txtSchoolName").parents("td").next().css("color", "#828282");
                            //    }
                            //    if ($("#txtYear").val() == "") {
                            //        $("#txtYear").focus();
                            //        $(".nianji").parents("td").next().css("color", "red");
                            //        return false;
                            //    }
                            //    else {
                            //        $(".nianji").parents("td").next().css("color", "#828282");
                            //    }
                            //}
							/*
                            if ($("#txtYear").val() == "" && $("#txtCompany").val() == "") {
                                    $("#txtYear").focus();
                                    $(".nianji").parents("td").next().css("color", "red");
                                    return false;
                                }
                                else {
                                    $(".nianji").parents("td").next().css("color", "#828282");
                                }
							
                            if ($("#txtMajor").val() == "" && $("#txtCompany").val() == "") {
                                $("#txtMajor").focus();
                                $("#txtMajor").parents("td").next().css("color", "red");
                                return false;
                            }
                            else {
                                $("#txtMajor").parents("td").next().css("color", "#828282");
                            }
							*/
                            //if ($("#txtCompany").val() == "" ) {
                            //    $("#txtCompany").focus();
                            //    $("#txtCompany").parents("td").next().css("color", "red");
                            //    return false;
                            //}
                            //else {
                            //    $("#txtCompany").parents("td").next().css("color", "#828282");
                            //}
                            if ($("#txtMobile").val() == "") {
                                $("#txtMobile").focus();
                                $("#txtMobile").parents("td").next().find("span").css("color", "red");
                                return false;
                            }
                            else {
                                if (!regMobile.test(ClearNull($("#txtMobile").val()))) {
                                    $("#txtMobile").focus();
                                    $("#txtMobile").parents("td").next().find("span").css("color", "red");
                                    return false;
                                } else {
                                    $("#txtMobile").parents("td").next().find("span").css("color", "#828282");
                                }
                            }
                            if ($("#txtMobileCode").val() == "") {
                                $("#txtMobileCode").focus();
                                $("#txtMobileCode").parent().next().next().html("验证码不正确，请重新输入");
                                return false;
                            }
                            else {
                                var MobileCode = ReadCookie("SendCode");
                                if ($("#txtMobileCode").val() != MobileCode) {
                                    $("#txtMobileCode").focus();
                                    $("#txtMobileCode").parent().next().find("span").html("验证码不正确，请重新输入");
                                    return false;
                                }
                                else {
                                    $("#txtMobileCode").parent().next().find("span").html("");
                                    $("#txtsex").val($(".radioBox .radioCur").html());
                                }
                            }
                            document.forms[0].submit();
                        }
                        else {
                            $("#txtEmail").focus();
                            $("#txtEmail").parents("td").next().css("color", "red").html("邮箱已存在");
                            return false;
                        }
                    },
                    "json")
                        }
                    }
                }
                else {
                    $("#txtUserName").focus();
                    $("#txtUserName").parents("td").next().css("color", "red").html("用户名已存在");
                    return false;
                }
            },
            "json")

    }
});



$(".modifyll").click(function () {
	/*
    if ($("#txtBirN").val() == "" || $("#txtBirY").val() == "" || $("#txtBirR").val() == "") {
        $(".s2txt").parents("td").next().css("color", "red");
        return false;
    }
    else {
        $(".s2txt").parents("td").next().css("color", "#828282");
    }
	*/
    if ($("#txtEmail").val() == "") {
        $("#txtEmail").parents("td").next().css("color", "red");
        return false;
    }
    else {

        if (!regMail.test(ClearNull($("#txtEmail").val()))) {
            $("#txtEmail").parents("td").next().css("color", "red").html("请填写正确的邮箱");
            return false;
        }
        else {
            //判断邮箱是否存在
            var submitData = {
                email: encodeURIComponent($("#txtEmail").val()),
                type: "CheckEmailByModify"
            };
            $.get("../ajax/ajax_register.aspx?time=" + new Date().getTime(), submitData,
    function (data) {
        if (data.success == true) {

            $("#txtEmail").parents("td").next().css("color", "#828282").html("用于密码找回");
            
 

            
            if ($("#yzcompany").length == 1) {//
                if ($("#txtCompany").val() == "") {
                    $("#txtCompany").parents("td").next().css("color", "red");
                    return false;
                }
                else {
                    $("#txtCompany").parents("td").next().css("color", "#828282");
                }
            } else {
                if ($("#txtMajor").val() == "") {
                    $("#txtMajor").parents("td").next().css("color", "red");
                    return false;
                }
                else {
                    $("#txtMajor").parents("td").next().css("color", "#828282");
                }
                if ($("#txtSchoolName").val() == "") {
                    $("#txtSchoolName").parents("td").next().css("color", "red");
                    return false;
                }
                else {
                    $("#txtSchoolName").parents("td").next().css("color", "#828282");
                }
                if ($("#txtYear").val() == "") {
                    $(".nianji").parents("td").next().css("color", "red");
                    return false;
                }
                else {
                    $(".nianji").parents("td").next().css("color", "#828282");
                }
            }
           
            if ($("#txtMobile").val() == "") {
                $("#txtMobile").parents("td").next().find("span").css("color", "red");
                return false;
            }
            else {
                if (!regMobile.test(ClearNull($("#txtMobile").val()))) {
                    $("#txtMobile").parents("td").next().find("span").css("color", "red");
                    return false;
                } else {
                    $("#txtMobile").parents("td").next().find("span").css("color", "#828282");
                }
            }
            if ($("#txtMobileCode").val() == "") {
                $("#txtMobileCode").parents("td").next().css("color", "red").html("验证码不正确，请重新输入");
                return false;
            }
            else {
                var MobileCode = ReadCookie("SendCode");
                if ($("#txtMobileCode").val() != MobileCode) {
                    $("#txtMobileCode").parents("td").next().css("color", "red").html("验证码不正确，请重新输入");
                    return false;
                }
                else {
                    $("#txtMobileCode").parents("td").next().css("color", "red").html("");
                }
            }
            document.forms[0].submit();
        }
        else {
            $("#txtEmail").parents("td").next().css("color", "red").html("邮箱已存在");
            return false;
        }
    },
    "json")
        }
    }
});


$(".modifypassll").click(function () {
    if ($("#modypassword").val() == "") {
        $("#modypassword").parents("td").next().css("color", "red").html("&nbsp;&nbsp;请填写当前密码");
        return false;
    }
    else {
        $("#modypassword").parents("td").next().css("color", "#828282");
    }
    if (len($("#newpassword").val()) < 8 || len($("#newpassword").val()) > 20) {
        $("#newpassword").parents("td").next().css("color", "red");
        return false;
    }
    else {
        $("#newpassword").parents("td").next().css("color", "#828282");
    }
    if ($("#confimnewpassword").val() == "") {
        $("#confimnewpassword").parents("td").next().css("color", "red");
        return false;
    }
    else {
        if ($("#confimnewpassword").val() != $("#newpassword").val()) {
            $("#confimnewpassword").parents("td").next().css("color", "red").html("&nbsp;&nbsp;两次输入密码不一致");
            return false;
        } else {
            $("#confimnewpassword").parents("td").next().css("color", "#828282");
            //修改密码
            var submitData = {
                pass: encodeURIComponent($("#modypassword").val()),
                newpass: encodeURIComponent($("#newpassword").val()),
                type: "ModyPwdLl"
            };
            $.get("../ajax/ajax_register.aspx?time=" + new Date().getTime(), submitData,
    function (data) {
        data = eval("(" + data + ")");
        if (data.success == true) {
            $("#modypassword").parents("td").next().css("color", "#828282").html("");
            alert("修改成功,请重新登陆");
            window.location.href = "../login.aspx";
        } else {
            if (data.error = "原密码错误") {
                $("#modypassword").parents("td").next().css("color", "red").html("原密码错误");
                return false;
            } else {
                alert("未登录"); return false;
            }
        }
    })
        }
    }
});








