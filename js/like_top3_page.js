var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
// $.ajax({
//   type: "GET",
//   url: "http://52.78.10.7:8080/hotplaces/realtime",
//   data: {},
//   success: function (response) {
//     console.log(response)
//     for (var i = 0; i < response.length; i++) {
//       var tmpHtml =
//       `<div class="swiper-slide">
//       <div class="container-xxl">
//         <div class="row">
//           <div class="col-4">
//             <img class="item_img" src="" width="100%" height="100%">
//           </div>
//           <div class="col-8">
//             <p><span class="rank">${i+1}위&nbsp;</span><span class="HP_name">디폴트</span></p>
//             <p class="location">위치요</p>
//             <p class="detail">내용이요</p>
//           </div>
//         </div>
//         <div class="row">
//           <div class="col">
//             <p><br>이 핫플레이스와 연관된 태그</p>
//             <p class="tags">
//               <span class="num_${i}_tag_detail">#야경</span>&nbsp;&nbsp;<span class="num_${i}_tag_detail">#이색체험</span>&nbsp;&nbsp;<span
//                 class="num_${i}_tag_detail">#피크닉</span>&nbsp;&nbsp;<span class="num_${i}_tag_detail">#데이트</span>&nbsp;&nbsp;<span
//                 class="num_${i}_tag_detail">#커피 맛집</span>&nbsp;&nbsp;<span class="num_${i}_tag_detail">#디저트 맛집</span>&nbsp;&nbsp;<br><span
//                 class="num_${i}_tag_detail">#분위기 있는</span>&nbsp;&nbsp;<span class="num_${i}_tag_detail">#든든한</span>&nbsp;&nbsp;<span
//                 class="num_${i}_tag_detail">#신나는</span>&nbsp;&nbsp;<span class="num_${i}_tag_detail">#파릇파릇한</span>&nbsp;&nbsp;<span
//                 class="num_${i}_tag_detail">#기분 전환</span>&nbsp;&nbsp;
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>`
//     $("#exampleArr").append(tmpHtml);
//     }
    
//     for (var i = 0; i < $(".swiper-slide").length; i++) {
//       $($(".item_img")[i]).attr("src", response[i].spotImage);
//       $($(".HP_name")[i]).text(response[i].spotName);
//       $($(".location")[i]).html(response[i].address + "<br>Tel : " + response[i].tel);
//       $($(".detail")[i]).text(response[i].detail);

//       //i번째 요소의 j개의 태그들을 i번 슬라이드의 k개의 태그리스트와 비교 
//       for (var j = 0; j < response[i].spotTags.length; j++) {
//         for (var k = 0; k < $(".num_" + [i] + "_tag_detail").length; k++) {
//           if ($($(".num_" + [i] + "_tag_detail")[k]).html() == ("#" + response[i].spotTags[j].value)) {
//             $($(".num_" + [i] + "_tag_detail")[k]).css("font-weight", "bold")
//               .css("color", "black");
//           }
//         }
//       }

//     }
//   }
// })