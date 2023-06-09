chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        patterns: [
            {
                name: 'Slack',
                pattern: '^https:\\/\\/([\\w-]+\\.)*slack\\.com\\/archives\\/.*$',
                isEnabled: true,
            },
            {
                name: 'Zoom',
                pattern: '^https:\\/\\/(\\w+\\d+\\w+\\.)?zoom\\.us\\/j\\/\\d+(?:\\?[^#]+)?#success$',
                isEnabled: true,
            },
            {
                name: 'Miro',
                pattern: '^https:\/\/miro.com/app/board\\/.*$',
                isEnabled: false,
            },
        ],
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(["patterns"], function(data) {
        if (changeInfo.status === 'complete' && checkUrl(data.patterns, tab.url)) {
            setTimeout(function() {
                chrome.windows.get(tab.windowId, null, (window) => {
                    if (!window.focused) {
                        chrome.tabs.remove(tab.id)
                    }
                })
            }, 250);
        }
    });

});

function checkUrl(patterns, url) {
    for (const pattern of patterns) {
        if (!pattern.isEnabled) {
            continue
        }

        const regex = new RegExp(pattern.pattern)
        if (regex.test(url)) {
            return true
        }
    }

    return false
}
