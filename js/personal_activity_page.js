//테스트용 함수

function callApiInfo(num) {
  switch (num) {
    case 0:
      $("#exampleArr").html("");
      var tmpHtml = `<div class="col">

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\cafe1.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">세상에 이런 맛집을 이제서야 알아보네요!!! <span>(13)</span></h3>
          <div class="mb-1 text-muted post_detail"><span>22.08.30</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>13 views</span></div>
          <p class="card-text mb-auto post_context">#신나는 #커피맛집</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\orange.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">제주도 사람들은 귤을 타고 다닌대요 (물론 뻥임) <span>(25)</span></h3>
          <div class="mb-1 text-muted post_detail"><span>22.08.10</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>27 views</span></div>
          <p class="card-text mb-auto post_context">No Tags here</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\jjal2.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">실례가 안된다면 아메리카노좀 사주십시오. <span>(5)</span></h3>
          <div class="mb-1 text-muted post_detail"><span>22.08.05</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>13 views</span></div>
          <p class="card-text mb-auto post_context">#커피맛집</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\sea.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">파도가 멋진 이곳 <span>(5)</span></h3>
          <div class="mb-1 text-muted post_detail"><span>22.07.30</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>13 views</span></div>
          <p class="card-text mb-auto post_context">#분위기 있는</p>
        </div>

      </div>

    </div>`
      $("#exampleArr").append(tmpHtml);
      break;

    case 1:
      $("#exampleArr").html("");
      var tmpHtml = `<div class="col">

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\cafe1.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">그쵸~ 제가 또 안목이 좋습니다 ~ ^^ </h3>
          <div class="mb-1 text-muted post_detail"><span>22.08.30</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>13 views</span></div>
          <p class="card-text mb-auto post_context">세상에 이런 맛집을 이제서야 알아보네요!!! <span>(13)</span></p>
        </div>

      </div>
      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\orange.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">ㅋㅋㅋ 농담입니다~</h3>
          <div class="mb-1 text-muted post_detail"><span>22.08.10</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>27 views</span></div>
          <p class="card-text mb-auto post_context">제주도 사람들은 귤을 타고 다닌대요 (물론 뻥임) <span>(25)</span></p>
        </div>

      </div>
      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\jjal2.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">애애앵~! 아메리카노 사줘~! </h3>
          <div class="mb-1 text-muted post_detail"><span>22.08.05</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>13 views</span></div>
          <p class="card-text mb-auto post_context">실례가 안된다면 아메리카노좀 사주십시오. <span>(5)</span></p>
        </div>

      </div>
      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="..\\sampleimages\\sea.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">파도를 보면 누구나 마음이 평안해질거에요. 한번 다녀와보세요.</h3>
          <div class="mb-1 text-muted post_detail"><span>22.07.30</span>&nbsp;&nbsp;<span>13:35</span>&nbsp;&nbsp;<span>13 views</span></div>
          <p class="card-text mb-auto post_context">파도가 멋진 이곳 <span>(5)</span></p>
        </div>

      </div>

    </div>`
      $("#exampleArr").append(tmpHtml);
      break;

    case 2:
      $("#exampleArr").html("");
      var tmpHtml = `<div class="col">

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210428_65%2F1619582200732eXFaH_JPEG%2F00311%2528IMG_9447x%2529.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">더 리버사이드 호텔 뷔페 더가든키친</h3>
          <div class="mb-1 text-muted post_detail"><span>서울 서초구 강남대로107길 6 1층</span>&nbsp;&nbsp;<span>02-6710-1133</span>&nbsp;&nbsp;<span>1 views</span></div>
          <p class="card-text mb-auto post_context">전세계 감동적인 요리를 한자리에!\r\n파인-다이닝 프리미엄 뷔페 더 리버사이드 호텔 '더 가든키친'\r\n\r\n소믈리에가 추천하는 와인 & 수제맥주 페어링 서비스\r\n호텔 뷔페 최고의 가성비!\r\n개별 프라이빗룸 무상제공 (돌잔치, 가족연, 비즈니스 모임 등)</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

        <div class="col-auto d-none d-lg-block post_img">
          <img src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210107_26%2F1610009715066F3fEi_JPEG%2F2019_0828_SSB5729_1_HR.jpg">
        </div>

        <div class="col p-4 d-flex flex-column post_info">
          <h3 class="mt-auto mb-1 post_title">쉐이크쉑 영등포 타임스퀘어점</h3>
          <div class="mb-1 text-muted post_detail"><span>서울 영등포구 영중로 15 (영등포동4가) 타임스퀘어 1층</span>&nbsp;&nbsp;<span>02-2635-0104</span>&nbsp;&nbsp;<span>0 views</span></div>
          <p class="card-text mb-auto post_context">쉐이크쉑 타임스퀘어점입니다. 네이버 스마트주문에서 간편하게 주문하세요!</p>
        </div>

      </div>

      <div class="row g-0 ml-0 mr-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">

      <div class="col-auto d-none d-lg-block post_img">
        <img src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png">
      </div>

      <div class="col p-4 d-flex flex-column post_info">
        <h3 class="mt-auto mb-1 post_title">스타벅스 환구단점</h3>
        <div class="mb-1 text-muted post_detail"><span>서울 중구 소공로 112</span>&nbsp;&nbsp;<span>1522-3232</span>&nbsp;&nbsp;<span>0 views</span></div>
        <p class="card-text mb-auto post_context">주차 불가</p>
      </div>

    </div>

    </div>`
      $("#exampleArr").append(tmpHtml);
      break;
  }

}