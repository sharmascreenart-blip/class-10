async function testFetch() {
  const apiKey = "AIzaSyBO22QDV4lWW3qtivA2vXBXVcqFZxQgN9Y";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Hi" }] }]
    })
  });

  const data = await response.json();
  console.log("STATUS:", response.status);
  console.log("DATA:", JSON.stringify(data, null, 2));
}

testFetch();
