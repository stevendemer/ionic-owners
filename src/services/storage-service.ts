import { Drivers, Storage } from "@ionic/storage";

/**
 * Utility class for CRUD operations with ionic storage
 */

export class StorageService {
  store = new Storage({
    name: "__db",
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
  });

  constructor() {
    this.store.create();
  }

  async setStorage(key: string, value: string) {
    try {
      return await this.store.set(key, value);
    } catch (error) {
      console.error(`Error setting storage for key ${key}:`, error);
      throw error;
    }
  }

  async getStorage(key: string) {
    try {
      return await this.store.get(key);
    } catch (error) {
      console.error(`Error getting storage for key ${key}:`, error);
      throw error;
    }
  }

  async clearStorage() {
    try {
      return await this.store.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }

  async remove(key: string) {
    try {
      return await this.store.remove(key);
    } catch (error) {
      console.error(`Error removing storage for key ${key}:`, error);
      throw error;
    }
  }

  checkForUpdates(
    key: string,
    callback: (value: string | null) => void,
    interval: number = 60000
  ) {
    const intervalId = setInterval(async () => {
      try {
        const value = await this.getStorage(key);
        callback(value);
      } catch (error) {
        console.error(`Error checking for updates for key ${key}:`, error);
      }
    }, interval);

    // Return a function to clear the interval
    return () => clearInterval(intervalId);
  }
}
