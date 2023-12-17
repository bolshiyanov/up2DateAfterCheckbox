import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";

import {toggleValue} from "../../features/selectedGlobalCategory/selectedGlobalCategorySlice"

import "./index.css";

const GlobalCategoriasSlider = () => { 
    const dispatch: AppDispatch = useDispatch();
    const value = useSelector((state: RootState) => state.selectedGlobalCategory.value);
    
    const onClick = (selectedValue: string) => {
        dispatch(toggleValue(selectedValue));
      };

  return (
    <div
      className="no-scrollbar"
      style={{
        display: "block",
        overflowX: "scroll",
        whiteSpace: "nowrap",
        width: "100%",
        marginBottom: 16,
      }}
    >
      <div
        className="no-scrollbar"
        style={{
          display: "inline-block",
          marginRight: 8,
          whiteSpace: "nowrap",
        }}
      >
        <Button
          size="large"
          type={value === "Boats Rides"? "primary" : undefined}
          style={{ margin: 2 }}
          onClick={() => onClick("Boats Rides")}
        >
          Boats Rides
        </Button>

        <Button
          size="large"
          type={value === "Watersports Rides"? "primary": undefined}
          style={{ margin: 2 }}
          onClick={() =>onClick("Watersports Rides")}
        >
          Watersports Rides
        </Button>

        <Button
          size="large"
          type={value === "Air Rides"? "primary" : undefined}
          style={{ margin: 2 }}
          onClick={() => onClick("Air Rides")}
        >
          Air Rides
        </Button>

        <Button
          size="large"
          type={value === "Wheels Rides"? "primary" : undefined}
          style={{ margin: 2 }}
          onClick={() => onClick("Wheels Rides")}
        >
          Wheels Rides
        </Button>

      </div>{" "}
    </div>
  );
}

export default GlobalCategoriasSlider;
