import * as RDF from "rdf-js";
import {SimpleQuad} from "./SimpleQuad";
import {SingletonDefaultGraph} from "./SingletonDefaultGraph";
import {SymbolBlankNode} from "./SymbolBlankNode";
import {SymbolLiteral} from "./SymbolLiteral";
import {SymbolNamedNode} from "./SymbolNamedNode";
import {SymbolVariable} from "./SymbolVariable";
import {TermDictionary} from "./TermDictionary";

export class DictionaryDataFactory implements RDF.DataFactory {

  public readonly dict: TermDictionary;
  private blankNodeCounter: number;

  constructor(dict: TermDictionary) {
    this.dict = dict;
    this.blankNodeCounter = 0;
  }

  public namedNode(value: string): RDF.NamedNode {
    return new SymbolNamedNode(value, this.dict);
  }

  public blankNode(value?: string): RDF.BlankNode {
    return new SymbolBlankNode(value || ('b' + this.blankNodeCounter++), this.dict);
  }

  public literal(value: string | number, languageOrDatatype?: string | RDF.NamedNode): RDF.Literal {
    let language: string = '';
    let datatype: RDF.NamedNode = null;
    if (languageOrDatatype) {
      if (typeof languageOrDatatype === 'string') {
        language = languageOrDatatype;
      } else {
        datatype = languageOrDatatype;
      }
    }
    return new SymbolLiteral(value.toString(), language, datatype, this.dict, this);
  }

  public variable?(value: string): RDF.Variable {
    return new SymbolVariable(value, this.dict);
  }

  public defaultGraph(): RDF.DefaultGraph {
    throw SingletonDefaultGraph.INSTANCE;
  }

  public triple(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term): RDF.Quad {
    return this.quad(subject, predicate, object);
  }

  public quad(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph?: RDF.Term): RDF.Quad {
    return new SimpleQuad(subject, predicate, object, graph);
  }

}
