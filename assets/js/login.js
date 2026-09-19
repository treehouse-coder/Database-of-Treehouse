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

    const button =

        document
            .getElementById("btnLogin");

    message.textContent = "";

    if(!username || !password){

        message.textContent =

            "Username dan Password wajib diisi.";

        return;

    }

    /*==================================
    LOADING
    ==================================*/

    button.disabled = true;

    button.textContent = "LOGIN...";

    message.textContent = "Memproses login...";

    try{

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

    }catch(error){

        console.error(error);

        message.textContent =

            "Gagal terhubung ke server.";

    }finally{

        /*==============================
        KEMBALIKAN TOMBOL
        ==============================*/

        button.disabled = false;

        button.textContent = "LOGIN";

    }

}
