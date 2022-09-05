const receivedData = location.href.split('?')[1];
// 전달받은 데이터가 한글일 경우 디코딩 하여야 정상적으로 데이터 사용이 가능함.
console.log(decodeURI(receivedData));
var back_btn = document.getElementsByClassName('back_btn');
var icons = document.getElementsByClassName('icons');

const region_name = document.getElementsByClassName('region_name');
region_name[0].innerHTML = "&nbsp;" + decodeURI(receivedData) + "&nbsp;";

var loading = 0;    //중복실행여부 확인 변수
var page = 0;       //불러올 페이지

// 스크롤 일어나기 전에 있어야 할 데이터들..

function detailPage(num) {
  window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}

function default_filter() {
  $("#exampleArr").html("");
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + 1 + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;

        var name = response.spotResponses[j].spotName;

        if (response.spotResponses[j].detail == "None"||response.spotResponses[j].detail == "none"||response.spotResponses[j].detail == null) var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;

        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!! None, null
        if (response.spotResponses[j].spotImage == "None"||response.spotResponses[j].spotImage=="none"||response.spotResponses[j].spotImage==null) var img1 = "..\\sampleimages\\sample_img.png"
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
    error: (xhr) => { 
      alert("서버 요청 상태코드 : " + xhr.status) }
  })

  loading = false;    //중복실행여부 확인 변수
  page = 2;   //불러올 페이지

}
function next_load_default() {
  console.log(page);
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + page + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;
        var name = response.spotResponses[j].spotName;
        if (response.spotResponses[j].detail == "None"||response.spotResponses[j].detail == "none"||response.spotResponses[j].detail == null) var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;

        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!! None, null
        if (response.spotResponses[j].spotImage == "None"||response.spotResponses[j].spotImage=="none"||response.spotResponses[j].spotImage==null) var img1 = "..\\sampleimages\\sample_img.png"
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
      page++; //페이지 증가
      loading = false;    //실행 가능 상태로 변경
    },
    error: (xhr) => { 
      alert("서버 요청 상태코드 : " + xhr.status) }
  })
}

default_filter();

$(window).scroll(function () {
  if ($(window).scrollTop() + 200 >= $(document).height() - $(window).height()) {
    if (!loading)    //실행 가능 상태라면?
    {
      loading = true; //실행 불가능 상태로 변경
      next_load_default();
    }
    else            //실행 불가능 상태라면?
    {
      // alert('다음페이지를 로딩중입니다.');
    }
  }
});