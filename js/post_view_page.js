const receivedData = location.href.split('?')[1];
console.log(decodeURI(receivedData));
var img_area = document.getElementsByClassName('img_area');
var time_post = 0;
var time_comment = 0;

console.log(window.localStorage.getItem("JWT"));

$.ajax({
  type: "GET",
  url: "http://13.209.87.88:8080/test",
  headers : { Authorization : window.localStorage.getItem("JWT") },

  success: function(response, status, xhr){
    console.log(response);
  },
  error: (log) => { alert("실패" + log) }
})


//비회원일때... - 헤더에 토큰 필요 없음
$.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
    data: {},
    success: function (response) {
        $("#Author").text(response.user.name);
        console.log("게시글 시간 : "+response.createdAt);
        time_post = response.createdAt;
        var createdAt_index = time_post.indexOf('T');
        var createdAt = time_post.substr(0, createdAt_index);

        $("#createdAt").text(createdAt);
        $("#title").text(response.title);
        $("#viewcnt").text(response.viewCnt);
        $(".text_area").text(response.context);
        $("#likecnt").text("+ " + response.greatCnt);


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

            console.log("댓글 시간 : "+response.comments[i].createdAt);

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


const query = document.querySelector('#heart_obj');
console.log(query);

const querydoc = query.contentDocument;
console.log(querydoc);

const lands = querydoc.querySelectorAll(".heart_blank")
    .forEach((element) =>
        element.addEventListener("click", function () {
            console.log("클릭은 잘 됩니다");
        }));
