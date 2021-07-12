import { useEffect, useRef } from "react"


const useUpdate = (callback: () => void, dependencies: any[]) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {

    firstRenderRef.current 
    ? (firstRenderRef.current = false)
    : callback()
    
  }, [...dependencies]);
}

export default useUpdate