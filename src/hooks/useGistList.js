import { useEffect } from "react"
import { useAppDispatch, useAppState } from '../state'
import { fetchPublicGist } from '../state/gist'

export const useGistList = () => {

    const dispatch = useAppDispatch();

    const gist = useAppState((state) => state.gist);

    useEffect(() => {
        dispatch(fetchPublicGist());
    }, []);

    return {
        gist
    }
}