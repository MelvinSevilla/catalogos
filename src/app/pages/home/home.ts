import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private router = inject(Router);
  private productservice = inject(ProductsService);
  private platformId = inject(PLATFORM_ID);
  showpdfButton = false;

  ngOnInit(): void {
    if (this.router.url.includes('/pdf')) {
      this.showpdfButton = true;
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('allproducts');
      const url = window.location.href;
      if (url.includes('/catalogo1') || url.includes('localhost:4201')) {
        this.productservice.typePrice.next('0');
      } else if (url.includes('/catalogo2') || url.includes('localhost:4202')) {
        this.productservice.typePrice.next('1');
      } else if (url.includes('/catalogomayorista') || url.includes('localhost:4203')) {
        this.productservice.typePrice.next('999');
      }
    }

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
