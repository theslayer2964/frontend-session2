import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileGeneratorService {

    constructor() {
    }

    generateFile(fileName: string, data: any, fileType: string | 'xlsx', isBlob = false) {
        const blob = isBlob ? data : new Blob([data],
            {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'});
        //@ts-ignore
        if (window.navigator.msSaveOrOpenBlob) {
            //@ts-ignore
            navigator.msSaveOrOpenBlob(blob, fileName + '.xlsx')
        } else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', fileName + '.xlsx');
                link.click();
            } else {
                data = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + data;
                window.open(encodeURI(data));
            }
            document.body.removeChild(link);
        }
    }

    generateFileZip(fileName: string, data: any, fileType: string, isBlob = false) {
        const blob = isBlob ? data : new Blob([data],
            {type: 'application/zip'});
        //@ts-ignore
        if (window.navigator.msSaveOrOpenBlob) {
            //@ts-ignore
            navigator.msSaveOrOpenBlob(blob, fileName + '.' + fileType)
        } else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', fileName + '.' + fileType);
                link.click();
            } else {
                console.log("DO NHANH NAY");
                data = 'application/zip' + data;
                window.open(encodeURI(data));
            }
            document.body.removeChild(link);
        }
    }

    generateFileWord(fileName: string, data: any, fileType: string, isBlob = false) {
        const blob = isBlob ? data : new Blob([data],
            {type: 'application/zip'});
        //@ts-ignore
        if (window.navigator.msSaveOrOpenBlob) {
            //@ts-ignore
            navigator.msSaveOrOpenBlob(blob, fileName + '.' + fileType)
        } else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', fileName + '.' + fileType);
                link.click();
            } else {
                console.log("DO NHANH NAY");
                data = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + data;
                window.open(encodeURI(data));
            }
            document.body.removeChild(link);
        }
    }


}
