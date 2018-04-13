export class BiTermMap {

  private right: any;
  private left: {[id: string]: symbol};

  constructor() {
    this.right = {};
    this.left = {};
  }

  public put(key: symbol, value: string): symbol {
    this.right[key] = value;
    this.left[value] = key;
    return key;
  }

  public get(key: symbol): string {
    return this.right[key];
  }

  public getInv(value: string): symbol {
    return this.left[value];
  }

  public removeByKey(key: symbol) {
    const value: string = this.right[key].value;
    delete this.right[key];
    delete this.left[value];
  }

  public removeByValue(value: string) {
    const key: symbol = this.left[value];
    delete this.right[key];
    delete this.left[value];
  }

  public clear() {
    this.right = {};
    this.left = {};
  }

}
