import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Report } from './report';
import { GenericHttpService } from '@app/generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService extends GenericHttpService<Report> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'purchaseorders');
  } // constructor
}
