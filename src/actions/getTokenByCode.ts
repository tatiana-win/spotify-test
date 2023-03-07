import { AuthService } from '../api/AuthService';
import { tokenService } from '../services/TokenService';

export const getTokenByCode = (code: string) => {
    return async(dispatch: any) => {
        const { data } = await dispatch(AuthService.endpoints.getTokenByCode.initiate(code));
         if (data) {
             tokenService.setTokenData(data);
             window.location.replace('/search');
         }
    }
}
