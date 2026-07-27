/*======================================
SIGNATURE MODAL
======================================*/

const SignatureModal = {

    canvas : null,

    ctx : null,

    drawing : false,

    callback : null,

    show(

        employeeName = "",

        callback = null

    ){

        this.employeeName = employeeName;

        this.callback = callback;

        document
            .getElementById("signatureModal")
            .classList.add("show");

        this.canvas =

            document.getElementById("signatureCanvas");

        this.ctx =

            this.canvas.getContext("2d");

        this.resizeCanvas();

        this.ctx.lineWidth = 2;

        this.ctx.lineCap = "round";

        this.bindEvents();

    },

    init(){

        document
            .getElementById("signatureClose")
            .addEventListener("click",()=>{

                this.hide();

            });

    },

    hide(){

        document
            .getElementById("signatureModal")
            .classList.remove("show");

    },

    resizeCanvas(){

        const rect =

            this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width;

        this.canvas.height = rect.height;

    },

    bindEvents(){

        const c = this.canvas;

        c.onmousedown = e=>this.start(e);

        c.onmousemove = e=>this.move(e);

        c.onmouseup = ()=>this.stop();

        c.onmouseleave = ()=>this.stop();

        c.ontouchstart = e=>this.start(e.touches[0]);

        c.ontouchmove = e=>{

            e.preventDefault();

            this.move(e.touches[0]);

        };

        c.ontouchend = ()=>this.stop();

    },

    getPos(e){

        const rect =

            this.canvas.getBoundingClientRect();

        return{

            x : e.clientX - rect.left,

            y : e.clientY - rect.top

        };

    },

    start(e){

        this.drawing = true;

        const p = this.getPos(e);

        this.ctx.beginPath();

        this.ctx.moveTo(p.x,p.y);

    },

    move(e){

        if(!this.drawing){

            return;

        }

        const p = this.getPos(e);

        this.ctx.lineTo(p.x,p.y);

        this.ctx.stroke();

    },

    stop(){

        this.drawing = false;

    },

    clear(){

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

    },

    async save(){

        const image =

            this.canvas.toDataURL("image/png");

        Loading.show(

            "Menyimpan tanda tangan..."

        );

        try{

            const result =

                await API.saveSignature(

                    image

                );

            if(!result.success){

                alert(result.message);

                return;

            }

            this.hide();

            if(typeof this.callback === "function"){

                this.callback();

            }

        }

        finally{

            Loading.hide();

        }

    }

};