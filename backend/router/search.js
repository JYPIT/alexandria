import express, { response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const BASE_URL = process.env.REACT_APP_ALADIN_BASE_URL;
const API_KEY = process.env.REACT_APP_ALADIN_API_KEY;

router.get('/', async (req, res, next) => {
  const query = req.query.search_query;

  const searched = await fetch(
    `${BASE_URL}/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${query}&QueryType=Keyword&Cover=Big&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101`
  ).then((res) => res.json());
  if (searched) {
    res.status(200).json(searched.item);
  } else {
    res.status(404).json({ message: '검색어가 존재하지 않습니다.' });
  }
});
export default router;
