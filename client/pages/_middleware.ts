import { NextApiResponse, NextApiRequest } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse, next: Function) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}
