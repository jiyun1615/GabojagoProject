const receivedData = location.href.split('?')[1];
console.log(decodeURI(receivedData));
var img_area = document.getElementsByClassName('img_area');
var time_post = 0;
var time_comment = 0;
//글 작성자와 댓글 작성자, 이 둘은 본인확인이 필요, 이것은 백엔드에서 해준다고함!

var titleShared;
var like_state;
var userID = "";
console.log(window.sessionStorage.getItem("JWT"));
if (window.sessionStorage.getItem("JWT") != null) {
  //회원일경우
  user_view();
}
else if (window.sessionStorage.getItem("JWT") == null) {
  not_user_view();
  not_user_like();
  not_user_make_comment();
}


function user_view() {
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/users",
    headers: { Authorization: window.sessionStorage.getItem("JWT") },
    async:false,
    data: {},
    success: function (response) {
      console.log(response);
      userID = response.id;
    },
    error: (xhr) => {
      alert("서버 요청 상태코드 : " + xhr.status)
    }
  });

  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
    headers: { Authorization: window.sessionStorage.getItem("JWT") },
    data: {},
    async:false,
    success: function (response) {
      console.log(response);
      like_state = response.greatState;
      $("#Author").text(response.user.name);
      console.log("게시글 시간 : " + response.createdAt);
      time_post = response.createdAt;
      var createdAt_index = time_post.indexOf('T');
      var createdAt = time_post.substr(0, createdAt_index);

      $("#createdAt").text(createdAt);
      $("#title").text(response.title);
      titleShared = response.title;
      $("#viewcnt").text(response.viewCnt);
      $(".text_area").text(response.context);
      $("#likecnt").text("+ " + response.greatCnt);
      var tags = "";
      for (var i = 0; i < response.postTags.length; i++) {
        tags = tags + "#" + response.postTags[i].value + " ";
      }
      $(".tag_area").text(tags);

      if (response.files.length == 0) img_area[0].style.display = "none";
      else {
        for (var i = 0; i < response.files.length; i++) {
          var tmpHtml = `<img src="${response.files[i].filePath}">`
          $(".img_area").append(tmpHtml);
        }
      }

      if (userID == response.user.userId) {
        $(".post_report").addClass('disabled');
        $(".post_revise").removeClass('disabled');
        $(".post_delete").removeClass('disabled');
      }
      else {
        $(".post_revise").addClass('disabled');
        $(".post_delete").addClass('disabled');
        $(".post_report").removeClass('disabled');
      }

      

    },
    error: (xhr) => {
      alert("서버 요청 상태코드 : " + xhr.status)
    }
      
  });
    user_like();
      user_make_comment();



  //댓글. 헤더에 토큰 필요 없음
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/comments/post/" + decodeURI(receivedData) + "?page=1&size=10",
    data: {},
    success: function (response) {
      console.log(response)

      for (var i = 0; i < response.comments.length; i++) {
        time_comment = response.comments[i].createdAt;

        console.log("댓글 시간 : " + response.comments[i].createdAt);

        //글 시간하고 계산하면 잘 나올거같은데...
        var createdAt_index = time_comment.indexOf('T');
        var createdAt_index_end = time_comment.indexOf('.');
        var createdAt = time_comment.substr(createdAt_index + 1, createdAt_index_end);

        var li_text = "";
        if (userID == response.comments[i].id) {
          li_text = `<li><a class="dropdown-item comment_revise" href="#" onclick="javascript:dropdown_revise_comment();">수정하기</a></li>
          <li><a class="dropdown-item comment_delete" href="#" onclick="javascript:dropdown_delete_comment();">삭제하기</a></li>`;
        }
        else {
          li_text = `<li><a class="dropdown-item disabled comment_revise" href="#" onclick="javascript:dropdown_revise_comment();">수정하기</a></li>
          <li><a class="dropdown-item disabled comment_delete" href="#" onclick="javascript:dropdown_delete_comment();">삭제하기</a></li>`;
        }

        var tmpHtml =
          `<li class="list-group-item d-flex gap-3 py-3" aria-current="true">
            <img src="${response.comments[i].profilePhoto}" width="32" height="32"
              class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${response.comments[i].userName}</h6>
                <p class="mb-0 opacity-75">${response.comments[i].context}</p>
              </div>
              <div class="dropdown comment">
              <small class="opacity-50 text-nowrap">${createdAt}</small>
              <a class="toggles" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><img class="icons" id="dots" src="..\\icons\\three-dots-vertical.svg" alt="아이콘"></a>
              <ul class="dropdown-menu dropdown-menu-end comment" id="dropdown_menu"aria-labelledby="dropdownMenuButton2">
                ${li_text}
              </ul>
            </div>
            </div>

          </li>`

        $("#comment_area").append(tmpHtml);
      }
    },
    error: (xhr) => {
      alert("서버 요청 상태코드 : " + xhr.status)
    }



  });
}

