
var locationBtnHtml = document.getElementById('my_location_btn');

var map;
var maxX, maxY, minX, minY;
var markers = [];
let arrX = new Array();
var arrY = new Array();
let spotIDs = new Array();


function Make_map(lat, lon, zoom) {
    console.log("makemap1");
    var mapOptions = {
        //여기서 시작 위치를 조정함. 이 이전에 사용자가 설정한 위치를 api로 받아야함.
        center: new naver.maps.LatLng(lat, lon),
        zoom: zoom,
        //줌 컨트롤
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        minZoom: 6,
        zoomControlOptions: {
            style: naver.maps.ZoomControlStyle.LARGE,
            position: naver.maps.Position.TOP_LEFT
        }

    };
    // console.log("makemap2");

    map = new naver.maps.Map('map', mapOptions);
    console.log("makemap3");

}


if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        // console.log("test1");
        Make_map(lat, lon, 16);
        
    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때
    Make_map(37.5666805, 126.9784147, 5);
    alert("지오로케이션 시스템 사용이 불가능합니다.");
}



function fold_btn_onclick() {
    if ($("#arrayContents").css("display") == "none") {
        $("#arrayContents").show();
        $("#foldBtn").removeClass("locationChange");
    } else {
        $("#arrayContents").hide();
        $("#foldBtn").addClass("locationChange");
    }

}


function listReset_btn_onclick() {
    maxX=map.getBounds()._max.y;
    maxY=map.getBounds()._max.x;
    minX=map.getBounds()._min.y;
    minY=map.getBounds()._min.x;
    markers = [];   //전역변수라 호출시마다 초기화해줘야됌
    callApiInfo(maxX,maxY,minX,minY);

}

function getClickHandler(i) {
    return function(e){
        console.log(i + " works");
        //spotIDs[i];
        console.log(spotIDs[i] + '_onclick');
        const element = document.getElementById(spotIDs[i] + '_onclick');
        element.classList.add('marker_bold');
        element.scrollIntoView({behavior:"smooth", block: "center", inline:"nearest"});
        for(var j=0; j<markers.length; j++)
        {
            if(j!=i){
                const element = document.getElementById(spotIDs[j] + '_onclick');
                element.classList.remove('marker_bold');
            }
        }
    }   
}


function callApiInfo(maxX,maxY,minX,minY) {
    // markers.fill(0);
    // arrX.fill(0);
    // arrY.fill(0);
    // spotIDs.fill(0);
    // console.log("callApiInfo : ");
    // console.log("http://13.209.87.88:8080/hotplaces/location?xStart="+ minX +"&xEnd="+ maxX +"&yStart="+ minY +"&yEnd="+ maxY);
    $.ajax({
        url: "http://13.209.87.88:8080/hotplaces/location?xStart="+ minX +"&xEnd="+ maxX +"&yStart="+ minY +"&yEnd="+ maxY,
        type: "GET",
        data: "json",
        success: function (data) {
            var dataCnt = data.length;
            // console.log(dataCnt);
            // console.log(data);
            $("#arrayContents").empty();
            totalPage = data.totalPages;

            for (var i = 0; i < dataCnt; i++) {
                var spotID = data[i].spotId;
                spotIDs[i]=spotID;
                var spotName = data[i].spotName;
                if (data[i].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
                else var details = data[i].detail;
                var tel = data[i].tel;
                var img1 = data[i].spotImage;
                var tags = new Array();
                var spotX = data[i].spotX;
                arrX[i] = spotX;
                var spotY = data[i].spotY;
                arrY[i] = spotY;                

                var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(spotX, spotY),
                    map: map,
                });
                marker.setMap(map);
                markers.push(marker);
                // var marker = new naver.maps.Marker(spotX, spotY);

                naver.maps.Event.addListener(map, 'click', function(e){
                    marker.setPosition(e.latlng);
                })

                for(var j=0; j<data[i].spotTags.length; j++)
                {
                    tags[j] = data[i].spotTags[j].value;
                }

                var tmpHtml = `<div class="row1" id="${spotID}_onclick" onclick="detailPage(${spotID})">
                                    <img class="list_image" src="${img1}">
                                    <div class="list_info">
                                        <div class="list_name">${spotName}</div>
                                        <div class="list_detail">
                                            <div class="detail_css" id="tel">${tel}</div>
                                            <div class="detail_css" id="detail">${details}</div>
                                            <div class="detail_css" id="tags">#${tags}</div>
                                         </div>
                                    </div>
                                </div>`   
                $("#arrayContents").append(tmpHtml);

                console.log(markers[i] , getClickHandler(i));
                naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
            }

            // for (var i=0; i<=markers.length; i++) {
            //     console.log(markers[i] , getClickHandler(i));
            //     naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
            // }
        },
        error: (log) => { alert("url: " + url) }
    })

}

naver.maps.Event.addListener(map, 'idle', function()   {
    //highlightCard();
});


function highlightCard() {

}





function detailPage(num) {
    console.log("성공!");
    window.location.href = 'hotPlaceDetail.html?spotID=' + num;
}
