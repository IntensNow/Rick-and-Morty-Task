import Pagination from 'react-bootstrap/Pagination';

interface IPagingProps {
  current: number;
  total: number;
  onChange(target: number): void;
}

function Paging(props: IPagingProps) {
  const { current, total, onChange } = props;

  function renderInactiveItem(value: number) {
    return <Pagination.Item onClick={() => onChange(value)}>{value}</Pagination.Item>
  }

  return (
    <Pagination>
      {current - 2 > 1 && renderInactiveItem(1)}

      {current - 3 > 1 && <Pagination.Ellipsis disabled />}

      {current - 2 > 0 && renderInactiveItem(current - 2)}
      {current - 1 > 0 && renderInactiveItem(current - 1)}

      <Pagination.Item active>{current}</Pagination.Item>

      {current < total && renderInactiveItem(current + 1)}
      {current + 1 < total && renderInactiveItem(current + 2)}

      {current + 3 < total && <Pagination.Ellipsis disabled />}

      {current + 2 < total && renderInactiveItem(total)}
    </Pagination>
  );
}

export default Paging;