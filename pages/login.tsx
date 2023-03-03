import {getProviders, signIn} from "next-auth/react"
import Image from "next/image";
import Logo from "../assets/images/logo.png"
import React from "react";

interface Props {
    providers: Object
}

const Login: React.FC<Props> = ({ providers }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full space-y-6">
            <Image src={Logo} alt="spotify-logo" width={236.2} height={70.9} />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button 
                        className="bg-[#18D860] px-5 py-3 rounded-full text-white uppercase hover:text-gray-200"
                        onClick={() => signIn(provider.id)}
                    >Login With {provider.name}  
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login;


export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}