function not_user_view() {
  //비회원일때... - 헤더에 토큰 필요 없음
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
    data: {},
    success: function (response) {
      console.log(response);
      $("#Author").text(response.user.name);
      console.log("게시글 시간 : " + response.createdAt);
      time_post = response.createdAt;
      var createdAt_index = time_post.indexOf('T');
      var createdAt = time_post.substr(0, createdAt_index);

      $("#createdAt").text(createdAt);
      $("#title").text(response.title);
      titleShared = response.title;
      $("#viewcnt").text(response.viewCnt);
      $(".text_area").text(response.context);
      $("#likecnt").text("+ " + response.greatCnt);

      var tags = "";
      for (var i = 0; i < response.postTags.length; i++) {
        tags = tags + "#" + response.postTags[i].value + " ";
      }
      $(".tag_area").text(tags);

      if (response.files.length == 0) img_area[0].style.display = "none";
      else {
        for (var i = 0; i < response.files.length; i++) {
          var tmpHtml = `<img src="${response.files[i].filePath}">`
          $(".img_area").append(tmpHtml);
        }
      }


    },
    error: (xhr) => {
      alert("서버 요청 상태코드 : " + xhr.status)
    }
  });

  $(".post_revise").addClass('disabled');
  $(".post_delete").addClass('disabled');
  $(".post_report").addClass('disabled');
  var tmpHtml = `<li><a class="dropdown-item post_login" href="..\\html\\login_page.html">로그인이 필요합니다.</a></li>`
  $("#dropdown_menu").append(tmpHtml);

  //댓글. 헤더에 토큰 필요 없음
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/comments/post/" + decodeURI(receivedData) + "?page=1&size=10",
    data: {},
    success: function (response) {
      console.log(response)

      for (var i = 0; i < response.comments.length; i++) {
        time_comment = response.comments[i].createdAt;

        console.log("댓글 시간 : " + response.comments[i].createdAt);

        //글 시간하고 계산하면 잘 나올거같은데...
        var createdAt_index = time_comment.indexOf('T');
        var createdAt_index_end = time_comment.indexOf('.');
        var createdAt = time_comment.substr(createdAt_index + 1, createdAt_index_end);

        var li_text = `<li><a class="dropdown-item comment_revise disabled" href="#">로그인이 필요합니다.</a></li>`;

        var tmpHtml =
          `<li class="list-group-item d-flex gap-3 py-3" aria-current="true">
            <img src="${response.comments[i].profilePhoto}" width="32" height="32"
              class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${response.comments[i].userName}</h6>
                <p class="mb-0 opacity-75">${response.comments[i].context}</p>
              </div>
              <div class="dropdown comment">
              <small class="opacity-50 text-nowrap">${createdAt}</small>
              <a class="toggles" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><img class="icons" id="dots" src="..\\icons\\three-dots-vertical.svg" alt="아이콘"></a>
              <ul class="dropdown-menu dropdown-menu-end comment" id="dropdown_menu"aria-labelledby="dropdownMenuButton2">
              ${li_text}
              </ul>
            </div>
            </div>

          </li>`

        $("#comment_area").append(tmpHtml);
      }
    },
    error: (xhr) => {
      alert("서버 요청 상태코드 : " + xhr.status);
    }



  });
}

var shareUrl = "http://13.209.87.88/post_view_page.html?" + decodeURI(receivedData);

function sendLinkFacebook() {
  var facebook_share_url = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;
  console.log(facebook_share_url);
  window.open(facebook_share_url,
    'Share on Facebook',
    'scrollbars=no, width=500, height=500');
}
function sendLinkTwitter() {
  window.open("https://twitter.com/share?text=" + titleShared + "&url=" + shareUrl,
    'Share on Twitter',
    'scrollbars=no, width=500, height=500');
}
function sendLinkNaver() {
  var naver_root_url = "http://share.naver.com/web/shareView.nhn?url="
  var naver_share_url = naver_root_url + encodeURI(shareUrl) + "&title=" + encodeURI(titleShared);
  window.open(naver_share_url,
    'Share on Naver',
    'scrollbars=no, width=500, height=500');
}

