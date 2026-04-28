import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import './ProductList.css';

export default function ProductList({ produtos, onEdit, onDelete }) {
  if (!produtos || produtos.length === 0) {
    return (
      <div className="table-empty">
        <p>Nenhuma peça encontrada.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '80px', textAlign: 'center' }}>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th style={{ textAlign: 'center' }}>Estoque</th>
            <th style={{ textAlign: 'right' }}>Preço (R$)</th>
            <th style={{ textAlign: 'center', width: '150px' }}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td style={{ textAlign: 'center' }}>{produto.id}</td>
              <td style={{ fontWeight: '500' }}>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td style={{ textAlign: 'center' }}>{produto.estoque}</td>
              <td style={{ textAlign: 'right' }}>
                {Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </td>
              <td>
                <div className="table-actions">
                  <button className="btn-action btn-action-view" title="Ver Detalhes">
                    <Eye size={14} />
                  </button>
                  <button className="btn-action btn-action-edit" title="Editar" onClick={() => onEdit(produto)}>
                    <Edit size={14} />
                  </button>
                  <button className="btn-action btn-action-delete" title="Excluir" onClick={() => onDelete(produto.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
