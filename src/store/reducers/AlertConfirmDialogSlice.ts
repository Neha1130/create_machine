/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConfirmType = {
  show: boolean;
  text: string;
  textClass?: string;
  icons?: string;
  confirmText?: string;
  confirmClass?: string;
  cancelText?: string;
  cancelClass?: string;
  iconsSize?: number;
  handleConfirm?: () => void;
  handleCancel?: () => void;
};

const initialState: ConfirmType = {
  show: false,
  text: "",
  textClass: "",
  icons: "",
  confirmText: "Confirm",
  confirmClass: "",
  cancelText: "Cancel",
  cancelClass: "",
  iconsSize: 36,
  handleCancel: undefined,
  handleConfirm: undefined,
};

export const AlertConfirmDialogSlice = createSlice({
  name: "AlertConfirmDialog",
  initialState,
  reducers: {
    showAlertConfirm: (state, action: PayloadAction<ConfirmType>) => {
      return {
        ...state,
        text: action.payload.text ?? "",
        icons: action.payload.icons ?? "",
        show: action.payload.show ?? false,
        textClass: action.payload.textClass ?? "",
        confirmText: action.payload.confirmText ?? "",
        confirmClass: action.payload.confirmClass ?? "",
        cancelText: action.payload.cancelText ?? "",
        cancelClass: action.payload.cancelClass ?? "",
        handleCancel: action.payload.handleCancel,
        handleConfirm: action.payload.handleConfirm,
      };
    },
    closeAlertConfirm: (state) => {
      return {
        show: false,
        text: "",
        textClass: "",
        icons: "",
        confirmText: "Confirm",
        confirmClass: "",
        cancelText: "Cancel",
        cancelClass: "",
        iconsSize: 36,
        handleCancel: undefined,
        handleConfirm: undefined,
      };
    },
  },
});

export const { showAlertConfirm, closeAlertConfirm } =
  AlertConfirmDialogSlice.actions;

export default AlertConfirmDialogSlice.reducer;
