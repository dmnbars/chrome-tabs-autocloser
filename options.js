// Загрузка сохраненных настроек
chrome.storage.sync.get(["patterns"], function(data) {
    console.log(data.patterns)
    for (const pattern of data.patterns) {
        const div = document.createElement("div");
        div.className = "block";

        const label = document.createElement("label");
        label.htmlFor = "pattern";
        label.textContent = pattern.name;

        const inputText = document.createElement("input");
        inputText.type = "text";
        inputText.id = "pattern";
        inputText.name = "pattern";
        inputText.style.width = "20%";
        inputText.disabled = true;
        inputText.value = pattern.pattern;

        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = "checkbox";
        inputCheckbox.id = "isEnabled";
        inputCheckbox.name = "isEnabled";
        inputCheckbox.checked = pattern.isEnabled;

        div.appendChild(label);
        div.appendChild(inputText);
        div.appendChild(inputCheckbox);

        document.body.querySelector("#settings-form #patterns").appendChild(div);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#settings-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const blocks = document.querySelectorAll('.block');
        let patterns = []
        for (const block of blocks) {
            patterns.push({
                name: block.querySelector('label').textContent,
                pattern: block.querySelector('input[name="pattern"]').value,
                isEnabled: block.querySelector('input[name="isEnabled"]').checked,
            })
        }

        chrome.storage.sync.set({patterns: patterns});
    });
});
