/** Content */

export interface MovieBase {
  id: number
  title: string
  average: number
  image: string
}

export type Movies = MovieBase[]

export interface Movie extends MovieBase {
  description: string
  release: string
  genres: Genre[]
}

/** Options */

export interface Genre {
  id: string
  text: string
}

export interface SortType {
  id: string
  text: string
}

export interface Options  {
  sortTypes: SortType[],
  genres: Genre[]
}

/** Config */

export interface Config {
  sorting: SortType[],
  genres: Genre[]
}

export interface Favorite {
  id: number
  text: string
  image: string
}

/** State */

export interface State {
  page: number
  totalPages: number
  movies: Movies
  movie: Movie | null
  favorites: Favorite[]
  options: Options
  config: Config
}

export type Action = {type: "INCRIMENT_PAGE"}
| { type: "SET_TOTAL_PAGES", pages: number }
| { type: "SET_MOVIES", movies: Movies }
| { type: "ADD_MOVIES", movies: Movies }
| { type: "SET_CONFIG_SORTING", sorting: SortType[]}
| { type: "SET_CONFIG_GENRES", genres: Genre[] }
| { type: "SET_OPTION_GENRES", genres: Genre[] }
| { type: "CLEAR_MOVIES" }
| { type: "REMOVE_MOVIE" }
| { type: "SET_MOVIE", movie: Movie}
| { type: "ADD_FAVORITE", favorite: Favorite }
| { type: "REMOVE_FAVORITE", id: number}
| { type: "DEFAULT"}


export interface Data extends State {
  loading: boolean
  setPage: () => void, 
  setSorting: (sorting: SortType[]) => void, 
  setGenres: (genres: Genre[]) => void, 
  loadMovies: (onSuccess?: (movies:Movies) => void) => void
  loadMovie: (id: number) => void
  removeMovie: () => void
  addFavorite: (id: number) => void,
  removeFavorite: (id: number) => void,
  isFavorite: (id: number) => boolean
}




