import { createAxiosInstance } from './createAxiosInstance';

const client = createAxiosInstance(process.env.NEXT_PUBLIC_API_URL ?? '');

export default client;
