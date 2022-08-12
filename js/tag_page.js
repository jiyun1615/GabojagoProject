function callApiInfo(num) {
    console.log("callApiInfo : ");
    $.ajax({

        url: "http://52.78.10.7:8080/hotplaces/tag/" + num + "?page=3&size=12",
        type: "GET",
        data: "json",
        success: function (data) {
            var response = data.spotResponses;
            $("#exampleArr").empty();
            for (var i = 0; i < 12; i++) {
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

        },
        error: (log) => { alert("실패" + log) }
    })

}


function detailPage(num) {
    console.log("성공!");
    window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}

function tagChange(num)
{
    
}