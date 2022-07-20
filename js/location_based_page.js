var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
}
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
});
var map = new naver.maps.Map('map', mapOptions);



    // map = new naver.maps.Map('map', {
    //     center: new naver.maps.LatLng(37.3595704, 127.105399),
    //     scaleControl: true,
    //     mapTypeControl: true,
    //     mapTypeControl: true,
    //     mapTypeControlOptions: {
    //         style: naver.maps.MapTypeControlStyle.BUTTON,
    //         position: naver.maps.Position.TOP_LEFT
    //     },
    //     zoomControl: true,
    //     zoomControlOptions: {
    //         style: naver.maps.ZoomControlStyle.SMALL,
    //         position: naver.maps.Position.TOP_RIGHT
    //     },
    //     zoom: 15
    // });
    // var marker = new naver.maps.Marker({
    //     position: new naver.maps.LatLng(37.3595704, 127.105399),
    //     map: map
    // });
