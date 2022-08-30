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


var closing_window = false;
$(window).on('focus', function () {
  closing_window = false;
});

$(window).on('blur', function () {
  closing_window = true;
  if (!document.hidden) { // window가 최소화된 것은 닫힌 것이 아니다.
    closing_window = false;
  }
  $(window).on('resize', function (e) { // window가 최대화된 것은 닫힌 것이 아니다.
    closing_window = false;
  });
  $(window).off('resize'); // multiple listening 회피
});

// 유저가 html을 나간다면 window가 닫힌 것으로 간주
$('html').on('mouseleave', function () {
  closing_window = true;
});

// 유저의 마우스가 window 안에 있다면 토큰들을 삭제하지 않음
$('html').on('mouseenter', function () {
  closing_window = false;
});

$(document).on('keydown', function (e) {
  if (e.keyCode == 91 || e.keyCode == 18) {
    closing_window = false; // 단축키 ALT+TAB (창 변경)
  }
  if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
    closing_window = false; // 단축키 F5, CTRL+F5, CTRL+R (새로고침)
  }
});

// a 링크를 눌렀을 때 토큰값 삭제 방지
$(document).on("click", "a", function () {
  closing_window = false;
});

// 버튼이 다른 페이지로 redirect한다면 토큰값 삭제 방지
$(document).on("click", "button", function () {
  closing_window = false;
});

// submit이나 form 사용 시 토큰값 삭제 방지
$(document).on("submit", "form", function () {
  closing_window = false;
});

// toDoWhenClosing 함수를 통해 window가 닫히면 토큰 관련 값 전부 삭제
var toDoWhenClosing = function () {
  localStorage.removeItem("payload")
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  return;
};

// unload(window가 닫히는 이벤트)가 감지되면 closing_window가 true가 되고 토큰 관련 값들 전부 삭제
window.addEventListener("unload", function (e) {
  if (closing_window) {
    toDoWhenClosing();
  }
});