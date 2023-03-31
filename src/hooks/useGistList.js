import { useEffect } from "react"
import { useAppDispatch, useAppState } from '../state'
import { fetchPublicGist } from '../state/gist'

export const useGistList = () => {

    const dispatch = useAppDispatch();

    const gist = useAppState((state) => state.gist);

    //Fetches the public gist on component mount
    useEffect(() => {
        dispatch(fetchPublicGist());
    }, []);

    return {
      gist
    }
}