function callApiInfo(){
    const urlParams = (window.location.search);
    const num = urlParams.split('=')[1];
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