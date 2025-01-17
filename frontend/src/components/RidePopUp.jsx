import React from "react";

const RidePopUp = (props) => {
    return (
        <div className="h-full pb-5">
            <h5
                className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    props.setRidePopupPanel(false);
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>


            <div className="flex flex-col items-center justify-between w-full h-full">
                {/* user info */}
                <div className="flex items-center justify-between w-full p-3 bg-yellow-400 rounded-lg mt-4">
                    <div className="flex items-center gap-3 ">
                        <img
                            className="h-12 rounded-full object-cover w-12"
                            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                            alt=""
                        />
                        <h2 className="text-lg font-medium">
                            {props.ride?.user.fullname.firstname +
                                " " +
                                props.ride?.user.fullname.lastname}
                        </h2>
                    </div>
                    <h5 className="text-lg font-semibold">2.2 KM</h5>
                </div>

                {/* data */}
                <div className="relative flex flex-col gap-2 h-full w-full justify-between items-center">

                    <div className="mt-5 py-3 hide-scroll flex flex-1 flex-col mb-[12.4rem] overflow-auto w-full">

                        <div className="flex items-center gap-5 p-3 border-b-2 w-full">
                            <i className="ri-map-pin-user-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">562/11-A</h3>
                                <p className="text-sm -mt-1 text-gray-600">
                                    {props.ride?.pickup}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3 border-b-2 w-full">
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">562/11-A</h3>
                                <p className="text-sm -mt-1 text-gray-600">
                                    {props.ride?.destination}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3 w-full">
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className="text-lg font-medium">
                                    ₹
                                    {props.ride?.fare}
                                </h3>
                                <p className="text-sm -mt-1 text-gray-600">Cash</p>
                            </div>
                        </div>
                    </div>


                    {/* buttons */}
                    <div className={`h-[90px] absolute bottom-20  mt-5 mb-3 w-full`}>
                    <button
                            onClick={() => {
                                props.setConfirmRidePopupPanel(true);
                                props.confirmRide();
                            }}
                            className=" bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
                        >
                            Accept
                        </button>

                        <button
                            onClick={() => {
                                props.setRidePopupPanel(false);
                            }}
                            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
                        >
                            Ignore
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RidePopUp;
