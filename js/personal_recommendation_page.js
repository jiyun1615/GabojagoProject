if (window.sessionStorage.getItem("JWT") != null && Date.now() < window.sessionStorage.getItem("expire")) {
    //회원일경우
    user_rec();
}
if (window.sessionStorage.getItem("JWT") != null && Date.now() > window.sessionStorage.getItem("expire")) {
    //회원인데 만료?
    location.reload();
}
else if (window.sessionStorage.getItem("JWT") == null) {
    swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
        window.location.href = 'login_page.html';
    });
}
function user_rec() {
    $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
            console.log(response);
            $(".username").text(response.name);
        },
        error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
        }
    });

    $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users/recommendation",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                if (response[i].spotImage == "None" || response[i].spotImage == "none" || response[i].spotImage == null) var img1 = "..\\sampleimages\\sample_img.png"
                else var img1 = response[i].spotImage;
                if (response[i].detail == "None" || response[i].detail == "none" || response[i].detail == null) var details = "상세 정보 페이지를 확인해 주세요.";
                else var details = response[i].detail;
                var tmpHtml = `
            <div class="col">
                <div class="card shadow-sm">
                    <img class="card_image" id="img2" src=${img1} height="210" style="object-fit:cover;">
                    <div class="card-body">
                        <p class="card-title" id="spotName2">${response[i].spotName}</p>
                        <p class="card-text" id="detail2">${details}</p>
                        <div class="d-flex justify-content-between align-items-center" style="padding-top: 2vh;">
                            <button type="button" class="btn btn-sm btn-outline-secondary" id="detailBtn1" onclick="detailPage(${response[i].spotId})">이동하기</button>
                        </div>
                    </div>
                </div>
            </div>`
                $("#exampleArr").append(tmpHtml);
            }




        },
        error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
        }
    });
}

function detailPage(num) {
    window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}
