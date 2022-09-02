var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  spaceBetween: 100,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  // preventClicks:false,
  // preventClicksPropagation:false,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
$.ajax({
  type: "GET",
  url: "http://13.209.87.88:8080/posts/top3",
  data: {},
  success: function (response) {
    console.log(response);
    for (var i = 0; i < 3; i++) {
      var img_src = response[i].files[0].filePath;
      var author = response[i].user.name;
      var time_post = response[i].createdAt;
      var createdAt_index = time_post.indexOf('T');
      var createdAt = time_post.substr(0, createdAt_index);
      var post_id = response[i].postId;

      var title = response[i].title;
      var context = response[i].context;

      var tmpHtml =
        `<div class="swiper-slide">
          <div class="img_area">
             <img src="${img_src}" />
          </div>
      
          <div class="text_area">
            <div class="row">
              <span class="col-8 title"><${title}></span><span class="col-4 date ml-auto">${createdAt}</span>
            </div>

            <br><span class="name">Written by ${author}</span>
            <br><br><span class="cont">${context}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="detailBtn1" onclick="location.href = \`post_view_page.html?${post_id}\`">이동하기</button>
          </div>
          <div class="rank">
            <p class="box">${i+1}</p>
          </div>
        </div>`
      $("#exampleArr").append(tmpHtml);
    }
  }
})
