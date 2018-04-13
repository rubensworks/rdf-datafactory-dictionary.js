import * as RDF from "rdf-js";
import {SymbolTerm} from "./SymbolTerm";
import {TermDictionary} from "./TermDictionary";

export class SymbolLiteral extends SymbolTerm<RDF.Literal, 'Literal'> implements RDF.Literal {

  public static readonly TERM_TYPE: 'Literal' = 'Literal';

  private readonly languageWrapper: RDF.Literal;
  private readonly datatypeWrapper: RDF.NamedNode;

  constructor(value: string, language: string, dataType: RDF.NamedNode,
              dict: TermDictionary, factory: RDF.DataFactory) {
    super(value, dict, SymbolLiteral.TERM_TYPE);
    this.languageWrapper = factory.literal(language);
    this.datatypeWrapper = dataType;
  }

  get language(): string {
    return this.languageWrapper.value;
  }

  get datatype(): RDF.NamedNode {
    return this.datatypeWrapper;
  }

}
