// CPSC 458-01
// Jeevan Acharya
// ID: 2313321

// This component will retrive all the devices and get their status
// It will call on the DeviceCard component to display teh devices

import { Box, Divider,  Heading,   Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DeviceCard from "../../Common/DeviceCard";
import axios from "axios";

const Home = () => {
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
    if (response.status === 200) {
      var convert = Object.entries(response.data.data);

      setDevices(convert);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDeviceLists();
  }, []);

  const allDevices = [devices];

  return (
    <Box>
    <Heading>All Devices</Heading>
    <Text fontSize='xs' as='i'>Note: if any device appears with a red background, it indicates that the device is either not reachable or we are getting some error from the api.</Text>
    <Divider />
      {isLoading && "Loading..."}
      {!isLoading &&
        allDevices[0].map((element, index) => {
          return <DeviceCard data={element} key={index} />;
        })}
    </Box>
  );
};

export default Home;
