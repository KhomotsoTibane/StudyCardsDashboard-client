import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";


const Updates = () => {
    const { currentColor } = useStateContext();

    return (
        <div className="mt-8 w-screen">
            <div className="flex flex-wrap justify-center">
                <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Welcome to StudyCards</p>
                    </div>
                    <div className="mt-10">
                        <img
                            className="md:w-96 h-50 "
                            src={product9}
                            alt=""
                        />
                        <div className="mt-8">
                            <h1 className="font-semibold text-lg">Updates:</h1>
                            <p className="font-semibold text-lg">We have more functionality coming soon!</p>
                            <p className="mt-8 text-gray-400">
                                You are currently viewing StudyCards beta version.
                                We are currently testing and working on some new features for you to enjoy but we could not contain our excitement
                                for you to check out our awesome application made just for you.
                                While you are here, please check out our Card and App section to get feel of what is to come.
                            </p>
                            {/* <p className="mt-8 text-sm text-gray-400">
                                Subcribe to our mailing list to be the first to know about any updates in future
                            </p> */}

                            {/* <form className="mt-2">
                                <div class="form-group mb-6">
                                    <input
                                        type="text"
                                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                         bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                                          ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                                        placeholder="Name"
                                    />
                                </div>
                                <div class="form-group mb-6">
                                    <input
                                        type="email"
                                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                         bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                                          ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    class="w-full px-6 py-2.5 text-white font-medium text-xs 
                                    leading-tight uppercase rounded shadow-md hover:shadow-lg 
                                    focus:shadow-lg focus:outline-none focus:ring-0  
                                    active:shadow-lg transition duration-150 ease-in-out"
                                    style={{'backgroundColor': currentColor}}
                                >
                                    Subscribe
                                </button>
                            </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Updates


