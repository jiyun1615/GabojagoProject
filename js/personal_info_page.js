function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
            console.log(response);
            username = response.name;
            document.getElementById("profile_image").src = response.profilePhoto;
            $(".profile_name").text(username);
        },
        error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
        }
    });
}


// var cntName = 0;
// var cntImage = 0;

// function infoChangeButton() {
//     if (cntName != 0) {
//         callApiNameChange();
//     }
//     callApiImageChange();

// }


function nameChange() {
    if (cntName == 0) {
        $("#profile_name").empty();
        $("#profile_nameChange").addClass("visible");
    }
    cntName++;
}


function getImageFiles(e) {
    console.log("getImageFiles function works");


    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector('.profile_image');
    //  $(".image-preview").html("");


    if ([...files].length > 1) {
        alert("파일 업로드 최대 개수는 1개 입니다.");
        return;
    }

    [...files].forEach(file => {
        console.log("foreach");
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



// function callApiImageChange()
// {

//     formData.append('profilePhoto', fileList[0]);
//     console.log("js api worked");

//     $.ajax({
//         type: "PUT",
//         url: "http://13.209.87.88:8080/users/profile",
//         headers: { Authorization: window.sessionStorage.getItem("JWT") },
//         contentType: false,
//         processData: false,
//         enctype: 'multipart/form-data',
//         data: formData,
//         success: function (response) {
//             console.log("success");
//             window.location.replace("../html/personal_info_page.html");
//         }, error: (xhr) => {
//             alert("서버 요청 상태코드 : " + xhr.status)
//         }
//     })
// }

// function callApiNameChange() {
//     var changedName = document.getElementById('profile_nameChange').value;
//     console.log("changedName = " + changedName);
//     var nameData = { "name": changedName };
//     //var nameData = { "name": "name" };
//     $.ajax({
//         type: "PUT",
//         url: "http://13.209.87.88:8080/users/name",
//         headers: { Authorization: window.sessionStorage.getItem("JWT") },
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify(nameData),
//         success: function (response) {
//             console.log("success");
//             window.location.replace("../html/personal_info_page.html");
//         }, error: (xhr) => {
//             alert("서버 요청 상태코드 : " + xhr.status)
//         }
//     })
// }