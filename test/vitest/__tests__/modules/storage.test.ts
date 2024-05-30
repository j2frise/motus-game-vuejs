import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Store } from '@/modules/Storage';

describe('Store', () => {
  const key = 'testKey';
  const value = 'testValue';

  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up localStorage after each test to avoid side effects
    localStorage.clear();
  });

  it('should set and get a value', () => {
    Store.set(key, value);
    const storedValue = Store.get(key);
    expect(storedValue).toBe(value);
  });

  it('should return null for non-existing keys', () => {
    const storedValue = Store.get('nonExistingKey');
    expect(storedValue).toBeNull();
  });

  it('should remove a value', () => {
    Store.set(key, value);
    Store.destroy(key);
    const storedValue = Store.get(key);
    expect(storedValue).toBeNull();
  });

  it('should overwrite an existing value', () => {
    const newValue = 'newValue';
    Store.set(key, value);
    Store.set(key, newValue);
    const storedValue = Store.get(key);
    expect(storedValue).toBe(newValue);
  });
});
