// tag-filter.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagFilterService {
  private selectedTagSubject = new Subject<string>();
  selectedTag$ = this.selectedTagSubject.asObservable();

  setSelectedTag(tag: string): void {
    this.selectedTagSubject.next(tag);
  }
}
