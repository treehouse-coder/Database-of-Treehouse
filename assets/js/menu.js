/*======================================
MENU NAVIGATION
======================================*/

const menuLinks =
    document.querySelectorAll(".menu a");

const pageTitle =
    document.querySelector(".header h1");


menuLinks.forEach(link=>{

    link.addEventListener("click",function(event){

        event.preventDefault();

        menuLinks.forEach(item=>{

            item.classList.remove("active");

        });

        this.classList.add("active");


        const page =
    this.dataset.page;

Page.set(page);

localStorage.setItem(

    "treehouse_last_page",

    page

);


        pageTitle.textContent =
            this.textContent.trim();


        switch(page){

            case "dashboard":

                Dashboard.init();

                break;

            case "omset":

                Omset.init();

                break;

            case "expense":

                Expense.init();

                break;

            case "hr":

                Hr.init();

                break;

            case "laporan":

                Laporan.init();

                break;

        }

    });

});