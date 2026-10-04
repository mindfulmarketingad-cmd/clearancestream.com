import { CartIcon, RefreshIcon, ShieldIcon, TrendDownIcon } from "./Icons";

export function ValueBar() {
  return (
    <div className="value-bar">
      <div>
        <ShieldIcon />
        <p>
          <b>Verified listings</b>
          <span>Live prices, checked every week</span>
        </p>
      </div>
      <div>
        <TrendDownIcon />
        <p>
          <b>Real savings</b>
          <span>Only genuine reference prices, never inflated</span>
        </p>
      </div>
      <div>
        <RefreshIcon />
        <p>
          <b>Updated weekly</b>
          <span>Every price shows when it was checked</span>
        </p>
      </div>
      <div>
        <CartIcon />
        <p>
          <b>No extra cost</b>
          <span>You pay the listed price, nothing more</span>
        </p>
      </div>
    </div>
  );
}
