import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { HistoryRootObject } from './history/history.component';
import { ResponsesRootObject } from './survey-responses/survey-responses.component';
@Injectable({
  providedIn: 'root',
})
export class AllservicesService {
  //Constructor...
  constructor(private httpClient: HttpClient) {}

  //Register User
  
}