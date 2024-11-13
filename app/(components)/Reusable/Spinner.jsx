// components/Spinner.js
"use client";

import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
  return (
    loading && (
      <div className="flex justify-center items-center h-48">
        <ClipLoader color="#ff5e14" loading={loading} size={50} />
        <ClipLoader color="#345fe4" loading={loading} size={50} />
        <ClipLoader color="#74ed7f" loading={loading} size={50} />
      </div>
    )
  );
};

export default Spinner;
