const form = document.getElementById('uv-form');
const address = document.getElementById('uv-address');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Service Workerの登録（これがないとプロキシが働きません）
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/uv/uv.sw.js', {
                scope: __uv$config.prefix
            });
        }

        const url = address.value.trim();
        let targetUrl = url;

        // URLの形を自動修正
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.includes('.') && !url.includes(' ')) {
                targetUrl = 'https://' + url;
            } else {
                targetUrl = 'https://www.google.com/search?q=' + encodeURIComponent(url);
            }
        }

        // プロキシ経由でページを飛ばす
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(targetUrl);
    });
}