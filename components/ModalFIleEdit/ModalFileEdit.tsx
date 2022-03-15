import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { OnEventFn } from '@rnw-community/shared';
import { EditModeEnum } from '../../interfaces';
import style from './ModalFIleEdit.module.css';

interface Props {
  onClose: OnEventFn;
  editMode: EditModeEnum;
}

export const ModalFileEdit: FC<Props> = ({ onClose, editMode }) => (
  <Modal
    show
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Body>
      {editMode === EditModeEnum.EditTag && (
        <>
          <div className={style.inputContainer}>
            <input type="text" placeholder="Tag name " />
            <input type="text" placeholder="Tag value" />
          </div>
          <div className={style.inputContainer}>
            <input type="text" placeholder="Tag name " />
            <input type="text" placeholder="Tag value" />
          </div>
          <div className={style.inputContainer}>
            <input type="text" placeholder="Tag name " />
            <input type="text" placeholder="Tag value" />
          </div>
          <Button className={style.addTagButton}>Add tag</Button>
        </>
      )}
      {editMode === EditModeEnum.EditFileName && <div>Edit file</div>}
      {editMode === EditModeEnum.EditDescription && <div>Edit description</div>}
      {editMode === EditModeEnum.EditFolder && <div>Edit Folder</div>}
      {editMode === EditModeEnum.EditPeople && <div>Edit Folder</div>}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);
