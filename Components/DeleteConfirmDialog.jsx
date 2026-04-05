"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  productName,
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-6">
          <AlertDialog.Title className="text-xl font-semibold text-slate-800 dark:text-white">
            Delete Product
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to delete
            <span className="font-medium text-slate-800 dark:text-white">
              {" "}
              {productName || "this product"}
            </span>
            ? This action cannot be undone.
          </AlertDialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}