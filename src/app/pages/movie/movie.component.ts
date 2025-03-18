import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { MovieDetails } from '../../core/models/movie.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styles: `
      main {
        padding: 1rem;
        display: flex;
        justify-content: center;
        min-height: 70vh;
        flex-wrap: wrap;
        gap:2rem;

        .img-section {
          max-width: 300px;
          img {
            width: 100%;
            border-radius: 8px;
            border: 1px solid #ccc;
          }
        }

        .content {
          flex:1;
          .additional-info {
            display: flex;
            gap:1rem;
            align-items: center;

            h1 {
              margin: 0;
            }

            p {
              color: var(--primary-color);
            }

            div {
              display: flex;
              gap: 1rem;

              span {
                background-color: var(--primary-color);
                color: #fff;
                padding: 0.5rem;
                font-size: 0.8rem;
                border-radius: 5px;
              }
            }
          }

          .companies {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            div {
              display: flex;
              gap: 0.5rem;
              align-items: center;
              img {
                width: 40px;
              }
            }
          }
        }

        img{
          width:40px
        }
      }
  `,
})
export default class MovieComponent implements OnInit, OnDestroy {
  id = input.required<number>();
  loading = signal(true);
  // Propriété pour stocker les détails du film
  movie!: MovieDetails;
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  movieSub$!: Subscription;

  ngOnInit(): void {
    this.apiService.getMovieDetails(this.id()).subscribe((movie) => {
      this.movie = movie;

      this.loading.set(false);
    });
    // // Récupérer l'ID du film à partir de l'URL
    // const movieId = this.route.snapshot.paramMap.get('id');
    // if (movieId) {
    //   // Appeler le service API pour obtenir les détails du film
    //   this.apiService.getMovieDetails(+movieId).subscribe((movie) => {
    //     this.movie = movie;
    //   });
    // }
  }

  ngOnDestroy(): void {
    this.movieSub$?.unsubscribe();
  }
}
