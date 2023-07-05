import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();

const BASE_URL = process.env.REACT_APP_ALADIN_BASE_URL;
const API_KEY = process.env.REACT_APP_ALADIN_API_KEY;

router.get('/:id/relatives', async (req, res, next) => {
  const keyword = req.query.keyword;
  const searched = await fetch(
    `${BASE_URL}/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${keyword}&QueryType=Title&Cover=Big&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101`
  )
    .then((res) => res.json())
    .then((data) => data.item);

  res.status(200).json(searched);
});

export default router;
