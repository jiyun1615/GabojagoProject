// function getImageFiles(e) {
//     const uploadFiles = [];
//     const files = e.currentTarget.files;
//     const imagePreview = document.querySelector('.image-preview');
//     const docFrag = new DocumentFragment();
//     $(".image-preview").html("");

//    // 파일 갯수 검사
//     if ([...files].length >= 4) {
//         alert('이미지는 최대 3개 까지 업로드가 가능합니다.');
//         return;
//     }

//     // 파일 타입 검사
//     [...files].forEach(file => {
//         if (!file.type.match("image/.*")) {
//             alert('이미지 파일만 업로드가 가능합니다.');
//             return;
//         }

//         if ([...files].length < 4) {
//             uploadFiles.push(file);
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const preview = createElement(e, file);
//                 imagePreview.appendChild(preview);
//             };
//             reader.readAsDataURL(file);
//         }
//     });
// }



var maxAppend = 1;

// $('.__add ._add').on('click',function(){ 
//    if(maxAppend >= 3){
//       alert("파일 업로드 최대 개수는 3개 입니다.");
//       return;
//    }else{
//        $('.__add').append('<li><input type="file"name="file_path" class="files"> <button type="button" class="_add" onclick="addDel(this);">삭제</button></li>'); 
//        maxAppend ++;
//    }
//  });
 
// $('.__add ._add').on('click',function(){ //왠지 모르겠는데 작동 XX
//     const imagePreview = document.querySelector('.image-preview');
//     $(".image-preview").html("");
//     if([...files].length >= 3){
//        alert("파일 업로드 최대 개수는 3개 입니다.");
//        return;
//     }

//     [...files].forEach(file => {
//         $("#__add").append(`<li><input type="file"name="file_path" class="files"> <button type="button" class="_add" onclick="addDel(this);">삭제</button></li>`); 
//         const reader = new FileReader();
//             reader.onload = (e) => {
//                 const preview = createElement(e, file);
//                 imagePreview.appendChild(preview);
//             };
//         });
//   });

 function addDel(a){ 
    $(a).closest('li').remove(); 
    maxAppend --;
 }


 


 function getImageFiles(e) {
    console.log("getImageFiles function works");


     const uploadFiles = [];
     const files = e.currentTarget.files;
     const imagePreview = document.querySelector('.image-preview');
     $(".image-preview").html("");

     if([...files].length > 3){
        alert("파일 업로드 최대 개수는 3개 입니다.");
        return;
     }

     [...files].forEach(file => {
        // if([...files].length <= 3){
        // var tmp = '<li><input type="file"name="file_path" class="files"><button type="button" class="_add" onclick="addDel(this);">삭제</button></li>';
        // $("#addFile").append(tmp); 
        // }
        uploadFiles.push(file);
        const reader = new FileReader();
            reader.onload = (e) => {
                const preview = createElement(e, file);
                imagePreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }); 
        
}



function createElement(e, file) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('src', e.target.result);
    img.setAttribute('data-file', file.name);
    li.appendChild(img);

    return li;
}



//serializeArray, tags 별도 배열 생성 -> 두개를 object(list)에 넣고 stringify() 끗
// $("form").submit(function (event) {
//     var data1 = $(this).serializeArray();
//     console.log(data1);
//     var object = {};

//     var total_cnt = 0;
//     var tagsArr = new Array();
//     $('input:checkbox[name="tags"]').each(function() {
//         if(this.checked){
//             tagsArr[total_cnt]=this.value;
//             total_cnt++;
//         }
//     });

//     for (var i = 0; i < data1.length-1; i++) {
//         object[data1[i]['name']] = data1[i]['value'];
//     }
//     //태그 배열이라 별도 처리
//     object[data1[data1.length-1]['name']] = tagsArr;

//     var result = JSON.stringify(object);

//     console.log(result);        

//     return false;               //페이지 새로고침 방지 
// });


// var data;
// $("form").submit(function (event) {
//     var total_cnt = 0;
//     var tagsArr = new Array();
//     $('input:checkbox[name="tags"]').each(function () {
//         if (this.checked) {
//             tagsArr[total_cnt] = this.value;
//             total_cnt++;
//         }
//     });
//     console.log("tags : " + tagsArr);
//     data = {
//         "email": "user@gabojago.com",
//         "title": $("#title").val(),
//         "context": $("#context").val(),
//         "tags": tagsArr
//     }
//     console.log(JSON.stringify(data));
// });

// var fileInput = $('.files');

// for (var i = 0; i < fileInput.length; i++) {
//     if (fileInput[i].files.length > 0) {
//         for (var j = 0; j < fileInput[i].files.length; j++) {
//             console.log("fileInput[i].files[j] :::" + fileInput[i].files[j]);

//             formData.append('file', $('.files')[i].files[j]);
//         }
//     }
// }
// console.log(JSON.stringify(data));
// formData.append('key', new Blob([JSON.stringify(data)], { type: "application/json" }));


// $.ajax({
//     url : "http://13.209.87.88:8080:/posts",
//     headers: { Authorization: window.sessionStorage.getItem("JWT") },
//     data : formData,
//     contentType : false,
//     processData : false,
//     enctype : 'multipart/form-data',
//     success : function(data) {
//         if(result.success == true){
//             alert('');
//         }else {
//             alert("실패");
//         }
//     }
// })