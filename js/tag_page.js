function btn_onclick(num) {
    callApiInfo(num,"1");
    tagChange(num);
}

var totalPage = 0;
var tagNum=0;

function pageBtn_onclick(num) {
    // pageBtnChange(num);
    callApiInfo(tagNum, num);
}

function callApiInfo(num, pageNumber) {
    tagNum = num;
    console.log("callApiInfo : ");
    $.ajax({
        url: "http://52.78.10.7:8080/hotplaces/tag/" + num + "?page=" + pageNumber + "&size=12",
        type: "GET",
        data: "json",
        success: function (data) {
            var response = data.spotResponses;
            var dataCnt = response.length;

            $("#exampleArr").empty();
            $("#pageNum").empty();
            totalPage = data.totalPages;

            for (var i = 0; i < dataCnt; i++) {
                var spotID = response[i].spotId;
                var name = response[i].spotName;
                if (response[i].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
                else var details = response[i].detail;
                var img1 = response[i].spotImage;
                var viewCnt = response[i].viewCnt;
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
            for (var i = 1; i <= totalPage; i++) {
                var tmpHtml1 = `<button type="radio" class="pageBtn" id="pageBtn${i}" onclick="pageBtn_onclick(${i})">${i}</button>`
                $("#pageNum").append(tmpHtml1);
            }


        },
        error: (log) => { alert("url: " + url) }
    })

}


function detailPage(num) {
    console.log("성공!");
    window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}

function tagChange(num) {

    for (i = 1; i <= 11; i++) {
        const btnElement1 = document.getElementById("btn" + i);
        btnElement1.style.backgroundColor = "white";
        btnElement1.style.color = "gray";
    }

    const btnElement = document.getElementById("btn" + num);
    btnElement.style.backgroundColor = "gray";
    btnElement.style.color = "white";
}


//버튼 클릭시 디자인 pageNum
function pageBtnChange(num) {

    for (i = 0; i <= totalPage; i++) {
        if (i != num) {
            const btnElement = document.getElementById("pageBtn" + i);
            btnElement.style.borderColor="white";
        }   
    }

    const btnElement1 = document.getElementById("pageBtn" + num);
    btnElement1.style.borderBottom="1px solid gray";

}