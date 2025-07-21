import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordbookInfo from './WordbookInfo'; // パスは適宜調整

describe('WordbookInfo', () => {
  it('単語総数と説明文が正しく表示される', () => {
    render(<WordbookInfo wordsLength={10} />);

    // タイトルが表示される
    expect(screen.getByText('単語総数')).toBeInTheDocument();

    // wordsLengthの値がBadgeに表示される
    expect(screen.getByText('10 save words')).toBeInTheDocument();

    // 説明文が表示される
    expect(
      screen.getByText('新しい単語を保存して語彙を増やし続けましょう！')
    ).toBeInTheDocument();
  });

  it('wordsLengthの値が変わった場合も正しく表示される', () => {
    render(<WordbookInfo wordsLength={50} />);
    expect(screen.getByText('50 save words')).toBeInTheDocument();
  });
});