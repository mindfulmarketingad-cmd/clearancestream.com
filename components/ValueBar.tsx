import { CartIcon, RefreshIcon, ShieldIcon, TrendDownIcon } from "./Icons";

export function ValueBar() {
  return (
    <div className="value-bar">
      <div>
        <ShieldIcon />
        <p>
          <b>Verified listings</b>
          <span>Prices pulled directly from Amazon</span>
        </p>
      </div>
      <div>
        <TrendDownIcon />
        <p>
          <b>Real savings</b>
          <span>20 to 50% below Amazon reference prices</span>
        </p>
      </div>
      <div>
        <RefreshIcon />
        <p>
          <b>Updated hourly</b>
          <span>Every price shows when it was checked</span>
        </p>
      </div>
      <div>
        <CartIcon />
        <p>
          <b>No extra cost</b>
          <span>You pay Amazon&apos;s price, nothing more</span>
        </p>
      </div>
    </div>
  );
}
