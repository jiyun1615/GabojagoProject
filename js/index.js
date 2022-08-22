var httpRequest = new XMLHttpRequest();

console.log("js입니다");
httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
    console.log(httpRequest.responseText);
    console.log(httpRequest.getAllResponseHeaders());
    console.log(httpRequest.getResponseHeader("Access-Token"));
    console.log(httpRequest.getResponseHeader("Authorization"));
  }
};
