import React, { FunctionComponent } from "react";
import { AiFillDelete, AiFillInfoCircle } from "react-icons/ai";
import { Modal } from "react-responsive-modal";
import { closeAlertConfirm } from "../../store/reducers/AlertConfirmDialogSlice";
import { useAppDispatch, useAppSelector } from "../../store/reduxhook";

const AlertConfirmDialog: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const {
    show,
    icons,
    iconsSize,
    text,
    textClass,
    confirmText,
    confirmClass,
    cancelText,
    cancelClass,
    handleCancel,
    handleConfirm,
  } = useAppSelector((state) => state.alertConfirm);

  return show ? (
    <Modal
      open={show}
      onClose={() => dispatch(closeAlertConfirm())}
      center
      showCloseIcon={false}
    >
      <div className="mt-8 px-4 w-96 flex justify-center items-center">
        <div>
          {icons === "delete" && (
            <AiFillDelete
              size={!!iconsSize ? iconsSize : 36}
              className="text-red-500 mr-10"
            />
          )}
          {icons === "info" && (
            <AiFillInfoCircle
              size={!!iconsSize ? iconsSize : 36}
              className="text-yellow-500 mr-10"
            />
          )}
        </div>
        {!!text && (
          <p className={`text-bold ${!!textClass ? textClass : ""}`}>{text}</p>
        )}
      </div>
      <div className="flex justify-around">
        {!!cancelText && (
          <button
            type="button"
            className={`common-btn !text-blue-600 !bg-white !shadow-none !border !border-solid !border-blue-600 ${
              !!cancelClass ? cancelClass : ""
            }`}
            onClick={() => !!handleCancel && handleCancel()}
          >
            {cancelText}
          </button>
        )}
        {!!confirmText && (
          <button
            type="button"
            className={`common-btn ${!!confirmClass ? confirmClass : ""}`}
            onClick={() => !!handleConfirm && handleConfirm()}
          >
            {confirmText}
          </button>
        )}
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default React.memo(AlertConfirmDialog);
