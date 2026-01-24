import { SnapshotService } from '../services/SnapshotService';
import { StorageService } from '../services/StorageService';

export class SnapshotWorker {
  private snapshotService: SnapshotService;
  private storageService: StorageService;
  private interval: NodeJS.Timeout | null = null;

  constructor(snapshotService: SnapshotService, storageService: StorageService) {
    this.snapshotService = snapshotService;
    this.storageService = storageService;
  }

  start(refreshIntervalMs: number) {
    console.log('Starting snapshot worker...');
    this.interval = setInterval(() => this.run(), refreshIntervalMs);
    this.run(); // Run once immediately
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async run() {
    try {
      console.log('Refreshing pool data...');
      const tokens = await this.storageService.getTokens();
      const pools = await this.snapshotService.bootstrapPools(tokens);
      await this.storageService.savePools(pools);
      console.log('Pool data refreshed successfully.');
    } catch (error) {
      console.error('Error refreshing pool data:', error);
    }
  }
}
