import * as RDF from "rdf-js";
import {SingletonDefaultGraph} from "./SingletonDefaultGraph";

export class SimpleQuad implements RDF.Quad {
  public readonly subject: RDF.Term;
  public readonly predicate: RDF.Term;
  public readonly object: RDF.Term;
  public readonly graph: RDF.Term;

  constructor(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term, graph?: RDF.Term) {
    this.subject = subject;
    this.predicate = predicate;
    this.object = object;
    this.graph = graph || SingletonDefaultGraph.INSTANCE;
  }

  public equals(other: RDF.Quad): boolean {
    return this.subject.equals(other.subject) && this.predicate.equals(other.predicate)
      && this.object.equals(other.object) && this.graph.equals(other.graph);
  }

}
