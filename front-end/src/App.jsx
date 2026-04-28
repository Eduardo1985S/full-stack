import React, { useState, useEffect } from 'react';
import { BASE_URL } from './services/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ConfirmModal from './components/ConfirmModal';
import ProductDetail from './components/ProductDetail';
import { Package, LayoutDashboard, Settings, LogOut, Plus, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para o Modal de Exclusão
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Estados para o Modal de Detalhes
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [produtoDetalhe, setProdutoDetalhe] = useState(null);

  const openDetail = (produto) => {
    setProdutoDetalhe(produto);
    setIsDetailOpen(true);
  };

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/produtos`);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.mensagem || 'Erro na requisição');
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      let response;
      if (produtoEmEdicao) {
        response = await fetch(`${BASE_URL}/produtos/${produtoEmEdicao.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`${BASE_URL}/produtos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.mensagem || 'Erro ao salvar a peça');
      }

      toast.success(produtoEmEdicao ? 'Peça atualizada com sucesso!' : 'Peça cadastrada com sucesso!');
      setIsModalOpen(false);
      setProdutoEmEdicao(null);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao salvar", error);
      toast.error(`Erro: ${error.message}`);
    }
  };

  const requestDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/produtos/${itemToDelete}`, { method: 'DELETE' });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.mensagem || 'Erro ao excluir a peça');
      }
      toast.success('Peça excluída com sucesso!');
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir", error);
      toast.error(`Erro: ${error.message}`);
    } finally {
      setIsConfirmOpen(false);
      setItemToDelete(null);
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
      <Toaster position="top-right" />
      
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

          {loading ? (
            <div className="table-empty">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <ProductList 
              produtos={filteredProdutos}
              onView={openDetail}
              onEdit={openEditModal} 
              onDelete={requestDelete} 
            />
          )}

          <ProductForm 
            isOpen={isModalOpen}
            onSubmit={handleCreateOrUpdate} 
            initialData={produtoEmEdicao}
            onCancel={() => {
              setIsModalOpen(false);
              setProdutoEmEdicao(null);
            }}
          />

          <ProductDetail
            isOpen={isDetailOpen}
            produto={produtoDetalhe}
            onClose={() => { setIsDetailOpen(false); setProdutoDetalhe(null); }}
          />

          <ConfirmModal 
            isOpen={isConfirmOpen}
            title="Atenção"
            message="Tem certeza que deseja excluir esta peça definitivamente? Esta ação não pode ser desfeita."
            onConfirm={confirmDelete}
            onCancel={() => {
              setIsConfirmOpen(false);
              setItemToDelete(null);
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
