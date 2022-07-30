window.addEventListener('load', function () {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function (el) {
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
region_name[0].innerHTML = "&nbsp;" + decodeURI(receivedData) + "&nbsp;";

for (var i = 1; i < 11; i++) {
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + i + "&size=20",
    data: {},
    success: function (response) {
      console.log(response)
      for (var j = 0; j < response.length; j++) {
        var spotID = response[j].spotId;
        var name = response[j].spotName;
        if (response[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response[j].detail;
        var img1 = response[j].spotImage;
        var viewCnt = response[j].viewCnt;
        var tmpHtml = `<div class="col">
                          <div class="card shadow-sm">
                              <img class="card_image" id="img2" src="${img1}" height="200">  
                              <div class="card-body">  
                                  <p class="card-title" id="spotName2">${name}</p> 
                                  <p class="card-text" id="detail2">${details}</p> 
                                      <div class="d-flex justify-content-between align-items-center">  
                                          <button type="button" class="btn btn-sm btn-outline-secondary" id="detailBtn1" onclick="detailPage(${spotID})">이동하기</button> 
                                          <small class="text-muted">조회수 : ${viewCnt}</small>
                                      </div> 
                                  
                                  </div>
                              </div>
                          </div>
                      </div>`
        $("#exampleArr").append(tmpHtml);
      }
    },
    error: (log) => { alert("실패" + log) }
  })
}

