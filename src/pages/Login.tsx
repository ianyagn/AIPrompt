import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, setAuthToken } from '@/services/auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsSuccess(null);
    try {
      const res = await loginApi({ username, password });
      if (res.code === 0) {
        setIsSuccess(true);
        setMessage('登录成功');
        const token = res?.data?.access_token;
        const type = res?.data?.token_type;
        if (token) setAuthToken(token, type);
        navigate('/home');
      } else {
        setIsSuccess(false);
        setMessage(res.msg || '登录失败');
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage('登录失败');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    try {
      const msg = localStorage.getItem('global_toast');
      if (msg) {
        setIsSuccess(false);
        setMessage(msg);
        localStorage.removeItem('global_toast');
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-[#e5e5e5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-2xl font-black text-center mb-6">登录</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-[3px] border-black bg-white font-bold focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-2.5 border-2 border-black hover:bg-gray-800 active:translate-y-0.5 transition-all"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 px-4 py-3 border-[3px] font-bold ${
              isSuccess ? 'bg-green-100 border-green-600 text-green-800' : 'bg-red-100 border-red-600 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
