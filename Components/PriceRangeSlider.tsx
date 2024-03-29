/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

type Props = {
  min: number,
  max: number,
  value: number[],
  setValue: React.Dispatch<React.SetStateAction<any>>
}

export default function PriceRangeSlider({ min, max, value, setValue }: Props) {

  const Input = styled(MuiInput)`
    width: 46px;
    margin: 0px;
    padding: 14px;
  `;

  React.useEffect(() => {
    setValue([min, max])
  }, [min, max])

  const marks = [
    {
      value: min,
      label: `£${min}`,
    },
    {
      value: max,
      label: `£${max}`,
    },
  ];

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = value.map((v, i) => {
      if (i === 1) {
        return event.target.value === "" ? "" : Number(event.target.value)
      } else {
        return v
      }
    })
    setValue(newValue)
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = value.map((v, i) => {
      if (i === 0) {
        return event.target.value === "" ? "" : Number(event.target.value)
      } else {
        return v
      }
    })
    setValue(newValue)
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <>
      <Box className="mr-5 ml-1 mt-4">
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
        />
      </Box>

      <div className="flex justify-between">

        <div className="flex items-center border rounded-md">
          <div className="ml-1 mr-[2px] text-[12px]">Min £:</div>
          <Input
            disableUnderline={true}
            value={value[0]}
            size="small"
            onChange={handleMinInputChange}
            inputProps={{
              style: { padding: 0, marginTop: '2px', fontSize: '12px', lineHeight: '20px' },
              step: 1,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />

        </div>

        <div className="flex items-center border rounded-md">
          <div className="ml-1 mr-[2px] text-[12px]">Max £:</div>
          <Input
            disableUnderline={true}
            value={value[1]}
            size="small"
            onChange={handleMaxInputChange}
            inputProps={{
              style: { padding: 0, marginTop: '2px', fontSize: '12px', lineHeight: '20px' },
              step: 1,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />

        </div>

      </div>



    </>
  );
}
