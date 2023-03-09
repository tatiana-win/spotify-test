export class StorageService {
  get<T>(key: string): T {
    return window.localStorage.getItem(key) as T;
  }

  set<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
