import React from 'react';
import { X, Eye } from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail({ isOpen, produto, onClose }) {
  if (!isOpen || !produto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content detail-modal">
        <div className="modal-header">
          <div className="detail-title">
            <Eye size={18} className="detail-icon" />
            <h3>Detalhes da Peça</h3>
          </div>
          <button className="btn-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-field">
              <span className="detail-label">ID</span>
              <span className="detail-value detail-value--id">#{produto.id}</span>
            </div>

            <div className="detail-field detail-field--full">
              <span className="detail-label">Nome da Peça</span>
              <span className="detail-value">{produto.nome}</span>
            </div>

            <div className="detail-field">
              <span className="detail-label">Categoria</span>
              <span className="detail-value">
                <span className="detail-badge">{produto.categoria}</span>
              </span>
            </div>

            <div className="detail-field">
              <span className="detail-label">Estoque</span>
              <span className={`detail-value ${produto.estoque === 0 ? 'detail-value--danger' : produto.estoque <= 5 ? 'detail-value--warning' : 'detail-value--ok'}`}>
                {produto.estoque} {produto.estoque === 1 ? 'unidade' : 'unidades'}
              </span>
            </div>

            <div className="detail-field detail-field--full">
              <span className="detail-label">Preço</span>
              <span className="detail-value detail-value--price">
                R$ {Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer detail-footer">
          <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
