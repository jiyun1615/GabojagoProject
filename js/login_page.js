import { KAKAO_AUTH_URL } from "./oauth.js";

const btn = document.getElementById("login_btn");

btn.addEventListener("click", function () {
    window.location.href = KAKAO_AUTH_URL;
});
