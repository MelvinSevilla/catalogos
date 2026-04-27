import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


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
