import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileGeneratorService {

  constructor() { }

  generateFile(fileName: string, data: any, fileType: 'xlsx', isBlob = false){
    const blob = isBlob ? data : new Blob([data],
        {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
    //@ts-ignore
    if (window.navigator.msSaveOrOpenBlob) {
      //@ts-ignore
      navigator.msSaveOrOpenBlob(blob, fileName + '.xlsx')
      console.log("do do do")
    } else {
      console.log("else do")
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        console.log("link download do")
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', fileName + '.xlsx');
        link.click();
      } else {
        console.log("window open do")
        data = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + data;
        window.open(encodeURI(data));
      }
      document.body.removeChild(link);
    }
  }



}
