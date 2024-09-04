import { createAxiosInstance } from '@/libs/client/createAxiosInstance';
import axios from 'axios';

const client = createAxiosInstance('/api');

export default client;
