import React from 'react';
import { Edit2, Trash2, Package, DollarSign } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ produto, onEdit, onDelete }) {
  return (
    <div className="glass-panel product-card animate-fade-in">
      <div className="card-header">
        <h3 className="product-title">{produto.nome}</h3>
        <span className="category-badge">{produto.categoria}</span>
      </div>
      
      <div className="card-body">
        <div className="info-row">
          <DollarSign size={18} className="icon-cyan" />
          <span className="price">
            R$ {Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className="info-row">
          <Package size={18} className="icon-orange" />
          <span>
            <strong>{produto.estoque}</strong> em estoque
          </span>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(produto)}>
          <Edit2 size={16} /> Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(produto.id)}>
          <Trash2 size={16} /> Excluir
        </button>
      </div>
    </div>
  );
}
