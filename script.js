document.getElementById('downloadButton').addEventListener('click', function () {
    let youtubeUrl = document.getElementById('youtubeUrl').value;
    let statusElement = document.getElementById('status');

    if (!youtubeUrl) {
        statusElement.textContent = 'Por favor, insira o URL do YouTube.';
        return;
    }

    statusElement.textContent = 'Processando...';

    // Fazendo a chamada para uma API de conversão
    fetch(`https://api.y2mate.com/download?url=${encodeURIComponent(youtubeUrl)}&format=mp3`)
        .then(response => response.json())
        .then(data => {
            if (data && data.downloadUrl) {
                statusElement.textContent = 'Música pronta para download!';
                let downloadLink = document.createElement('a');
                downloadLink.href = data.downloadUrl;  // Supondo que a resposta tenha a URL de download
                downloadLink.download = 'musica.mp3';
                downloadLink.textContent = 'Clique aqui para baixar';
                statusElement.appendChild(downloadLink);
            } else {
                statusElement.textContent = 'Erro: Não foi possível obter a música.';
            }
        })
        .catch(error => {
            statusElement.textContent = 'Erro: ' + error.message;
        });
});
