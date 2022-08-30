//게시글 수정에서는 이미 있던 게시글을 textarea에 넣어주어야겠지?

// function getImageFiles(e) {
//     const uploadFiles = [];
//     const files = e.currentTarget.files;
//     const imagePreview = document.querySelector('.image-preview');
//     const docFrag = new DocumentFragment();
    

//     if ([...files].length >= 4) {
//         alert('이미지는 최대 3개 까지 업로드가 가능합니다.');
//         return;
//     }

//     // 파일 타입 검사
//     [...files].forEach(file => {
//         if (!file.type.match("image/.*")) {
//             alert('이미지 파일만 업로드가 가능합니다.');
//             return
//         }

//         // 파일 갯수 검사
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

// function createElement(e, file) {
//     const li = document.createElement('li');
//     const img = document.createElement('img');
//     img.setAttribute('src', e.target.result);
//     img.setAttribute('data-file', file.name);
//     li.appendChild(img);

//     return li;
// }



// //태그 선택시 색 변경

// // function btn_tag(num){
// //     const btnElement = document.getElementById("btn"+num);
// //     if(btnElement.style.color=="white") {
// //         btnElement.style.backgroundColor = "white";
// //         btnElement.style.color="black";
// //     }else {
// //         btnElement.style.backgroundColor = "black";
// //         btnElement.style.color="white";
// //     }
// // }