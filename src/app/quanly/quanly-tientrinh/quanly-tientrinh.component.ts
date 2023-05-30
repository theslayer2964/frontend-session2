import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {ColorRenderService} from "../../shared-service/color-render.service";
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {QlTientrinhDetaiTransferService} from "../../transfer-data-service/ql-tientrinh-detai-transfer.service";
import {QlTientrinhSvTransferService} from "../../transfer-data-service/ql-tientrinh-sv-transfer.service";
import {QlTientrinhGvTransferService} from "../../transfer-data-service/ql-tientrinh-gv-transfer.service";
import {
    QlTientrinhSvChuaNhomTransferService
} from "../../transfer-data-service/ql-tientrinh-sv-chua-nhom-transfer.service";
import {
    QlTientrinhNhomChuaDeTaiTransferService
} from "../../transfer-data-service/ql-tientrinh-nhom-chua-de-tai-transfer.service";

Chart.register(...registerables);

@Component({
    selector: 'app-quanly-tientrinh',
    templateUrl: './quanly-tientrinh.component.html',
    styleUrls: ['./quanly-tientrinh.component.scss']
})
export class QuanlyTientrinhComponent implements OnInit {

    constructor(private colorRenderService: ColorRenderService,
                private quanLyService: QuanlyLichService,
                private qlTientrinhDetaiTransferService: QlTientrinhDetaiTransferService,
                private qlTientrinhSVTransferService: QlTientrinhSvTransferService,
                private qlTientrinhGVTransferService: QlTientrinhGvTransferService,
                private qlTientrinhSVChuaNhomTransferService: QlTientrinhSvChuaNhomTransferService,
                private qlTientrinhNhomChuaDTTransferService: QlTientrinhNhomChuaDeTaiTransferService) {
    }

    ngOnInit() {
        /// char 1: sinh vien / de tai
        this.quanLyService.thongKeSVDT().subscribe((res: any) => {
            const chart = new Chart("myChart", {
                type: 'line',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: 'Sinh viên',
                        data: res.dataSets[0].datas,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }, {
                        label: 'Đề tài',
                        data: res.dataSets[1].datas,
                        fill: false,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        tension: 0.1
                    },
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê số lượng sinh viên / đề tài'
                        }
                    }
                }
            });
            this.qlTientrinhSVTransferService.sendSV(res.dataSets[0].datas[res.dataSets[0].datas.length - 1]);
            this.qlTientrinhDetaiTransferService.sendDeTai(res.dataSets[1].datas[res.dataSets[1].datas.length - 1]);
        })

        /// char 2: sinh vien
        this.quanLyService.thongKeSvDaCoNhom().subscribe((res:any) => {
            console.log(res.labels)
            var myChart2 = new Chart("myChart2", {
                type: 'pie',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: 'Số lượng: ',
                        data: res.dataSets[0].datas,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê sinh viên đăng ký nhóm của học kỳ hiện tại'
                        }
                    }
                }
            });
            this.qlTientrinhSVChuaNhomTransferService.sendSVChuaNhom(res.dataSets[0].datas[1]);
        })

        // chart 3: de tai
        this.quanLyService.thongKeNhomDaDKDeTai().subscribe((res:any) => {
            var myChart3 = new Chart("myChart3", {
                type: 'pie',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: 'Số lượng: ',
                        data: res.dataSets[0].datas,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',

                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê nhóm theo đề tài của học kỳ hiện tại'
                        }
                    }
                }
            });
            this.qlTientrinhNhomChuaDTTransferService.sendNhomChuaDeTai(res.dataSets[0].datas[1]);
        })

        /// char 4: giang vien
        this.quanLyService.thongKeDeTaiGV().subscribe((res:any)=> {
            var myChart4 = new Chart("myChart4", {
                type: 'bar',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: 'đã được đăng ký',
                        data: res.dataSets[0].datas,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgb(75, 192, 192)',
                        ],
                        borderWidth: 1
                    },{
                        label: 'chưa được đăng ký',
                        data: res.dataSets[1].datas,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x:{
                            stacked: true
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê đề tài của từng giảng viên'
                        }
                    }
                },
            });
            this.qlTientrinhGVTransferService.sendGV(res.labels.length);
        })

        // chart 5:
        this.quanLyService.thongKeSoNhomGiangVienCoTheNhan().subscribe((res:any) => {
            let listBGColor: string[] = this.colorRenderService.returnBackgroundColor(res.labels.length);
            let listBDColor: string[] = this.colorRenderService.returnBorderColor(res.labels.length);
            var myChart5 = new Chart("myChart5", {
                type: 'bar',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: res.dataSets[0].label,
                        data: res.dataSets[0].datas,
                        backgroundColor: listBGColor,
                        borderColor: listBDColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê số nhóm giảng viên còn có thể nhận'
                        }
                    }
                },
            });
        })
        /// char 6: thong ke de tai theo do kho cua giang vien
        // this.quanLyService.thongKeDeTaiGV().subscribe((res:any)=> {
        this.quanLyService.thongKeDeTaiTheoMucDoKhoCuaTungGiangVien().subscribe((res: any) => {
            var myChart4 = new Chart("myChart6", {
                type: 'bar',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: 'Khó',
                        data: res.dataSets[0].datas,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgb(75, 192, 192)',
                        ],
                        borderWidth: 1
                    },{
                        label: 'khá',
                        data: res.dataSets[1].datas,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                        ],
                        borderWidth: 1
                    },{
                        label: 'Trung bình',
                        data: res.dataSets[2].datas,
                        backgroundColor: [
                            'rgb(75, 192, 192)',
                        ],
                        borderColor: [
                            'rgb(75, 192, 192)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x:{
                            stacked: true
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê đề tài theo độ khó của từng giảng viên'
                        }
                    }
                },
            });
        })

        // })

        // chart 6: thong ke de tai theo do kho
        // this.quanLyService.thongKeNhomDaDKDeTai().subscribe((res:any) => {
        this.quanLyService.thongKeDeTaiTheoMucDoKho().subscribe((res:any)=> {
            var myChart3 = new Chart("myChart7", {
                type: 'pie',
                data: {
                    labels: res.labes,
                    datasets: [{
                        label: 'Số lượng: ',
                        data: res.dataSets[0].datas,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(75, 192, 192)',
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Thống kê đề tài theo độ khó'
                        }
                    }
                }
            });
        })
    }



}
