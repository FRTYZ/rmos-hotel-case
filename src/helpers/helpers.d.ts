export interface ParametersProps {
    method?: string,
    url?: string,
    data?: any
}

export interface AuthResponse {
  access_token?: string;
  error?: number;
  error_description?: string;
}
