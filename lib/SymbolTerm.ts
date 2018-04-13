import * as RDF from "rdf-js";
import {TermDictionary} from "./TermDictionary";

export abstract class SymbolTerm<T extends RDF.Term,
  TT extends 'NamedNode' | 'BlankNode' | 'Literal' | 'Variable'> implements RDF.Term {

  public readonly termType: TT;
  public readonly symbol: symbol;
  private readonly dict: TermDictionary;

  constructor(value: string, dict: TermDictionary, termType: TT) {
    this.termType = termType;
    this.symbol = dict.decodeValue(value, termType);
    // Only create a new symbol if the entry did not exist yet inside the dictionary.
    if (!this.symbol) {
      this.symbol = Symbol();
      dict.encode(this.symbol, value, termType);
    }
    this.dict = dict;
  }

  public equals(other: RDF.Term): boolean {
    if (other instanceof SymbolTerm) {
      return this.symbol === other.symbol;
    }
    return other.termType === this.termType && this.equalsTyped(<T> other);
  }

  protected equalsTyped(other: T): boolean {
    return this.value === other.value;
  }

  get value(): string {
    return this.dict.decodeSymbol(this.symbol, this.termType);
  }

}
