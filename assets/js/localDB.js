/*======================================
TREEHOUSE LOCAL DATABASE
INDEXEDDB
======================================*/

const LocalDB = {

    /*======================================
    CONFIG
    ======================================*/

    name: "TreehouseDB",
    version: 1,

    db: null,


    /*======================================
    OPEN DATABASE
    ======================================*/

    async open(){

        if(this.db){
            return this.db;
        }

        return new Promise((resolve, reject) => {

            const request =
                indexedDB.open(
                    this.name,
                    this.version
                );


            /*==================================
            CREATE / UPDATE DATABASE
            ==================================*/

            request.onupgradeneeded = (event) => {

                const db =
                    event.target.result;


                /*==============================
                OMSET
                ==============================*/

                if(!db.objectStoreNames.contains("omset")){

                    db.createObjectStore(
                        "omset",
                        {
                            keyPath: "key"
                        }
                    );

                }


                /*==============================
                EXPENSE
                ==============================*/

                if(!db.objectStoreNames.contains("expense")){

                    db.createObjectStore(
                        "expense",
                        {
                            keyPath: "key"
                        }
                    );

                }


                /*==============================
                DASHBOARD
                ==============================*/

                if(!db.objectStoreNames.contains("dashboard")){

                    db.createObjectStore(
                        "dashboard",
                        {
                            keyPath: "key"
                        }
                    );

                }

            };


            /*==================================
            SUCCESS
            ==================================*/

            request.onsuccess = () => {

                this.db =
                    request.result;

                resolve(this.db);

            };


            /*==================================
            ERROR
            ==================================*/

            request.onerror = () => {

                reject(
                    request.error
                );

            };

        });

    },


    /*======================================
    SAVE
    ======================================*/

    async save(storeName, data){

        const db =
            await this.open();

        return new Promise((resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    storeName
                );

            const request =
                store.put(data);


            request.onsuccess = () => {

                resolve(true);

            };


            request.onerror = () => {

                reject(
                    request.error
                );

            };

        });

    },


    /*======================================
    GET
    ======================================*/

    async get(storeName, key){

        const db =
            await this.open();

        return new Promise((resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readonly"
                );

            const store =
                transaction.objectStore(
                    storeName
                );

            const request =
                store.get(key);


            request.onsuccess = () => {

                resolve(
                    request.result || null
                );

            };


            request.onerror = () => {

                reject(
                    request.error
                );

            };

        });

    },


    /*======================================
    DELETE
    ======================================*/

    async delete(storeName, key){

        const db =
            await this.open();

        return new Promise((resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    storeName
                );

            const request =
                store.delete(key);


            request.onsuccess = () => {

                resolve(true);

            };


            request.onerror = () => {

                reject(
                    request.error
                );

            };

        });

    },


    /*======================================
    CLEAR
    ======================================*/

    async clear(storeName){

        const db =
            await this.open();

        return new Promise((resolve, reject) => {

            const transaction =
                db.transaction(
                    storeName,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    storeName
                );

            const request =
                store.clear();


            request.onsuccess = () => {

                resolve(true);

            };


            request.onerror = () => {

                reject(
                    request.error
                );

            };

        });

    }

};