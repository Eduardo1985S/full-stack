import React, { useState, useEffect } from 'react';
import { BASE_URL } from './services/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Package, LayoutDashboard, Settings, LogOut, Plus, User } from 'lucide-react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/produtos`);
      if (!response.ok) throw new Error('Erro na requisição');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      alert("Erro ao buscar dados da API.");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (produtoEmEdicao) {
        await fetch(`${BASE_URL}/produtos/${produtoEmEdicao.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(`${BASE_URL}/produtos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      setProdutoEmEdicao(null);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert("Erro ao salvar a peça.");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await fetch(`${BASE_URL}/produtos/${id}`, { method: 'DELETE' });
        fetchProdutos();
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    }
  };

  const openNewModal = () => {
    setProdutoEmEdicao(null);
    setIsModalOpen(true);
  };

  const openEditModal = (produto) => {
    setProdutoEmEdicao(produto);
    setIsModalOpen(true);
  };

  const filteredProdutos = produtos.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Painel Administrativo</h2>
        </div>
        <div className="sidebar-nav">
          <div className="nav-category">Navegação Principal</div>
          <div className="nav-item active">
            <LayoutDashboard size={18} /> Início
          </div>
          <div className="nav-item">
            <Package size={18} /> Inventário
          </div>
          <div className="nav-category">Configurações</div>
          <div className="nav-item">
            <Settings size={18} /> Preferências
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <span>Sistema de Inventário</span>
          </div>
          <div className="topbar-right">
            <User size={18} />
            <span>Administrador</span>
            <LogOut size={18} style={{marginLeft: '1rem', cursor: 'pointer'}} />
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          <div className="content-header">
            <h1>Inventário</h1>
            <div className="breadcrumb">Início / <span className="breadcrumb-active">Inventário</span></div>
          </div>

          <div className="content-toolbar">
            <div className="toolbar-actions">
              <button className="btn btn-primary" onClick={openNewModal}>
                <Plus size={16} /> ADICIONAR
              </button>
            </div>
            <div className="toolbar-search">
              <input 
                type="text" 
                placeholder="Buscar por nome ou categoria..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ProductList 
            produtos={filteredProdutos} 
            onEdit={openEditModal} 
            onDelete={handleDelete} 
          />

          <ProductForm 
            isOpen={isModalOpen}
            onSubmit={handleCreateOrUpdate} 
            initialData={produtoEmEdicao}
            onCancel={() => {
              setIsModalOpen(false);
              setProdutoEmEdicao(null);
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
