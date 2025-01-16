import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { SocketContext } from "../context/SocketContext";
import Loader from "./Loader";
import { use } from "react";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);

  const submitHander = async (e) => {
    e.preventDefault();
    if (/[a-z]/.test(otp)) {
      toast.error("Enter valid OTP");
      return;
    }
    if (/[A-Z]/.test(otp)) {
      toast.error("Enter valid OTP");
      return;
    }
    if (/[!@#$%^&*()<>,."']/.test(otp)) {
      toast.error("Enter valid OTP");
      return;
    }
    if (otp.length > 6 || otp.length < 6) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        }
      );

      if (response.status === 201) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding", {
          state: {
            ride: props.ride,
            // pos : currentPosition
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(
        error.response?.data.message ||
          error.response?.data.errors[0].msg ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full pb-5">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
          props.setConfirmRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>


      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* user info */}
        <div className="flex items-center justify-between w-full p-3 border-2 border-yellow-400 rounded-lg mt-4">
          <div className="flex items-center gap-3 ">
            <img
              className="h-12 rounded-full object-cover w-12"
              src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
              alt=""
            />
            <h2 className="text-lg font-medium capitalize">
              {props.ride?.user?.fullname.firstname}
            </h2>
          </div>
          <h5 className="text-lg font-semibold">2.2 KM</h5>
        </div>

        {/* data */}
        <div className="relative flex flex-col gap-2 h-full w-full justify-between items-center">

          <div className="flex flex-col hide-scroll mt-5 py-3 mb-[17rem] overflow-auto w-full">

            <div className="flex items-center gap-5 p-3 border-b-2 w-full">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600 w-full">
                  {props.ride?.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600 w-full">
                  {props.ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>

          {/* otp and button */}
          <div className={`h-[9.8rem] absolute bottom-24 mt-6 w-full`}>
            <form onSubmit={submitHander}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                className="bg-[#eee] px-6 py-2 font-mono text-lg rounded-lg w-full"
                placeholder="Enter OTP"
              />

              {loading ? (
                <button
                  type="submit"
                  className="w-full mt-3 text-lg flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg"
                >
                  <Loader /> Please Wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-3 text-lg flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg"
                >
                  Confirm
                </button>
              )}

              <button
                onClick={() => {
                  props.setConfirmRidePopupPanel(false);
                  props.setRidePopupPanel(false);
                }}
                className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-2 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
