import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <>
      <ClipLoader
        color="987070"
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </>
  );
};

export default Spinner;
