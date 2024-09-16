import { useDispatch,useSelector } from "react-redux"

// 1 to dispatch to store
const useAppDispatch = useDispatch;
// 2 to select from store
const useAppSelector = useSelector;

export {useAppDispatch,useAppSelector}