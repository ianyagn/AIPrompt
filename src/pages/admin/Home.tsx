import React from 'react';
import { fetchAllPrompts } from '@/services/prompts';
import { getAuthHeader } from '@/services/auth';
import * as echarts from 'echarts';

const Home: React.FC = () => {
  const [todayVisits, setTodayVisits] = React.useState<{ day: string; total: number; inc_rate: number | null } | null>(null);
  const [promptTotal, setPromptTotal] = React.useState<number>(0);
  const [hourly, setHourly] = React.useState<number[]>([]);
  const [daily7, setDaily7] = React.useState<Array<{ day: string; total: number; inc_rate: number | null }>>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const hourlyEl = React.useRef<HTMLDivElement | null>(null);
  const dailyEl = React.useRef<HTMLDivElement | null>(null);
  const hourlyChart = React.useRef<echarts.ECharts | null>(null);
  const dailyChart = React.useRef<echarts.ECharts | null>(null);

  const handleUnauthorized = React.useCallback(() => {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_token_type');
    } catch {}
    try {
      const evt = new CustomEvent('auth:expired');
      window.dispatchEvent(evt);
    } catch {}
  }, []);

  React.useEffect(() => {
    const run = async () => {
      const auth = getAuthHeader();
      if (!auth) return;
      try {
        setLoading(true);
        const headers = { Authorization: auth } as Record<string, string>;
        // 1) 生成今日访问量（后端统计触发）
        const genResp = await fetch('/api/stats/generate-daily', { method: 'POST', headers });
        if (genResp.status === 401) { handleUnauthorized(); return; }
        const genJson = await genResp.json().catch(() => ({}));
        const generatedInc: number | null = (typeof genJson?.inc_rate === 'number') ? genJson.inc_rate : null;
        const generatedDay: string | null = (typeof genJson?.day === 'string') ? genJson.day : null;
        // 2) 获取今日访问量
        const hourlyResp = await fetch('/api/stats/hourly', { headers });
        if (hourlyResp.status === 401) { handleUnauthorized(); return; }
        const hourlyJson = await hourlyResp.json();
        const arr: number[] = Array.isArray(hourlyJson?.data) ? hourlyJson.data : [];
        setHourly(arr);
        setTodayVisits({ day: (hourlyJson?.day || generatedDay || ''), total: arr.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0), inc_rate: generatedInc });

        // 3) 获取近七日访问量
        const dailyResp = await fetch('/api/stats/daily?limit=15', { headers });
        if (dailyResp.status === 401) { handleUnauthorized(); return; }
        const dailyJson = await dailyResp.json();
        const list = Array.isArray(dailyJson) ? dailyJson : [];
        setDaily7(list);

        // 4) 获取 prompt 总数（参考管理页 total）
        const { meta } = await fetchAllPrompts(1, 1);
        setPromptTotal(meta?.total || 0);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [handleUnauthorized]);

  React.useEffect(() => {
    if (hourly.length === 24 && hourlyEl.current) {
      if (!hourlyChart.current) hourlyChart.current = echarts.init(hourlyEl.current);
      const option = {
        grid: { left: 40, right: 20, top: 20, bottom: 30 },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 24 }).map((_, i) => i),
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#9ca3af' } },
        },
        yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
        series: [
          {
            type: 'line',
            data: hourly,
            smooth: true,
            showSymbol: true,
            symbolSize: 6,
            lineStyle: { width: 3, color: '#4d7cfe' },
            itemStyle: { color: '#4d7cfe' },
            areaStyle: { color: 'rgba(77,124,254,0.15)' },
          },
        ],
      } as echarts.EChartsOption;
      hourlyChart.current.setOption(option);
      const onResize = () => hourlyChart.current && hourlyChart.current.resize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, [hourly]);

  React.useEffect(() => {
    if (daily7.length && dailyEl.current) {
      if (!dailyChart.current) dailyChart.current = echarts.init(dailyEl.current);
      const sorted = [...daily7].sort((a, b) => {
        const ta = new Date(a.day).getTime();
        const tb = new Date(b.day).getTime();
        return ta - tb;
      });
      const x = sorted.map((d) => d.day.slice(5));
      const v = sorted.map((d) => d.total ?? 0);
      const option = {
        grid: { left: 40, right: 20, top: 20, bottom: 30 },
        xAxis: { type: 'category', data: x, axisLine: { lineStyle: { color: '#9ca3af' } } },
        yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
        series: [
          {
            type: 'bar',
            data: v,
            itemStyle: { color: '#4d7cfe' },
            barWidth: '40%',
          },
        ],
      } as echarts.EChartsOption;
      dailyChart.current.setOption(option);
      const onResize = () => dailyChart.current && dailyChart.current.resize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, [daily7]);

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-4 gap-6">
        <div className="border-[3px] border-black bg-white p-4">
          <div className="font-black">今日访问量</div>
          <div className="mt-2 text-2xl font-black flex items-center gap-2">
            <span>{loading && !todayVisits ? '...' : (todayVisits?.total ?? 0)}</span>
            {todayVisits?.inc_rate != null && (
              <span className={`text-sm md:text-base font-black ${todayVisits.inc_rate > 0 ? 'text-red-600' : (todayVisits.inc_rate < 0 ? 'text-green-600' : 'text-gray-500')}`}>
                {todayVisits.inc_rate > 0 ? '↑' : (todayVisits.inc_rate < 0 ? '↓' : '↔')} {Math.abs(todayVisits.inc_rate)}%
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 font-bold">{todayVisits?.day || ''}</div>
        </div>
        <div className="border-[3px] border-black bg-white p-4">
          <div className="font-black">prompt总数</div>
          <div className="mt-2 text-2xl font-black">{promptTotal}</div>
        </div>
        <div className="border-[3px] border-black bg-white p-4">
          <div className="font-black">预留</div>
        </div>
        <div className="border-[3px] border-black bg-white p-4">
          <div className="font-black">预留</div>
        </div>
      </div>

      <div className="border-[3px] border-black bg-white p-6">
        <div className="font-black mb-4">今日每小时访问量 折线统计图</div>
        <div ref={hourlyEl} className="w-full h-56" />
      </div>

      <div className="border-[3px] border-black bg-white p-6">
        <div className="font-black mb-4">近七日访问量柱状图</div>
        <div ref={dailyEl} className="w-full h-56" />
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-100 border-[3px] border-red-600 text-red-800 font-bold">{error}</div>
      )}
    </div>
  );
};

export default Home;
