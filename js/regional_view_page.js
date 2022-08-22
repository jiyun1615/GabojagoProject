const receivedData = location.href.split('?')[1];
// 전달받은 데이터가 한글일 경우 디코딩 하여야 정상적으로 데이터 사용이 가능함.
console.log(decodeURI(receivedData));
var back_btn = document.getElementsByClassName('back_btn');
var icons = document.getElementsByClassName('icons');

const region_name = document.getElementsByClassName('region_name');
region_name[0].innerHTML = "&nbsp;" + decodeURI(receivedData) + "&nbsp;";

var filter = 0;     //정렬 조건 플래그 0 = 인기순(지역별) 2 = 조회순(전국) 3 = 북마크순(전국)
var loading = 0;    //중복실행여부 확인 변수
var page = 0;       //불러올 페이지

// 스크롤 일어나기 전에 있어야 할 데이터들..

function detailPage(num) {
  console.log("성공!");
  window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}

function default_filter() {
  $("#exampleArr").html("");
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + 1 + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;
        var name = response.spotResponses[j].spotName;
        if (response.spotResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotResponses[j].spotImage == "None") var img1 = "..\\sampleimages\\jjal.jpg"
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

  loading = false;    //중복실행여부 확인 변수
  page = 2;   //불러올 페이지

}
function next_load_default() {
  console.log(page);
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + page + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;
        var name = response.spotResponses[j].spotName;
        if (response.spotResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotResponses[j].spotImage == "None") var img1 = "..\\sampleimages\\jjal.jpg"
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
    error: (log) => { alert("실패" + log) }
  })
}
function viewcnt_filter() {
  $("#exampleArr").innerHTML = "";
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces?" + "page=" + 1 + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;
        var name = response.spotResponses[j].spotName;
        if (response.spotResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotResponses[j].spotImage == "None") var img1 = "..\\sampleimages\\jjal.jpg"
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

  loading = false;    //중복실행여부 확인 변수
  page = 2;   //불러올 페이지

}
function next_load_viewcnt() {
  console.log(page);
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces?" + "page=" + page + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotResponses.length; j++) {
        var spotID = response.spotResponses[j].spotId;
        var name = response.spotResponses[j].spotName;
        if (response.spotResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotResponses[j].spotImage == "None") var img1 = "..\\sampleimages\\jjal.jpg"
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
    error: (log) => { alert("실패" + log) }
  })
}
function bookmark_filter() {
  
  $("#exampleArr").html("");
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces/bookmark?" + "page=" + 1 + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotBookmarkResponses.length; j++) {
        var spotID = response.spotBookmarkResponses[j].spotId;
        var name = response.spotBookmarkResponses[j].spotName;
        if (response.spotBookmarkResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotBookmarkResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotBookmarkResponses[j].spotImage == "None") var img1 = "..\\sampleimages\\jjal.jpg"
        else var img1 = response.spotBookmarkResponses[j].spotImage;
        var viewCnt = response.spotBookmarkResponses[j].viewCnt;
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

  loading = false;    //중복실행여부 확인 변수
  page = 2;   //불러올 페이지
}
function next_load_bookmark() {
  console.log(page);
  $.ajax({
    type: "GET",
    url: "http://52.78.10.7:8080/hotplaces/bookmark?" + "page=" + page + "&size=20",
    data: {},
    success: function (response) {
      for (var j = 0; j < response.spotBookmarkResponses.length; j++) {
        var spotID = response.spotBookmarkResponses[j].spotId;
        var name = response.spotBookmarkResponses[j].spotName;
        if (response.spotBookmarkResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
        else var details = response.spotBookmarkResponses[j].detail;
        //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
        if (response.spotBookmarkResponses[j].spotImage == "None") var img1 = "..\\sampleimages\\jjal.jpg"
        else var img1 = response.spotBookmarkResponses[j].spotImage;
        var viewCnt = response.spotBookmarkResponses[j].viewCnt;
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
    error: (log) => { alert("실패" + log) }
  })
}

default_filter();

$(window).scroll(function () {
  if ($(window).scrollTop() + 200 >= $(document).height() - $(window).height()) {
    if (!loading && filter == 0)    //실행 가능 상태라면?
    {
      loading = true; //실행 불가능 상태로 변경
      next_load_default();
    }
    else if (!loading && filter == 1)    //실행 가능 상태라면?
    {
      loading = true; //실행 불가능 상태로 변경
      next_load_viewcnt();
    }
    else if (!loading && filter == 2)    //실행 가능 상태라면?
    {
      loading = true; //실행 불가능 상태로 변경
      next_load_bookmark();
    }
    else            //실행 불가능 상태라면?
    {
      // alert('다음페이지를 로딩중입니다.');
    }
  }
});


function callApiInfo(num) {
  switch (num) {
    case 0:
      $("#exampleArr").html("");
      $("#sort_by").text("인기순");
      back_btn[0].innerText = "지역별 순위";
      region_name[0].style.display = "block";
      icons[0].style.display = "block";
      filter = 0;
      default_filter();
      break;

    case 1:
      $("#exampleArr").html("");
      $("#sort_by").text("조회순");
      console.log("callApiInfo : 1");
      back_btn[0].innerText = "전국 순위";
      region_name[0].style.display = "none";
      icons[0].style.display = "none";
      filter = 1;
      viewcnt_filter();
      break;

    case 2:
      $("#exampleArr").html("");
      $("#sort_by").text("북마크");
      console.log("callApiInfo : 2");
      back_btn[0].innerText = "전국 순위";
      region_name[0].style.display = "none";
      icons[0].style.display = "none";
      filter = 2;
      bookmark_filter()
      break;
  }






}