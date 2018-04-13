import * as RDF from "rdf-js";
import {SymbolTerm} from "./SymbolTerm";
import {TermDictionary} from "./TermDictionary";

export class SymbolNamedNode extends SymbolTerm<RDF.NamedNode, 'NamedNode'> implements RDF.NamedNode {

  public static readonly TERM_TYPE: 'NamedNode' = 'NamedNode';

  constructor(value: string, dict: TermDictionary) {
    super(value, dict, SymbolNamedNode.TERM_TYPE);
  }

}
