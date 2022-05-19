// CPSC 458-01
// Jeevan Acharya
// ID: 2313321

import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeviceCard from "../../Common/DeviceCard";

const AllLights = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState("false");
  const getDeviceLists = async () => {
    setIsLoading(true);
    const options = {
      method: "POST",
      url: "https://opentpl1.p.rapidapi.com/dev/tplapi",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "opentpl1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data:
        '{"body":{"command":"plug_names"},"uuid":"' +
        sessionStorage.getItem("userName") +
        '"}',
    };
    var response = await axios.request(options);
    // console.log(
    //   "🚀 ~ file: Home.js ~ line 23 ~ getDeviceLists ~ response",
    //   response.data.data
    // );
    
    var convert = Object.entries(response.data.data);
    // console.log(
    //   "🚀 ~ file: Home.js ~ line 33 ~ getDeviceLists ~ convert",
    //   convert
    // );

    setDevices(convert);
    setIsLoading(false);
    // console.log(
    //   "🚀 ~ file: Home.js ~ line 25 ~ getDeviceLists ~ response.data.data",
    //   devices
    // );
  };
  useEffect(() => {
    getDeviceLists();
  }, []);

  // console.log("devices", typeof devices);
  const allDevices = [devices];
  // console.log("🚀 ~ file: Home.js ~ line 36 ~ Home ~ allDevices", allDevices);
  return (
    <Box>
      <Heading>Smart Lights</Heading>
      <Text fontSize="xs" as="i">
        Note: if any device appears with a red background, it indicates that the
        device is either not reachable or we are getting some error from the
        api.
      </Text>
      <Divider />
      {isLoading && "Loading..."}
      {!isLoading &&
        allDevices[0].map((element, index) => {
          return <DeviceCard data={element} key={index} />;
        })}
    </Box>
  );
};

export default AllLights;
