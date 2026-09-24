/*======================================
TREEHOUSE APP SYNC
======================================*/

const AppSync = {

    async start(){

        try {

            /*==================================
            PASTIKAN API TERSEDIA
            ==================================*/

            if(typeof API === "undefined"){

                console.error(
                    "API belum tersedia."
                );

                return;

            }


            /*==================================
            AMBIL FILTER APP
            ==================================*/

            const filter = {

                branch:
                    APP.filter.branch,

                month:
                    APP.filter.month,

                year:
                    APP.filter.year

            };


            console.log(
                "APP SYNC FILTER:",
                filter
            );


            /*==================================
            SYNC DATA
            ==================================*/

            await DataSync.startup(
                filter
            );


            console.log(
                "APP SYNC SELESAI"
            );

        }

        catch(error){

            console.error(
                "APP SYNC ERROR:",
                error
            );

        }

    }

};