const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\melvi\\Downloads\\categorizar';
const jsonFile = path.join(basePath, 'gemini-code-1777519590168.json');
const csvFile = path.join(basePath, 'Hoja de cálculo sin título - Hoja 1.csv');
const outputCsvFile = path.join(basePath, 'categorizado.csv');

const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
const inventario = json.inventario;

const categories = [];
for (const dep of inventario) {
    for (const cat of dep.categorias) {
        categories.push({
            departamento: dep.departamento,
            categoria: cat,
            keywords: cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2 && !['para', 'con', 'los', 'las', 'del', 'una', 'uno', 'que', 'por'].includes(w))
        });
    }
}

const customMappings = [
    { word: 'coloramica', dep: 'Pinturas', cat: 'Pinturas, Diluyentes y Otros' },
    { word: 'basurero', dep: 'Hogar', cat: 'Artículos para el Hogar' },
    { word: 'piscina', dep: 'Jardineria', cat: 'Articulos para Piscinas' },
    { word: 'espatula', dep: 'Herramientas Manuales', cat: 'Espatulas y cucharas' },
    { word: 'taladro', dep: 'Herramientas Electricas', cat: 'Taladros' },
    { word: 'pegatanke', dep: 'Construccion', cat: 'Adhesivos' },
    { word: 'pegat', dep: 'Construccion', cat: 'Adhesivos' },
    { word: 'sista', dep: 'Construccion', cat: 'Sellador, Silicon y Masilla' },
    { word: 'silicon', dep: 'Construccion', cat: 'Sellador, Silicon y Masilla' },
    { word: 'spray', dep: 'Pinturas', cat: 'Pinturas, Diluyentes y Otros' },
    { word: 'tubo', dep: 'Fontanería', cat: 'Tubos Conduit Pvc y Cpvc' },
    { word: 'ceramica', dep: 'Loza y Ceramica', cat: 'Azulejo' },
    { word: 'porcelanato', dep: 'Loza y Ceramica', cat: 'Porcelanato' },
    { word: 'lavadora', dep: 'Hogar', cat: 'Electrodomesticos' },
    { word: 'interruptor', dep: 'Electricidad', cat: 'Interruptores' },
    { word: 'interructor', dep: 'Electricidad', cat: 'Interruptores' },
    { word: 'cubo', dep: 'Herramientas Manuales', cat: 'Herramienta para Mecanica' },
    { word: 'llavin', dep: 'Herrajes', cat: 'Cerrajeria' },
    { word: 'cuchilla', dep: 'Herramientas Manuales', cat: 'Cuchillas' },
    { word: 'disco', dep: 'Herramientas Electricas', cat: 'Accesorios para Taladros y Pulidoras' },
    { word: 'electrodo', dep: 'Herramientas Electricas', cat: 'Electrodos' },
    { word: 'guante', dep: 'Automotriz', cat: 'Guantes' },
    { word: 'soldadura', dep: 'Herramientas Electricas', cat: 'Soldadoras' },
    { word: 'cinta', dep: 'Electricidad', cat: 'Cintas Adhesivas' },
    { word: 'bombillo', dep: 'Electricidad', cat: 'Bombillos' },
    { word: 'toma', dep: 'Electricidad', cat: 'Enchufes' },
    { word: 'mufa', dep: 'Electricidad', cat: 'Accesorios Electricos' },
    { word: 'rodo', dep: 'Herrajes', cat: 'Ruedas y Rodos' },
    { word: 'plywood', dep: 'Construccion', cat: 'Laminas Aglomeradas' },
    { word: 'valvula', dep: 'Fontanería', cat: 'Grifos y Valvulas' },
    { word: 'ducha', dep: 'Fontanería', cat: 'Duchas, Brazos y Electroduchas' },
    { word: 'candado', dep: 'Herrajes', cat: 'Candados' },
    { word: 'bisagra', dep: 'Herrajes', cat: 'Bisagras' },
    { word: 'tornillo', dep: 'Herrajes', cat: 'Tornillos y Pernos' },
    { word: 'clavo', dep: 'Construccion', cat: 'Clavos y Grapas' },
    { word: 'cemento', dep: 'Construccion', cat: 'Cemento, Grava y Arena' },
    { word: 'arena', dep: 'Construccion', cat: 'Cemento, Grava y Arena' },
    { word: 'bloque', dep: 'Construccion', cat: 'Bloques' },
    { word: 'pintura', dep: 'Pinturas', cat: 'Pinturas, Diluyentes y Otros' }
];

const csv = fs.readFileSync(csvFile, 'utf8').split('\n');
const header = csv[0];
const lines = csv.slice(1).filter(l => l.trim() !== '');

const output = [header];

for (const line of lines) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
            current += line[i];
        } else if (line[i] === ',' && !inQuotes) {
            parts.push(current);
            current = '';
        } else {
            current += line[i];
        }
    }
    parts.push(current);

    if (parts.length < 5) {
        output.push(line);
        continue;
    }

    const codigo = parts[0];
    const producto = parts[1];
    const precio = parts[2];
    
    const prodNameClean = producto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, ' ');
    const prodWords = prodNameClean.split(' ').filter(w => w.length > 2);

    let bestMatch = { departamento: 'Varios', categoria: 'Varios', score: 0 };

    for (const cat of categories) {
        let score = 0;
        for (const pw of prodWords) {
            if (cat.keywords.includes(pw)) {
                score += 2;
            } else {
                for (const kw of cat.keywords) {
                    if (pw.startsWith(kw) || kw.startsWith(pw)) {
                        score += 0.5;
                    }
                }
            }
        }
        
        const catNameClean = cat.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (prodNameClean.includes(catNameClean)) {
            score += 5;
        }

        if (score > bestMatch.score) {
            bestMatch = { departamento: cat.departamento, categoria: cat.categoria, score: score };
        }
    }

    for (const mapping of customMappings) {
        if (prodNameClean.includes(mapping.word)) {
            bestMatch = { departamento: mapping.dep, categoria: mapping.cat, score: 100 };
        }
    }

    if (bestMatch.departamento === 'Varios' && bestMatch.categoria === 'Varios') {
        if (prodNameClean.includes('kit') || prodNameClean.includes('juego')) {
            bestMatch = { departamento: 'Herramientas Manuales', categoria: 'Herramientas' };
        }
    }

    const formatCol = (c) => c.includes(',') && !c.startsWith('"') ? `"${c}"` : c;
    const newLine = `${parts[0]},${parts[1]},${parts[2]},${formatCol(bestMatch.departamento)},${formatCol(bestMatch.categoria)}`;
    output.push(newLine);
}

fs.writeFileSync(outputCsvFile, output.join('\n'));
console.log('Done! Created ' + outputCsvFile);
