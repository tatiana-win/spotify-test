export class StorageService {
  get<T>(key: string): T | undefined {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : undefined;
  }

  set<T>(key: string, value: T): void {
    if (value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
