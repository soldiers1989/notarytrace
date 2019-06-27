export function addCookie(objName, objValue, objHours){
  var str = objName + "=" + escape(objValue);
  if (objHours > 0) {
    var date = new Date();
    var ms = objHours * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
}

export function getCookie(objName){
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] == objName)
      return unescape(temp[1]);
  }
}

export function delCookie(name){
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=a; expires=" + date.toGMTString();
}

function allCookie(){//读取所有保存的cookie字符串
  var str = document.cookie;
  if (str == "") {
    str = "没有保存任何cookie";
  }
}