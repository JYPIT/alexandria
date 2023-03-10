import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const BASE_URL = process.env.REACT_APP_ALADIN_BASE_URL;
const API_KEY = process.env.REACT_APP_ALADIN_API_KEY;

router.get('/best', async (req, res, next) => {
  const data = await axios
    .get(`${BASE_URL}/ItemList.aspx?ttbkey=${API_KEY}&QueryType=Bestseller&MaxResults=15&start=1&Cover=Big&SearchTarget=Book&output=js&Version=20131101`)
    .then((res) => res.data);

  res.status(200).json(data);
});

router.get('/new', async (req, res, next) => {
  const data = await axios
    .get(`${BASE_URL}/ItemList.aspx?ttbkey=${API_KEY}&QueryType=ItemNewSpecial&MaxResults=12&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`)
    .then((res) => res.data);

  res.status(200).json(data);
});

router.get('/blog', async (req, res, next) => {
  const data = await axios
    .get(`${BASE_URL}/ItemList.aspx?ttbkey=${API_KEY}&QueryType=BlogBest&MaxResults=12&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`)
    .then((res) => res.data);

  res.status(200).json(data);
});
export default router;
