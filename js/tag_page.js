function btn_onclick(num) {
    callApiInfo(num, "1");
    tagChange(num);
}

function dropdown_onclick(num) {
    switch(num){
        case 1 : 
        $("#sort_by").text("태그별");
        break;

        case 20 : 
        $("#sort_by").text("조회순");
        break;

        case 21 : 
        $("#sort_by").text("북마크");
        break;
    }
    callApiInfo(num, "1");
    noneTag(num); //태그 안보이게.

}

var totalPage = 0;
var tagNum = 0;

function pageBtn_onclick(num) {
    callApiInfo(tagNum, num);
}

function callApiInfo(num, pageNumber) {
    tagNum = num;
    if (num == 20) {
        //num=20 조회순 페이지
        apiurl = "http://13.209.87.88:8080/hotplaces?page=" + pageNumber + "&size=12";
    } else if (num == 21) {
        //num=21 북마크순 페이지
        apiurl = "http://13.209.87.88:8080/hotplaces/bookmark?page=" + pageNumber + "&size=12";
    } else {
        //num=1~11 태그별 페이지
        apiurl = "http://13.209.87.88:8080/hotplaces/tag/" + num + "?page=" + pageNumber + "&size=12";
    }
    $.ajax({
        url: apiurl,
        type: "GET",
        data: "json",
        success: function (data) {
            var response;

            if (num < 12) { //num=1~11 태그별 페이지
                response = data.spotResponses;
            } else if (num == 20) { //num=20 조회순 페이지
                response = data.spotResponses;
            } else {//num=21 북마크순 페이지
                response = data.spotBookmarkResponses;
            }
            var dataCnt = response.length;
            $("#exampleArr").empty();
            $("#pageNum").empty();
            totalPage = data.totalPages;

            for (var i = 0; i < dataCnt; i++) {

                var spotID = response[i].spotId;
                var name = response[i].spotName;
                if (response[i].detail == "None" || response[i].detail == "none" || response[i].detail == null) var details = "상세 정보 페이지를 확인해 주세요.";
                else var details = response[i].detail;

                if (response[i].spotImage == "None" || response[i].spotImage == "none" || response[i].spotImage == null) var img1 = "..\\sampleimages\\sample_img.png"
                else var img1 = response[i].spotImage;

                var viewCnt = response[i].viewCnt;
                var tmpHtml = `<div class="col">
                                <div class = "card1">
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
                                </div>
                            </div>`
                $("#exampleArr").append(tmpHtml);
            }
            for (var i = 1; i <= totalPage; i++) {
                if(i==pageNumber) var tmpHtml1 = `<button type="radio" class="pageBtn" id="pageBtn${i}" onclick="pageBtn_onclick(${i})" style="border-bottom:1px solid gray">${i}</button>`
                else var tmpHtml1 = `<button type="radio" class="pageBtn" id="pageBtn${i}" onclick="pageBtn_onclick(${i})">${i}</button>`
                $("#pageNum").append(tmpHtml1);
            }

        },
        error: (xhr) => { 
          alert("서버 요청 상태코드 : " + xhr.status) }
    })

}

function detailPage(num) {
    console.log("성공!");
    window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}

function tagChange(num) {
    // html에 ready function을 body 상단에 두니 첫실행땐 널포인터가 되어서 버튼 색이 안변함! 그래서 하단으로 내려줌!
    for (i = 1; i <= 11; i++) {
        const btnElement1 = document.getElementById("btn" + i);
        btnElement1.style.backgroundColor = "white";
        btnElement1.style.color = "gray";
    }

    const btnElement = document.getElementById("btn" + num);
    btnElement.style.backgroundColor = "gray";
    btnElement.style.color = "white";
}


// 버튼 클릭시 디자인 pageNum
// 아무래도 이부분은 페이지를 선택하면 ajax로 덮어씌워지는것같아서 아예 ajax 부를때 비교하도록 바꿨어!
// function pageBtnChange(num) {
//     console.log("페이지 클릭 pageBtn : " + num);
//     const btnElement1 = document.getElementById("pageBtn" + num);
//     btnElement1.style.borderBottom = "1px solid #000000";

//     for (i = 1; i <= totalPage; i++) {
//         if (i != num) {
//             console.log("페이지 클릭 pageBtn : " + num + " i는 "+ i);
//             const btnElement = document.getElementById("pageBtn" + i);
//             btnElement.style.borderColor = "white";
//         }
//     }



// }


function noneTag(num) {
    if (num > 12) {
        document.getElementById("tagButton").style.display = "none";
    }
    else {
        document.getElementById("tagButton").style.display = "";
    }
}