chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && checkUrl(tab.url)) {
        setTimeout(function() {
            chrome.tabs.remove(tab.id);
        }, 100);
    }
});

function checkUrl(url) {
    const regex = /^https:\/\/([\w-]+\.)*slack\.com\/archives\/.*$/;

    return regex.test(url);
}