function user_like() {


  if (like_state == false) {
    //좋아요 api
    //false일테니까 하트는 비어있어야함.
    console.log("false");
    document.getElementById('heart_obj_fill').onload = e => {
      const obj = document.getElementById('heart_obj');
      console.log("display none");
      obj.style.display = 'none';
    }

    document.getElementById('heart_obj').onload = e => {
      console.log("obj load");
      const obj = document.getElementById('heart_obj');
      const query = document.querySelector('#heart_obj');
      const querydoc = query.contentDocument;
      const lands = querydoc.querySelectorAll(".heart_blank")
        .forEach((element) =>
          element.addEventListener("click", function () {
            console.log("클릭했습니다 - heart_blank");
            //채워준다.
            obj.setAttribute('data', "..\\icons\\like_heart.svg")
            $.ajax({
              type: "POST",
              url: "http://13.209.87.88:8080/posts/great/" + decodeURI(receivedData),
              headers: { Authorization: window.sessionStorage.getItem("JWT") },
              data: {},
              success: function (response) {
                console.log(response);
                location.reload();
              },
              error: (xhr) => {
                alert("서버 요청 상태코드 : " + xhr.status)
              }
            });
          }));
    };
  }

  else if (like_state == true) {
    //좋아요 삭제 api
    //true일테니까 하트는 채워있어야함.
    console.log("true");
    document.getElementById('heart_obj_fill').onload = e => {
      const obj = document.getElementById('heart_obj');
      obj.style.display = 'block';
    }
    document.getElementById('heart_obj').onload = e => {
      const obj = document.getElementById('heart_obj');
      obj.style.display = 'none';
    }
    document.getElementById('heart_obj').onload = e => {
      const obj = document.getElementById('heart_obj');
      const query = document.querySelector('#heart_obj');
      const querydoc = query.contentDocument;
      const lands = querydoc.querySelectorAll(".heart_fill")
        .forEach((element) =>
          element.addEventListener("click", function () {
            console.log("클릭했습니다 - heart_fill");
            //비운다
            obj.setAttribute('data', "..\\icons\\like_heart_blank.svg");
            $.ajax({
              type: "DELETE",
              url: "http://13.209.87.88:8080/posts/great/" + decodeURI(receivedData),
              headers: { Authorization: window.sessionStorage.getItem("JWT") },
              data: {},
              success: function (response) {
                console.log(response);
              },
              error: (xhr) => {
                alert("서버 요청 상태코드 : " + xhr.status)
              }
            });
          }));
    };
  }


}

function not_user_like() {
  document.getElementById('heart_obj').onload = e => {
    const obj = document.getElementById('heart_obj');
    const query = document.querySelector('#heart_obj');
    console.log(query);

    const querydoc = query.contentDocument;
    console.log(querydoc);
    //비회원이면 당연히 blank
    const lands = querydoc.querySelectorAll(".heart_blank")
      .forEach((element) =>
        element.addEventListener("click", function () {
          swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
            window.location.href = 'login_page.html';
          });
        }));
  };
}

function user_make_comment() {
  $(".input_area").attr('readonly', 'false');

  $(".send-btn").click(function () {

    var text = $(".input_area").val();

    if (text == null || text.replaxe(/\s|/gi, "").length == 0) {
      swal("내용이 없어요!", "내용을 입력해주세요.", "error");
      $(".input_area").focus();
    }

    else {
      var obj = { "context": text };
      console.log(obj);
      $.ajax({
        type: "POST",
        url: "http://13.209.87.88:8080/comments/post/" + decodeURI(receivedData),
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (response) {
          console.log(response);
        },
        error: (xhr) => {
          alert("서버 요청 상태코드 : " + xhr.status)
        }
      });
    }


  });
}

function not_user_make_comment() {
  $(".input_area").attr('readonly', 'true');
  $(".input_area").click(function () {
    swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
      window.location.href = 'login_page.html';
    });
  });
  $(".send-btn").click(function () {
    swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
      window.location.href = 'login_page.html';
    });
  });
}

function dropdown_revise() {
  var data = decodeURI(receivedData);
  window.location.href = `post_revise_page.html?${data}`;
}

function dropdown_delete() {
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
          url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
          headers: { Authorization: window.sessionStorage.getItem("JWT") },
          data: {},
          success: function (response) {
            console.log(response);
            swal("삭제 완료되었습니다.", {
              icon: "success",
            }).then(function () {
              window.location.href = 'posts_list_page.html';
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

function dropdown_report() {
  swal({
    title: "신고하시겠습니까?",
    text: "신고시, 관리자에게 접수되며 누적 신고수가 많을시 검토 후 조치됩니다.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("신고 완료되었습니다. (미구현 - 0904)", {
          icon: "success",
        });
      } else {
        swal("취소되었습니다.");
      }
    });
}

function dropdown_revise_comment() {
  swal("수정할 댓글 내용을 입력해주세요.", {
    content: "input",
  })
    .then((value) => {
      var obj = { "context": value };
      $.ajax({
        type: "PUT",
        url: "http://13.209.87.88:8080/comments/" + decodeURI(receivedData),
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (response) {
          console.log(response);
          swal("수정 완료되었습니다.", {
            icon: "success",
          }).then(function () {
            location.reload();
          });

        },
        error: (xhr) => {
          alert("서버 요청 상태코드 : " + xhr.status)
        }
      });



    });
}

function dropdown_delete_comment() {
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
          url: "http://13.209.87.88:8080/comments/" + decodeURI(receivedData),
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
