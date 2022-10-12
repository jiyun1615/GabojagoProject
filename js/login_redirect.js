
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

var jwt ="";
window.sessionStorage.setItem("JWT", jwt);

//배포시 이부분을 주석해제한다.
// $.ajax({
//   type: "POST",
//   url: "http://13.209.87.88:8080/users/kakao/login",
//   contentType: "application/json",
//   data: JSON.stringify(obj),
//   success: function(response, status, xhr){
//     console.log(response);
//     console.log(xhr.getResponseHeader("Access-Token"));
//     jwt = xhr.getResponseHeader("Access-Token");
//     setJWT(jwt);
//     window.location.replace("../html/index.html");
//   },
//   error: (xhr) => { 
//     alert("서버 요청 상태코드 : " + xhr.status) }
// });


$.ajax({
  type: "POST",
  url: "http://13.209.87.88:8080/users/kakao/login/test",
  contentType: "application/json",
  data: JSON.stringify(obj),
  success: function(response, status, xhr){
    console.log(response);
    console.log(xhr.getResponseHeader("Access-Token"));
    jwt = xhr.getResponseHeader("Access-Token");
    setJWT(jwt);
    window.location.replace("../html/index.html");
  },
  error: (xhr) => { 
    alert("서버 요청 상태코드 : " + xhr.status) }
});

function setJWT(jwt){
  tts = 3600000;
  // tts = 60000;
  window.sessionStorage.setItem("JWT", jwt);
  window.sessionStorage.setItem("expire", Date.now() + tts);
}
