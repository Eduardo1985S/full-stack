import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import './ProductForm.css';

export default function ProductForm({ onSubmit, initialData, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    estoque: '',
    categoria: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        preco: initialData.preco,
        estoque: initialData.estoque,
        categoria: initialData.categoria
      });
    } else {
      setFormData({ nome: '', preco: '', estoque: '', categoria: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{initialData ? 'Editar Peça' : 'Nova Peça'}</h3>
          <button className="btn-close" onClick={onCancel}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Nome da Peça</label>
            <input
              type="text"
              name="nome"
              className="input-field"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preço (R$)</label>
              <input
                type="number"
                name="preco"
                step="0.01"
                min="0.01"
                className="input-field"
                value={formData.preco}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Estoque</label>
              <input
                type="number"
                name="estoque"
                min="0"
                className="input-field"
                value={formData.estoque}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select 
              name="categoria" 
              className="input-field" 
              value={formData.categoria} 
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="Ferramentas de Corte">Ferramentas de Corte</option>
              <option value="Pastilhas e Insertos">Pastilhas e Insertos</option>
              <option value="Eixos e Componentes">Eixos e Componentes</option>
              <option value="Transmissão">Transmissão</option>
              <option value="Buchas e Rolamentos">Buchas e Rolamentos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
