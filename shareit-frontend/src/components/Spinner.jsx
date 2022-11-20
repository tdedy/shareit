import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner'

function Spinner({ message }) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                ballColors={['#f5f3ed', '#f5f3ed', '#f5f3ed']}
                backgroundColor="#080808"
            />

            <p className="text-lg text-center px-2">{message}</p>
        </div>
    );
}

export default Spinner;