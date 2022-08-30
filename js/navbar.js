window.addEventListener('load', function () {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
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


function Change() {
    if (window.sessionStorage.getItem("JWT") != null) {
        console.log("if");
        $(this).html('Logout');
    }
    else if (window.sessionStorage.getItem("JWT") == null) {
        console.log("elif");
        $(this).html('Login & Sign-up');
        window.location.href = 'login_page.html';
    }
}

function pageChange() {
    if (window.sessionStorage.getItem("JWT") != null) {
        window.location.href = 'personal_activity_page.html';
    }
    else if (window.sessionStorage.getItem("JWT") == null) {
        swal("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동합니다.", "error").then(function () {
            window.location.href = 'login_page.html';
        });
    }
}

