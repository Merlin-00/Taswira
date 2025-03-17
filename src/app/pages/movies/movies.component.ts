import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../core/models/movie.model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MatCardModule, MatSelectModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export default class MoviesComponent implements OnInit {
  movies?: Movie[];
  trailers: { [key: number]: any[] } = {};
  api = inject(ApiService);
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
  animes: Movie[] = [];

  getAnimesByChange(genreId: number): void {
    this.api.getAnimesByGenre(genreId).subscribe((anime) => {
      this.animes = anime.filter((anim) => anim.original_language === 'ja');
    });
  }

  onGenreChange(event: Event): void {
    const genreId = (event.target as HTMLSelectElement).value;
    this.getAnimesByChange(Number(genreId));
  }

  ngOnInit(): void {
    this.api.getMoviesByPopulary().subscribe((movies) => {
      this.movies = movies;
      this.movies.forEach((movie) => {
        this.api.getMovieTrailers(movie.id).subscribe((trailers) => {
          this.trailers[movie.id] = trailers;
        });
      });
    });
    this.getAnimesByChange(this.genres[0].id);
  }
}
