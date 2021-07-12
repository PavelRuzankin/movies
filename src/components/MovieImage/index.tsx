import React from 'react'
import styles from "./image.module.scss"

interface MovieImageProps {
  image: string,
  type?: "big" | "small"
} 

const DEFAULT_IMAGE = "https://downloader.disk.yandex.ru/preview/f7a23ca21c4363778c0aa03cb65465c7503f291e53ae4496dcb31fdcf052304c/60eba290/RENNqkaQ-KdQUwlg5kBpMZ_btYXu_OurEzJcBPCRvo6YX8DTwThiDmqbdgfCRErBHyROZwsIbu-2XAJ-8y_oxQ%3D%3D?uid=0&filename=Background.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048"
const SMALL_IMAGE = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const BIG_IMAGE = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"

const MovieImage: React.FC<MovieImageProps> = (props): React.ReactElement => {

  let imageSrc = ""
  if(props.image?.length) {
    if(props.type === "big"){
      imageSrc = BIG_IMAGE + props.image
    }else{
      imageSrc = SMALL_IMAGE + props.image
    }
  }else{
    imageSrc = DEFAULT_IMAGE
  }

  return (
    <img className={styles.image} src={imageSrc} />
  )
}

export default MovieImage