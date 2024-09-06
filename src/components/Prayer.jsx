import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

export default function Prayer({ name, time, image }) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {name}
            </Typography>
            <Typography variant="h5" sx={{ color: "text.secondary" }}>
              {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
