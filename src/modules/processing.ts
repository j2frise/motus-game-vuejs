export class ForString {
  static removeSpecialCharacter(word: string): string {
    if (!word) return word;

    return word
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  static isCharIncluded(word: string, char: string): boolean {
    if (!word || !char) return false;
    const cleanWord = ForString.removeSpecialCharacter(word).toLowerCase();
    const cleanChar = ForString.removeSpecialCharacter(char).toLowerCase();

    return cleanWord.includes(cleanChar);
  }
}
