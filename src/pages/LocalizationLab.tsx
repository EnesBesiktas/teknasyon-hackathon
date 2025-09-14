import React, { useEffect, useMemo, useState } from 'react';
import { LocalizationApi, type CountryInfo, type DirectLocalizationResponse } from '../services/api/localization';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const LocalizationLab: React.FC = () => {
  const storage = useLocalStorage();
  const api = useMemo(() => new LocalizationApi(storage), [storage]);

  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState<number | ''>('');
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState<string>('US');
  const [musicOnly, setMusicOnly] = useState<boolean>(true);
  const [splitParts, setSplitParts] = useState<number | ''>('');
  const [maxPartDuration, setMaxPartDuration] = useState<number | ''>('');
  const [directResult, setDirectResult] = useState<DirectLocalizationResponse | null>(null);
  const [analysis, setAnalysis] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getCountries(false)
      .then((list) => setCountries(list))
      .catch(() => {});
  }, [api]);

  const handleDirect = async () => {
    setError(null);
    if (!videoId) { setError('Please enter a video_id'); return; }
    setLoading(true);
    try {
      const res = await api.directLocalize({
        video_id: Number(videoId),
        country_code: countryCode,
        music_only_background: musicOnly,
        split_into_parts: splitParts ? Number(splitParts) : undefined,
        max_part_duration: maxPartDuration ? Number(maxPartDuration) : undefined,
      });
      setDirectResult(res);
    } catch (e: any) {
      setError(e?.message || 'Direct localization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysis = async () => {
    setError(null);
    if (!videoId) { setError('Please enter a video_id'); return; }
    if (!selectedCountries.length) { setError('Select at least one country'); return; }
    setLoading(true);
    try {
      const res = await api.analyzeCulture({
        video_id: Number(videoId),
        country_codes: selectedCountries,
      });
      setAnalysis(res.results || []);
    } catch (e: any) {
      setError(e?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Localization Lab</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Direct Localization</h3>
          <label className="block text-sm text-gray-600">Video ID</label>
          <input value={videoId} onChange={(e)=>setVideoId(e.target.value as any)} className="w-full border rounded px-3 py-2" placeholder="e.g., 9" />

          <label className="block text-sm text-gray-600 mt-2">Country</label>
          <select value={countryCode} onChange={(e)=>setCountryCode(e.target.value)} className="w-full border rounded px-3 py-2">
            {countries.map(c => (
              <option key={c.country_code} value={c.country_code}>{c.country_name} ({c.country_code})</option>
            ))}
          </select>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" checked={musicOnly} onChange={(e)=>setMusicOnly(e.target.checked)} />
            <span>Keep only background music</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label className="block text-sm text-gray-600">Split into parts</label>
              <input value={splitParts} onChange={(e)=>setSplitParts(e.target.value as any)} className="w-full border rounded px-3 py-2" placeholder="e.g., 2" />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Max part duration (sec)</label>
              <input value={maxPartDuration} onChange={(e)=>setMaxPartDuration(e.target.value as any)} className="w-full border rounded px-3 py-2" placeholder="e.g., 25" />
            </div>
          </div>

          <button disabled={loading} onClick={handleDirect} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">{loading ? 'Processing…' : 'Localize'}</button>

          {directResult && (
            <div className="mt-4 text-sm">
              <div className="font-medium">Status: {directResult.status}</div>
              {directResult.parts?.length ? (
                <ul className="list-disc ml-5 mt-2">
                  {directResult.parts.map((p, i) => (
                    <li key={i}>
                      Part {p.index || i+1}: {p.final_video_url ? <a className="text-blue-600 underline" href={p.final_video_url} target="_blank">Download</a> : '—'}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-2">
                  Final: {directResult.final_video_url ? <a className="text-blue-600 underline" href={directResult.final_video_url} target="_blank">Download</a> : '—'}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Cultural Analysis</h3>
          <label className="block text-sm text-gray-600">Select Countries</label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-auto border rounded p-2">
            {countries.map(c => {
              const checked = selectedCountries.includes(c.country_code);
              return (
                <label key={c.country_code} className={`px-2 py-1 rounded border cursor-pointer ${checked ? 'bg-blue-50 border-blue-400' : ''}`}>
                  <input type="checkbox" className="mr-1" checked={checked} onChange={(e)=>{
                    setSelectedCountries(prev => e.target.checked ? [...prev, c.country_code] : prev.filter(x=>x!==c.country_code));
                  }} />
                  {c.country_name} ({c.language_name})
                </label>
              );
            })}
          </div>
          <button disabled={loading} onClick={handleAnalysis} className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-60">{loading ? 'Analyzing…' : 'Run Analysis'}</button>

          {analysis && (
            <div className="mt-4 space-y-3">
              {analysis.map((r, idx) => (
                <div key={idx} className="border rounded p-3">
                  <div className="font-medium">{r.country_code}</div>
                  {r.error ? (
                    <div className="text-red-600 text-sm">{r.error}</div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="font-semibold">Strengths</div>
                        <ul className="list-disc ml-5">{(r.strengths||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
                        <div className="font-semibold mt-2">Risks</div>
                        <ul className="list-disc ml-5">{(r.risks||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
                      </div>
                      <div>
                        <div className="font-semibold">Adaptations</div>
                        <ul className="list-disc ml-5">{(r.adaptations||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
                        <div className="font-semibold mt-2">Scores</div>
                        <div>
                          Cultural fit: {r.scores?.cultural_fit_percent ?? '-'}%
                          <span className="mx-2">|</span>
                          Content: {r.scores?.content_suitability_percent ?? '-'}%
                          <span className="mx-2">|</span>
                          Market: {r.scores?.market_potential_percent ?? '-'}%
                        </div>
                        <div className="font-semibold mt-2">Audience</div>
                        <div>Demographics: {(r.target_audience?.demographics||[]).join(', ')}</div>
                        <div>Interests: {(r.target_audience?.interests||[]).join(', ')}</div>
                        <div>Channels: {(r.target_audience?.channels||[]).join(', ')}</div>
                        <div>Tone: {r.target_audience?.messaging_tone}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

