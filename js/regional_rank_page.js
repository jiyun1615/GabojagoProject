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
// 지도 아이콘들이 로드되면 실행될 코드들...
document.getElementById('obj_regions').onload = e => {
  const region_list = document.getElementsByClassName('region_list')
  console.log(region_list); //div 영역임. 선택한 도시가 어디인지 보여주는 영역.

  // html에서 만들었던 object를 JS로 불러옴.
  const query = document.querySelector('#obj_regions');
  console.log(query);

  const do_name = document.getElementsByClassName('do');
  console.log(do_name);
  const sigg = document.getElementsByClassName('sigg');
  console.log(sigg);
  var region_data = '';

  // 그 object에 임포트된 svg doc을 가져오는 것은, 라이브 서버에서만 구동이 됨.... 확장프로그램 필요함.
  // (ctrl shift x를 눌러 live server 서치 후 오른쪽아래 작업표시줄 아이콘 키고, 디버그)
  // 수정 후 재 디버깅하는 경우, alt L O
  const querydoc = query.contentDocument;
  console.log(querydoc);

  // path(내가 만든 아이콘들) 가져오는 코드. 여기에 이벤트를 달아야 함. querySelector은 첫번째 요소만, all을 붙이면 노드리스트로 리턴.
  // http://www.tcpschool.com/javascript/js_dom_nodeList  (노드리스트에 대한 이해가 부족한 경우 ..)
  const lands = querydoc.querySelectorAll(".land")
    .forEach((element) =>
      element.addEventListener("click", function () {
        // region_list[0].style.display = "block"; //none에서 block으로 바뀌는 코드.
        switch (element.attributes[0].nodeValue) {
          case 'gangwon':
            console.log("강원도를 클릭했습니다");
            do_name[0].innerText = '강원도';
            sigg[0].innerHTML = '<br>원주 | 춘천 | 강릉 | 동해 | 속초 | 삼척 | 태백 |<br>홍천 | 철원 | 횡성 | 평창 | 정선 | 영월 | 인제 |<br>...등'
            region_data = '강원도';
            region_list[0].style.display = "block";
            break;
          case 'gyeonggi':
            console.log("경기도를 클릭했습니다");
            do_name[0].innerText = '경기도';
            sigg[0].innerHTML = '<br>수원 | 용인 | 성남 | 부천 | 화성 | 안산 | 안양 |<br>평택 | 시흥 | 김포 | 광주 | 광명 | 하남 | 오산 |<br>이천 | 안성 | 양평 | 여주 | 고양 | 파주 | 가평 |<br>...등'
            region_data = '경기도';
            region_list[0].style.display = "block";
            break;
          case 'seoul':
            console.log("서울을 클릭했습니다");
            do_name[0].innerText = '서울특별시';
            sigg[0].innerHTML = '<br>강남 | 강동 | 관악 | 광진 | 마포 | 도봉 | 성북 |<br>송파 | 은평 | 동작 | 광주 | 광명 | 성동 | 구로 |<br>...등'
            region_data = '서울특별시';
            region_list[0].style.display = "block";
            break;
          case 'incheon':
            console.log("인천을 클릭했습니다");
            do_name[0].innerText = '인천광역시';
            sigg[0].innerHTML = '<br>남동 | 부평 | 계양 | 강화 | 옹진 | 연수 | 서구 |<br>중구 | 동구 | ...등'
            region_data = '인천광역시';
            region_list[0].style.display = "block";
            break;
          case 'chungbuk':
            console.log("충북을 클릭했습니다");
            do_name[0].innerText = '충청북도';
            sigg[0].innerHTML = '<br>청주 | 충주 | 제천 | 보은 | 옥천 | 영동 | 증평 |<br>진천 | 괴산 | 음성 | 단양 | ...등'
            region_data = '충청북도';
            region_list[0].style.display = "block";
            break;
          case 'chungnam':
            console.log("충남을 클릭했습니다");
            do_name[0].innerText = '충청남도';
            sigg[0].innerHTML = '<br>천안 | 공주 | 보령 | 아산 | 서산 | 논산 | 계룡 |<br>당진 | 금산 | 부여 | 서천 | 청양 | 홍성 | 예산 |<br>태안 | ...등'
            region_data = '충청남도';
            region_list[0].style.display = "block";
            break;
          case 'daejeon':
            console.log("대전을 클릭했습니다");
            do_name[0].innerText = '대전광역시';
            sigg[0].innerHTML = '<br>동구 | 중구 | 서구 | 유성구 | 대덕구 | ...등'
            region_data = '대전광역시';
            region_list[0].style.display = "block";
            break;
          case 'gyeongbuk':
            console.log("경북을 클릭했습니다");
            do_name[0].innerText = '경상북도';
            sigg[0].innerHTML = '<br>포항 | 경주 | 김천 | 안동 | 구미 | 영주 | 영천 |<br>상주 | 문경 | 경산 | 의성 | 예천 | 봉화 | 울진 |<br>영덕 | ...등'
            region_data = '경상북도';
            region_list[0].style.display = "block";
            break;
          case 'daegu':
            console.log("대구를 클릭했습니다");
            do_name[0].innerText = '대구광역시';
            sigg[0].innerHTML = '<br>중구 | 동구 | 서구 | 남구 | 북구 | 수성구 | 달서구 |<br> ...등'
            region_data = '대구광역시';
            region_list[0].style.display = "block";
            break;
          case 'ulsan':
            console.log("울산을 클릭했습니다");
            do_name[0].innerText = '울산광역시';
            sigg[0].innerHTML = '<br>중구 | 남구 | 동구 | 북구 | 울주군 | ...등'
            region_data = '울산광역시';
            region_list[0].style.display = "block";
            break;
          case 'gyeongnam':
            console.log("경남을 클릭했습니다");
            do_name[0].innerText = '경상남도';
            sigg[0].innerHTML = '<br>창원 | 진주 | 통영 | 사천 | 김해 | 밀양 | 거제 |<br>양산 | 의령 | 함안 | 창녕 | 고성 | 하동 | 거창 |<br>합천 | ...등'
            region_data = '경상남도';
            region_list[0].style.display = "block";
            break;
          case 'busan':
            console.log("부산을 클릭했습니다");
            do_name[0].innerText = '부산광역시';
            sigg[0].innerHTML = '<br>영도 | 동래 | 사하 | 금정 | 강서 | 사상 | 기장 |<br>중구 | 서구 | 동구 | 수영 | 남구 | 북구 | 연제 |<br>해운대 | 부산진구 | ...등'
            region_data = '부산광역시';
            region_list[0].style.display = "block";
            break;
          case 'jeonbuk':
            console.log("전북을 클릭했습니다");
            do_name[0].innerText = '전라북도';
            sigg[0].innerHTML = '<br>전주 | 익산 | 군산 | 정읍 | 김제 | 남원 | 완주 |<br>고창 | 부안 | 임실 | 순창 | ...등'
            region_data = '전라북도';
            region_list[0].style.display = "block";
            break;
          case 'jeonnam':
            console.log("전남을 클릭했습니다");
            do_name[0].innerText = '전라남도';
            sigg[0].innerHTML = '<br>목포 | 나주 | 여수 | 순천 | 광양 | 담양 | 곡성 |<br>구례 | 고흥 | 보성 | 화순 | 강진 | 해남 | 무안 |<br>...등'
            region_data = '전라남도';
            region_list[0].style.display = "block";
            break;
          case 'gwangju':
            console.log("광주를 클릭했습니다");
            do_name[0].innerText = '광주광역시';
            sigg[0].innerHTML = '<br>동구 | 서구 | 남구 | 북구 | 광산구 | ...등'
            region_data = '광주광역시';
            region_list[0].style.display = "block";
            break;
          case 'jeju':
            console.log("제주를 클릭했습니다");
            do_name[0].innerText = '제주도';
            sigg[0].innerHTML = '<br>애월 | 한림 | 구좌 | 조천 | 서귀포시 | ...등'
            region_data = '제주도';
            region_list[0].style.display = "block";
            break;
          default:
            console.log("제대로 작동하지 않았습니다");
            break;
        }
      }));

  const select_btn = document.getElementsByClassName('select');
  console.log(select_btn[0]);
  select_btn[0].onclick = function () {
    location.href = `../html/regional_view_page.html?${region_data}`;
};
};

