import React, { useState, useEffect } from 'react';
import api from './services/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Package, LayoutDashboard, Settings, LogOut, Search, Plus, User } from 'lucide-react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
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
        await api.put(`/produtos/${produtoEmEdicao.id}`, formData);
      } else {
        await api.post('/produtos', formData);
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
        await api.delete(`/produtos/${id}`);
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
          <h2>CRUD Admin Panel</h2>
        </div>
        <div className="sidebar-nav">
          <div className="nav-category">Main Navigation</div>
          <div className="nav-item active">
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div className="nav-item">
            <Package size={18} /> Inventory
          </div>
          <div className="nav-category">Settings</div>
          <div className="nav-item">
            <Settings size={18} /> Preferences
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <span>Inventory System</span>
          </div>
          <div className="topbar-right">
            <User size={18} />
            <span>Admin User</span>
            <LogOut size={18} style={{marginLeft: '1rem', cursor: 'pointer'}} />
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          <div className="content-header">
            <h1>Inventory</h1>
            <div className="breadcrumb">Home / <span className="breadcrumb-active">Inventory</span></div>
          </div>

          <div className="content-toolbar">
            <div className="toolbar-actions">
              <button className="btn btn-primary" onClick={openNewModal}>
                <Plus size={16} /> ADD NEW
              </button>
            </div>
            <div className="toolbar-search">
              <input 
                type="text" 
                placeholder="Search name or category..." 
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
