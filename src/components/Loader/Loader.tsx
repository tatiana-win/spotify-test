import './Loader.css';
export const Loader = () => {
  return (
    <div className='loader'>
      {Array.from({ length: 8 }, value => value).map(() => (
        <div />
      ))}
    </div>
  );
};
