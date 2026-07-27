const HrMeal = {

    init(){

    const content =
        document.getElementById("hr-content");

    content.innerHTML =
        this.page();

    this.event();

    this.load();

},

    page(){

    return `

    

`;

},


/*======================================
PREVIEW
======================================*/

async preview(){

    Loading.show("Memuat Preview...");

    try{

        const result =
            await API.getMealTable();

        if(!result.success){

            alert(result.message);

            return;

        }

        Modal.show(

    "Preview Uang Makan",

    result.html,

    async()=>{

        const result =
            await API.printMeal();

        if(result.success){

            Modal.hide();

            SuccessModal.show({

                title : "PDF Berhasil Dibuat",

                fileName : result.fileName,

                folderUrl : result.folderUrl || ""

            });

        }else{

            alert(result.message);

        }

    }

);

    }finally{

        Loading.hide();

    }

},


    async load(){

  
},


/*======================================
EVENT
======================================*/

event(){


},

/*======================================
REFRESH
======================================*/

refresh(){},


};

