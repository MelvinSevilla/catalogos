import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private router = inject(Router);
  showpdfButton = false;
  showPrice = '0';

  ngOnInit(): void {
    if (this.router.url.includes('/pdf')) {
      this.showpdfButton = true;
    }
    if (this.router.url.includes('/catalogo1') || this.router.url.includes('/localhost:4200')) {
      this.showPrice = '0';
    } else if (this.router.url.includes('/catalogo2') || this.router.url.includes('/localhost:4202')) {
      this.showPrice = '1';
    } else if (this.router.url.includes('/catalogomayorista') || this.router.url.includes('/localhost:4203')) {
      this.showPrice = '999';
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
