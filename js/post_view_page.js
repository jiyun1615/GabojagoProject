const receivedData = location.href.split('?')[1];
console.log(decodeURI(receivedData));
var img_area = document.getElementsByClassName('img_area');
var time_post = 0;
var time_comment = 0;
//글 작성자와 댓글 작성자, 이 둘은 본인확인이 필요함. => 수정 혹은 삭제시에!
var like_state = false;
console.log(window.sessionStorage.getItem("JWT"));
if (window.sessionStorage.getItem("JWT") != null) {
  user_view();
  document.getElementById('heart_obj').onload = e => {
    const obj = document.getElementById('heart_obj');
    const query = document.querySelector('#heart_obj');
    console.log(query);

    const querydoc = query.contentDocument;
    console.log(querydoc);

    if (like_state==false) {
      //좋아요 api
      obj.setAttribute('data', "..\\icons\\like_heart_blank.svg");
      const lands = querydoc.querySelectorAll(".heart_blank")
        .forEach((element) =>
          element.addEventListener("click", function () {
            console.log("클릭은 잘 됩니다");
            obj.setAttribute('data', "..\\icons\\like_heart.svg")

            $.ajax({
              type: "POST",
              url: "http://13.209.87.88:8080/posts/great/" + decodeURI(receivedData),
              headers: { Authorization: window.sessionStorage.getItem("JWT") },
              data: {},
              success: function (response) {
                console.log(response);
                location.reload();
              }
            })
            location.reload();
          }));
    }

    else if (like_state==true) {
      //좋아요 삭제 api
      obj.setAttribute('data', "..\\icons\\like_heart.svg");
      const lands = querydoc.querySelectorAll(".heart_fill")
        .forEach((element) =>
          element.addEventListener("click", function () {
            console.log("클릭은 잘 됩니다");
            obj.setAttribute('data', "..\\icons\\like_heart_blank.svg");

            $.ajax({
              type: "DELETE",
              url: "http://13.209.87.88:8080/posts/great/" + decodeURI(receivedData),
              headers: { Authorization: window.sessionStorage.getItem("JWT") },
              data: {},
              success: function (response) {
                console.log(response);
                location.reload();
              }
            })
            location.reload();
          }));
    }

    $("textarea").attr('readonly', 'true');
    $(".send-btn").click(function () {
      swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
        window.location.href = 'login_page.html';
      });
    });

  };

}
else if (window.sessionStorage.getItem("JWT") == null) {
  not_user_view();
  document.getElementById('heart_obj').onload = e => {
    const obj = document.getElementById('heart_obj');
    const query = document.querySelector('#heart_obj');
    console.log(query);

    const querydoc = query.contentDocument;
    console.log(querydoc);

    const lands = querydoc.querySelectorAll(".heart_blank")
      .forEach((element) =>
        element.addEventListener("click", function () {
          swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
            window.location.href = 'login_page.html';
          });
        }));
  };
  $("textarea").attr('readonly', 'true');
  $("textarea").click(function () {
    swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
      window.location.href = 'login_page.html';
    });
  });
}




function user_view() {
  $.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
    headers: { Authorization: window.sessionStorage.getItem("JWT") },
    data: {},
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


    }
  })


  //비회원일때... - 헤더에 토큰 필요 없음
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


        var tmpHtml = `<a class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <img src="${response.comments[i].profilePhoto}" width="32" height="32"
              class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${response.comments[i].userName}</h6>
                <p class="mb-0 opacity-75">${response.comments[i].context}</p>
              </div>
              <small class="opacity-50 text-nowrap">${createdAt}</small>
            </div>
          </a>`
        $("#comment_area").append(tmpHtml);
      }
    }



  })
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


    }
  })


  //비회원일때... - 헤더에 토큰 필요 없음
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


        var tmpHtml = `<a class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <img src="${response.comments[i].profilePhoto}" width="32" height="32"
              class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${response.comments[i].userName}</h6>
                <p class="mb-0 opacity-75">${response.comments[i].context}</p>
              </div>
              <small class="opacity-50 text-nowrap">${createdAt}</small>
            </div>
          </a>`
        $("#comment_area").append(tmpHtml);
      }
    }



  })
}
