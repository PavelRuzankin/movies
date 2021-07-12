import { useState } from "react"

import { genresResponse, MovieResponse, MoviesResponse } from "./types"

const API_KEY = "4237669ebd35e8010beee2f55fd45546"

const request = (path: string) => (
  fetch(`https://api.themoviedb.org/${path}api_key=${API_KEY}&language=ru`)
)

const useHttp = () => {

  const [ loading, setLoading ] = useState(false)

  const fetchMovies = async (
    genres: string[] = [], 
    sortType: string = "", 
    page: number | null
    ): Promise<MoviesResponse | undefined> => {

    let url = "3/discover/movie/?"
    sortType.length && (url += `sort_by=${sortType}.desc&`)
    genres.length && (url += `with_genres=${genres.join(",")}&`)
    url += `page=${page ? page : 1}&`

    try {
      setLoading(true)
      const response = await request(url)
      const data = await response.json()
      setLoading(false)
  
      return data
    } catch (error){

      setLoading(false)
      throw new Error(error)
    }
  }

  const fetchMovie = async (id: number): Promise<MovieResponse | undefined> => {

    try{
      setLoading(true)
      const response = await request(`3/movie/${JSON.stringify(id)}?`)
      const data = await response.json()
      setLoading(false)

      return data

    } catch(error) {

      setLoading(false)
      throw new Error(error)
    }
  }

  const fetchGenres = async (): Promise<genresResponse | undefined> => {

    try{
      setLoading(true)
      const response = await request("3/genre/movie/list?")
      const data = await response.json()
      setLoading(false)
  
      return data
      
    } catch (error) {
      setLoading(false)
      throw new Error(error)
    }

  }

  return {
    loading,
    fetchMovies,
    fetchMovie,
    fetchGenres
  }
}

export default useHttp