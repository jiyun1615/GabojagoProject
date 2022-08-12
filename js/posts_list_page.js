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

// for (var i = 1; i < total_page; i++) {
//   $.ajax({
//     type: "GET",
//     url: "http://52.78.10.7:8080/hotplaces/region/" + decodeURI(receivedData) + "?page=" + i + "&size=20",
//     data: {},
//     success: function (response) {
//       console.log(response)
//       for (var j = 0; j < response.spotResponses.length; j++) {
//         var spotID = response.spotResponses[j].spotId;
//         var name = response.spotResponses[j].spotName;
//         if (response.spotResponses[j].detail == "None") var details = "상세 정보 페이지를 확인해 주세요.";
//         else var details = response.spotResponses[j].detail;
        
//         if (response.spotResponses[j].spotImage=="None") var img1 = "..\\sampleimages\\jjal.jpg"
//         else var img1 = response.spotResponses[j].spotImage;
//         var viewCnt = response.spotResponses[j].viewCnt;
//         var tmpHtml = `<div class="col">
//                           <div class="card shadow-sm">
//                               <img class="card_image" id="img2" src="${img1}" height="200">  
//                               <div class="card-body">  
//                                   <p class="card-title" id="spotName2">${name}</p> 
//                                   <p class="card-text" id="detail2">${details}</p> 
//                                       <div class="d-flex justify-content-between align-items-center">  
//                                           <button type="button" class="btn btn-sm btn-outline-secondary" id="detailBtn1" onclick="detailPage(${spotID})">이동하기</button> 
//                                           <small class="text-muted">조회수 : ${viewCnt}</small>
//                                       </div> 
                                  
//                                   </div>
//                               </div>
//                           </div>
//                       </div>`
//         $("#exampleArr").append(tmpHtml);
//       }
//     },
//     error: (log) => { alert("실패" + log) }
//   })
// }