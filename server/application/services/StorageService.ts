import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Token } from '../../domain/entities';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../data');
const tokensPath = path.join(dataDir, 'tokens.json');
const poolsPath = path.join(dataDir, 'pools.json');

export class StorageService {
  async getTokens(): Promise<Token[]> {
    const data = await fs.readFile(tokensPath, 'utf-8');
    return JSON.parse(data);
  }

  async getPools(): Promise<any> {
    const data = await fs.readFile(poolsPath, 'utf-8');
    return JSON.parse(data);
  }

  async savePools(pools: any): Promise<void> {
    await fs.writeFile(poolsPath, JSON.stringify(pools, null, 2));
  }
}
