/*======================================
UTILITIES
======================================*/

/**
 * Format angka menjadi Rupiah
 * Contoh:
 * 1500000 -> Rp 1.500.000
 */

function formatRupiah(value){

    return new Intl.NumberFormat("id-ID",{

        style:"currency",

        currency:"IDR",

        maximumFractionDigits:0

    }).format(value);

}


/**
 * Format tanggal Indonesia
 */

function formatDate(date){

    return new Intl.DateTimeFormat("id-ID",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    }).format(date);

}


/**
 * Ambil tanggal hari ini
 */

function today(){

    return new Date();

}


/**
 * Shortcut mencari element
 */

function $(selector){

    return document.querySelector(selector);

}


/**
 * Shortcut mencari banyak element
 */

function $$(selector){

    return document.querySelectorAll(selector);

}

/*======================================
PAGE
======================================*/

function renderPage(html){

    const pageContainer =
        document.getElementById("dashboard");

    if(!pageContainer){

        return;

    }

    pageContainer.innerHTML = html;

}

/*======================================
HEADER
======================================*/

function setToday(){

    const headerDate = document.querySelector(".header-date");

    if(!headerDate) return;

    headerDate.textContent = formatDate(today());

}

/*======================================
MONTH
======================================*/

function getMonths(){

    return [

        "Januari",

        "Februari",

        "Maret",

        "April",

        "Mei",

        "Juni",

        "Juli",

        "Agustus",

        "September",

        "Oktober",

        "November",

        "Desember"

    ];

}