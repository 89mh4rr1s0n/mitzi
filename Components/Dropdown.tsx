import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

type Props = {
  sort,
  setSort,
  title,
  values
}

const Dropdown = ({ sort, setSort, title, values }: Props) => {

  // const [age, setAge] = useState<string | number>('')
  const [open, setOpen] = useState(false)

  const handleChange = (event: SelectChangeEvent<typeof sort>) => {
    setSort(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
        Open the select
      </Button> */}
      <FormControl sx={{ minWidth: 140 }}  size="small">
        <InputLabel id="sort-by-dropdown">{title}</InputLabel>
        <Select
          labelId="sort-by-dropdown"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sort}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="No Sort">
            <em>None</em>
          </MenuItem>
          {values.map((value , i) => (
            <MenuItem key={i} value={value.val}>{value.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Dropdown