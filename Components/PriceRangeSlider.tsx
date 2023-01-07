import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useSelector, useDispatch } from "react-redux";
import { updateMinPrice, updateMaxPrice, selectMinPrice, selectMaxPrice } from "../slices/filtersSlice";

type Props = {
  min: number,
  max: number,
  value: number[],
  setValue: number[]
}

export default function PriceRangeSlider({ min, max, value, setValue }: Props) {

  // const [value, setValue] = React.useState<number[]>([min, max]);

  const dispatch = useDispatch()
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)

  // console.log(min, max)
  // console.log(value)
  // console.log(`min redux: ${minPrice} max redux: ${maxPrice}`)

  const Input = styled(MuiInput)`
    width: 46px;
    margin: 0px;
    padding: 14px;
  `;

  React.useEffect(() => {
    setValue([min, max])
  }, [min, max])

  // React.useEffect(() => {
  //   dispatch(updateMinPrice(value[0]))
  //   dispatch(updateMaxPrice(value[1]))
  // }, [value])

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

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };


  return (
    <>
      <Box /*sx={{ width: 300, marginTop: 10 }}*/ className="mr-5 ml-1 mt-4">
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
