import {BiTermMap} from "./BiTermMap";

export class TermDictionary {

  private readonly namedNodes: BiTermMap;
  private readonly blankNodes: BiTermMap;
  private readonly literals: BiTermMap;
  private readonly variables: BiTermMap;

  constructor() {
    this.namedNodes = new BiTermMap();
    this.blankNodes = new BiTermMap();
    this.literals = new BiTermMap();
    this.variables = new BiTermMap();
  }

  public encode(symbol: symbol, value: string, termType: "NamedNode" | "BlankNode" | "Literal" | "Variable"): symbol {
    switch (termType) {
    case 'NamedNode':
      return this.namedNodes.put(symbol, value);
    case 'BlankNode':
      return this.blankNodes.put(symbol, value);
    case 'Literal':
      return this.literals.put(symbol, value);
    case 'Variable':
      return this.variables.put(symbol, value);
    }
  }

  public decodeSymbol(symbol: symbol, termType: "NamedNode" | "BlankNode" | "Literal" | "Variable"): string {
    switch (termType) {
    case 'NamedNode':
      return this.namedNodes.get(symbol);
    case 'BlankNode':
      return this.blankNodes.get(symbol);
    case 'Literal':
      return this.literals.get(symbol);
    case 'Variable':
      return this.variables.get(symbol);
    }
  }

  public decodeValue(value: string, termType: "NamedNode" | "BlankNode" | "Literal" | "Variable"): symbol {
    switch (termType) {
    case 'NamedNode':
      return this.namedNodes.getInv(value);
    case 'BlankNode':
      return this.blankNodes.getInv(value);
    case 'Literal':
      return this.literals.getInv(value);
    case 'Variable':
      return this.variables.getInv(value);
    }
  }

  public clear() {
    this.namedNodes.clear();
    this.blankNodes.clear();
    this.literals.clear();
    this.variables.clear();
  }

  // TODO: to/from json, also for terms

}
