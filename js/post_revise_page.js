const receivedData = location.href.split('?')[1];
console.log(decodeURI(receivedData));
var userID;
var userNAME;
var ex_title;
var ex_context;

console.log(window.sessionStorage.getItem("JWT"));
if (window.sessionStorage.getItem("JWT") != null) {
    $.ajax({
        type: "GET",
        url: "http://13.209.87.88:8080/users",
        headers: { Authorization: window.sessionStorage.getItem("JWT") },
        data: {},
        success: function (response) {
            console.log(response);
            userID = response.id;
            $.ajax({
                type: "GET",
                url: "http://13.209.87.88:8080/posts/" + decodeURI(receivedData),
                headers: { Authorization: window.sessionStorage.getItem("JWT") },
                data: {},
                success: function (response) {
                    console.log(response);
                    if (userID == response.user.userId) { //백엔드에서 검사해서 필요 없을수도 있지만 혹시나 하는 유저검증.... 나중에 한번 없애고 테스트해보고싶다

                        userNAME = response.user.name;
                        var tmpHtml = `<p class="username">${userNAME}</p>`
                        $("#title_row").append(tmpHtml);

                        ex_title = response.title;
                        $('input[name=title]').attr('value', ex_title);
                        
                        ex_context = response.context;
                        $('#context').val(ex_context);

                        //응답의 태그 갯수만큼 반복하는 for문을 돌면서, value가 응답의 태그 아이디랑 일치하는 체크박스를 체크
                        for (var i = 0; i < response.postTags.length; i++) {
                            $(`input[value=${response.postTags[i].tagId}][id*=tags]`).prop("checked", true);
                        }

                        // 이미지를 어떻게 넣어야할까..?
                        // if (response.files.length == 0) img_area[0].style.display = "none";
                        // else {
                        //     for (var i = 0; i < response.files.length; i++) {
                        //         var tmpHtml = `<img src="${response.files[i].filePath}">`
                        //         $(".img_area").append(tmpHtml);
                        //     }
                        // }
                    }

                    else {
                        swal("잘못된 접근입니다.", "메인 화면으로 이동합니다.", "error").then(function () {
                            window.location.href = 'index.html';
                        });
                    }


                },
                error: (xhr) => {
                    alert("글 불러오기 서버 요청 상태코드 : " + xhr.status)
                }

            })
        },
        error: (xhr) => {
            alert("유저 확인 서버 요청 상태코드 : " + xhr.status)
        }
    })
}
else if (window.sessionStorage.getItem("JWT") == null) {
    swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
        window.location.href = 'login_page.html';
    });
}

var formData = new FormData();
var data;
var fileInput;
var fileList;



const filesInput = document.querySelector("input[type=file]");
filesInput.addEventListener("change", () => {
    console.log(filesInput);
    console.log(filesInput.files);

    fileList = filesInput.files;
    console.log(`You've selected: ${fileList.length} file(s)`);
});

$("form").submit(function (event) {
    var total_cnt = 0;
    var tagsArr = new Array();
    $('input:checkbox[name="tags"]').each(function () {
        if (this.checked) {
            tagsArr[total_cnt] = this.value;
            total_cnt++;
        }
    });
    console.log("tags : " + tagsArr);

    //기본 전송 데이터
    data = {
        "email": "user@gabojago.com",
        "title": $("#title").val(),
        "context": $("#context").val(),
        "tags": tagsArr
    }
    console.log("stringify(data) : " + JSON.stringify(data));

    for (var i = 0; i < fileList.length; i++) {
        console.log(fileList[i]);
        formData.append('file', fileList[i]);
    }


    formData.append('key', new Blob([JSON.stringify(data)], { type: "application/json" }));
    /* key 확인하기 */
    for (let key of formData.keys()) {
        console.log("============key=============");
        console.log(key);
        console.log("============================");
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
        console.log("============value=============");
        console.log(value);
        console.log("==============================");
    }
});
// const realUpload = document.querySelector('.real-upload');
// const upload = document.querySelector('.upload');

// upload.addEventListener('click', () => realUpload.click());

// realUpload.addEventListener('change', getImageFiles);


const realUpload = document.querySelector('.files');

realUpload.addEventListener('change', getImageFiles);