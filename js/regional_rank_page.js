window.addEventListener('load', function() {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function(el) {
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

// 지도 아이콘들이 로드되면 실행될 코드들...
document.getElementById('obj_regions').onload = e => {
  const region_list = document.getElementsByClassName('region_list')
  console.log(region_list);

  // html에서 만들었던 object를 JS로 불러옴.
    const query = document.querySelector('#obj_regions');
    console.log(query);

    // 그 object에 임포트된 svg doc을 가져오는 것은, 라이브 서버에서만 구동이 됨.... 확장프로그램 필요함.
    // (ctrl shift x를 눌러 live server 서치 후 오른쪽아래 작업표시줄 아이콘 키고, 디버그)
    // 수정 후 재 디버깅하는 경우, alt L O
    const querydoc = query.contentDocument;
    console.log(querydoc);

    // path(내가 만든 아이콘들) 가져오는 코드. 여기에 이벤트를 달아야 함. querySelector은 첫번째 요소만, all을 붙이면 노드리스트로 리턴.
    // http://www.tcpschool.com/javascript/js_dom_nodeList  (노드리스트에 대한 이해가 부족한 경우 ..)
    const lands = querydoc.querySelectorAll(".land");
    console.log(lands);

    //일단 임시로, 노드리스트의 모든 원소에 클릭이벤트로써 alert를 추가해놓았음..
    for (var i = 0; i < lands.length; i++) {
        lands[i].addEventListener('click', e => {
            region_list[0].style.display = "block";
            alert("yeah!");
          });
    
    }
  };
 