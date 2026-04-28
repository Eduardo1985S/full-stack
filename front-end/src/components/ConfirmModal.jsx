import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmModal.css';

export default function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal">
        <div className="modal-header confirm-header">
          <div className="title-wrapper">
            <AlertTriangle size={20} className="icon-warning" />
            <h3>{title || 'Confirmação'}</h3>
          </div>
          <button className="btn-close" onClick={onCancel}><X size={20} /></button>
        </div>
        
        <div className="modal-body confirm-body">
          <p>{message || 'Tem certeza que deseja continuar?'}</p>
        </div>

        <div className="modal-footer confirm-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
