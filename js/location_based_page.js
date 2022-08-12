window.addEventListener('load', function () {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});


var search_loc = 0;
console.log(search_loc);
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

    // naver.maps.Event.once(map, 'init', function () {
    //     search_loc = map.getCenter();
    //     console.log("1" + search_loc);
    //     customControl.setMap(map);

    //     console.log('올바른 참조 시점', map.getOptions('minZoom') === 10);
    // });
    // naver.maps.Event.addListener(this.map, 'tilesloaded', () => {
    //     console.log(search_loc);
    //     console.log(map.getCenter());
    //     if (search_loc != map.getCenter()) {
    //         console.log("현재 위치에서 재검색 하시겠습니까?");
    //     }
    // });
    // naver.maps.Event.addListener(map, 'bounds_changed', function (bounds) {
    //     GetCenter(map.getCenter());
    //     GetLatLngBounds(bounds.toString(), map.zoom);
    // });
    // naver.maps.Event.addListener(map, 'dragend', function () {
    //     if (search_loc != map.getCenter()) {
    //         console.log(map.getCenter());

    //     }
    //     // GetDragEndBounds(map.getBounds().toString(), map.zoom);
    // });

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





