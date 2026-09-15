// Check if already activated
chrome.storage.local.get(['license'], async (result) => {
  if (result.license) {
    document.getElementById('licenseDiv').style.display='none';
    document.getElementById('mainDiv').style.display='block';
  }
});

document.getElementById('activate').onclick = async () => {
  const key = document.getElementById('key').value;
  document.getElementById('msg').innerText = 'Checking...';
  
  const res = await fetch('https://savebucks-vercel-deploy.vercel.app/api/verify', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({license_key: key})
  });
  const data = await res.json();
  
  if (data.valid) {
    chrome.storage.local.set({license: key});
    document.getElementById('licenseDiv').style.display='none';
    document.getElementById('mainDiv').style.display='block';
  } else {
    document.getElementById('msg').innerText = 'Invalid Key! ❌';
  }
};