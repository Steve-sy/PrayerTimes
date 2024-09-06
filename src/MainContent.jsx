import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Divider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Prayer from "./components/Prayer";
import axios from "axios";
import moment from "moment-timezone";

export default function MainContent() {
  const [currentTime, setCurrentTime] = useState("");

  // Define a state variable to store the selected city
  const [city, setCity] = useState("Sydney");

  // Handle change in select dropdown
  function handelChangeCity(e) {
    setCity(e.target.value);
  }

  //setTimings(data.data.timings);
  const [timings, setTimings] = useState({
    Fajr: "04:36",
    Dhuhr: "11:54",
    Asr: "15:10",
    Maghrib: "17:40",
    Isha: "19:03",
  });

  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=AU&city=${city}`
    );
    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    const updateTime = () => {
      const cTime = moment()
        .tz(`Australia/${city}`)
        .format("YYYY-MMM-DD HH:mm:ss");
      setCurrentTime(cTime);
    };

    // Update the time immediately and then every second
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      // Cleanup interval on component unmount
      clearInterval(intervalId);
      getTimings();
    };
  }, [city]);

  return (
    <>
      <Grid container>
        <Grid size={6}>
          <div>
            <Typography variant="h4">{currentTime}</Typography>
            <Typography variant="h3">{city}</Typography>
          </div>
        </Grid>
        <Grid size={6}></Grid>
      </Grid>
      <Divider style={{ borderColor: "white" }} />

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        useFlexGap
        flexWrap="wrap"
        marginTop={4}
      >
        <Prayer
          name="Fajr"
          time={timings.Fajr}
          image="https://islamicsky.com/wp-content/uploads/2023/04/benefits-of-Fajr-prayer.webp"
        />
        <Prayer
          name="Duhur"
          time={timings.Dhuhr}
          image="https://www.arabiantongue.com/wp-content/uploads/2023/02/11521109006_23dbeeb046_k-1-1024x522.webp"
        />
        <Prayer
          name="Asr"
          time={timings.Asr}
          image="https://miro.medium.com/v2/resize:fit:768/1*sWjC1Wh5_bbbc3es4nn78Q.jpeg"
        />
        <Prayer
          name="Maghrib"
          time={timings.Maghrib}
          image="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/04/14/2998085772.jpg"
        />
        <Prayer
          name="Isha"
          time={timings.Isha}
          image="https://zionpeople.nz/wp-content/uploads/2022/05/Newsletter-and-Website.jpg"
        />
      </Stack>

      {/* Select city */}
      <Stack direction="row" justifyContent="center" marginTop="40px">
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Select City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handelChangeCity}
            value={city}
            label="Select City"
            sx={{
              color: "black", // Default text color
              backgroundColor: "white", // Set the background color of the select field
              "& .MuiSelect-icon": {
                color: "black", // Color of the dropdown icon
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue", // Border color when selected
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "darkblue", // Border color on focus
              },
            }}
          >
            <MenuItem value={"Melbourne"}>Melbourne</MenuItem>
            <MenuItem value={"Sydney"}>Sydney</MenuItem>
            <MenuItem value={"Perth"}>Perth</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
