import React, { useState } from 'react'; // Importar useState
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight, // Importar ChevronRight
    ChevronDown,  // Importar ChevronDown
    Command
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

// Definir uma interface para os itens do menu para melhor type safety
interface MenuItem {
    icon: React.ElementType;
    label: string;
    path?: string; // path agora é opcional
    children?: Array<{ label: string; path: string }>; // children é opcional
}

function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const location = useLocation();
    const [isArtigosOpen, setIsArtigosOpen] = useState(false); // Estado para controlar o submenu

    const menuItems: MenuItem[] = [ // Usar a interface MenuItem
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        {
            icon: FileText,
            label: 'Artigos',
            // Sem 'path' direto aqui
            children: [ // Sub-itens
                { label: 'Publicados', path: '/admin/dashboard/articles' },
                { label: 'Pendentes', path: '/admin/dashboard/articles-pendentes' }
            ]
        },
        { icon: Users, label: 'Usuários', path: '/admin/dashboard/users' },
        { icon: Settings, label: 'Configurações', path: '/admin/dashboard/settings' },
    ];

    // Função para verificar se o item pai ou um de seus filhos está ativo
    const isItemActive = (item: MenuItem): boolean => {
        if (item.path && location.pathname === item.path) {
            return true;
        }
        if (item.children) {
            // Verifica se algum filho corresponde à localização atual
            return item.children.some(child => location.pathname === child.path);
        }
        return false;
    };

    // Determina se o submenu Artigos deve iniciar aberto (se uma das subpáginas estiver ativa)
    React.useEffect(() => {
      const artigosItem = menuItems.find(item => item.label === 'Artigos');
      if (artigosItem && isItemActive(artigosItem)) {
        setIsArtigosOpen(true);
      }
    }, [location.pathname]); // Executa quando a rota muda


    return (
        <aside
            className={`glass-effect h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
                } border-r border-gray-200/50`}
        >
            <div className="flex flex-col h-full">
                {/* Header - igual ao seu código original */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200/50">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <Command className="w-6 h-6 text-[#E63946]" />
                            <span className="text-xl font-bold bg-gradient-to-r from-[#E63946] to-[#FF6B6B] bg-clip-text text-transparent">
                                Sintetiza
                            </span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-[#E63946]/5 transition-colors group"
                        aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
                    >
                        <ChevronLeft className={`w-5 h-5 text-gray-600 group-hover:text-[#E63946] transition-all duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-4 overflow-y-auto"> {/* Adicionado overflow-y-auto */}
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = isItemActive(item); // Usar a nova função de verificação

                            // --- Renderiza item com submenu ---
                            if (item.children) {
                                return (
                                    <li key={item.label}>
                                        <button
                                            onClick={() => setIsArtigosOpen(!isArtigosOpen)}
                                            className={`menu-item flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-300 group ${isActive // Estilo ativo no botão pai
                                                    ? 'bg-[#E63946]/10 text-[#E63946]'
                                                    : 'text-gray-600 hover:bg-[#E63946]/5 hover:text-[#E63946]'
                                                }`}
                                            aria-expanded={isArtigosOpen} // Acessibilidade
                                        >
                                            <div className="flex items-center">
                                                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 duration-300 ${isActive ? 'text-[#E63946]' : ''}`} />
                                                {!isCollapsed && (
                                                    <span className={`ml-3 font-medium transition-all duration-300 ${isActive ? 'text-[#E63946] font-semibold' : ''}`}>
                                                        {item.label}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Ícone de Chevron (só visível quando não colapsado) */}
                                            {!isCollapsed && (
                                                isArtigosOpen
                                                    ? <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                                                    : <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                                            )}
                                        </button>
                                        {/* Submenu renderizado condicionalmente */}
                                        {!isCollapsed && isArtigosOpen && (
                                            <ul className="mt-1 pl-6 space-y-1"> {/* Adicionado pl-6 para indentação */}
                                                {item.children.map((child) => {
                                                    const isChildActive = location.pathname === child.path;
                                                    return (
                                                        <li key={child.label}>
                                                            <Link
                                                                to={child.path}
                                                                className={`menu-item flex items-center px-3 py-2 rounded-lg transition-all duration-300 group text-sm ${isChildActive // Estilo específico para filho ativo
                                                                        ? 'bg-[#E63946]/10 text-[#E63946] font-semibold'
                                                                        : 'text-gray-500 hover:bg-[#E63946]/5 hover:text-[#E63946]'
                                                                    }`}
                                                            >
                                                                {/* Você pode adicionar um marcador se quiser: <span className="w-1.5 h-1.5 mr-2 rounded-full bg-current"></span> */}
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }
                            // --- Renderiza item normal (link direto) ---
                            else if (item.path) { // Adiciona verificação se path existe para segurança de tipo
                                return (
                                    <li key={item.label}>
                                        <Link
                                            to={item.path} // Agora TS sabe que item.path é string aqui
                                            className={`menu-item flex items-center px-3 py-2.5 rounded-lg transition-all duration-300 group ${isActive
                                                    ? 'bg-[#E63946]/10 text-[#E63946] active' // Classe 'active' como no original
                                                    : 'text-gray-600 hover:bg-[#E63946]/5 hover:text-[#E63946]'
                                                }`}
                                        >
                                            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 duration-300 ${isActive ? 'text-[#E63946]' : ''}`} />
                                            {!isCollapsed && (
                                                <span className={`ml-3 font-medium transition-all duration-300 ${isActive ? 'text-[#E63946] font-semibold' : ''}`}>
                                                    {item.label}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            }
                            return null; // Caso um item não tenha path nem children (improvável, mas seguro)
                        })}
                    </ul>
                </nav>

                {/* Footer - igual ao seu código original */}
                <div className="p-4 border-t border-gray-200/50">
                    <button className="menu-item flex items-center px-3 py-2.5 rounded-lg text-gray-600 hover:bg-[#E63946]/5 hover:text-[#E63946] transition-all duration-300 w-full group">
                        <LogOut className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" />
                        {!isCollapsed && <span className="ml-3 font-medium">Sair</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;