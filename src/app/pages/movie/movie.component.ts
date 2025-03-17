import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Movie } from '../../core/models/movie.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie',
  imports: [MatCardModule],
  templateUrl: './movie.component.html',
  styles: `
 .movie-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(to right, rgb(50, 50, 99), rgb(103, 103, 250));
    }
    .img-card {
      max-width: 600px;
      width: 100%;
      margin-bottom: 16px;
      box-sizing: border-box;
      color: black;
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
    .NetError {
      color: #fffacd;
    }
    mat-card-title {
      color: #078ebb;
      font-size: 1.5rem;
      font-weight: bold;
    }
    mat-card-subtitle {
      font-size: 1rem;
      color: gray;
    }
    mat-card-content p {
      font-size: 1rem;
      line-height: 1.5;
    }
  `,
})
export default class MovieComponent implements OnInit {
  movie?: Movie;
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.apiService.getMovieDetails(+movieId).subscribe((movie) => {
        this.movie = movie;
      });
    }
  }
}
