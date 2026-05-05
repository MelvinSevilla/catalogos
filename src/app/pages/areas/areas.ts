import { Component, inject, NgZone, OnInit, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgFor, NgIf, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products-service';
import { Productos } from '../productos/productos';

@Component({
  selector: 'app-areas',
  imports: [CommonModule, NgFor, NgIf, Productos, FormsModule],
  templateUrl: './areas.html',
  styleUrl: './areas.css',
})
export class Areas implements OnInit {

  private router = inject(Router);
  private productsSvc = inject(ProductsService);
  private ngZone = inject(NgZone);
  private cdRef = inject(ChangeDetectorRef);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  departamento: any = { departamento: '', imagenUrl: 'backgroundCatalogos.png' };
  areas: any = [];
  paginatedDepartments: any = [];
  paginatedAreas: any = [];
  noDataFound: boolean = false;

  searchTerm: string = '';
  showSearch: boolean = false;
  isFiltered: boolean = false;

  ngOnInit() {
    const depto = this.router.url.split('/').pop() || '';

    // Intentar cargar de LocalStorage primero para evitar peticiones innecesarias
    const cached = this.getFromLocalStorage(depto);
    if (cached) {
      this.setData(cached);
    } else {
      this.productsSvc.getCatalogo({ departamento: depto, typePrice: this.productsSvc.typePrice.getValue() })
        .subscribe((data: any) => {
          this.setData(data);
          this.saveToLocalStorage(depto, data);
        });
    }
  }

  setData(data: any) {
    this.departamento.departamento = data.departamento?.departamento || '';
    if (data.departamento?.imagenDepto) {
      this.departamento.imagenUrl = data.departamento.imagenDepto;
    }
    this.areas = data.areas || [];
    this.areas.forEach((area: any) => {
      if (area.categorias) {
        area.productos = area.categorias.reduce((acc: any, cat: any) => acc.concat(cat.productos), []);
      }
      area.showMenu = false;
    });
    if (this.areas.length == 0) {
      this.ngZone.run(() => {
        this.noDataFound = true;
        this.cdRef.detectChanges();
        this.cdRef.markForCheck();

      });
      setTimeout(() => {
        this.ngZone.run(() => {
          this.noDataFound = false;
          this.cdRef.detectChanges();
          this.cdRef.markForCheck();

        });
      }, 2000);
    } else {
      this.ngZone.run(() => {
        this.noDataFound = false;
        this.cdRef.markForCheck();
      });
    }
    setTimeout(() => {
      this.calculatePaginatedDepartments();
    }, 50);
  }

  calculatePaginatedDepartments() {
    let pages = [];
    const ITEMS_PER_PAGE = 16;

    const totalAreas = this.areas.length;
    for (let i = 0; i < totalAreas; i += ITEMS_PER_PAGE) {
      pages.push({
        areas: this.areas.slice(i, i + ITEMS_PER_PAGE)
      });
    }

    this.ngZone.run(() => {
      this.paginatedDepartments = pages;
      this.paginatedAreas = this.areas;
      this.cdRef.markForCheck();
    });

    // Hacer scroll automático al inicio de las áreas
    setTimeout(() => {
      if (this.paginatedDepartments.length > 0) {
        const element = this.document.getElementById('areas-start');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

    }, 100);
  }

  navigateToProducts(area: any) {
    const index = this.paginatedAreas.findIndex((a: any) => a === area);
    if (index !== -1) {
      const element = this.document.getElementById(`area-header-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  saveToLocalStorage(depto: string, data: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    let allProducts: any = {};
    const stored = localStorage.getItem('allproducts');
    if (stored) {
      try {
        allProducts = JSON.parse(stored);
      } catch (e) {
        allProducts = {};
      }
    }
    allProducts[depto] = data;
    localStorage.setItem('allproducts', JSON.stringify(allProducts));
  }

  getFromLocalStorage(depto: string) {
    if (!isPlatformBrowser(this.platformId)) return null;

    const stored = localStorage.getItem('allproducts');
    if (!stored) return null;
    try {
      const allProducts = JSON.parse(stored);
      return allProducts[depto] || null;
    } catch (e) {
      return null;
    }
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  performSearch() {
    if (!this.searchTerm.trim()) {
      this.resetSearch();
      return;
    }

    const depto = this.router.url.split('/').pop() || '';
    const data = this.getFromLocalStorage(depto);
    if (!data || !data.areas) return;

    try {
      const term = this.searchTerm.toLowerCase();
      let arraywords = term.split(" ");
      let filteredAreas: any = data.areas;
      console.log(arraywords);

      arraywords.forEach((word: any) => {
        filteredAreas = filteredAreas.map((area: any) => {
          const matchingProducts = area.productos.filter((p: any) =>
            p.descripcion.toLowerCase().includes(word) ||
            p.codigo.toLowerCase().includes(word)
          );
          return { ...area, productos: matchingProducts };
        }).filter((area: any) => area.productos.length > 0);
      });

      this.ngZone.run(() => {
        this.paginatedAreas = filteredAreas;
        this.isFiltered = true;
        this.cdRef.markForCheck();
      });

      // Scroll a resultados
      setTimeout(() => {
        const element = this.document.getElementById('productos-start');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (e) {
      console.error('Error searching in localstorage', e);
    }
  }

  resetSearch() {
    this.searchTerm = '';
    this.isFiltered = false;
    this.paginatedAreas = this.areas;
    this.cdRef.markForCheck();
  }

  toggleCategoryMenu(area: any, event: Event) {
    event.stopPropagation();
    const currentState = area.showMenu;
    this.areas.forEach((a: any) => a.showMenu = false);
    area.showMenu = !currentState;
    this.cdRef.markForCheck();
  }

  closeAllMenus() {
    this.areas.forEach((a: any) => a.showMenu = false);
    this.cdRef.markForCheck();
  }

  filterByCategory(area: any, cat: any, event: Event) {
    event.stopPropagation();
    area.showMenu = false;
    
    this.ngZone.run(() => {
      this.paginatedAreas = [{
        ...area,
        productos: cat.productos
      }];
      this.isFiltered = true;
      this.cdRef.markForCheck();
    });

    setTimeout(() => {
      const element = this.document.getElementById('productos-start');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

}
