import { Component, inject, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-areas',
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './areas.html',
  styleUrl: './areas.css',
})
export class Areas implements OnInit {

  private router = inject(Router);
  private productsSvc = inject(ProductsService);
  private ngZone = inject(NgZone);
  private cdRef = inject(ChangeDetectorRef);

  departamento: any = { departamento: '', imagenUrl: 'assets/backgroundCatalogos.png' };
  areas: any = [];
  paginatedDepartments: any = [];
  paginatedAreas: any = [];

  ngOnInit() {
    const depto = this.router.url.split('/').pop();
    this.productsSvc.getCatalogo({ departamento: depto })
      .subscribe((data: any) => {
        this.departamento.departamento = data.departamento?.departamento || '';
        if (data.departamento?.imagenDepto) {
          this.departamento.imagenUrl = data.departamento.imagenDepto;
        }
        this.areas = data.areas || [];
        setTimeout(() => {
          this.calculatePaginatedDepartments();
        }, 50);
      });
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
      const element = document.getElementById('areas-start');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  navigateToProducts(area: any) {
    this.router.navigate(['/products', area.area]);
  }

}
