import React from 'react';
import { TailSpin } from 'react-loader-spinner'

function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:'92px',
      height: '200px',
    }}>
      <TailSpin   // Type of spinner
        height="90"
        width="90"
        color="pink"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;