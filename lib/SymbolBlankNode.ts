import * as RDF from "rdf-js";
import {SymbolTerm} from "./SymbolTerm";
import {TermDictionary} from "./TermDictionary";

export class SymbolBlankNode extends SymbolTerm<RDF.BlankNode, 'BlankNode'> implements RDF.BlankNode {

  public static readonly TERM_TYPE: 'BlankNode' = 'BlankNode';

  constructor(value: string, dict: TermDictionary) {
    super(value, dict, SymbolBlankNode.TERM_TYPE);
  }

}