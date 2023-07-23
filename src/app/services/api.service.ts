import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postProject(data: any) {
    return this.http.post<any>('http://192.168.0.134:3000/project', data);
  }

  getUser() {
    return this.http.get<any>('http://192.168.0.134:3000/projects');
  }
  getProject(id: string) {
    return this.http.get<any>(`http://192.168.0.134:3000/project/${id}`);
  }

  // getSuggestions(
  //   query: string,
  //   hl: string = 'fa',
  //   geo: string = 'IR'
  // ): Observable<string[]> {
  //   const url = `http://192.168.0.134:9003/autoComplete?keywords=${query}&hl=fa&geo=IR&timeZone=-210`;
  //   return this.http.get<string[]>(url);
  // }

  // getStates(term: string): Observable<{mid:string  , title:string , type:string}[]> {

  //   const url = `http://192.168.0.134:9003/autoComplete?keywords=${term}&hl=fa&geo=IR&timeZone=-210`;
  //   return this.http.get<{mid:string  , title:string , type:string}[]>(url);

  // }

  getSuggestion(
    titel: string,
    hl: string = 'fa',
    geo: string = 'IR'
  ): Observable<any> {
    const url = `http://192.168.0.134:9003/autoComplete?keywords=${titel}&hl=${hl}&geo=${geo}&timeZone=-210`;
    return this.http.get(url);
  }

  putProject(data: any, id: number) {
    return this.http.put<any>('http://192.168.0.134:3000/projects' + id, data);
  }

  deletProject(id: number) {
    return this.http.delete<any>('http://192.168.0.134:3000/project/' + id);
  }

  postGroup(data: any, id: any) {
    console.log(id);
    console.log(data);

    return this.http.post<any>(
      `http://192.168.0.134:3000/project/${id}/groups`,
      data
    );
  }
}
