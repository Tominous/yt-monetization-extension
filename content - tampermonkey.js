// ==UserScript==
// @name         YouTube - (de)Monetized
// @namespace    https://github.com/blackCheetah
// @version      0.2
// @description  Show if video on youtube is monetized, not monetized or demonetized by looking for "adsense_video_doc_id" in the source code of YouTube video.
// @author       blackCheetah | @github: https://github.com/blackCheetah
// @match        https://www.youtube.com/watch?v=*
// @grant        GM_addStyle
// ==/UserScript==


GM_addStyle(
    "#monetization_symbol { position: relative; top: 2px; margin-right: 5px; }"
);

window.onload = function() {
    check_adsense()
}

function check_adsense() {
    const ad_string = 'adsense'
    const ad_string_2 = 'pagead2'
    var body_HTML = document.body.innerHTML
    var searchPattern = new RegExp('(\\w*' + ad_string + '\\w*)|(\\w*' + ad_string_2 + '\\w*)', 'gi')
    var matches = body_HTML.match(searchPattern)

    if (matches === null ) {
        add_symbol('demonetized')
    } else {
        add_symbol('monetized')
    }
}

function add_symbol(image) {
    var symbol = document.createElement("img")
    symbol.id = 'monetization_symbol'
    var eow_title = document.getElementById('eow-title')
    var watch_title_container = document.querySelector('#container > h1')
    var old_title = eow_title.textContent

    if (image == 'monetized') {
        symbol.src = 'https://i.imgur.com/VWwDpLF.png'
        symbol.title = 'This video is monetized'
    } else {
        symbol.src = 'https://i.imgur.com/kgt4EIR.png'
        symbol.title = 'This video is not monitized or demonetized'
    }

    watch_title_container.insertAdjacentElement('afterbegin', symbol)
}
