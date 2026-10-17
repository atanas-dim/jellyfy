"use client";

import { type FC, useState } from "react";

import { Select, SelectOption } from "@/components/select";

const SelectPreview: FC = () => {
  const [value, setValue] = useState("mint");

  return (
    <div className="w-full max-w-sm">
      <Select label="Flavor" value={value} onValueChange={setValue}>
        <SelectOption value="mint">Mint</SelectOption>
        <SelectOption value="rose">Rose</SelectOption>
        <SelectOption value="ink">Ink</SelectOption>
      </Select>
    </div>
  );
};

export default SelectPreview;
