import { useState } from "react";
export default function useOpenModals() {
  // se crea un estado para saber si el modal esta abierto o cerrado de todos los 3 modales que tenemos e inicializamos en false
  const [isOpen, setIsOpen] = useState({
    check: false,
    edit: false,
    delete: false,
  });

  // en este metodo se abre y cierra los modales con el tipo pasa como propiedad y el cambio de estado se basa en el estado previo
  const handleOpen = (modalType) => {
    setIsOpen({
      ...isOpen,
      [modalType]: !isOpen[modalType],
    });
  };

  return { isOpen, handleOpen };
}
