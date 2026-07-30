/*======================================
LOGIN
======================================*/

document
    .getElementById("btnLogin")
    .addEventListener("click", login);

async function login(){

    const username =

        document
            .getElementById("username")
            .value
            .trim();

    const password =

        document
            .getElementById("password")
            .value
            .trim();

    const message =

        document
            .getElementById("loginMessage");

    message.textContent = "";

    if(!username || !password){

        message.textContent =

            "Username dan Password wajib diisi.";

        return;

    }

    const result =

        await API.login(

            username,

            password

        );

    if(result.success){

    Auth.login(

    result.username

    );

    window.location.href = "index.html";

}else{

        message.textContent =

            result.message;

    }

}