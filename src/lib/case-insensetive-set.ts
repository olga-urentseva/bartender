export class CaseInsensitiveSet extends Set<string> {
  protected lowerCaseSet: Set<string>;

  constructor(values?: readonly string[] | Iterable<string> | null) {
    super();
    this.lowerCaseSet = new Set();

    if (!values) {
      return;
    }

    for (const value of values) {
      this.add(value);
    }
  }
  add(value: string): this {
    if (this.lowerCaseSet.has(value.toLowerCase())) {
      return this;
    }

    super.add(value);
    this.lowerCaseSet.add(value.toLowerCase());

    return this;
  }
  clear(): void {
    super.clear();
    this.lowerCaseSet.clear();
  }

  has(value: string): boolean {
    return this.lowerCaseSet.has(value.toLowerCase());
  }

  delete(value: string): boolean {
    if (!this.has(value)) {
      return false;
    }

    const oldValues = [...this];
    this.clear();

    oldValues
      .filter((el) => el.toLowerCase() !== value.toLowerCase())
      .forEach((el) => this.add(el));

    return true;
  }
}
