/*======================================
EMPLOYEE MODAL
======================================*/

const EmployeeModal = {

    element : null,

    title : null,

    body : null,

    headerAction : null,

    footer : null,

    init(){

        this.element =
            document.getElementById("employeeModal");

        this.title =
            document.getElementById("employeeModalTitle");

        this.body =
            document.getElementById("employeeModalBody");

        this.headerAction =
            document.getElementById("employeeModalHeaderAction");

        this.footer =
            document.getElementById("employeeModalFooter");

        document
            .getElementById("employeeModalClose")
            .addEventListener("click",()=>{

                this.hide();

            });

    },

    show(options={}){

        

        this.title.textContent =
            options.title || "";

        this.body.innerHTML =
            options.body || "";

        this.headerAction.innerHTML = "";
        this.footer.innerHTML = "";

        (options.buttons || []).forEach(button=>{

            const btn =
                document.createElement("button");

            btn.className =
                button.outline
                ? "btn btn-outline"
                : "btn";

            btn.innerHTML =

                `<i class="fa-solid ${button.icon || ""}"></i>
                 ${button.text}`;

            btn.onclick =
                button.action;

            this.headerAction.appendChild(btn);

        });

        this.element.classList.add("show");

    },

    hide(){

        this.element.classList.remove("show");

        this.body.innerHTML = "";

        this.headerAction.innerHTML = "";

        this.footer.innerHTML = "";

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        EmployeeModal.init();

    }

);