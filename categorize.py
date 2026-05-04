import json
import csv
import re
import os

base_path = r"C:\Users\melvi\Downloads\categorizar"
json_file = os.path.join(base_path, "gemini-code-1777519590168.json")
csv_file = os.path.join(base_path, "Hoja de cálculo sin título - Hoja 1.csv")
output_csv_file = os.path.join(base_path, "categorizado.csv")

def clean_word(word):
    import unicodedata
    w = unicodedata.normalize('NFKD', word).encode('ASCII', 'ignore').decode('utf-8')
    w = re.sub(r'[^a-z0-9 ]', '', w.lower())
    return w

with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

categories = []
stopwords = ['para', 'con', 'los', 'las', 'del', 'una', 'uno', 'que', 'por']

for dep in data.get('inventario', []):
    for cat in dep.get('categorias', []):
        cat_clean = clean_word(cat)
        words = [w for w in cat_clean.split() if len(w) > 2 and w not in stopwords]
        categories.append({
            'departamento': dep['departamento'],
            'categoria': cat,
            'keywords': words,
            'clean_name': cat_clean
        })

custom_mappings = [
    {'word': 'coloramica', 'dep': 'Pinturas', 'cat': 'Pinturas, Diluyentes y Otros'},
    {'word': 'basurero', 'dep': 'Hogar', 'cat': 'Artículos para el Hogar'},
    {'word': 'piscina', 'dep': 'Jardineria', 'cat': 'Articulos para Piscinas'},
    {'word': 'espatula', 'dep': 'Herramientas Manuales', 'cat': 'Espatulas y cucharas'},
    {'word': 'taladro', 'dep': 'Herramientas Electricas', 'cat': 'Taladros'},
    {'word': 'pegatanke', 'dep': 'Construccion', 'cat': 'Adhesivos'},
    {'word': 'pegat', 'dep': 'Construccion', 'cat': 'Adhesivos'},
    {'word': 'sista', 'dep': 'Construccion', 'cat': 'Sellador, Silicon y Masilla'},
    {'word': 'silicon', 'dep': 'Construccion', 'cat': 'Sellador, Silicon y Masilla'},
    {'word': 'spray', 'dep': 'Pinturas', 'cat': 'Pinturas, Diluyentes y Otros'},
    {'word': 'tubo', 'dep': 'Fontanería', 'cat': 'Tubos Conduit Pvc y Cpvc'},
    {'word': 'ceramica', 'dep': 'Loza y Ceramica', 'cat': 'Azulejo'},
    {'word': 'porcelanato', 'dep': 'Loza y Ceramica', 'cat': 'Porcelanato'},
    {'word': 'lavadora', 'dep': 'Hogar', 'cat': 'Electrodomesticos'},
    {'word': 'interruptor', 'dep': 'Electricidad', 'cat': 'Interruptores'},
    {'word': 'interructor', 'dep': 'Electricidad', 'cat': 'Interruptores'},
    {'word': 'cubo', 'dep': 'Herramientas Manuales', 'cat': 'Herramienta para Mecanica'},
    {'word': 'llavin', 'dep': 'Herrajes', 'cat': 'Cerrajeria'},
    {'word': 'cuchilla', 'dep': 'Herramientas Manuales', 'cat': 'Cuchillas'},
    {'word': 'disco', 'dep': 'Herramientas Electricas', 'cat': 'Accesorios para Taladros y Pulidoras'},
    {'word': 'electrodo', 'dep': 'Herramientas Electricas', 'cat': 'Electrodos'},
    {'word': 'guante', 'dep': 'Automotriz', 'cat': 'Guantes'},
    {'word': 'soldadura', 'dep': 'Herramientas Electricas', 'cat': 'Soldadoras'},
    {'word': 'cinta', 'dep': 'Electricidad', 'cat': 'Cintas Adhesivas'},
    {'word': 'bombillo', 'dep': 'Electricidad', 'cat': 'Bombillos'},
    {'word': 'toma', 'dep': 'Electricidad', 'cat': 'Enchufes'},
    {'word': 'mufa', 'dep': 'Electricidad', 'cat': 'Accesorios Electricos'},
    {'word': 'rodo', 'dep': 'Herrajes', 'cat': 'Ruedas y Rodos'},
    {'word': 'plywood', 'dep': 'Construccion', 'cat': 'Laminas Aglomeradas'},
    {'word': 'valvula', 'dep': 'Fontanería', 'cat': 'Grifos y Valvulas'},
    {'word': 'ducha', 'dep': 'Fontanería', 'cat': 'Duchas, Brazos y Electroduchas'},
    {'word': 'candado', 'dep': 'Herrajes', 'cat': 'Candados'},
    {'word': 'bisagra', 'dep': 'Herrajes', 'cat': 'Bisagras'},
    {'word': 'tornillo', 'dep': 'Herrajes', 'cat': 'Tornillos y Pernos'},
    {'word': 'clavo', 'dep': 'Construccion', 'cat': 'Clavos y Grapas'},
    {'word': 'cemento', 'dep': 'Construccion', 'cat': 'Cemento, Grava y Arena'},
    {'word': 'arena', 'dep': 'Construccion', 'cat': 'Cemento, Grava y Arena'},
    {'word': 'bloque', 'dep': 'Construccion', 'cat': 'Bloques'},
    {'word': 'pintura', 'dep': 'Pinturas', 'cat': 'Pinturas, Diluyentes y Otros'}
]

output_rows = []

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    output_rows.append(header)
    
    for row in reader:
        if len(row) < 5:
            output_rows.append(row)
            continue
            
        codigo, producto, precio, dep_orig, cat_orig = row[0], row[1], row[2], row[3], row[4]
        
        prod_clean = clean_word(producto)
        prod_words = [w for w in prod_clean.split() if len(w) > 2]
        
        best_match = {'dep': 'Varios', 'cat': 'Varios', 'score': 0}
        
        for cat in categories:
            score = 0
            for pw in prod_words:
                if pw in cat['keywords']:
                    score += 2
                else:
                    for kw in cat['keywords']:
                        if pw.startswith(kw) or kw.startswith(pw):
                            score += 0.5
                            
            if cat['clean_name'] in prod_clean:
                score += 5
                
            if score > best_match['score']:
                best_match = {'dep': cat['departamento'], 'cat': cat['categoria'], 'score': score}
                
        for mapping in custom_mappings:
            if mapping['word'] in prod_clean:
                best_match = {'dep': mapping['dep'], 'cat': mapping['cat'], 'score': 100}
                
        if best_match['dep'] == 'Varios' and best_match['cat'] == 'Varios':
            if 'kit' in prod_clean or 'juego' in prod_clean:
                best_match = {'dep': 'Herramientas Manuales', 'cat': 'Herramientas'}
                
        row[3] = best_match['dep']
        row[4] = best_match['cat']
        output_rows.append(row)

with open(output_csv_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(output_rows)

print("Done! Created " + output_csv_file)
