import React from "react";
import VmCreateFrom from "../../Components/machine/MachineCreateFrom";

const VmCreation = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500  min-h-screen">
      <div className="flex justify-center">
        <div className="sm:w-1/3 mb-6">
          <VmCreateFrom />
        </div>
      </div>
    </div>
  );
};

export default VmCreation;
