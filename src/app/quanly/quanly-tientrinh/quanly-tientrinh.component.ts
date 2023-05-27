import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

@Component({
    selector: 'app-quanly-tientrinh',
    templateUrl: './quanly-tientrinh.component.html',
    styleUrls: ['./quanly-tientrinh.component.scss']
})
export class QuanlyTientrinhComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        /// char 1: sinh vien / de tai
        const chart = new Chart("myChart", {
            type: 'line',
            data: {
                labels: ["Thang 1", "Thang 2", "Thang 3", "Thang 4", "Thang 5", "Thang 6", "Thang 7"],
                datasets: [{
                    label: 'Sinh viên',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, {
                    label: 'Đề tài',
                    data: [5, 9, 70, 100, 200, 30, 50],
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

        /// char 2: sinh vien
        var myChart2 = new Chart("myChart2", {
            type: 'pie',
            data: {
                labels: [
                    'Đã đăng ký',
                    'Chưa được đăng ký'
                ],
                datasets: [{
                    label: 'Số lượng: ',
                    data: [300, 100],
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
                        text: 'Thống kê sinh viên của học kỳ hiện tại'
                    }
                }
            }
        });
        // chart 3: de tai
        var myChart3 = new Chart("myChart3", {
            type: 'pie',
            data: {
                labels: [
                    'Đã đăng ký',
                    'Chưa được đăng ký',
                    'Đang chỉnh sửa / chưa đạt'
                ],
                datasets: [{
                    label: 'Số lượng: ',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Thống kê đề tài của học kỳ hiện tại'
                    }
                }
            }
        });
        /// char 4: giang vien
        var myChart4 = new Chart("myChart4", {
            type: 'bar',
            data: {
                labels: ["Nguyen Thi Hanh", "Nguyen Trong Tien", "Pham Quang Tri", "Le Thi Bao Ha", "Tran Thu Ha",
                    "Ton Phuoc Long", "Nguyen A"],
                datasets: [{
                    label: 'đã được đăng ký',
                    data: [5, 3, 10, 7, 6, 3, 8],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                    ],
                    borderWidth: 1
                },{
                    label: 'chưa được đăng ký',
                    data: [5, 3, 10, 7, 6, 3, 8],
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

    }

}
