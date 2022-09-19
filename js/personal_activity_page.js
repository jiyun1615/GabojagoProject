
$.ajax({
  type: "GET",
  url: "http://13.209.87.88:8080/users/detail",
  headers: { Authorization: window.sessionStorage.getItem("JWT") },
  data: {},
  success: function (response) {
    console.log(response);
    $(".profile_image").attr("src", response.profilePhoto);
    $(".username").text(response.name);
    $(".postCnt").text(response.postCnt);
    $(".commentCnt").text(response.commentCnt);
    $(".bookmarkCnt").text(response.bookmarkCnt);


  },
  error: (xhr) => {
    alert("서버 요청 상태코드 : " + xhr.status)
  }
});

var totalPage = 1;

function callApiInfo(num) {
  switch (num) {
    case 0:
      $("#exampleArr").html("");
      $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users/posts",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
          console.log(response.postResponses[0]);
          totalPage = response.totalPages;
          for (var i = 0; i < totalPage; i++) {

            for (var j = 0; j < response.postResponses.length; j++) {
              var date = response.postResponses[j].createdAt.split('T')[0];
              var tmp = response.postResponses[j].createdAt.split('T')[1];
              var time = tmp.split(':')[0] + ":" + tmp.split(':')[1];
              var tmptag = "";
              for (var k = 0; k < response.postResponses[j].postTags.length; k++) {
                tmptag = tmptag + "#" + response.postResponses[j].postTags[k].value + " ";
              }


              var tmpHtml =
                `
                  <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col-auto d-none d-lg-block post_img">
                      <img src="${response.postResponses[j].files[0].filePath}">
                    </div>
                    <div class="col p-4 d-flex flex-column post_info">
                      <h3 class="mt-auto mb-1 post_title">${response.postResponses[j].title}</h3>
                      <div class="mb-1 text-muted post_detail"><span>${date}</span>&nbsp;&nbsp;<span>${time}</span>&nbsp;&nbsp;<span>${response.postResponses[j].viewCnt} views</span></div>
                      <p class="card-text mb-auto post_context">${tmptag}</p>
                    </div>

                    <div class="col-2 p-3 d-none d-lg-block flex-column move-btn">
                      <button type="button" class="btn btn-secondary" onclick="location.href = \`post_view_page.html?${response.postResponses[j].postId}\`" style="height: 100%; width: 100%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"></path>
                          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                        </svg>
                      </button>
                    </div>

                    <div class="col-2 p-3 d-none d-lg-block flex-column delete-btn">
                      <button type="button" class="btn btn-danger" style="height: 100%; width: 100%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                `

              $("#exampleArr").append(tmpHtml);
            }
          }



        },
        error: (xhr) => {
          alert("서버 요청 상태코드 : " + xhr.status)
        }
      })


      break;

    case 1:
      $("#exampleArr").html("");
      $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users/comments",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
          console.log(response);
          console.log(response.comments[0]);
          totalPage = response.totalPages;
          for (var i = 0; i < totalPage; i++) {

            for (var j = 0; j < response.comments.length; j++) {
              var date = response.comments[j].createdAt.split('T')[0];
              var tmp = response.comments[j].createdAt.split('T')[1];
              var time = tmp.split(':')[0] + ":" + tmp.split(':')[1];

              // 글 사진은 못가져오니까..
              //   <div class="col-auto d-none d-lg-block post_img">
              //   <img src="..\\sampleimages\\cafe1.jpg">
              // </div>
              //cursor: pointer;
              var tmpHtml =
                `
                  <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"  >
                    <div class="col-9 p-4 d-flex flex-column comment_info">
                      <h3 class="mt-auto mb-1 post_title">${response.comments[j].context.split('(수정됨)')[0]}</h3>
                      <div class="mb-1 text-muted post_detail"><span>${date}</span>&nbsp;&nbsp;<span>${time}</span>&nbsp;&nbsp;</div>
                    </div>
                    <div class="col-1 p-2 ml-auto d-none d-lg-block flex-column move-btn">
                      <button type="button" class="btn btn-secondary" onclick="location.href = \`post_view_page.html?${response.comments[j].postId}\`" style="height: 100%; width: 100%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"></path>
                          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                        </svg>
                      </button>
                    </div>

                    <div class="col-1 p-2 d-none d-lg-block flex-column delete-btn">
                      <button type="button" class="btn btn-danger" style="height: 100%; width: 100%;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                      </button>
                    </div>

                  </div>
                `
              $("#exampleArr").append(tmpHtml);
            }
          }
        },
        error: (xhr) => {
          alert("서버 요청 상태코드 : " + xhr.status)
        }
      })
      break;

    case 2:
      $("#exampleArr").html("");
      $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users/bookmark",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
          console.log(response);
          // $("#Author").text(response.user.name);
          // console.log("게시글 시간 : " + response.createdAt);
          // time_post = response.createdAt;
          // var createdAt_index = time_post.indexOf('T');
          // var createdAt = time_post.substr(0, createdAt_index);

          // $("#createdAt").text(createdAt);
          // $("#title").text(response.title);
          // $("#viewcnt").text(response.viewCnt);
          // $(".text_area").text(response.context);
          // $("#likecnt").text("+ " + response.greatCnt);


          // if (response.files.length == 0) img_area[0].style.display = "none";
          // else {
          //   for (var i = 0; i < response.files.length; i++) {
          //     var tmpHtml = `<img src="${response.files[i].filePath}">`
          //     $(".img_area").append(tmpHtml);
          //   }
          // }
        },
        error: (xhr) => {
          alert("서버 요청 상태코드 : " + xhr.status)
        }
      })
      var tmpHtml = `<div class="col">

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210428_65%2F1619582200732eXFaH_JPEG%2F00311%2528IMG_9447x%2529.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">더 리버사이드 호텔 뷔페 더가든키친</h3>
          <div class="mb-1 text-muted post_detail"><span>서울 서초구 강남대로107길 6 1층</span>&nbsp;&nbsp;<span>02-6710-1133</span>&nbsp;&nbsp;<span>1 views</span></div>
          <p class="card-text mb-auto post_context">전세계 감동적인 요리를 한자리에!\r\n파인-다이닝 프리미엄 뷔페 더 리버사이드 호텔 '더 가든키친'\r\n\r\n소믈리에가 추천하는 와인 & 수제맥주 페어링 서비스\r\n호텔 뷔페 최고의 가성비!\r\n개별 프라이빗룸 무상제공 (돌잔치, 가족연, 비즈니스 모임 등)</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210107_26%2F1610009715066F3fEi_JPEG%2F2019_0828_SSB5729_1_HR.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">쉐이크쉑 영등포 타임스퀘어점</h3>
          <div class="mb-1 text-muted post_detail"><span>서울 영등포구 영중로 15 (영등포동4가) 타임스퀘어 1층</span>&nbsp;&nbsp;<span>02-2635-0104</span>&nbsp;&nbsp;<span>0 views</span></div>
          <p class="card-text mb-auto post_context">쉐이크쉑 타임스퀘어점입니다. 네이버 스마트주문에서 간편하게 주문하세요!</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

      <div class="col-auto d-none d-lg-block post_img">
        <img src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png">
      </div>

      <div class="col p-4 d-flex flex-column post_info">
        <h3 class="mt-auto mb-1 post_title">스타벅스 환구단점</h3>
        <div class="mb-1 text-muted post_detail"><span>서울 중구 소공로 112</span>&nbsp;&nbsp;<span>1522-3232</span>&nbsp;&nbsp;<span>0 views</span></div>
        <p class="card-text mb-auto post_context">주차 불가</p>
      </div>

    </div>

    </div>`
      $("#exampleArr").append(tmpHtml);
      break;
  }

}
