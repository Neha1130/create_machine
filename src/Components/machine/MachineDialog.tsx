import React, { FunctionComponent } from "react";
import { Modal } from "react-responsive-modal";
import VmCreateFrom from "./MachineCreateFrom";

type PropsType = {
  editData: any;
  setEditData: (value: any) => void;
  handleFetch: () => void;
};
const VmDialog: FunctionComponent<PropsType> = (props) => {
  const { editData, setEditData, handleFetch } = props;

  return (
    <Modal open={!!editData} onClose={() => setEditData(null)} center>
      <div className="flex justify-center">
        <VmCreateFrom
          editData={editData}
          setEditData={setEditData}
          handleFetch={handleFetch}
        />
      </div>
    </Modal>
  );
};

export default VmDialog;
