import * as RDF from "rdf-js";

export class SingletonDefaultGraph implements RDF.DefaultGraph {

  public static readonly INSTANCE: SingletonDefaultGraph = new SingletonDefaultGraph();

  public readonly value: '' = '';
  public readonly termType: 'DefaultGraph' = 'DefaultGraph';

  private constructor() {

  }

  public equals(other: RDF.Term): boolean {
    return other.termType === this.termType;
  }

}
