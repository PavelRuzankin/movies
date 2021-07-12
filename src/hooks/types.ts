export interface genreResponse {
  id: number
  name: string
}

export interface genresResponse {
  genres: genreResponse[]
} 

export interface BaseMovieResponse {
  id: number
  title: string 
  poster_path: string
  vote_average: number
}

export interface MoviesResponse {
  page: number
  results: BaseMovieResponse[]
  total_pages: number
  total_results: number
}

export interface MovieResponse extends BaseMovieResponse {
  overview: string
  release_date: string
  genres: genreResponse[]
}