const receivedData = location.href.split('?')[1];
// 전달받은 데이터가 한글일 경우 디코딩 하여야 정상적으로 데이터 사용이 가능함.
console.log(decodeURI(receivedData));
const region_name = document.getElementsByClassName('region_name');
region_name[0].innerHTML = "&nbsp;" + decodeURI(receivedData) + "&nbsp;";
var total_page = 0;
switch (decodeURI(receivedData)) {
  case '서울':
    total_page = 31;
    break;

  case '대전':
    total_page = 31;
    break;

  case '인천':
    total_page = 32;
    break;

  case '대구':
    total_page = 31;
    break;

  case '울산':
    total_page = 31;
    break;

  case '부산':
    total_page = 31;
    break;

  case '광주':
    total_page = 32;
    break;

  case '제주':
    total_page = 32;
    break;

  default:
    total_page = 31;
    break;
}
//무한 스크롤링으로 바꿀것
for (var i = 1; i < total_page; i++) {
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + i + "&size=20",
    data: {},
    success: function (response) {
      console.log(response)
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;
        var name = response.spotResponses[j].spotName;
        if (response.spotResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotResponses[j].spotImage=="None") var img1 = "..\\sampleimages\\jjal.jpg"
        else var img1 = response.spotResponses[j].spotImage;
        var viewCnt = response.spotResponses[j].viewCnt;
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

function detailPage(num) {
  console.log("성공!");
  window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}