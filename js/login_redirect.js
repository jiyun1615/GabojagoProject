
console.log("js입니다");


function showSpinner() {
  document.getElementsByClassName('layerPopup')[0].style.display = 'block';
}
function hideSpinner() {
  document.getElementsByClassName('layerPopup')[0].style.display = 'none';
}
showSpinner();

let code = new URL(window.location.href).searchParams.get('code')

var obj = {"code":code};
var test = new Object();
test.code = code;
console.log(test);
var jwt ="";
window.sessionStorage.setItem("JWT", jwt);

$.ajax({
  type: "POST",
  url: "http://13.209.87.88:8080/users/kakao/login",
  contentType: "application/json",
  data: JSON.stringify(obj),
  success: function(response, status, xhr){
    console.log(response);
    console.log(xhr.getResponseHeader("Access-Token"));
    jwt = xhr.getResponseHeader("Access-Token");
    window.sessionStorage.setItem("JWT", jwt);
    window.location.replace("../html/index.html");
  },
  error: (log) => { alert("실패" + log) }
})


