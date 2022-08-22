import { KAKAO_AUTH_URL } from "./oauth.js";
console.log(JSON.stringify({KAKAO_AUTH_URL}));
console.log(KAKAO_AUTH_URL);

const btn = document.getElementById("login_btn");

btn.addEventListener("click", function () {
    window.location.href = KAKAO_AUTH_URL;
});
