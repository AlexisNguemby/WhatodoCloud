

async function uploadToGoogleDrive(file) {
   
    const ACCESS_TOKEN = ' WIP ! INSERT TOKKEN HERE ps: onlyAvailable  1hour you can use Node.js to refresh it';
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



