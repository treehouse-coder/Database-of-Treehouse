/*======================================
GLOBAL FILTER
======================================*/

const Filter = {


    init(){

    APP.filter.branch =

        document
        .getElementById("filterBranch")
        .value;

    loadPeriods();

    this.event();

},

  

    event(){


        document
        .getElementById("filterBranch")
        .addEventListener("change",e=>{


            APP.filter.branch =
                e.target.value;

        Modal.hide();
        Page.refresh();


        });



       document
.getElementById("filterPeriod")
.addEventListener("change", async function(){

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

        alert(result.message);

        return;

    }

    Modal.hide();
    await Page.refresh();

});


        document
    .getElementById("refreshData")
    .addEventListener("click",async()=>{

    await Page.refresh();

    });
    }


};



/*======================================
LOAD PERIOD
======================================*/

async function loadPeriods(){

    const select =
        document.getElementById("filterPeriod");


    select.innerHTML = "";


    const response =
        await API.getPeriod();


    if(!response.success){

        return;

    }


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


    response.data.forEach(period=>{

        if(!period || !period.includes("-")){

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
            document.createElement("option");


        option.value =
            period;


        option.textContent =
            `${months[month]} ${year.slice(2)}`;


        select.appendChild(option);

    });

}

