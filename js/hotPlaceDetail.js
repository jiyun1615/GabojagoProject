var num;
function callApiInfo() {
    const urlParams = (window.location.search);
    num = urlParams.split('=')[1];
    console.log(num);

    $.ajax({
        url: "http://13.209.87.88:8080/hotplaces/id/" + num,
        type: "GET",
        data: "json",
        success: function (data) {
            var spotName = data.spotName;
            var address = data.address;
            address = noneCheck(address);
            var detail = data.detail;
            detail = noneCheck(detail);
            var tel = data.tel;
            tel = noneCheck(tel);
            var spotImage = data.spotImage;
            var viewCnt = data.viewCnt;
            var bookMarkCnt = data.bookmarkCnt;

            $("#hotPlaceTitle").empty();
            $("#hotPlaceTitle").append(spotName);
            $("#address").empty();
            $("#address").append(address);
            $("#number").empty();
            $("#number").append(tel);
            $("#detail").empty();
            $("#detail").append(detail);
            $("#spotImg").empty();
            $("#spotImg").attr("src", spotImage);
            $("#viewCnt").empty();
            $("#viewCnt").append("조회수 : " + viewCnt);
            $("#bookmarkCnt").append("BookMark : " + bookMarkCnt);


            for (var i = 0; i < data.spotTags.length; i++) {
                for (var j = 0; j < 11; j++)
                    if ($($(".tags")[j]).html() == ("#" + data.spotTags[i].value)) {
                        $($(".tags")[j]).css("font-weight", "bold")
                            .css("color", "black");
                    }
            }

        },
        error: (log) => { alert("실패" + log) }
    })

}

function noneCheck(str) {
    if (str == "None") {
        str = "상세정보가 없습니다.";
    }
    return str;

}


function checkBookMark() {
    $.ajax({
        type: "GET",
        url: 'http://13.209.87.88:8080/hotplaces/bookmark/' + num,
        contentType: "application/json",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (data) {
            if (data == true)
            {
                $("#bookmarkBtn").removeClass("bookmark_btn");
                $("#bookmarkBtn").addClass("bookmark_btn_checked");
                $("#bookmarkBtn").html("북마크 완료");
            }
        }
    })
}

function bookmarkBtn_onclick() {
    login_check();
    if ($("#bookmarkBtn").css("color") == "rgb(0, 0, 0)") {
        $("#bookmarkBtn").removeClass("bookmark_btn");
        $("#bookmarkBtn").addClass("bookmark_btn_checked");
        $("#bookmarkBtn").html("북마크 완료");
        
        callBookMarkApi(num);
    } else {
        $("#bookmarkBtn").removeClass("bookmark_btn_checked");
        $("#bookmarkBtn").addClass("bookmark_btn");
        $("#bookmarkBtn").html("북마크 하기");
        returnBookMarkApi(num);
    }
}

function callBookMarkApi(num) {
    console.log("bookmarkApi num : " + num);
    var bookMarkData = {"spotId": Number(num)};
    console.log("bookMarkData = " + JSON.stringify(bookMarkData));
    $.ajax({
        type: "POST",
        url: 'http://13.209.87.88:8080/hotplaces/bookmark',
        contentType: "application/json",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: JSON.stringify(bookMarkData),
        success: function (data) {
            console.log("success")
            location.reload();
        }
    })

}

function returnBookMarkApi(num) {
    $.ajax({
        type: "DELETE",
        url: 'http://13.209.87.88:8080/hotplaces/bookmark/' + num,
        contentType: "application/json",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (data) {
            console.log("delete success")
            location.reload();
        }
    })
}

var checkCnt;
function postBtn_onclick() {
    checkCnt=0;
    login_check();
    if(checkCnt == 0)
    {
        window.location.href = 'new_post_page.html?spotID=' + num;
    }
}



function login_check() {
    if (window.sessionStorage.getItem("JWT") == null) {
        swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
            window.location.href = 'login_page.html';
        });
        checkCnt++;
    }
}