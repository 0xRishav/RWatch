import { useContext, useEffect, useState } from "react";
import { videoContext } from "../../context/VideoContext";
import { NormalVideoList } from "../../containers";
import "./PlaylistPage.css";
import { UserContext } from "../../context/UserContext";

const PlaylistPage = () => {
  const {
    currentUser: { playlists, likedVideos },
  } = useContext(UserContext);
  const [isNothing, setIsNothing] = useState(false);

  console.log("playlists", playlists);

  // useEffect(() => {
  //   playlists.map((playlist) =>
  //     playlist.videos.length === 0 ? setIsNothing(true) : setIsNothing(false)
  //   );
  //   likedVideos.length === 0 ? setIsNothing(true) : setIsNothing(false);
  // }, [playlists]);

  return (
    <div className="playlistpage">
      {playlists.map((playlist, i) => (
        <div className="">
          {playlist.videos.length !== 0 && <h1>{playlist.name}</h1>}
          {playlist.videos.length !== 0 && (
            <NormalVideoList
              videos={playlist.videos}
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
      {(playlists?.videos?.length === 0 || likedVideos?.length === 0) && (
        <h1>Nothing to show</h1>
      )}
    </div>
  );
};

export default PlaylistPage;
