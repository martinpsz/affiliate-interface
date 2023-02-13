import { createContext } from '@lit-labs/context';
export const appContext = createContext(Symbol('app-context'));
export const dataContext = createContext({ agr_id: Number });
