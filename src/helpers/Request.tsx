import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// interface
import { ParametersProps, AuthResponse } from "./helpers";

/*
    Giriş sayfası için helper fonksiyonu, 
    access tokenı alıp localstorage kaydeder
*/
export async function HandleLoginToken(username: string, password: string): Promise<AuthResponse> {
  const authEndpoint = process.env.NEXT_PUBLIC_AUTH_ENDPOINT!;
  const appEndpoint = authEndpoint + '/security/createToken';

  try {
    const response = await axios.post(appEndpoint, {
      userName: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;

    return data;
  } catch (error: any) {
    // Giriş hataları için kullanıcılara error gösterilmesi için 
  
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      switch (status) {
        case 401:
           return { error: 401, error_description: 'Email adresiniz veya parolanız yanlış olabilir.' };
        case 403:
          return { error: 403, error_description: 'Yetkiniz olmayan talepte bulundunuz.' };
        case 404:
          return { error: 404, error_description: 'Sayfa bulunamadı.' };
        case 500:
          return { error: 500, error_description: 'Beklenmedik hata oluştu.' };
        default:
          return {
            error: status ?? 0,
            error_description: error.message,
          };
      }
    } else {
      return {
        error: 0,
        error_description: 'Bilinmeyen bir hata oluştu.',
      };
    }
  }
} 

/*
  API istekleri için oluşturulmuş helper fonksiyon
*/
export async function Request<T = any>(parameters: ParametersProps): Promise<T> {
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT!;
  
  try {
    const { method = 'GET', url = '', data } = parameters;
     let token: string | null = null

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth')
      if (stored) {
        const parsed = JSON.parse(stored)
        token = parsed?.state?.token || null
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url: ENDPOINT + url,
      headers: {
        'Content-Type': 'application/json',
        ...(
          token ? 
            { Authorization: `Bearer ${token}` } 
          : 
          {}
        ),
      },
      data
    };

    const response: AxiosResponse<T> = await axios(config);

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if ((status === 401 || status === 403) && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      window.location.href = "/logout";
    }

    throw error;
  }
}