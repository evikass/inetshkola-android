// Test games import
import { allGames } from './src/data/index.ts'

console.log('Games per grade:');
for (let i = 0; i <= 11; i++) {
  const games = allGames[i] || [];
  console.log(`Grade ${i}: ${games.length} games`);
  if (games.length > 0) {
    console.log(`  First game: ${games[0].title}`);
  }
}
