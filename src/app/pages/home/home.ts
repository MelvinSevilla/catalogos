import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  departments = [
    {
      name: 'FERRETERIA',
      departamentoIMG: 'https://ferreteria-y-bricolaje.cdecomunicacion.es/wp-content/uploads/2025/02/ferreteria-somos-nos-gustaria-ser-sector-punto-de-venta.webp', // Imagen de fondo sugerida
      areas: [
        { name: 'ABRAZADERA', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'ELECTRICIDAD', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'PARTE ELECTRICA', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'ACCESORIOS', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'HERRAMINETAS', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'LLAVINES', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'MATERIALES DE CONTRUCCIÓN', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'EMPAQUES', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'MUEBLES', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'FONTANERIA', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'TERMINALES', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'TORNILLERIA', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'VALVULAS', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'VARILLAS', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES4', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES5', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES6', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES7', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES8', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES9', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES10', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES11', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES12', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES13', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES14', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES15', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES16', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES17', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES18', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES19', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
        { name: 'REGULADORES20', image: 'https://walmarthn.vtexassets.com/arquivos/ids/248379/Martillo-Hyper-Tough-16-Oz-1-17716.jpg?v=637964771028400000' },
      ]
    }
  ];

  get paginatedDepartments() {
    const pages = [];
    const ITEMS_PER_PAGE = 16;

    for (const dept of this.departments) {
      const totalAreas = dept.areas.length;
      for (let i = 0; i < totalAreas; i += ITEMS_PER_PAGE) {
        pages.push({
          name: dept.name,
          departamentoIMG: dept.departamentoIMG,
          areas: dept.areas.slice(i, i + ITEMS_PER_PAGE)
        });
      }
    }
    return pages;
  }

  printHorizontal() {
    this.executePrint('landscape');
  }

  printVertical() {
    this.executePrint('portrait');
  }

  private executePrint(mode: 'landscape' | 'portrait') {
    const style = document.createElement('style');
    style.id = 'dynamic-print-style';
    style.innerHTML = `@page { size: letter ${mode}; margin: 0; }`;
    document.head.appendChild(style);
    document.body.classList.add(`print-mode-${mode}`);

    setTimeout(() => {
      window.print();
      document.head.removeChild(style);
      document.body.classList.remove(`print-mode-${mode}`);
    }, 200);
  }
}
