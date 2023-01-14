import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Sortings } from '../typings';

type Props = {
  sort: Sortings,
  setSort: React.Dispatch<React.SetStateAction<Sortings>>,
  title: string,
  values: { val: string, label: string }[]
}

const Dropdown = ({ sort, setSort, title, values }: Props) => {

  const [open, setOpen] = useState<boolean>(false)

  const handleChange = (event: SelectChangeEvent<Sortings>) => {
    if (event.target.value === 'priceLoToHi' ||
      event.target.value === 'priceHiToLo' ||
      event.target.value === 'rating') {
      setSort(event.target.value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel id="sort-by-dropdown">{title}</InputLabel>
        <Select
          labelId="sort-by-dropdown"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          {values.map((value, i) => (
            <MenuItem key={i} value={value.val}>{value.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Dropdown