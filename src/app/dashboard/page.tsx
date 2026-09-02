"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { createApiKey, getApiKeys, revokeApiKey } from "./actions";
import Link from "next/link";
import { Layers, Key, Trash2, Plus, Copy, LogOut } from "lucide-react";

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<any[]>([]);
  const [newKey, setNewKey] = useState("");
  const [keyName, setKeyName] = useState("");
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data?.user) {
        router.push("/auth/login");
      } else {
        setSession(data);
        loadKeys();
      }
      setLoading(false);
    });
  }, [router]);

  const loadKeys = async () => {
    const k = await getApiKeys();
    setKeys(k);
  };

  const handleCreate = async () => {
    if (!keyName) return;
    const rawKey = await createApiKey(keyName);
    setNewKey(rawKey);
    setKeyName("");
    loadKeys();
  };

  const handleRevoke = async (id: string) => {
    await revokeApiKey(id);
    loadKeys();
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (loading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-white/10 bg-black/50 gap-4 md:gap-0">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-500" />
          <span className="font-bold text-lg tracking-tight">Asset Forge</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-sm text-neutral-400">{session.user.email}</span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">API Keys</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Key Name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="w-full sm:w-auto bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              onClick={handleCreate}
              disabled={!keyName}
              className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-400 disabled:opacity-50 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>

        {newKey && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 md:p-6 rounded-xl mb-8 break-all">
            <h3 className="text-emerald-400 font-bold mb-2">Save your new API Key</h3>
            <p className="text-sm text-neutral-300 mb-4">You won't be able to see this key again. Please copy it now.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <code className="bg-black px-4 py-3 rounded-lg text-emerald-400 flex-1 w-full">{newKey}</code>
              <button
                onClick={() => navigator.clipboard.writeText(newKey)}
                className="bg-neutral-800 p-3 rounded-lg hover:bg-neutral-700 transition-colors w-full sm:w-auto flex justify-center"
              >
                <Copy className="w-5 h-5 text-neutral-300" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-950 border-b border-white/10 text-neutral-400">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Prefix</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    No API keys found. Generate one above.
                  </td>
                </tr>
              )}
              {keys.map((k) => (
                <tr key={k.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <Key className="w-4 h-4 text-emerald-500" />
                    {k.name}
                  </td>
                  <td className="px-6 py-4 text-neutral-400 font-mono">af_...</td>
                  <td className="px-6 py-4 text-neutral-400">
                    {new Date(k.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRevoke(k.id)}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Revoke Key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
