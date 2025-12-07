import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getAuthHeader } from '@/services/auth';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const isPrompts = location.pathname.startsWith('/prompt');
  const navigate = useNavigate();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    const auth = getAuthHeader();
    if (!auth) {
      try {
        window.location.replace('/');
      } catch {
        window.location.href = '/';
      }
    }
  }, [location.pathname]);

  React.useEffect(() => {
    const handler = () => {
      setToast({ message: '会话已失效', type: 'error' });
      const t = setTimeout(() => {
        setToast(null);
        navigate('/login3721');
      }, 2000);
      return () => clearTimeout(t);
    };
    window.addEventListener('auth:expired', handler);
    return () => window.removeEventListener('auth:expired', handler);
  }, []);

  return (
    <div className="min-h-screen flex bg白色">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className={`px-6 py-3 border-[3px] font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${toast.type === 'success' ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'}`}>
            {toast.message}
          </div>
        </div>
      )}
      <aside className="w-48 border-r-[3px] border-black">
        <div className="h-14 flex items-center justify中心 border-b-[3px] border-black font-black">LOGO</div>
        <nav className="flex flex-col">
          <Link
            to="/home"
            className={`px-4 py-3 font-bold border-b-[3px] border-black ${isHome ? 'bg-[#FCD34D]' : ''}`}
          >
            首页
          </Link>
          <Link
            to="/prompt"
            className={`px-4 py-3 font-bold border-b-[3px] border-black ${isPrompts ? 'bg-[#FCD34D]' : ''}`}
          >
            Prompt管理
          </Link>
        </nav>
      </aside>
      <main className="flex-1">
        <div className="h-14 border-b-[3px] border-black"></div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
