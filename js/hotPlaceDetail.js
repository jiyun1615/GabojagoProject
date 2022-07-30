function callApiInfo(){
    const urlParams = (window.location.search);
    const num = urlParams.split('=')[1];
        console.log(urlParams);
    
    $.ajax({
        url: "http://52.78.10.7:8080/hotplaces/id/" + num,
            type: "GET",
            data: "json", 
            success: function (data) {
                var spotName = data[0].spotName;
                var address = data[0].address;
                var detail = data[0].detail;
                var tel = data[0].tel;
                var spotImage = data[0].spotImage;
                var viewCnt = data[0].viewCnt;
                //spotTags는 여러갠데 어떻게 가져오지
                
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
                  
                  
            },
            error: (log) => { alert("실패" + log) }
    })
    
}