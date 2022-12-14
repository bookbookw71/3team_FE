import tw from 'tailwind-styled-components';
import DatePick from './DatePick';

const ReadingPeriod = ({ readStart, readEnd }) => {
  return (
    <BookReadingBox>
      <DateTitle>독서 기간</DateTitle>
      <DatePick />
    </BookReadingBox>
  );
};
const BookReadingBox = tw.div`
`;

const DateTitle = tw.div`
  text-black
  text-xl
  font-bold
`;

export default ReadingPeriod;
