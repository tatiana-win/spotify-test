import "./Artists.css";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Artist } from "../../models/Artist";
import { ArtistListItem } from "../../components/Artist/Artist";
import { SearchInput } from "../../components/SearchInput/Searchinput";
import { searchArtists } from "../../actions/searchArtists";
import { Loader } from "../../components/Loader/Loader";

interface MapProps {
  artists: Artist[];
}
interface DispatchProps {
  search: (q?: string) => void;
}

interface Props extends MapProps, DispatchProps {}

const ArtistsPure = ({ search, artists }: Props) => {
  const [query, setQuery] = useState<string | undefined>("");

  useEffect(() => {
    search();
  }, []);

  const handleChange = useCallback((query?: string) => {
    search(query);
    setQuery(query);
  }, []);

  return (
    <div className="page">
      <h1 className="title">Artists</h1>
      <SearchInput onChange={handleChange} />
      {!artists.length && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {!!artists.length && (
        <>
          <h2 className="subtitle">{query ? "Results" : "Recommendations"}</h2>
          <div className="artists-list">
            {artists.map((artist) => (
              <ArtistListItem artist={artist} key={artist.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any): MapProps => ({
  artists: state.search.artists,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: (q) => dispatch(searchArtists(q)),
});

export const ArtistsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsPure);
