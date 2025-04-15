

async function uploadToGoogleDrive(file) {
   
    const ACCESS_TOKEN = 'ya29.a0AZYkNZi_BLFdMXp8Ja8wsSwAvdGj6tiQBkaGVv_JNFgK8km_ZgTXRP8TUlDBz6zoTtHItKTiAdWxI5pgMnYZtLGHKPF_86Oe1sF8uS1-_xvAlHbgG54pRVYiNgqazfJk3LzGan_e652h_9TxJ19ht9Nlwq924gdTRe7M2GnEaCgYKAUcSARASFQHGX2Mi-A58Kk6R8DW4W_O9-vIIGA0175';
    const UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

    const metadata = {
        name: file.name,
        mimeType: file.type || 'application/octet-stream' // Mime type générique si non spécifié
    };

    const formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    formData.append("file", file);

    // Upload request
    const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        body: formData
    });

    //  
    if (!response.ok) throw new Error('Upload échoué');
    const data = await response.json();
    console.log('Fichier uploadé avec succès :', data);
    alert('Fichier uploadé sur Google Drive !');
}

// 
document.getElementById('file').addEventListener('change', async function(event) {
    const file = event.target.files[0];

    // Upload msg
    alert('Super ! Upload en cours...');
    try {
        // Appel de la fonction d'upload
        await uploadToGoogleDrive(file);
    } catch (error) {
        console.error('Erreur Google Drive:', error);
        alert('Échec de l\'upload.');
    }
});



