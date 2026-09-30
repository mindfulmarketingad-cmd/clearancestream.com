import { SearchIcon } from "./Icons";

export function SearchBox({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form className="search-hero" action="/search" method="get" role="search">
      <label htmlFor="search-q" className="sr-only">
        Search gaming PC deals
      </label>
      <input
        id="search-q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Try RTX 5080, Alienware Aurora, or gaming PC under 1500"
        maxLength={80}
        autoComplete="off"
        required
      />
      <button type="submit" className="btn btn-primary">
        <SearchIcon />
        Search
      </button>
    </form>
  );
}
