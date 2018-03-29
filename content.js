/*
    Show if video on youtube is monetized, not monetized or demonetized 
    by looking for "adsense_video_doc_id" in the source code of YouTube video.

    @author: blackCheetah / NamFlow
    @github: https://github.com/blackCheetah
    @youtube: https://www.youtube.com/channel/UC5juVudK51sv04jbM1xjyaw
    @version: 0.1.0
*/

window.onload = function() {
    check_adsense()
}

function check_adsense() {
    const word = 'adsense_video_doc_id'
    var body_HTML = document.body.innerHTML
    var searchPattern = new RegExp('(\\w*' + word + '\\w*)', 'gi')
    var matches = body_HTML.match(searchPattern)

    if (matches === null ) {
        add_symbol('demonetized')
    } else {
        add_symbol('monetized')
    }
}

function add_symbol(image) {
    var symbol = document.createElement("img")
    //var eow_title = document.getElementById('eow-title')
    var watch_title_container = document.querySelector('#watch-headline-title > h1')
    //var old_title = eow_title.textContent

    if (image == 'monetized') {
        symbol.src = chrome.extension.getURL('icons/monetized.png')
        symbol.title = 'This video is monetized'
    } else {
        symbol.src = chrome.extension.getURL('icons/demonetized.png')
        symbol.title = 'This video is not monitized or demonetized'
    }

    watch_title_container.insertAdjacentElement('afterbegin', symbol)
}
