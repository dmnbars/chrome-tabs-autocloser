chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && checkUrl(tab.url)) {
        setTimeout(function() {
            chrome.windows.get(tab.windowId, null, (window) => {
                if (!window.focused) {
                    chrome.tabs.remove(tab.id)
                }
            })
        }, 250);
    }
});

function checkUrl(url) {
    const regexes = [
        new RegExp('^https:\\/\\/([\\w-]+\\.)*slack\\.com\\/archives\\/.*$'),
        new RegExp('^https:\\/\\/(\\w+\\d+\\w+\\.)?zoom\\.us\\/j\\/\\d+(?:\\?[^#]+)?#success$'),
    ];

    for (const regex of regexes) {
        if (regex.test(url)) {
            return true
        }
    }

    return false
}
