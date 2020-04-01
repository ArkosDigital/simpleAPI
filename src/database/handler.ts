import { Handler } from 'flexiblepersistence';
import eventDatabase from './eventDatabase';

const handler = new Handler(eventDatabase);

export default handler;
