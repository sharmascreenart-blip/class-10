async function listModels() {
  const apiKey = "AIzaSyA_5pyIm2kg8I1QadFIkOKEoh5BDvo4noo";
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  console.log("STATUS:", response.status);
  console.log("DATA:", JSON.stringify(data, null, 2));
}

listModels();
