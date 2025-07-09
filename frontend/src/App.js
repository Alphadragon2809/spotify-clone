import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Sidebar, 
  TopBar, 
  HomePage, 
  SearchPage, 
  LibraryPage, 
  PlaylistPage, 
  MusicPlayer,
  ArtistPage,
  AlbumPage
} from "./components";

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const playTrack = (track, playlist = null, index = 0) => {
    setCurrentTrack(track);
    setCurrentPlaylist(playlist);
    setTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentPlaylist && trackIndex < currentPlaylist.tracks.length - 1) {
      const nextIndex = trackIndex + 1;
      setTrackIndex(nextIndex);
      setCurrentTrack(currentPlaylist.tracks[nextIndex]);
    }
  };

  const prevTrack = () => {
    if (currentPlaylist && trackIndex > 0) {
      const prevIndex = trackIndex - 1;
      setTrackIndex(prevIndex);
      setCurrentTrack(currentPlaylist.tracks[prevIndex]);
    }
  };

  const seek = (time) => {
    setCurrentTime(time);
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="App bg-black text-white min-h-screen flex flex-col">
      <BrowserRouter>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex-1 flex flex-col">
            <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomePage playTrack={playTrack} />} />
                <Route path="/search" element={<SearchPage searchQuery={searchQuery} playTrack={playTrack} />} />
                <Route path="/library" element={<LibraryPage playTrack={playTrack} />} />
                <Route path="/playlist/:id" element={<PlaylistPage playTrack={playTrack} />} />
                <Route path="/artist/:id" element={<ArtistPage playTrack={playTrack} />} />
                <Route path="/album/:id" element={<AlbumPage playTrack={playTrack} />} />
              </Routes>
            </div>
          </div>
        </div>
        {currentTrack && (
          <MusicPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isLiked={isLiked}
            togglePlay={togglePlay}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
            seek={seek}
            changeVolume={changeVolume}
            toggleLike={toggleLike}
            setCurrentTime={setCurrentTime}
            setDuration={setDuration}
            audioRef={audioRef}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;