// Test different auth methods
const baseUrl = "http://172.25.136.193:8080/v1";

async function testAuth() {
  const body = {
    prompt: "A simple red circle on white background",
    size: "1024x1024"
  };
  
  console.log("Testing different auth methods...\n");
  
  // Test 1: X-Token header with Z.ai
  console.log("Test 1: X-Token: Z.ai");
  try {
    const r1 = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Token': 'Z.ai' },
      body: JSON.stringify(body)
    });
    console.log(`  Status: ${r1.status}`);
    const t1 = await r1.text();
    console.log(`  Response: ${t1.substring(0, 200)}\n`);
  } catch (e: any) { console.log(`  Error: ${e.message}\n`); }
  
  // Test 2: Authorization Bearer
  console.log("Test 2: Authorization: Bearer Z.ai");
  try {
    const r2 = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer Z.ai' },
      body: JSON.stringify(body)
    });
    console.log(`  Status: ${r2.status}`);
    const t2 = await r2.text();
    console.log(`  Response: ${t2.substring(0, 200)}\n`);
  } catch (e: any) { console.log(`  Error: ${e.message}\n`); }
  
  // Test 3: Both headers
  console.log("Test 3: Both X-Token and Authorization");
  try {
    const r3 = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Token': 'Z.ai',
        'Authorization': 'Bearer Z.ai'
      },
      body: JSON.stringify(body)
    });
    console.log(`  Status: ${r3.status}`);
    const t3 = await r3.text();
    console.log(`  Response: ${t3.substring(0, 200)}\n`);
  } catch (e: any) { console.log(`  Error: ${e.message}\n`); }
  
  // Test 4: X-API-Key
  console.log("Test 4: X-API-Key: Z.ai");
  try {
    const r4 = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': 'Z.ai' },
      body: JSON.stringify(body)
    });
    console.log(`  Status: ${r4.status}`);
    const t4 = await r4.text();
    console.log(`  Response: ${t4.substring(0, 200)}\n`);
  } catch (e: any) { console.log(`  Error: ${e.message}\n`); }
  
  // Test 5: No auth
  console.log("Test 5: No authentication header");
  try {
    const r5 = await fetch(`${baseUrl}/images/generations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    console.log(`  Status: ${r5.status}`);
    const t5 = await r5.text();
    console.log(`  Response: ${t5.substring(0, 200)}\n`);
  } catch (e: any) { console.log(`  Error: ${e.message}\n`); }
}

testAuth();
