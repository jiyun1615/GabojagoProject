// OAuth.js 라는 컴포넌트를 따로 생성하여 관리하였음


const CLIENT_ID = "90d4e2e23eca15d423ba5a452f493217";
const REDIRECT_URI =  "http://13.209.87.88:80/login_redirect.html";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;