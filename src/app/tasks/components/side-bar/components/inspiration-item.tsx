interface InspirationItemProps {
  quote: string;
  author: string;
}

const InspirationItem = ({ quote, author }: InspirationItemProps) => {
  return (
    <div>
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  );
};

export default InspirationItem;
