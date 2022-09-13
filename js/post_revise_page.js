const receivedData = location.href.split('?')[1];

$(function () {
    $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
            console.log(response);
            $(".author").text(" | " + response.user.name);
            $('input[name=title]').attr('value', response.title);
            $("#context").val(response.context);

            for (var i = 0; i < response.postTags.length; i++) {

                $(`input:checkbox[value=${response.postTags[i].tagId}]`).prop("checked", true);
            }

            if (response.files.length == 0) {
                const li_tag = document.createElement('li');
                const info_span = document.createElement('span');
                span.textContent = "기존 이미지가 없습니다."
                li_tag.appendChild(info_span);
                const eximagePreview = document.querySelector('.ex-image-preview');
                eximagePreview.appendChild(li_tag);
            }
            else {
                const eximagePreview = document.querySelector('.ex-image-preview');
                for (var i = 0; i < response.files.length; i++) {

                    const preview = createElements(response, i);
                    console.log(preview);
                    eximagePreview.appendChild(preview);
                }

            }
        },
        error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
        }

    });

});

//현재 상황 : 기존 글 내용들을 불러오는것 까지 함.
//기존 파일을 삭제할것인지랑, 새로 파일을 추가하는것 처리, 그리고 태그 기존에있는거랑 새로추가할부분 처리,
//제목과 글 내용을 수정했다면 그 내용을 가져오는것 처리까지.
function createElements(response, i) {
    const li_tag = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('src', response.files[i].filePath);
    li_tag.appendChild(img);

    return li_tag;
}




//insertfile과 deletefile을 신경써줘야함.tag랑.

var formData = new FormData();
var data;
var fileInput;
var fileList;
const filesInput = document.querySelector("input[type=file]");
filesInput.addEventListener("change", () => {
    fileList = filesInput.files;
});

$("form").submit(function (event) {
    var total_cnt = 0;
    var tagsArr = new Array();
    $('input:checkbox[name="tags"]').each(function () {
        if (this.checked) {
            tagsArr[total_cnt] = Number(this.value);
            total_cnt++;
        }
    });
    data = {
        "email": "user@gabojago.com",
        "title": $("#title").val(),
        "context": $("#context").val(),
        "tags": tagsArr
    };
    for (var i = 0; i < fileList.length; i++) {
        console.log(fileList[i]);
        console.log(fileList[i].type);
        formData.append('files', fileList[i]);
    }
    formData.append('request', new Blob([JSON.stringify(data)], { type: "application/json" }));

    callAjax();
    return false;
});


function callAjax() {


    $.ajax({
        type: "PUT",
        url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        data: formData,
        success: function (response) {
            console.log("success");
            window.location.replace("../html/posts_list_page.html");
        }, error: (xhr) => {
            alert("서버 요청 상태코드 : " + xhr.status)
        }
    })
}

var maxAppend = 1;

function addDel(a) {
    $(a).closest('li').remove();
    maxAppend--;
}

function getImageFiles(e) {
    console.log("getImageFiles function works");


    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector('.image-preview');
    $(".image-preview").html("");

    if ([...files].length > 3) {
        alert("파일 업로드 최대 개수는 3개 입니다.");
        return;
    }

    [...files].forEach(file => {
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


const realUpload = document.querySelector('.files');

realUpload.addEventListener('change', getImageFiles);