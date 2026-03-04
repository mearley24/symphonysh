import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Vault = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") || "";
  const [vaultUrl, setVaultUrl] = useState("");

  useEffect(() => {
    // Bob's vault PWA - accessible via Tailscale or local network
    // In production, this could be a dedicated vault subdomain
    const bobVaultBase = "http://bob.local:8801";
    const url = code 
      ? `${bobVaultBase}/?code=${code}` 
      : bobVaultBase;
    setVaultUrl(url);
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Minimal header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm">
              🔐
            </div>
            <span className="font-semibold text-white">Symphony Vault</span>
          </div>
          <a 
            href="/" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Site
          </a>
        </div>
      </div>

      {/* Vault iframe */}
      <div className="flex-1 relative">
        {vaultUrl ? (
          <iframe
            src={vaultUrl}
            className="absolute inset-0 w-full h-full border-0"
            title="Symphony Vault"
            allow="clipboard-write"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <p className="text-lg mb-2">Loading vault...</p>
              <p className="text-sm">If this takes too long, ensure you're connected to the Symphony network.</p>
            </div>
          </div>
        )}
      </div>

      {/* Connection help */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <p className="text-xs text-gray-500 text-center">
          Can't connect? Make sure you're on the same network as your Symphony system, or use{" "}
          <a href="https://tailscale.com" className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">
            Tailscale
          </a>
          {" "}for remote access.
        </p>
      </div>
    </div>
  );
};

export default Vault;
