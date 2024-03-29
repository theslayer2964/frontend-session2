import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";
import {HocKy} from "./HocKy.models";

@Injectable({
  providedIn: 'root'
})
export class QuanlyLichService {
  private url = "http://localhost:8080/api/quan-ly/";
  private urlNhom = "http://localhost:8080/api/nhom/";
  private urlDeTai = "http://localhost:8080/api/de-tai/";

  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  themDSPhanCong(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.url + "them-ds-phan-cong", data, {headers: this.httpHeadersJWT});
  }

  thongKeSVDT() {
    return this.httpClient.get(this.url + "thong-ke-sinhvien-detai",  {headers: this.httpHeadersJWT})
  }

  thongKeSvDaCoNhom () {
    return this.httpClient.get(this.url + "thong-ke-sv-co-nhom",  {headers: this.httpHeadersJWT})
  }

  thongKeNhomDaDKDeTai () {
    return this.httpClient.get(this.url + "thong-ke-nhom-detai",  {headers: this.httpHeadersJWT})
  }

  thongKeDeTaiGV () {
    return this.httpClient.get(this.url + "thong-ke-detai-giangvien",  {headers: this.httpHeadersJWT})
  }

  thongKeSoNhomGiangVienCoTheNhan () {
    return this.httpClient.get(this.url + "thong-ke-giangvien-cothenhan",  {headers: this.httpHeadersJWT})
  }
  thongKeDeTaiTheoMucDoKho () {
    return this.httpClient.get(this.url + "thong-ke-mucdokho-detai",  {headers: this.httpHeadersJWT})
  }
  thongKeDeTaiTheoMucDoKhoCuaTungGiangVien () {
    return this.httpClient.get(this.url + "thong-ke-mucdokho-detai-giangvien",  {headers: this.httpHeadersJWT})
  }

  dsGvChuaDangKyDuSoLuongDeTai(soLuongToiThieu: number){
    return this.httpClient.get(this.url + "ds-giangvien-chuadu-so-detai-toithieu/" + soLuongToiThieu,  {headers: this.httpHeadersJWT})
  }

  dsSvChuaDkNhom(){
    return this.httpClient.get(this.url + "ds-sinhvien-chua-dangky-nhom/" ,  {headers: this.httpHeadersJWT})

  }

  dsNhomChuaCoDeTai(){
    return this.httpClient.get(this.url + "ds-sinhvien-chua-dangky-detai/" ,  {headers: this.httpHeadersJWT})
  }

  ganNhomNgauNhienBoiNgQuLy(data){
    return this.httpClient.post(this.urlNhom + "gan-nhom-tudong" ,data,  {headers: this.httpHeadersJWT})
  }

  layDSDeTaiChuaAiDangKy(){
    return this.httpClient.get(this.urlDeTai + "lay-ds-detai-chua-duoc-dangky",  {headers: this.httpHeadersJWT})
  }
  layDSNhomChuaChiuDK(){
    return this.httpClient.get(this.urlNhom + "lay-ds-nhom-chua-dangky-detai", {headers: this.httpHeadersJWT} )
  }
}
