"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memDataFactory = require("rdf-data-model");
const DictionaryDataFactory_1 = require("../lib/DictionaryDataFactory");
const TermDictionary_1 = require("../lib/TermDictionary");
// Parameters
const COUNT_UNIQUE = 1000000;
const COUNT_EQUALS = 10000;
if (!global.gc) {
    throw new Error('--expose-gc must be passed as Node argument');
}
const dictDataFactory = new DictionaryDataFactory_1.DictionaryDataFactory(new TermDictionary_1.TermDictionary());
const uris = [];
for (let i = 0; i < COUNT_UNIQUE; i++) {
    uris.push('http://example.org/this/is/a/very/long/uri/with/a/very/long/path/and/some/number/suffix/' + i);
}
// Warmup
for (const uri of uris) {
    memDataFactory.namedNode(uri);
    dictDataFactory.namedNode(uri);
}
dictDataFactory.dict.clear();
// Create many unique named nodes
console.log('100% Unique:');
createNamedNodes('  Mem', memDataFactory, COUNT_UNIQUE, 1);
createNamedNodes('  Dct', dictDataFactory, COUNT_UNIQUE, 1);
dictDataFactory.dict.clear();
console.log('75% Unique:');
createNamedNodes('  Mem', memDataFactory, COUNT_UNIQUE, 0.75);
createNamedNodes('  Dct', dictDataFactory, COUNT_UNIQUE, 0.75);
console.log('50% Unique:');
createNamedNodes('  Mem', memDataFactory, COUNT_UNIQUE, 0.5);
createNamedNodes('  Dct', dictDataFactory, COUNT_UNIQUE, 0.5);
dictDataFactory.dict.clear();
console.log('25% Unique:');
createNamedNodes('  Mem', memDataFactory, COUNT_UNIQUE, 0.25);
createNamedNodes('  Dct', dictDataFactory, COUNT_UNIQUE, 0.25);
dictDataFactory.dict.clear();
console.log('0% Unique:');
createNamedNodes('  Mem', memDataFactory, COUNT_UNIQUE, 0);
createNamedNodes('  Dct', dictDataFactory, COUNT_UNIQUE, 0);
dictDataFactory.dict.clear();
function createNamedNodes(label, dataFactory, count, uniqueFactor) {
    const nodes = [];
    const mod = uniqueFactor === 0 ? 1 : count * uniqueFactor;
    console.time(label);
    for (let i = 0; i < count; i++) {
        nodes.push(dataFactory.namedNode(uris[i % mod]));
    }
    console.timeEnd(label);
    global.gc();
    console.log('    RAM: ' + Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB');
}
// equals() performance
/*console.log('Equals');
compareEquals('  Mem', memDataFactory, COUNT_EQUALS);
compareEquals('  Dct', dictDataFactory, COUNT_EQUALS);
dictDataFactory.dict.clear();

function compareEquals(label: string, dataFactory: RDF.DataFactory, count: number) {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push(dataFactory.namedNode(uris[i]));
  }
  console.time(label);
  for (let i = 0; i < count; i++) {
    nodes[i].equals(nodes[(i + count / 2) % count]);
    nodes[i].equals(nodes[i]);
  }
  console.timeEnd(label);
}*/
//# sourceMappingURL=basic.js.map