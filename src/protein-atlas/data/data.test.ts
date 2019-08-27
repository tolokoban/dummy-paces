import Data from './data'

describe('[protein-atlas/data]', () => {
    describe('parse(content)', () => {
        it('Should parse Paulina example file', () => {
            const content = `,Gene names,Location,median log conc uM median norm,conc uM
0,0610009B22RIK,"subcellular,not specified",-3.2947753331546,0.037076373943524
1,0610010K14RIK,astrocytes,-2.8363087304294,0.058641729376236
2,0610010K14RIK,neurons,-2.33508168008781,0.09680257536068
3,0610012G03RIK,"subcellular,not specified",-4.25912236762236,0.014134702040369

`;
            const result = Data.parseCSV(content);
            expect(result).toEqual([
                ['', 'Gene names', 'Location', 'median log conc uM median norm', 'conc uM'],
                ['0', '0610009B22RIK', 'subcellular,not specified', '-3.2947753331546', '0.037076373943524'],
                ['1', '0610010K14RIK', 'astrocytes', '-2.8363087304294', '0.058641729376236'],
                ['2', '0610010K14RIK', 'neurons', '-2.33508168008781', '0.09680257536068'],
                ['3', '0610012G03RIK', 'subcellular,not specified', '-4.25912236762236', '0.014134702040369']
            ]);
        })
    })
})
