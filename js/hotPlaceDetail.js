var num;
function callApiInfo(){
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
                  

                for(var i=0; i<data.spotTags.length; i++)
                {
                    for(var j=0; j<11; j++)
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
    if (str == "None")
    {
        str = "상세정보가 없습니다.";
    }
    return str;

}


function bookmarkBtn_onclick() {
    if ($("#bookmarkBtn").css("color") == "rgb(0, 0, 0)") {
        $("#bookmarkBtn").removeClass("bookmark_btn");
        $("#bookmarkBtn").addClass("bookmark_btn_checked");
        callBookMarkApi(num);
    } else {
        $("#bookmarkBtn").removeClass("bookmark_btn_checked");
        $("#bookmarkBtn").addClass("bookmark_btn");
        returnBookMarkApi(num);
    }
}

function callBookMarkApi(num) {
    $.ajax({
        type : "POST",
        url : 'http://13.209.87.88:8080/hotplaces/bookmark',
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data : {"spotId" : num},
        success : function(data) {
            console.log("success")
        }
    })
    }
    
function returnBookMarkApi(num) {
    $.ajax({
        type : "POST",
        url : 'http://13.209.87.88:8080/hotplaces/bookmark/' + num,
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data : {},
        success : function(data) {
            console.log("success")
        }
    })
}