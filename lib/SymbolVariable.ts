import * as RDF from "rdf-js";
import {SymbolTerm} from "./SymbolTerm";
import {TermDictionary} from "./TermDictionary";

export class SymbolVariable extends SymbolTerm<RDF.Variable, 'Variable'> implements RDF.Variable {

  public static readonly TERM_TYPE: 'Variable' = 'Variable';

  constructor(value: string, dict: TermDictionary) {
    super(value, dict, SymbolVariable.TERM_TYPE);
  }

}
