import express, { response } from 'express';
import { db } from '../db/database.js';

let libraries = {
  cOgqrqCxaLbHcRSKHuL1p8FeJRF3: [
    {
      title: '해커와 국가 - 사이버 공격과 지정학의 뉴노멀',
      author: '벤 뷰캐넌 (지은이), 강기석 (옮긴이)',
      pubDate: '2023-02-22',
      description: '사이버 해킹, 사이버 감시, 사이버 공격, 사이버 전쟁에 대한 지금까지의 사례와 왜 이러한 행위들이 끊임없이 일어나고 있는지 그 의미를 밝힌다.',
      isbn: 'K502831845',
      isbn13: '9791190186292',
      itemId: 311149281,
      priceSales: 31500,
      priceStandard: 35000,
      cover: 'https://image.aladin.co.kr/product/31114/92/cover/k502831845_1.jpg',
      categoryId: 51401,
      categoryName: '국내도서>사회과학>국방/군사학>군사전략/무기',
      publisher: '두번째테제',
    },

    {
      title: '세이노의 가르침',
      author: '세이노 (지은이)',
      cover: 'https://image.aladin.co.kr/product/30929/51/cover/k732831392_2.jpg',
      itemId: 309295168,
      isbn: 'K732831392',
      isbn13: '9791168473690',
      publisher: '데이원',
      description:
        '2000년부터 발표된 그의 주옥같은 글들. 독자들이 자발적으로 만든 제본서는 물론, 전자책과 앱까지 나왔던 《세이노의 가르침》이 드디어 전국 서점에서 독자들을 마주한다. 여러 판본을 모으고 저자의 확인을 거쳐 최근 생각을 추가로 수록하였다. 정식 출간본에만 추가로 수록된 글들은 목차와 본문에 별도 표시하였다.',
    },
  ],
};

const router = express.Router();

router.get('/:uid', async (req, res, next) => {
  const userId = req.params.uid;

  res.status(200).json(libraries[userId]);
});

router.post('/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const book = req.body;
  if (book) {
    libraries[userId] = [book, ...libraries[userId]];
    const data = libraries[userId].find((libItem) => libItem.itemId === book.itemId);
    res.status(201).json(data);
  } else {
    res.status(404).json({ message: 'book Not Found' });
  }
});

router.delete('/:uid', (req, res, next) => {
  const userId = req.params.uid;
  const bookId = req.body.bookId;

  if (bookId) {
    libraries[userId] = libraries[userId].filter((libItem) => libItem.itemId !== bookId);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'book Not Found' });
  }
});

export default router;
