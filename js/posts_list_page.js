$.ajax({
    type: "GET",
    url: "http://13.209.87.88:8080/posts",
    data: {},
    success: function (response) {
        console.log(response)
        for (var j = 0; j < response.postResponses.length; j++) {
            var title = response.postResponses[j].title;
            post_id = response.postResponses[j].postId;
            if (response.postResponses[j].context == "None") var context = "";
            else var context = response.postResponses[j].context;

            //여기!!!!!!!! 사진이 없는 경우 어떻게 할지 바꿀것!!!!!!!!!!!
            if (response.postResponses[j].files == "None");
            else var src = response.postResponses[j].files[0].filePath;
            var str = response.postResponses[j].createdAt;
            var createdAt_index = str.indexOf('T');
            var createdAt = str.substr(0, createdAt_index);
            var tmpHtml = `<div class="col">
                            <div class="card shadow-sm">
                                <img class="card_image" id="img2" src="${src}" height="480"
                                    style="object-fit:cover;">
                                <div class="card-body">
                                    <p class="card-title" id="spotName2">${title}</p>
                                    <p class="card-text" id="detail2">${context}</p>
                                    <div class="d-flex justify-content-between align-items-center" style="padding-top: 3vh;">
                                        <button type="button" class="btn btn-sm btn-outline-secondary" id="detailBtn1" onclick="location.href = \`post_view_page.html?${post_id}\`">이동하기</button>
                                        <small class="text-muted">${createdAt}</small>
                                    </div>
                                </div>
                            </div>
                        </div>`
            $("#exampleArr").append(tmpHtml);
        }
    },
    error: (xhr) => { 
      alert("서버 요청 상태코드 : " + xhr.status) }
});

function pageChange_post(num) {
    switch (num) {
        case 0:
            if (window.sessionStorage.getItem("JWT") != null) {
                console.log(num);
                window.location.href = 'new_post_page.html';
            }
            else if (window.sessionStorage.getItem("JWT") == null) {
                swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function() {
                    window.location.href = 'login_page.html';
                });
            }
            break;
        case 1:
            if (window.sessionStorage.getItem("JWT") != null) {
                window.location.href = 'personal_activity_page.html';
            }
            else if (window.sessionStorage.getItem("JWT") == null) {
                swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function() {
                    window.location.href = 'login_page.html';
                });
            }
            break;
    }

}
