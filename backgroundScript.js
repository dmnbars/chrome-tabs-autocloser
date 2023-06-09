chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && checkUrl(tab.url)) {
        setTimeout(function() {
            chrome.windows.get(tab.windowId, null, (window) => {
                if (!window.focused) {
                    chrome.tabs.remove(tab.id)
                }
            })
        }, 500);
    }
});

function checkUrl(url) {
    const regex = /^https:\/\/([\w-]+\.)*slack\.com\/archives\/.*$/;

    return regex.test(url);
}
