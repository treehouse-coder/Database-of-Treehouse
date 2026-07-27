/*======================================
PAGE MANAGER
======================================*/

const Page = {

    current : "dashboard",


    /*==================================
    SET PAGE
    ==================================*/

    set(name){

        this.current = name;

    },


    /*==================================
REFRESH
==================================*/

async refresh(){

    switch(this.current){

        case "dashboard":

            await Dashboard.refresh();

            break;

        case "omset":

            await Omset.refresh();

            break;

        case "expense":

            await Expense.refresh();

            break;

        case "hr":

            await Hr.refresh();

            break;

        case "laporan":

            await Laporan.refresh();

            break;

        default:

            await Dashboard.refresh();

    }

}

};