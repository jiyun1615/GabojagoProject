window.addEventListener('load', function () {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                    Change(0);
                }
            };
            xhttp.open('GET', includePath+'?_='+new Date().getTime(), true);
            xhttp.send();
        }
    });

});

function Change(num) {
    switch (num) {
        case 0:
            if (window.sessionStorage.getItem("JWT") != null) {
                console.log("if");
                $("#log_in_out_btn").html('Logout');
            }
            else if (window.sessionStorage.getItem("JWT") == null) {
                console.log("elif");
                $("#log_in_out_btn").html('Login & Sign-up');
            }
            break;

        case 1:
            if ($("#log_in_out_btn").text() == "Logout") {
                console.log("로그아웃 하세요!");
            }
            else if ($("#log_in_out_btn").text() == "Login & Sign-up") {
                console.log("로그인합니다");
                window.location.href = 'login_page.html';
            }
            break;
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

