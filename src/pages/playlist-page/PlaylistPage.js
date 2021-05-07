import { useContext, useEffect, useState } from "react";
import { videoContext } from "../../context/VideoContext";
import { NormalVideoList } from "../../containers";
import "./PlaylistPage.css";

const PlaylistPage = () => {
  const { playlists, likedVideos } = useContext(videoContext);
  const [isNothing, setIsNothing] = useState(false);

  useEffect(() => {
    playlists.map((playlist) =>
      playlist.playlist.length === 0 ? setIsNothing(true) : setIsNothing(false)
    );
    likedVideos.length === 0 ? setIsNothing(true) : setIsNothing(false);
  }, [playlists]);

  return (
    <div className="playlistpage">
      {playlists.map((playlist, i) => (
        <div className="">
          {playlist.playlist.length !== 0 && <h1>{playlist.name}</h1>}
          {playlist.playlist.length !== 0 && (
            <NormalVideoList
              videos={playlist.playlist}
              dontShowTitle
              inGrid={false}
              key={i}
            />
          )}
        </div>
      ))}
      {
        <div className="">
          {likedVideos.length !== 0 && <h1>Liked Videos</h1>}
          {likedVideos.length !== 0 && (
            <NormalVideoList
              videos={likedVideos}
              dontShowTitle
              inGrid={false}
            />
          )}
        </div>
      }
      {isNothing && <h1>Nothing to show</h1>}
    </div>
  );
};

export default PlaylistPage;
