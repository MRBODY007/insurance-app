import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

//  Custom Hook สำหรับ dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

//  Custom Hook สำหรับดึง state จาก Redux Store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
