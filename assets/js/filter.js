/*======================================
GLOBAL FILTER
======================================*/

window.Filter = {

    /*==================================
    INIT
    ==================================*/

    async init(){

        const branch =
            document.getElementById(
                "filterBranch"
            );

        const period =
            document.getElementById(
                "filterPeriod"
            );

        if(!branch || !period){

            console.error(
                "Filter element tidak ditemukan."
            );

            return;
        }


        /*==================================
        SET INITIAL BRANCH
        ==================================*/

        APP.filter.branch =
            branch.value;


        /*==================================
        LOAD PERIOD
        ==================================*/

        await loadPeriods();


        /*==================================
        EVENT
        ==================================*/

        this.event();

    },


    /*==================================
    EVENT
    ==================================*/

    event(){

        const branch =
            document.getElementById(
                "filterBranch"
            );

        const period =
            document.getElementById(
                "filterPeriod"
            );

        const refresh =
            document.getElementById(
                "refreshData"
            );


        /*==================================
        BRANCH
        ==================================*/

        if(branch){

            branch.addEventListener(
                "change",
                async e => {

                    APP.filter.branch =
                        e.target.value;


                    Modal.hide();


                    await Page.refresh();

                }
            );

        }


        /*==================================
        PERIOD
        ==================================*/

        if(period){

            period.addEventListener(
                "change",
                async function(){

                    const value =
                        this.value.split("-");


                    APP.filter.year =
                        Number(value[0]);


                    APP.filter.month =
                        Number(value[1]);


                    const result =
                        await API.setGlobalPeriod(
                            APP.filter.month,
                            APP.filter.year
                        );


                    if(!result.success){

                        alert(
                            result.message
                        );

                        return;

                    }


                    Modal.hide();


                    await Page.refresh();

                }
            );

        }


        /*==================================
        REFRESH
        ==================================*/

        if(refresh){

            refresh.addEventListener(
                "click",
                async ()=>{

                    await Page.refresh();

                }
            );

        }

    }

};


/*======================================
LOAD PERIOD
======================================*/

async function loadPeriods(){

    const select =
        document.getElementById(
            "filterPeriod"
        );


    if(!select){

        console.error(
            "filterPeriod tidak ditemukan."
        );

        return;

    }


    select.innerHTML = "";


    /*==================================
    GET PERIOD
    ==================================*/

    const response =
        await API.getPeriod();


    if(!response.success){

        console.error(
            "Gagal mengambil periode:",
            response.message
        );

        return;

    }


    /*==================================
    MONTH NAME
    ==================================*/

    const months = {

        "01":"Jan",
        "02":"Feb",
        "03":"Mar",
        "04":"Apr",
        "05":"Mei",
        "06":"Jun",
        "07":"Jul",
        "08":"Agu",
        "09":"Sep",
        "10":"Okt",
        "11":"Nov",
        "12":"Des"

    };


    /*==================================
    CREATE OPTIONS
    ==================================*/

    response.data.forEach(
        period => {

            if(
                !period ||
                !period.includes("-")
            ){

                return;

            }


            const value =
                period.split("-");


            const year =
                value[0];


            const month =
                value[1];


            if(!months[month]){

                return;

            }


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                period;


            option.textContent =
                `${months[month]} ${year.slice(2)}`;


            select.appendChild(
                option
            );

        }
    );


    /*==================================
    SET ACTIVE PERIOD
    ==================================*/

    const currentPeriod =
        `${APP.filter.year}-` +
        String(APP.filter.month)
            .padStart(2,"0");


    const currentExists =
        [...select.options]
        .some(
            option =>
                option.value ===
                currentPeriod
        );


    if(currentExists){

        select.value =
            currentPeriod;

    }

    else if(select.options.length){

        select.selectedIndex =
            0;


        const value =
            select.value.split("-");


        APP.filter.year =
            Number(value[0]);


        APP.filter.month =
            Number(value[1]);

    }

}