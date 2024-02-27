export class Enum {

  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  static toEnum(val: string): Enum {
    return new Enum(val);
  }

  toString(): string {
    return this.value;
  }
}
