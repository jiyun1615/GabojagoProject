window.addEventListener('load', function() {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function(el) {
      var includePath = el.dataset.includePath;
      if (includePath) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                  el.outerHTML = this.responseText;
              }
          };
          xhttp.open('GET', includePath, true);
          xhttp.send();
      }
  });
});

const receivedData = location.href.split('?')[1];
// 전달받은 데이터가 한글일 경우 디코딩 하여야 정상적으로 데이터 사용이 가능함.
console.log(decodeURI(receivedData));
const region_name = document.getElementsByClassName('region_name');
region_name[0].innerText = decodeURI(receivedData);