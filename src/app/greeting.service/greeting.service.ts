import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GreetingService {
  constructor(private http: HttpClient) {}

  async getGreeting(name?: string): Promise<string> {
    let url = '/api/GetGreeting';
    if (name) {
      url += `?name=${name}`;
    }
    const request$ = this.http.get<string>(url);
    return firstValueFrom(request$);
  }
}
