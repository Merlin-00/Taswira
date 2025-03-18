import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import MoviesComponent from '../movies/movies.component';

@Component({
  selector: 'app-search',
  imports: [MoviesComponent],
  template: `
    <main>
      <app-movies
        [sectionTitle]="'Résultats de recherche pour ' + keyword"
        query="search"
        [keyword]="keyword"
      ></app-movies>
    </main>
  `,
  styles: `
    main {
      width:100%;
      min-height: 50vh;
    }
  `,
})
export default class SearchComponent implements OnInit, OnDestroy {
  private router = inject(ActivatedRoute);
  queryParamsSub$!: Subscription;
  keyword!: string;

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.keyword = params['keyword'];
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSub$?.unsubscribe();
  }
}
