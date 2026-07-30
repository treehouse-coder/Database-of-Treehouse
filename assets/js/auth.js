/*======================================
AUTH
======================================*/

const Auth = {

    login(user){

        sessionStorage.setItem(

            "treehouse_login",

            "true"

        );

        sessionStorage.setItem(

            "treehouse_user",

            user

        );

    },

    logout(){

        sessionStorage.clear();

        window.location.href = "login.html";

    },

    check(){

        if(

            sessionStorage.getItem(

                "treehouse_login"

            ) !== "true"

        ){

            window.location.href = "login.html";

        }

    },

    username(){

        return(

            sessionStorage.getItem(

                "treehouse_user"

            ) || ""

        );

    }

};