import React, { createContext, useContext, useEffect, useReducer } from 'react'
import _ from 'lodash'

import useHttp from '../hooks/useHttp.hook'
import useUpdate from "../hooks/useUpdate.hook"

import * as ACTION_TYPES from "./actionTypes"

import { 
  State, Action, Data, 
  Genre, SortType, Movies 
} from "./types"
import { useHistory } from 'react-router-dom'

interface ContextProps {
  children: React.ReactElement
}

let DataContext = createContext<Data | null>(null)

const initialState: State  = {
  page: 1,
  totalPages: 0,
  movies: [],
  movie: null,
  favorites: [],
  options: {
    sortTypes: [ 
      {text: "По популярности", id: "popularity"}, 
      {text: "По рейтенгу", id: "vote_average"}, 
      {text: "По новизне",  id: "primary_release_date"} 
    ],
    genres: [],
  },
  config: {
    sorting: [],
    genres: []
  }
}

const reducer = (state: State, action: Action): State => {

  switch(action.type){
    case ACTION_TYPES.INCRIMENT_PAGE:
      return  { ...state, page: state.page + 1 }
    case ACTION_TYPES.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.pages }
    case ACTION_TYPES.SET_MOVIES:
      return  { ...state, movies: action.movies }
    case ACTION_TYPES.ADD_MOVIES:
      return { ...state, movies: state.movies.concat(action.movies) }
    case ACTION_TYPES.SET_CONFIG_SORTING:
      const sortingConfig = { ...state.config, sorting: action.sorting }
      return { ...state, config: sortingConfig };
    case ACTION_TYPES.SET_CONFIG_GENRES:
      const genresConfig = { ...state.config, genres: action.genres }
      return { ...state, config: genresConfig };
    case ACTION_TYPES.SET_OPTION_GENRES:
      const options = { ...state.options, genres: action.genres }
      return { ...state, options };
    case ACTION_TYPES.CLEAR_MOVIES:
      return { ...state, movies: [] };
    case ACTION_TYPES.SET_MOVIE:
      return { ...state, movie: action.movie}
    case ACTION_TYPES.REMOVE_MOVIE:
      return { ...state, movie: null }
    case ACTION_TYPES.ADD_FAVORITE:
      return { ...state, favorites: state.favorites.concat([action.favorite]) }
    case ACTION_TYPES.REMOVE_FAVORITE:
      const favorites = state.favorites.filter(favorite => favorite.id !== action.id)
      return { ...state, favorites }
    case ACTION_TYPES.DEFAULT:
      return state 
  }
}

export const DataProvider: React.FC<ContextProps> = (props): React.ReactElement => {

  const [ state, dispatch] = useReducer(reducer, initialState)

  const history = useHistory()

  const { fetchGenres, fetchMovies, fetchMovie, loading } = useHttp()
  
  const setSorting = (sorting: SortType[]) => dispatch({type: ACTION_TYPES.SET_CONFIG_SORTING, sorting})
  const setGenres = (genres: Genre[]) => dispatch({type: ACTION_TYPES.SET_CONFIG_GENRES, genres})

  const setPage = () => dispatch({type: ACTION_TYPES.INCRIMENT_PAGE})
  const removeMovie = () => dispatch({type: ACTION_TYPES.REMOVE_MOVIE})

  const removeFavorite = (id: number) => dispatch({ type: ACTION_TYPES.REMOVE_FAVORITE, id })
  const addFavorite = (id: number) => {

    const movie = state.movies.find( movie => movie.id === id )

    if(!movie) return

    const favorite = {
      id: movie.id,
      text: movie.title, 
      image: movie.image,
    }

    dispatch({ type: ACTION_TYPES.ADD_FAVORITE, favorite })
  }

  const isFavorite = (id: number) => {
    return state.favorites.some(item => item.id === id)
  }

  const loadGenres = async () => {
    try {
      const data = await fetchGenres()

      if(data){
        const genres = data.genres.map(genre => ({
          text: genre.name[0].toUpperCase() + genre.name.slice(1),
          id: _.toString(genre.id)
        }))
        
        dispatch({type: ACTION_TYPES.SET_OPTION_GENRES, genres})
      }
    } catch(error) {
      console.log(error);
      
    }
  }

  const loadMovies = async (
    onSuccess?: (movies: Movies) => void,
    onError?: () => void
    ) => {

    const [ sortType ] = state.config.sorting
    const genres = state.config.genres.map(genre => genre.id)

    try {
      const data = await fetchMovies(genres, sortType?.id, state.page)

      if(data){
        const pages = data.total_pages
        const movies = data.results.map(result => ({
          id: result.id,
          title: result.title,
          average: result.vote_average,
          image: result.poster_path,
        }))
    
        dispatch({type: ACTION_TYPES.SET_TOTAL_PAGES, pages})
        onSuccess && onSuccess(movies)
      }

    } catch (error) {
      onError && onError()
    }
  }

  const loadMovie = async (id: number) => {

    try {
      const result = await fetchMovie(id)

      if(result) {
        
        const movie = {
          id: result.id,
          title: result.title,
          average: result.vote_average,
          image: result.poster_path,
          description: result.overview, 
          release: result.release_date,
          genres: result.genres.map(genre => ({
            text: genre.name,
            id: _.toString(genre.id)
          }))
        }
  
        dispatch({type: ACTION_TYPES.SET_MOVIE, movie})
      } 
    } catch (error) {

      console.log(error);
      history.push("/movies")
      dispatch({type: ACTION_TYPES.REMOVE_MOVIE})
    }
  }

  useEffect(() => {
    dispatch({type: ACTION_TYPES.CLEAR_MOVIES})

    loadMovies(movies => {
      dispatch({type: ACTION_TYPES.SET_MOVIES, movies})
    })

  }, [state.config])

  useEffect(() => {
    loadGenres()
  }, [])

  useUpdate(() => {

    loadMovies(movies => {
      dispatch({type: ACTION_TYPES.ADD_MOVIES, movies})
    })

  }, [state.page])
  
  return (
    <DataContext.Provider
      value={{ ...state, loading, loadMovie, 
        removeMovie, removeFavorite, isFavorite,
        addFavorite, setPage, setSorting, setGenres, loadMovies 
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}

export const useData = (): Data => useContext(DataContext) as Data