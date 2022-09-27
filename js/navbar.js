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
            if (window.sessionStorage.getItem("JWT") != null && Date.now() < window.sessionStorage.getItem("expire")) {
                console.log("로그인 상태입니다.");
                $("#log_in_out_btn").html('Logout');
            }
            else if(window.sessionStorage.getItem("JWT") != null && Date.now() > window.sessionStorage.getItem("expire")){
                console.log("로그인 JWT 만료")
                window.sessionStorage.removeItem("JWT");
                swal("로그인이 만료되었습니다.", "재로그인이 필요합니다.", "error").then(function () {
                    location.reload();
                });
            }
            else if (window.sessionStorage.getItem("JWT") == null) {
                console.log("elif");
                $("#log_in_out_btn").html('Login & Sign-up');
            }
            break;

        case 1:
            if ($("#log_in_out_btn").text() == "Logout") {
                swal({
                    title: "로그아웃 하시겠습니까?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                    .then((willDelete) => {
                      if (willDelete) {
                        window.sessionStorage.removeItem("expire");
                        window.sessionStorage.removeItem("JWT");
                        swal("로그아웃 완료되었습니다.", {
                          icon: "success",
                        }).then(function () {
                            location.reload();
                          });
                      } else {
                        swal("취소되었습니다.");
                      }
                    });
                
            }
            else if ($("#log_in_out_btn").text() == "Login & Sign-up") {
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

