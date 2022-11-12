
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
                    <div class="col-auto d-none d-lg-block post_img" style="cursor: pointer;" onclick="location.href = \`post_view_page.html?${response.postResponses[j].postId}\`">
                      <img src="${response.postResponses[j].files[0].filePath}">
                    </div>
                    <div class="col p-4 d-flex flex-column post_info" style="cursor: pointer;" onclick="location.href = \`post_view_page.html?${response.postResponses[j].postId}\`">
                      <h3 class="mt-auto mb-1 post_title">${response.postResponses[j].title}</h3>
                      <div class="mb-1 text-muted post_detail"><span>${date}</span>&nbsp;&nbsp;<span>${time}</span>&nbsp;&nbsp;<span>${response.postResponses[j].viewCnt} views</span></div>
                      <p class="card-text mb-auto post_context">${tmptag}</p>
                    </div>

                    <div class="col-1 p-3 d-none d-lg-block flex-column delete-btn">
                      <button type="button" class="btn btn-danger" style="height: 100%; width: 100%;" onclick="delete_post(${response.postResponses[j].postId})">
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
      // 댓글 가져오기
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
              var tmpHtml =
                `
                  <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col-11 p-4 d-flex flex-column comment_info" style="cursor: pointer;"onclick="location.href = \`post_view_page.html?${response.comments[j].postId}\`">
                      <h3 class="mt-auto mb-1 post_title">${response.comments[j].context.split('(수정됨)')[0]}</h3>
                      <div class="mb-1 text-muted post_detail"><span>${date}</span>&nbsp;&nbsp;<span>${time}</span>&nbsp;&nbsp;</div>
                    </div>
                    

                    <div class="col-1 p-3 d-none d-lg-block flex-column delete-btn">
                      <button type="button" class="btn btn-danger" style="height: 100%; width: 100%;" onclick="delete_comment(${response.comments[j].commentId})">
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
      //북마크 가져오기
      $("#exampleArr").html("");
      $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users/bookmark",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
          console.log(response);
          totalPage = response.totalPages;
          for (var i = 0; i < totalPage; i++) {

            for (var j = 0; j < response.spotBookmarkResponses.length; j++) {
              var spotId = response.spotBookmarkResponses[j].spotId;
              console.log("postId = " + spotId);
              if (response.spotBookmarkResponses[j].detail == "None" || response.spotBookmarkResponses[j].detail == "none" || response.spotBookmarkResponses[j].detail == null) var details = "상세 정보 페이지를 확인해 주세요.";
              else var details = response.spotBookmarkResponses[j].detail;
              var tmpHtml =
                `
                  <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" >
                    <div class="col-auto d-none d-lg-block post_img"style="cursor: pointer;"onclick="detailPage(${response.spotBookmarkResponses[j].spotId})">
                      <img src="${response.spotBookmarkResponses[j].spotImage}">
                    </div>
                    <div class="col p-4 d-flex flex-column post_info"style="cursor: pointer;"onclick="detailPage(${response.spotBookmarkResponses[j].spotId})">
                      <h3 class="mt-auto mb-1 post_title">${response.spotBookmarkResponses[j].spotName}</h3>
                      <div class="mb-1 text-muted post_detail"><span>${response.spotBookmarkResponses[j].address}</span>&nbsp;&nbsp;<span>${response.spotBookmarkResponses[j].tel}</span>&nbsp;&nbsp;<span>${response.spotBookmarkResponses[j].viewCnt} views</span></div>
                      <p class="card-text mb-auto post_context">${details}</p>
                    </div>

                    <div class="col-1 p-3 d-none d-lg-block flex-column delete-btn">
                      <button type="button" class="btn btn-danger" style="height: 100%; width: 100%;" onclick="delete_bookmark(${response.spotBookmarkResponses[j].spotId})">
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
  }

}


function detailPage(num) {
  window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}

function delete_post(num) {
  swal({
    title: "삭제하시겠습니까?",
    text: "삭제된 글은 복구되지 않습니다!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        $.ajax({
          type: "DELETE",
          url: "http://13.209.87.88:8080/posts/" + num,
          headers: { Authorization: window.sessionStorage.getItem("JWT") },
          data: {},
          success: function (response) {
            console.log(response);
            swal("삭제 완료되었습니다.", {
              icon: "success",
            }).then(function () {
              location.reload();
            });

          },
          error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
          }
        });
      }
      else {
        swal("취소하였습니다.");
      }
    });

}

function delete_comment(num) {
  swal({
    title: "삭제하시겠습니까?",
    text: "삭제된 댓글은 복구되지 않습니다!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        $.ajax({
          type: "DELETE",
          url: "http://13.209.87.88:8080/comments/" + num,
          headers: { Authorization: window.sessionStorage.getItem("JWT") },
          data: {},
          success: function (response) {
            console.log(response);
            swal("삭제 완료되었습니다.", {
              icon: "success",
            }).then(function () {
              location.reload();
            });

          },
          error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
          }
        });
      }
      else {
        swal("취소하였습니다.");
      }
    });
}
function delete_bookmark(num) {
  swal({
    title: "삭제하시겠습니까?",
    text: "삭제된 북마크는 복구되지 않습니다!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        $.ajax({
          type: "DELETE",
          url: 'http://13.209.87.88:8080/hotplaces/bookmark/' + num,
          headers: { Authorization: window.sessionStorage.getItem("JWT") },
          data: {},
          success: function (response) {
            console.log(response);
            swal("삭제 완료되었습니다.", {
              icon: "success",
            }).then(function () {
              location.reload();
            });

          },
          error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
          }
        });
      }
      else {
        swal("취소하였습니다.");
      }
    });




}
