import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})


export class Productos {
  @Input() productos: any[] = [];

}
