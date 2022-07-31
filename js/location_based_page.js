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


// var infowindow = new naver.maps.InfoWindow();

// function onSuccessGeolocation(position) { //실행할 함수
//     var location = new naver.maps.LatLng(position.coords.latitude,
//                                          position.coords.longitude);

//     map.setCenter(location); // 지도의 중심을 어디로 잡을것인지 설정하는 코드
//     map.setZoom(15); // 지도가 얼만큼 줌 되어있는지 설정하는 코드

//     infowindow.setContent('&lt;div style="padding:20px;"&gt;' + 'geolocation.getCurrentPosition() 위치' + '&lt;/div&gt;');
// 	// 마커에 안내해줄 문구
//     infowindow.open(map, location); 
//     console.log('Coordinates: ' + location.toString());
// }

// function onErrorGeolocation() { // 오류 시 발생될 예외처리용 함수
//     var center = map.getCenter();

//     infowindow.setContent('&lt;div style="padding:20px;"&gt;' +
//         '&lt;h5 style="margin-bottom:5px;color:#f00;"&gt;Geolocation failed!&lt;/h5&gt;'+ "latitude: "+ center.lat() +"&lt;br /&gt;longitude: "+ center.lng() +'&lt;/div&gt;');

//     infowindow.open(map, center);
// }

// $(window).on("load", function() { // 창이 실행되면 현 위치 값 구하는 함수 실행되는 제이쿼리
//     if (navigator.geolocation) {
       
//         navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
//     } else {
//         var center = map.getCenter();
//         infowindow.setContent('&lt;div style="padding:20px;"&gt;&lt;h5 style="margin-bottom:5px;color:#f00;"&gt;Geolocation not supported&lt;/h5&gt;&lt;/div&gt;');
//         infowindow.open(map, center);
//     }
// });

// var mapOptions = {
//     //여기서 시작 위치를 조정함. 이 이전에 사용자가 설정한 위치를 api로 받아야함.
//     center: new naver.maps.LatLng(37.3595704, 127.105399),
//     zoom: 15
// };



// var map = new naver.maps.Map('map', mapOptions);


const bookBtn = document.querySelector('.bookmark-btn');
const close = document.querySelector('.close-btn');

const area = document.querySelector('.side-bar')
const section = document.querySelector('section');
console.log(section);
const label = document.querySelector('label');

bookBtn.addEventListener('click', function () {
    area.style.display = 'block';
    section.style.left = 0;
    label.style.opacity = 0;
})

close.addEventListener('click', function () {
    area.style.display = 'none';
    section.style.left = '-1000px';
    label.style.opacity = 1;
})



