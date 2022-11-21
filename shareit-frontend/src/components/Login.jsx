import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';
import { gapi } from "gapi-script";
import { useEffect } from "react"


// import jwt_decode from "jwt-decode";

const Login = () => {

    // const clientId =
    //     "730707715563-cbrc4k282eols86t45jed50j1fojd1a4.apps.googleusercontent.com ";

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    });

    const navigate = useNavigate();

    const responseGoogle = (response) => {
        localStorage.setItem("user", JSON.stringify(response.profileObj));
        const { name, googleId, imageUrl } = response.profileObj;
        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
        });


        // const navigate = useNavigate();
        // const responseGoogle = (response) => {
        //     localStorage.setItem('user', JSON.stringify(response.profileObj));
        //     const { name, googleId, imageUrl } = response.profileObj;
        //     const doc = {
        //         _id: googleId,
        //         _type: 'user',
        //         userName: name,
        //         image: imageUrl,
        //     };
        //     client.createIfNotExists(doc).then(() => {
        //         navigate('/', { replace: true });
        //     });
    };


    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    autoPlay
                    muted
                    className='w-full h-full object-cover'
                />

                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className="p-5">
                        <img src={logo} width='140px' alt="logo" />
                    </div>

                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={(renderProps) => (
                                <button
                                    type='button'
                                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <FcGoogle className='mr-4' /> Masuk dengan Google

                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login