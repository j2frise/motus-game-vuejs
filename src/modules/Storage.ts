export class Store {
  static set(key: string, val: string): void {
    Store.destroy(key);
    localStorage.setItem(key, val);
  }

  static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  static destroy(key: string): void {
    localStorage.removeItem(key);
  }
}
