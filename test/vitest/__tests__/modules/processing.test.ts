import { describe, it, expect } from 'vitest';
import { ForString } from '@/modules/processing';

describe('ForString', () => {
  describe('removeSpecialCharacter', () => {
    it('should return the word without special characters', () => {
      expect(ForString.removeSpecialCharacter('café')).toBe('cafe');
      expect(ForString.removeSpecialCharacter('jalapeño')).toBe('jalapeno');
      expect(ForString.removeSpecialCharacter('crème brûlée')).toBe(
        'creme brulee',
      );
    });

    it('should handle empty strings', () => {
      expect(ForString.removeSpecialCharacter('')).toBe('');
    });

    it('should handle strings without special characters', () => {
      expect(ForString.removeSpecialCharacter('hello')).toBe('hello');
    });

    it('should handle null or undefined input', () => {
      expect(ForString.removeSpecialCharacter(null)).toBeNull();
      expect(ForString.removeSpecialCharacter(undefined)).toBeUndefined();
    });
  });

  describe('isCharIncluded', () => {
    it('should return true if the character is included in the word', () => {
      expect(ForString.isCharIncluded('café', 'e')).toBe(true);
      expect(ForString.isCharIncluded('jalapeño', 'n')).toBe(true);
      expect(ForString.isCharIncluded('crème brûlée', 'b')).toBe(true);
    });

    it('should return false if the character is not included in the word', () => {
      expect(ForString.isCharIncluded('café', 'x')).toBe(false);
      expect(ForString.isCharIncluded('jalapeño', 'z')).toBe(false);
      expect(ForString.isCharIncluded('crème brûlée', 'q')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(ForString.isCharIncluded('', 'a')).toBe(false);
      expect(ForString.isCharIncluded('hello', '')).toBe(false);
    });

    it('should handle special characters in the word', () => {
      expect(ForString.isCharIncluded('café', 'e')).toBe(true);
      expect(ForString.isCharIncluded('jalapeño', 'n')).toBe(true);
    });

    it('should handle special characters in the character input', () => {
      expect(ForString.isCharIncluded('cafe', 'é')).toBe(true);
      expect(ForString.isCharIncluded('jalapeno', 'ñ')).toBe(true);
    });

    it('should handle null or undefined input', () => {
      expect(ForString.isCharIncluded(null, 'a')).toBe(false);
      expect(ForString.isCharIncluded('hello', null)).toBe(false);
      expect(ForString.isCharIncluded(undefined, 'a')).toBe(false);
      expect(ForString.isCharIncluded('hello', undefined)).toBe(false);
    });
  });
});
