const receivedData = location.href.split('?')[1];
var pic_index;
var pic_indexarr = new Array();

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

function createElements(response, i) {
    console.log(i);
    const li_tag = document.createElement('li');
    const atag = document.createElement('a');
    $(atag).html(`<img src="${response.files[i].filePath}">
    <img id="delete_pic" src="..\\icons\\x-square-fill.svg" style="cursor:pointer; width:24px; height:24px; margin-bottom:176px;"onclick="deleteon(${i}, ${response.files[i].fileId})">`);
    li_tag.appendChild(atag);
    pic_index = i + 1;
    console.log(pic_index)
    return li_tag;
}

function deleteon(i, id) {
    alert((i + 1) + "번째 사진을 삭제합니다");
    pic_indexarr.push(id);
    const eximagePreview = document.querySelector('.ex-image-preview');
    const items = eximagePreview.getElementsByTagName('li');
    pic_index -= 1;
    // 3. <li> 목록 중 첫번째 item 삭제
    if (items.length > 0) {
        items[i].remove();
    }

}

var formData = new FormData();
var data;
var fileInput;
var fileList;
var deleteFiles;
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
        "tags": tagsArr,
        "deleteFiles": pic_indexarr
    };
    for (var i = 0; i < fileList.length; i++) {
        console.log(fileList[i]);
        console.log(fileList[i].type);
        formData.append('files', fileList[i]);
    }
    formData.append('request', new Blob([JSON.stringify(data)], { type: "application/json" }));
    console.log(formData.get("files"));
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
    if (pic_index == 3) {
        alert("파일 업로드 최대 개수는 3개 입니다.");
        return;
    }

    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector('.image-preview');
    $(".image-preview").html("");

    if ([...files].length + pic_index > 3 || [...files].length > 3) {
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