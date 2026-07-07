import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../context/WalletContext";

function Navbar() {
  const { publicKey, balance, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        ⭐ StellarFund
      </Link>

      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/create" className={location.pathname === "/create" ? "active" : ""}>Create</Link>
      </div>

      <div className="wallet">
        {publicKey ? (
          <>
            <div className="wallet-info">
              <span>
                {publicKey.slice(0, 5)}...{publicKey.slice(-4)}
              </span>
              <small>
                {Number(balance).toFixed(2)} XLM
              </small>
            </div>
            <button className="btn-danger" style={{ padding: '8px 16px' }} onClick={disconnectWallet}>
              Disconnect
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;