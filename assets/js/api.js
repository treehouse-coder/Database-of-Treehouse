/*======================================
TREEHOUSE POS API
======================================*/

const API = {



    url : "https://script.google.com/macros/s/AKfycbwbdP4zubNlDEkb1ciFxF4Dwl83mNSteEscK34RjTuIDlmjCPZpLY7uPJLzoG8C9WXF_g/exec",


    /*======================================
    GET PERIOD
    ======================================*/

    async getPeriod(){

        const response =
            await fetch(

                this.url +

                "?action=periode"

            );


        return await response.json();

    },


    /*======================================
SET GLOBAL PERIOD
======================================*/

async setGlobalPeriod(month, year){

    const response =
        await fetch(

            this.url +

            "?action=setGlobalPeriod" +

            "&month=" + month +

            "&year=" + year

        );

    return await response.json();

},

/*======================================
GET DASHBOARD CHART
======================================*/

async getDashboardChart(){

    const response =
        await fetch(

            this.url +

            "?action=getDashboardChart" +

            "&branch=" + APP.filter.branch +

            "&month=" + APP.filter.month +

            "&year=" + APP.filter.year

        );

    return await response.json();

},

/*======================================
GET CUSTOMER CHART
======================================*/

async getCustomerChart(){

    const response =
        await fetch(

            this.url +

            "?action=customerChart" +

            "&branch=" +
            encodeURIComponent(
                APP.filter.branch
            ) +

            "&year=" +
            encodeURIComponent(
                APP.filter.year
            )

        );

    return await response.json();

},

    /*======================================
    GET DASHBOARD
    ======================================*/

    async getDashboard(filter){

    const url =

        this.url +

        "?action=dashboard"

        + "&branch=" + encodeURIComponent(filter.branch)

        + "&month=" + filter.month

        + "&year=" + filter.year;


    


    const response =
        await fetch(url);


    const json =
        await response.json();


    


    return json;

},

/*======================================
LOGIN
======================================*/

async login(username, password){

    const start = performance.now();

    const url =

        this.url +

        "?action=login" +

        "&username=" +

        encodeURIComponent(username) +

        "&password=" +

        encodeURIComponent(password);

    console.log(
        "LOGIN START:",
        new Date().toISOString()
    );

    const fetchStart = performance.now();

    const response =
        await fetch(url, {
            method: "GET",
            cache: "no-store"
        });

    const fetchEnd = performance.now();

    console.log(
        "LOGIN FETCH:",
        Math.round(fetchEnd - fetchStart),
        "ms"
    );

    const jsonStart = performance.now();

    const result =
        await response.json();

    const jsonEnd = performance.now();

    console.log(
        "LOGIN JSON:",
        Math.round(jsonEnd - jsonStart),
        "ms"
    );

    console.log(
        "LOGIN TOTAL:",
        Math.round(performance.now() - start),
        "ms"
    );

    return result;

},
/*======================================
GET OMSET DAILY CHART
======================================*/

async getOmsetDailyChart(){

    const response =
        await fetch(

            this.url +

            "?action=getOmsetDailyChart" +

            "&branch=" +
            encodeURIComponent(
                APP.filter.branch
            ) +

            "&month=" +
            APP.filter.month +

            "&year=" +
            APP.filter.year

        );

    return await response.json();

},

/*======================================
GET CUSTOMER DAILY CHART
======================================*/

async getCustomerDailyChart(){

    const response =
        await fetch(

            this.url +

            "?action=getCustomerDailyChart" +

            "&branch=" +
            encodeURIComponent(
                APP.filter.branch
            ) +

            "&month=" +
            encodeURIComponent(
                APP.filter.month
            ) +

            "&year=" +
            encodeURIComponent(
                APP.filter.year
            )

        );

    return await response.json();

},

/*======================================
GET OMSET 
======================================*/

async getOmset(filter){

    const response =
        await fetch(

            this.url +

            "?action=omset"

            + "&branch=" + encodeURIComponent(filter.branch)

        );

    return await response.json();

},

/*======================================
GET EXPENSE
======================================*/

async getExpense(filter){

    const response =
        await fetch(

            this.url +

            "?action=expense"

            + "&branch=" +

            encodeURIComponent(filter.branch)

        );

    return await response.json();

},

/*======================================
GET MEAL TABLE
======================================*/

async getMealTable(){

    const response =
        await fetch(

            this.url +

            "?action=mealTable"

        );

    return await response.json();

},

/*======================================
GET EXPENSE TABLE
======================================*/

async getExpenseTable(filter){

    const response =
        await fetch(

            this.url +

            "?action=getExpenseTable"

            + "&branch=" +

            encodeURIComponent(filter.branch)

        );

    return await response.json();

},

/*======================================
SEARCH EXPENSE
======================================*/

async searchExpense(nama, branch){

    const response =
        await fetch(

            this.url +

            "?action=searchExpense" +

            "&nama=" +
            encodeURIComponent(nama) +

            "&branch=" +
            encodeURIComponent(branch)

        );

    return await response.json();

},

/*======================================
PRINT MEAL PDF
======================================*/

async printMeal(){

    const response =
        await fetch(

            this.url +

            "?action=printMeal"

        );

    return await response.json();

},

/*======================================
PRINT EXPENSE KARAWACI
======================================*/

async printExpenseKarawaci(){

    const response =
        await fetch(

            this.url +

            "?action=printExpenseKarawaci"

        );

    return await response.json();

},


/*======================================
PRINT EXPENSE GLAZE
======================================*/

async printExpenseGlaze(){

    const response =
        await fetch(

            this.url +

            "?action=printExpenseGlaze"

        );

    return await response.json();

},

/*======================================
GET OMSET TABLE
======================================*/

async getOmsetTable(filter){

    const response =
        await fetch(

            this.url +

            "?action=getOmsetTable"

            + "&branch=" +

            encodeURIComponent(filter.branch)

        );

    return await response.json();

},

/*======================================
PRINT OMSET KARAWACI
======================================*/

async printOmsetKarawaci(){

    const response =
        await fetch(

            this.url +

            "?action=printOmsetKarawaci"

        );

    return await response.json();

},

/*======================================
PRINT OMSET GLAZE
======================================*/

async printOmsetGlaze(){

    const response =
        await fetch(

            this.url +

            "?action=printOmsetGlaze"

        );

    return await response.json();

},

/*======================================
PRINT COMMISSION KARAWACI
======================================*/

async printCommissionKarawaci(){

    const response =
        await fetch(

            this.url +

            "?action=printCommissionKarawaci"

        );

    return await response.json();

},


/*======================================
PRINT COMMISSION GLAZE
======================================*/

async printCommissionGlaze(){

    const response =
        await fetch(

            this.url +

            "?action=printCommissionGlaze"

        );

    return await response.json();

},

/*======================================
PRINT SALARY15 KARAWACI
======================================*/

async printSalary15Karawaci(){

    const response =
        await fetch(

            this.url +

            "?action=printSalary15Karawaci"

        );

    return await response.json();

},

/*======================================
PRINT SALARY15 GLAZE
======================================*/

async printSalary15Glaze(){

    const response =
        await fetch(

            this.url +

            "?action=printSalary15Glaze"

        );

    return await response.json();

},

/*======================================
GET COMMISSION TABLE
======================================*/

async getCommissionTable(filter){

    const response =
        await fetch(

            this.url +

            "?action=getCommissionTable"

            + "&branch=" +

            encodeURIComponent(filter.branch)

        );

    return await response.json();

},
/*======================================
GET SALARY15 TABLE
======================================*/

async getSalary15Table(filter){

    const response =
        await fetch(

            this.url +

            "?action=getSalary15Table"

            + "&branch=" +

            encodeURIComponent(filter.branch)

        );

    return await response.json();

},

/*======================================
GET HR DASHBOARD
======================================*/

async getHRDashboard(){

    const response =
        await fetch(

            this.url +

            "?action=hrDashboard"

        );

    return await response.json();

},

/*======================================
GET EMPLOYEE
======================================*/

async getEmployee(){

    const url =

        this.url +

        "?action=getEmployee";

    console.log("REQUEST URL :", url);

    const response =
        await fetch(url);

    const json =
        await response.json();

    console.log("API RESPONSE :", json);

    return json;

},

/*======================================
UPDATE EMPLOYEE
======================================*/

async updateEmployee(data){

    const params =

        new URLSearchParams({

            action : "updateEmployee",

            id : data.id,

            nama : data.nama,

            cabang : data.cabang,

            posisi : data.posisi,

            gender : data.gender,

            alamat : data.alamat,

            ktp : data.ktp,

            tanggalMasuk : data.tanggalMasuk,

            hp : data.hp,

            status : data.status

        });

    const response =

        await fetch(

            this.url +

            "?" +

            params.toString()

        );

    return await response.json();

},

/*======================================
ADD EMPLOYEE
======================================*/

async addEmployee(data){

    const params =

        new URLSearchParams({

            action : "addEmployee",

            nama : data.nama,

            cabang : data.cabang,

            posisi : data.posisi,

            gender : data.gender,

            alamat : data.alamat,

            ktp : data.ktp,

            tanggalMasuk : data.tanggalMasuk,

            hp : data.hp,

            status : data.status

        });

    const response =

        await fetch(

            this.url +

            "?" +

            params.toString()

        );

    return await response.json();

},

/*======================================
GET SLIP
======================================*/

async getSlip(nama){

    const response =
        await fetch(

            this.url +

            "?action=getSlip"

            + "&nama=" +

            encodeURIComponent(nama)

        );

    return await response.json();

},

/*======================================
PRINT SLIP
======================================*/

async printSlip(nama){

    const response =
        await fetch(

            this.url +

            "?action=printSlip"

            + "&nama=" +

            encodeURIComponent(nama)

        );

    return await response.json();

},


/*======================================
SAVE SIGNATURE
======================================*/

async saveSignature(image){

   

    const form = new FormData();

    form.append("action","saveSignature");
    form.append("image",image);

    

    const response = await fetch(

        this.url,

        {

            method : "POST",

            body : form

        }

    );

    return await response.json();

},


}