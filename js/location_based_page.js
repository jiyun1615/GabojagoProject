
var locationBtnHtml = document.getElementById('my_location_btn');
function Make_map(lat, lon, zoom) {
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

    var map = new naver.maps.Map('map', mapOptions);
    locationBtnHtml[0].addEventListener("click", function() {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                map.setCenter(new naver.maps.LatLng(lat, lon));
            });

        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            alert("지오로케이션 시스템 사용이 불가능합니다.");
        }
    });

}


if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        Make_map(lat, lon, 16);

    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때
    Make_map(37.5666805, 126.9784147, 5);
    alert("지오로케이션 시스템 사용이 불가능합니다.");
}





