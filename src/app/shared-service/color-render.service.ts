import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorRenderService {

  constructor() { }
   dataBG = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
     'rgba(232,98,40,0.2)',
     'rgba(201, 203, 207, 0.2)',
     'rgba(239,207,209,0.2)',
     'rgba(212,218,41,0.2)'
  ];
  dataBD = [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
      'rgba(248,99,35,0.2)',
      'rgba(189,204,234,0.2)',
      'rgba(250,165,170,0.2)',
      'rgba(234,241,31,0.2)'
  ]


  returnBackgroundColor(number: number): string[]{
    return this.dataBG.slice(0, number);
  }

    returnBorderColor(number: number): string[]{
        return this.dataBD.slice(0, number);
    }
}
