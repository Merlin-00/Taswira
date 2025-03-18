import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Movie } from '../../core/models/movie.model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MatCardModule, MatSelectModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent implements OnInit, OnDestroy {
  // Rendre le composant reutilisable
  sectionTitle = input.required<string>();
  query = input.required<string>();
  keyword = input<string>();
  movies?: Movie[];
  filteredMovies?: Movie[];
  // Propriété pour stocker les bandes-annonces des films
  trailers: { [key: number]: any[] } = {};
  api = inject(ApiService);
  moviesSub$!: Subscription;
  loading = signal(true);

  ngOnInit(): void {
    // Récupérer les films selon la requête
    if (this.keyword()) {
      console.log('hey');
      this.moviesSub$ = this.api
        .searchMovies(this.keyword()!)
        .subscribe((movies) => {
          this.movies = movies;
          this.filteredMovies = movies;

          this.loading.set(false);
        });
    } else {
      this.moviesSub$ = this.api.getMovies(this.query()).subscribe((movies) => {
        this.movies = movies;
        this.filteredMovies = movies;
        this.loading.set(false);
      });
    }
  }

  // Liste des genres d'animes
  genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 35, name: 'Comédie' },
    { id: 18, name: 'Drame' },
    { id: 14, name: 'Fantastique' },
    { id: 27, name: 'Horreur' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science-Fiction' },
  ];

  // Méthode appelée lors du changement de genre
  onGenreChange(event: Event): void {
    this.loading.set(true);
    const genreId = (event.target as HTMLSelectElement).value;
    if (genreId === 'all') {
      this.filteredMovies = this.movies;
      this.loading.set(false);
      return;
    }
    // on va recuperer les films par genre etant donné que chaque film a genre_ids[]
    const newMovies = this.movies?.filter((movie) =>
      movie.genre_ids.includes(Number(genreId))
    );
    this.filteredMovies = newMovies;
    this.loading.set(false);
  }

  ngOnDestroy(): void {
    // je dois me desabonner de l'observable
    this.moviesSub$.unsubscribe();
  }
}
