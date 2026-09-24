/*======================================
TREEHOUSE POS
DATA SYNC
======================================*/

const DataSync = {

    /*==================================
    GET ACTIVE FILTER
    ==================================*/

    getFilter(){

        return {

            branch:
                APP.filter.branch,

            month:
                APP.filter.month,

            year:
                APP.filter.year

        };

    },


    /*==================================
    CREATE CACHE KEY
    ==================================*/

    key(filter){

        return (
            filter.branch +
            "_" +
            filter.year +
            "_" +
            filter.month
        );

    },


    /*==================================
    SYNC OMSET
    ==================================*/

    async omset(){

        const filter =
            this.getFilter();


        const response =
            await API.getOmset(
                filter
            );


        if(!response.success){

            throw new Error(
                response.message ||
                "Gagal mengambil data omset."
            );

        }


        await LocalDB.save(
            "omset",
            {

                key:
                    this.key(filter),

                branch:
                    filter.branch,

                month:
                    filter.month,

                year:
                    filter.year,

                data:
                    response.data,

                updatedAt:
                    new Date().toISOString()

            }
        );


        return response.data;

    },


    /*==================================
    SYNC EXPENSE
    ==================================*/

    async expense(){

        const filter =
            this.getFilter();


        const response =
            await API.getExpense(
                filter
            );


        if(!response.success){

            throw new Error(
                response.message ||
                "Gagal mengambil data expense."
            );

        }


        await LocalDB.save(
            "expense",
            {

                key:
                    this.key(filter),

                branch:
                    filter.branch,

                month:
                    filter.month,

                year:
                    filter.year,

                data:
                    response.data,

                updatedAt:
                    new Date().toISOString()

            }
        );


        return response.data;

    },


    /*==================================
    STARTUP SYNC
    ==================================*/

    async startup(){

        console.log(
            "SYNC FILTER:",
            this.getFilter()
        );


        await this.omset();


        await this.expense();


        console.log(
            "SYNC LOCAL DATA SELESAI"
        );


        return true;

    },


    /*==================================
    GET LOCAL OMSET
    ==================================*/

    async getOmset(){

        const filter =
            this.getFilter();


        return await LocalDB.get(
            "omset",
            this.key(filter)
        );

    },


    /*==================================
    GET LOCAL EXPENSE
    ==================================*/

    async getExpense(){

        const filter =
            this.getFilter();


        return await LocalDB.get(
            "expense",
            this.key(filter)
        );

    }

};