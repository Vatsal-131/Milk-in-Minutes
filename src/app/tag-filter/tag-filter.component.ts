// tag-filter.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.css'],
})
export class TagFilterComponent implements OnInit {
  tags: string[] = [];
  @Input() foods: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getUniqueTags().subscribe(
      (tags) => {
        this.tags = tags;
      },
      (error) => {
        console.error('Error fetching tags:', error);
        // Handle error as needed
      }
    );
  }

  filterByTag(tag: string): void {
    this.homeService.setSelectedTag(tag);
  }
}
