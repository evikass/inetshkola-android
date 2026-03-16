// Test image generation API directly
async function testImageAPI() {
  const baseUrl = "http://172.25.136.193:8080/v1";
  
  console.log("Testing image generation API availability...\n");
  
  // Test 1: Check if the images endpoint exists
  console.log("1. Testing endpoint availability...");
  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: 'OPTIONS'
    });
    console.log(`  OPTIONS status: ${response.status}`);
  } catch (e: any) {
    console.log(`  Error: ${e.message}`);
  }
  
  // Test 2: Try with minimal payload
  console.log("\n2. Trying with minimal payload...");
  try {
    const response = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': 'Z.ai',
        'Authorization': 'Bearer Z.ai'
      },
      body: JSON.stringify({
        prompt: "test",
        size: "1024x1024"
      })
    });
    console.log(`  POST status: ${response.status}`);
    const text = await response.text();
    console.log(`  Response: ${text.substring(0, 300)}`);
  } catch (e: any) {
    console.log(`  Error: ${e.message}`);
  }
  
  // Test 3: Check chat completions as a baseline
  console.log("\n3. Testing chat completions (baseline)...");
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Z.ai'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 10
      })
    });
    console.log(`  POST status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`  Chat works! Response preview: ${JSON.stringify(data).substring(0, 100)}...`);
    }
  } catch (e: any) {
    console.log(`  Error: ${e.message}`);
  }
  
  // Test 4: List available endpoints
  console.log("\n4. Checking base URL...");
  try {
    const response = await fetch(`${baseUrl}`);
    console.log(`  Base status: ${response.status}`);
    const text = await response.text();
    console.log(`  Response: ${text.substring(0, 200)}`);
  } catch (e: any) {
    console.log(`  Error: ${e.message}`);
  }
}

testImageAPI();
