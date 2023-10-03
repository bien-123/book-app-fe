export enum StorageItems {
    TOKEN = "token",
    USER_NAME = "user_name",
    PASSWORD = "password",
  }
  
  export default class StorageService {
    setItem(itemName: StorageItems, value: string) {
      localStorage.setItem(itemName, value);
    }
  
    getItem(itemName: StorageItems): string {
      return localStorage.getItem(itemName) || "";
    }
  
    clearItem(itemName: StorageItems) {
      localStorage.removeItem(itemName);
    }
  
    clearAll() {
      localStorage.clear();
    }
  }
  