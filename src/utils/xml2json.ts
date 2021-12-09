import x2js from 'x2js';
const xml2json = new x2js();

const xml2jsonFn = (xml: string): any => {
  return xml2json.xml2js(xml);
};

export default xml2jsonFn;
