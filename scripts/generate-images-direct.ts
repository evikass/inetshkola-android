// Direct image generation with X-Token header
const baseUrl = "http://172.25.136.193:8080/v1";
const token = "Z.ai";

const outputDir = '/home/z/my-project/public/images/lessons';

import fs from 'fs';
import path from 'path';

// Ensure directories exist
const dirs = ['history', 'biology', 'geography', 'physics'];
dirs.forEach(dir => {
  const fullPath = path.join(outputDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const images = [
  // 5 класс - История
  {
    prompt: "Ancient Egypt pyramids at sunset, golden sand desert with Nile river, sphinx silhouette, warm orange and golden colors, educational illustration style, no text, clean diagram style",
    output: "history/ancient-egypt.png"
  },
  {
    prompt: "Ancient Greece Parthenon temple on Acropolis hill, white marble columns, blue Mediterranean sky, olive trees, educational illustration style, no text, clean artistic style",
    output: "history/ancient-greece.png"
  },
  {
    prompt: "Ancient Rome Colosseum amphitheater, Roman architecture with arches, sunny day, Roman forum ruins in background, educational illustration style, no text, warm colors",
    output: "history/ancient-rome.png"
  },
  {
    prompt: "Ancient Rus wooden fortress on hill, Orthodox church domes, snowy landscape, wooden houses, medieval Russian architecture, educational illustration, no text",
    output: "history/ancient-rus.png"
  },
  // 5 класс - Биология
  {
    prompt: "Plant cell diagram cross-section view, nucleus, mitochondria, cell membrane, chloroplasts, vacuole, scientific educational illustration, no text labels, colorful diagram style",
    output: "biology/plant-cell.png"
  },
  {
    prompt: "Bacteria forms diagram showing cocci spheres, bacilli rods, spirilla spirals, microscopic view, scientific educational illustration, no text, clean diagram",
    output: "biology/bacteria-forms.png"
  },
  {
    prompt: "Mushroom structure diagram showing cap, gills, stem, mycelium underground network, forest floor, educational illustration, no text, earthy colors",
    output: "biology/mushroom-structure.png"
  },
  // 6 класс - Биология
  {
    prompt: "Animal tissue types diagram showing epithelial, connective, muscle, nervous tissues with cells, scientific educational illustration, no text, microscope view style",
    output: "biology/animal-tissues.png"
  },
  {
    prompt: "Plant tissue cross-section showing xylem phloem vessels, leaf structure, root tip, educational illustration, no text, scientific diagram style",
    output: "biology/plant-tissues.png"
  },
  {
    prompt: "Ecosystem food chain diagram with sun, grass, rabbit, fox, decomposer mushrooms, energy flow arrows, educational illustration, no text, nature scene",
    output: "biology/ecosystem-food-chain.png"
  },
  // 7 класс - География
  {
    prompt: "World map showing four oceans Pacific Atlantic Indian Arctic, continents outlined, blue ocean gradients, educational illustration, no text, clean cartographic style",
    output: "geography/world-oceans.png"
  },
  {
    prompt: "Africa continent map showing Sahara desert, savanna with acacia trees, Victoria falls, Nile river, Mount Kilimanjaro, educational illustration, no text",
    output: "geography/africa-map.png"
  },
  {
    prompt: "Atmospheric circulation diagram showing equator, trade winds, westerlies, polar easterlies, Hadley cells, educational illustration, no text, earth sphere view",
    output: "geography/atmospheric-circulation.png"
  },
  // 7 класс - Физика
  {
    prompt: "Physics force diagram showing push and pull arrows on a box, friction surface, gravity arrow down, educational illustration, no text, clean diagram style",
    output: "physics/forces-diagram.png"
  },
  {
    prompt: "Pressure concept illustration showing person on snow with skis vs without skis, area difference, educational diagram, no text, winter scene",
    output: "physics/pressure-concept.png"
  },
  {
    prompt: "Pascal law demonstration with hydraulic press, connected cylinders, pistons, fluid, force multiplication, educational illustration, no text, technical diagram",
    output: "physics/pascal-law.png"
  }
];

async function generateImage(prompt: string, outputPath: string) {
  const url = `${baseUrl}/images/generations`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
    body: JSON.stringify({
      prompt: prompt,
      size: '1024x1024'
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }
  
  const result = await response.json();
  
  // Get base64 or URL from response
  let imageBase64;
  if (result.data && result.data[0]) {
    if (result.data[0].base64) {
      imageBase64 = result.data[0].base64;
    } else if (result.data[0].url) {
      // Download from URL
      const imgResponse = await fetch(result.data[0].url);
      const arrayBuffer = await imgResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(outputPath, buffer);
      return;
    }
  }
  
  if (!imageBase64) {
    throw new Error('No image data in response');
  }
  
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  console.log('Starting image generation with X-Token...\n');
  
  for (let i = 0; i < images.length; i++) {
    const { prompt, output } = images[i];
    const outputPath = path.join(outputDir, output);
    
    console.log(`[${i + 1}/${images.length}] Generating: ${output}`);
    
    try {
      await generateImage(prompt, outputPath);
      console.log(`  ✓ Saved: ${outputPath}\n`);
    } catch (error: any) {
      console.error(`  ✗ Failed: ${error.message}\n`);
    }
  }
  
  console.log('Image generation complete!');
}

main().catch(console.error);
