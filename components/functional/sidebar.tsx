// components/Sidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import {
  closeSidebar,
  openEditModal,
  closeEditModal,
  openEditName,
  closeEditName,
  openEditQuantity,
  closeEditQuantity,
  openEditPrice,
  closeEditPrice,
  openSuccessModal,
  closeSuccessModal,
  openImageUploader,
  closeImageUploader,
  openEditImageModal,
  closeEditImageModal,
  saveItem,
} from "@/redux/features/sidebar";
import ImageUploader from '@/components/modal/add-image';
import { Button } from '@/components/ui/button';
import EditStockV3Modal from '../modal/modalV3/edit-stock';
import EditPriceModal from '../modal/modalV3/edit-price';
import EditStockName from '../modal/modalV3/edit-name';
import EditQuantityModal from '../modal/modalV3/edit-quantity';
import EditSuccessModal from '../modal/modalV3/edit-success';
import EditImage from '../modal/edit-image';
import Logo from './logo';

interface SidebarProps {
  selectedItem: any;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, onClose }) => {
  const dispatch = useAppDispatch();
  const {
    isOpen,
    isEditModalOpen,
    isEditNameOpen,
    isEditQuantityOpen,
    isEditPriceOpen,
    isSuccessModalOpen,
    isImageUploaderOpen,
    isEditImageModalOpen,
  } = useAppSelector((state: RootState) => state.sidebar);

  const handleSaveImages = (images: { id: string; src: string }[]) => {
    const updatedItem = {
      ...selectedItem,
      images: images,
      image: images.length > 0 ? images[0] : null,
    };
    dispatch(saveItem(updatedItem));
    dispatch(closeImageUploader());
  };

  const handleSavePrice = (updatedPrice: number) => {
    const updatedItem = { ...selectedItem, buying_price: updatedPrice };
    dispatch(saveItem(updatedItem));
    dispatch(closeEditPrice());
  };

  return (
    <>
      <div className="fixed inset-x-[-15] md:inset-x-0 inset-0 md:relative w-full md:max-w-[356px] bg-white transition-transform duration-300 ease-in-out transform translate-x-0 flex flex-col flex-grow items-center rounded-xl md:border md:border-[#DEE5ED] md:m-0 overflow-auto">
        {/* Header */}
        <div className="hidden md:flex py-5.5 px-4 items-center justify-between border-b border-b-[#DEE5ED] w-full">
          <p className="font-circular-medium text-2xl">{selectedItem.name}</p>
          <button onClick={onClose} className="p-[9px] bg-neutral-200 rounded-md" aria-label="Close sidebar">
            <X size={16} />
          </button>
        </div>

        {/* Mobile Header */}
        <div className="flex justify-center md:hidden my-4">
          <Logo />
        </div>

        <div className="flex items-center justify-between border-b border-b-[#DEE5ED] w-full md:hidden p-3">
          <p className="font-circular-medium text-xl">Edit stock</p>
          <button onClick={onClose} className="p-[7px] bg-neutral-100 rounded-lg">
            <X size={13} className="text-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:py-5 md:px-4 items-start gap-5 w-full p-3">
          {/* Cost Price */}
          <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-[16px] md:text-[18px] font-circular-normal leading-7">
                Cost Price
              </p>
              <p className="text-[#2A2A2A] text-[18px] md:text-[20px] leading-7.5 font-circular-normal">
                {selectedItem.costPrice || "265,000"}
              </p>
            </div>
            <button
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => dispatch(openEditPrice())}
            >
              Edit
            </button>
          </div>

          {/* Sell Price */}
          <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-[16px] md:text-[18px] font-circular-normal leading-7">
                Sell Price
              </p>
              <p className="text-[#2A2A2A] text-[18px] md:text-[20px] leading-7.5 font-circular-normal">
                {selectedItem.sell_price}
              </p>
            </div>
            <button
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => dispatch(openEditPrice())}
            >
              Edit
            </button>
          </div>

          {/* Discount */}
          <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-[16px] md:text-[18px] font-circular-normal leading-7">
                Discount
              </p>
              <p className="text-[#2A2A2A] text-[18px] md:text-[20px] leading-7.5 font-circular-normal">
                {selectedItem.discount || 'Not Set'}
              </p>
            </div>
            <button
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
            >
              Add
            </button>
          </div>

          {/* Available */}
          <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-[16px] md:text-[18px] font-circular-normal leading-7">
                Available
              </p>
              <p className="text-[#2A2A2A] text-[18px] md:text-[20px] leading-7.5 font-circular-normal">
                {selectedItem.available}
              </p>
            </div>
            <button
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => dispatch(openEditQuantity())}
            >
              Edit
            </button>
          </div>

          {/* Quantity Sold */}
          <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-[16px] md:text-[18px] font-circular-normal leading-7">
                Quantity Sold
              </p>
              <p className="text-[#2A2A2A] text-[18px] md:text-[20px] leading-7.5 font-circular-normal">
                {selectedItem.quantitySold || "Not Set"}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex p-3 items-center justify-between gap-5 rounded-md w-full border-b border-b-[#E9EEF3] md:border-none md:bg-[#F8FAFB]">
            <div className="flex flex-col gap-1 w-2/3">
              <p className="text-[#717171] text-[16px] md:text-[18px] font-circular-normal leading-7">
                Image
              </p>
              <p className="text-[#2A2A2A] text-[18px] md:text-[20px] leading-7.5 font-circular-normal">
                {selectedItem.image ? 'Image Set' : 'Not Set'}
              </p>
            </div>
            <button
              className="text-[#1B1B1B] md:text-[#009A49] font-circular-normal text-sm leading-6 cursor-pointer md:w-1/3 text-right border border-[#A0A0A0] rounded-xl py-3 px-6 md:py-0 md:px-0 md:border-none"
              onClick={() => dispatch(openImageUploader())}
            >
              Add
            </button>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="w-full h-full p-4 flex flex-col md:hidden gap-4 mt-11">
          <Button
            className="bg-[#B8B8B8] text-white text-base font-circular-medium py-6 px-2 rounded-lg hover:border-b hover:border-b-primary transition-colors"
            variant="default"
            fullWidth
          >
            Save
          </Button>
          <Button
            className="bg-white text-[#FF000D] text-base font-circular-medium px-2 py-6 border border-[#FF000D] rounded-lg hover:bg-[#FF000D] hover:text-white transition-colors"
            variant="default"
            fullWidth
          >
            Delete stock
          </Button>
        </div>
      </div>

      {/* Modals */}
      {isEditImageModalOpen && (
        <EditImage
          isOpen={isEditImageModalOpen}
          itemName={selectedItem.name}
          existingImages={selectedItem.images || []}
          onCancel={() => dispatch(closeEditImageModal())}
          onSave={handleSaveImages}
          onDeleteImage={() => void 0}
        />
      )}

      {isEditModalOpen && (
        <EditStockV3Modal
          isOpen={isEditModalOpen}
          item={selectedItem}
          onClose={() => dispatch(closeEditModal())}
          onSave={(updatedItem) => {
            dispatch(saveItem(updatedItem));
            dispatch(closeEditModal());
          }}
          openSuccessModal={() => dispatch(openSuccessModal())}
        />
      )}

      {isEditQuantityOpen && (
        <EditQuantityModal
          isOpen={isEditQuantityOpen}
          item={selectedItem}
          onClose={() => dispatch(closeEditQuantity())}
          onSave={(updatedItem) => {
            dispatch(saveItem(updatedItem));
            dispatch(closeEditQuantity());
          }}
          openSuccessModal={() => dispatch(openSuccessModal())}
        />
      )}

      {isSuccessModalOpen && (
        <EditSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => dispatch(closeSuccessModal())}
        />
      )}

      {isEditPriceOpen && (
        <EditPriceModal
          isOpen={isEditPriceOpen}
          onClose={() => dispatch(closeEditPrice())}
          item={selectedItem}
          openSuccessModal={() => dispatch(openSuccessModal())}
          onSave={handleSavePrice}
        />
      )}

      {isEditNameOpen && (
        <EditStockName
          isOpen={isEditNameOpen}
          item={selectedItem}
          onClose={() => dispatch(closeEditName())}
          onSave={(updatedItem) => {
            dispatch(saveItem(updatedItem));
            dispatch(closeEditName());
          }}
          openSuccessModal={() => dispatch(openSuccessModal())}
        />
      )}

      <ImageUploader
        isOpen={isImageUploaderOpen}
        itemName={selectedItem.name}
        existingImages={selectedItem.images || []}
        onSave={handleSaveImages}
        onCancel={() => dispatch(closeImageUploader())}
      />
    </>
  );
};

export default Sidebar;